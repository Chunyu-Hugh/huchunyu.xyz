#!/usr/bin/env node

/**
 * Notion 文章读写工具
 *
 * 用法:
 *   node scripts/notion-tool.mjs search <关键词>        # 搜索文章
 *   node scripts/notion-tool.mjs read   <pageId>        # 读取文章内容
 *   node scripts/notion-tool.mjs write  <pageId> <file> # 用 JSON 文件内容覆盖文章
 *
 * 环境变量 NOTION_API_TOKEN（ntn_ 开头）从 .env.notion 读取
 */

import axios from 'axios'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ── 配置 ──────────────────────────────────────────────
function loadToken() {
  const envFile = resolve(ROOT, '.env.notion')
  if (existsSync(envFile)) {
    const match = readFileSync(envFile, 'utf-8').match(/NOTION_API_TOKEN=(.+)/)
    if (match) return match[1].trim()
  }
  if (process.env.NOTION_API_TOKEN) return process.env.NOTION_API_TOKEN
  console.error('错误: 找不到 NOTION_API_TOKEN，请在 .env.notion 中配置')
  process.exit(1)
}

const TOKEN = loadToken()
const NOTION_VERSION = '2022-06-28'
const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Notion-Version': NOTION_VERSION,
  'Content-Type': 'application/json'
}

// ── API 封装 ──────────────────────────────────────────
async function searchPages(query) {
  const res = await axios.post(
    'https://api.notion.com/v1/search',
    { query, page_size: 20 },
    { headers }
  )
  return res.data.results
    .filter(r => r.object === 'page')
    .map(p => ({
      id: p.id,
      title: p.properties?.title?.title?.map(t => t.plain_text).join('') || '(无标题)',
      status: p.properties?.status?.select?.name || '',
      lastEdited: p.last_edited_time,
      url: p.url
    }))
}

async function getBlocks(blockId) {
  let all = []
  let cursor
  do {
    const params = { page_size: 100 }
    if (cursor) params.start_cursor = cursor
    const res = await axios.get(
      `https://api.notion.com/v1/blocks/${blockId}/children`,
      { params, headers }
    )
    all = all.concat(res.data.results)
    cursor = res.data.has_more ? res.data.next_cursor : undefined
  } while (cursor)
  return all
}

function extractText(block) {
  const type = block.type
  const content = block[type]
  if (content?.rich_text) {
    const text = content.rich_text.map(t => t.plain_text).join('')
    return { type, text }
  }
  if (type === 'divider') return { type, text: '---' }
  if (type === 'image') {
    const url = content?.file?.url || content?.external?.url || ''
    return { type, text: url }
  }
  return { type, text: '' }
}

async function readPage(pageId) {
  const blocks = await getBlocks(pageId)
  return blocks.map(b => ({ id: b.id, ...extractText(b) }))
}

async function deleteBlock(blockId) {
  await axios.delete(`https://api.notion.com/v1/blocks/${blockId}`, { headers })
}

async function writePage(pageId, newBlocks) {
  // 删除现有 blocks
  const existing = await getBlocks(pageId)
  for (const block of existing) {
    await deleteBlock(block.id)
  }
  // 写入新 blocks（每次最多 100 个）
  for (let i = 0; i < newBlocks.length; i += 100) {
    const chunk = newBlocks.slice(i, i + 100)
    await axios.patch(
      `https://api.notion.com/v1/blocks/${pageId}/children`,
      { children: chunk },
      { headers }
    )
  }
}

// ── Block 构造辅助函数（供外部 JSON 使用）──────────────
// JSON 文件格式示例见 scripts/notion-blocks-example.json

// ── CLI 入口 ──────────────────────────────────────────
const [, , command, ...args] = process.argv

try {
  switch (command) {
    case 'search': {
      const query = args.join(' ')
      if (!query) { console.error('用法: notion-tool.mjs search <关键词>'); process.exit(1) }
      const results = await searchPages(query)
      if (results.length === 0) {
        console.log('未找到匹配文章')
      } else {
        results.forEach(r => {
          console.log(`${r.id} | ${r.title} | ${r.status} | ${r.lastEdited}`)
        })
      }
      break
    }

    case 'read': {
      const pageId = args[0]
      if (!pageId) { console.error('用法: notion-tool.mjs read <pageId>'); process.exit(1) }
      const content = await readPage(pageId)
      // 输出 JSON 格式方便程序处理，纯文本格式方便人阅读
      if (args[1] === '--json') {
        console.log(JSON.stringify(content, null, 2))
      } else {
        content.forEach(b => console.log(`[${b.type}] ${b.text}`))
      }
      break
    }

    case 'write': {
      const pageId = args[0]
      const filePath = args[1]
      if (!pageId || !filePath) {
        console.error('用法: notion-tool.mjs write <pageId> <blocks.json>')
        process.exit(1)
      }
      const absPath = resolve(process.cwd(), filePath)
      const blocks = JSON.parse(readFileSync(absPath, 'utf-8'))
      await writePage(pageId, blocks)
      console.log(`已更新文章 ${pageId}，写入 ${blocks.length} 个 blocks`)
      break
    }

    default:
      console.log(`Notion 文章读写工具

用法:
  node scripts/notion-tool.mjs search <关键词>         搜索文章
  node scripts/notion-tool.mjs read   <pageId>         读取文章（纯文本）
  node scripts/notion-tool.mjs read   <pageId> --json  读取文章（JSON）
  node scripts/notion-tool.mjs write  <pageId> <file>  用 JSON 覆盖文章内容`)
  }
} catch (err) {
  console.error('错误:', err.response?.status, err.response?.data?.message || err.message)
  process.exit(1)
}
