# NotionNext 博客搭建与定制指南

> 从零开始，用 Notion 写博客，用 Vercel 部署，用 AI 帮你改文章风格。

---

## 目录

1. [你会得到什么](#1-你会得到什么)
2. [前置准备](#2-前置准备)
3. [第一步：创建 Notion 数据库](#3-第一步创建-notion-数据库)
4. [第二步：Clone 项目并配置](#4-第二步clone-项目并配置)
5. [第三步：部署到 Vercel](#5-第三步部署到-vercel)
6. [定制你的博客](#6-定制你的博客)
7. [用 AI 改写文章风格](#7-用-ai-改写文章风格)
8. [日常写作流程](#8-日常写作流程)
9. [进阶玩法](#9-进阶玩法)
10. [常见问题](#10-常见问题)

---

## 1. 你会得到什么

- 一个基于 Notion 的个人博客网站
- 在 Notion 里写文章，网站自动更新（约 60 秒延迟）
- 23+ 主题可选，支持中英双语
- 评论系统、数据统计、RSS 订阅
- AI 辅助改写文章风格的工具

---

## 2. 前置准备

你需要准备：

| 工具 | 说明 | 获取方式 |
|------|------|----------|
| **Notion 账号** | 用来写文章 | [notion.so](https://www.notion.so) 免费注册 |
| **GitHub 账号** | 存放代码 | [github.com](https://github.com) |
| **Vercel 账号** | 部署网站 | [vercel.com](https://vercel.com) 用 GitHub 登录即可 |
| **Node.js 18+** | 本地开发 | [nodejs.org](https://nodejs.org) |
| **域名（可选）** | 自定义域名 | 在 Vercel 中绑定，不买也能用 `.vercel.app` 子域名 |

---

## 3. 第一步：创建 Notion 数据库

### 3.1 复制模板

打开 Notion 模板页面，点击右上角 **Duplicate**（复制）到你自己的 Notion：

> 模板地址：https://tanghh.notion.site/02ab3b8678004aa69e9e415905ef32a5

### 3.2 获取页面 ID

复制完成后，打开你的数据库页面，看浏览器地址栏：

```
https://www.notion.so/你的工作区/数据库标题-40a6b3c04d614c50a20be410cc859162?v=xxxxx
                                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                           这一串就是你的 NOTION_PAGE_ID
```

**把这个 ID 记下来**，后面要用。

### 3.3 创建 Notion API Token（用于 AI 工具）

如果你需要用 AI 工具改写文章风格（后面会讲），还需要一个官方 API Token：

1. 打开 https://www.notion.so/my-integrations
2. 点击 **New integration**
3. 名称随意填（如 "Blog Tool"），权限选 **Read & Write content**
4. 创建后会得到一个 `ntn_` 开头的 token，**记下来**
5. 回到你的 Notion 数据库页面，点右上角 `...` → **Connections** → 搜索并添加你刚创建的 Integration

### 3.4 数据库字段说明

模板已经配好了这些字段，你不需要改名字：

| 字段名 | 类型 | 说明 |
|--------|------|------|
| `title` | Title | 文章标题 |
| `type` | Select | `Post`=博文, `Page`=独立页面, `Menu`=导航, `SubMenu`=子导航, `Notice`=公告 |
| `status` | Select | `Published`=已发布, `Draft`=草稿, `Invisible`=隐藏 |
| `date` | Date | 发布日期 |
| `slug` | Text | URL 路径，如 `my-first-post` → 访问 `/article/my-first-post` |
| `category` | Select | 文章分类 |
| `tags` | Multi-select | 文章标签 |
| `summary` | Text | 摘要，显示在文章列表 |
| `icon` | Text | 文章图标，可以是 emoji 或图片 URL |
| `password` | Text | 加密文章，填了密码就需要输入密码才能看 |

---

## 4. 第二步：Clone 项目并配置

### 4.1 Fork 或 Clone

```bash
# 方式一：Fork 到自己的 GitHub（推荐，方便后续自动部署）
# 在 GitHub 页面点 Fork

# 方式二：直接 Clone
git clone https://github.com/tangly1024/NotionNext.git my-blog
cd my-blog
```

### 4.2 安装依赖

```bash
npm install
# 或
yarn install
```

### 4.3 配置环境变量

创建 `.env.local` 文件：

```bash
# 必填 —— 你的 Notion 数据库页面 ID
NOTION_PAGE_ID=把你的ID粘贴在这里

# 选填 —— 用于访问私有 Notion 数据库
# NOTION_TOKEN_V2=你的token
# NOTION_ACTIVE_USER=你的user-id
```

如果需要 AI 改写工具，再创建 `.env.notion` 文件：

```bash
NOTION_API_TOKEN=ntn_你的官方API token
```

### 4.4 修改博客配置

打开 `blog.config.js`，改这几个关键项：

```javascript
// 第 8 行 —— 你的 Notion 页面 ID
NOTION_PAGE_ID: process.env.NOTION_PAGE_ID || '你的ID',

// 第 9 行 —— 选择主题（见下方主题列表）
THEME: process.env.NEXT_PUBLIC_THEME || 'magzine',

// 第 18-22 行 —— 你的个人信息
AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || '你的名字',
BIO: process.env.NEXT_PUBLIC_BIO || '你的简介',
LINK: process.env.NEXT_PUBLIC_LINK || 'https://你的域名.com',
KEYWORDS: process.env.NEXT_PUBLIC_KEYWORD || '博客, 生活',
```

### 4.5 本地预览

```bash
npm run dev
# 打开 http://localhost:3000 查看效果
```

---

## 5. 第三步：部署到 Vercel

### 5.1 方式一：通过 GitHub 自动部署（推荐）

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录
2. 点击 **Add New Project**
3. 选择你 Fork 的仓库
4. 在 **Environment Variables** 中添加：

```
NOTION_PAGE_ID = 你的页面ID
```

5. 点击 **Deploy**，等待 2-3 分钟
6. 部署完成后会得到一个 `xxx.vercel.app` 的地址

以后每次你 `git push`，Vercel 会自动重新部署。

### 5.2 方式二：通过命令行部署

```bash
npm i -g vercel    # 安装 Vercel CLI
vercel login       # 登录
vercel             # 预览部署
vercel --prod      # 正式部署
```

### 5.3 绑定自定义域名（可选）

在 Vercel Dashboard → 你的项目 → **Settings** → **Domains** → 添加你的域名，然后按提示去域名服务商添加 DNS 记录。

---

## 6. 定制你的博客

### 6.1 可用主题一览

在 `themes/` 目录下，每个文件夹就是一个主题：

| 主题 | 风格 | 适合 |
|------|------|------|
| `magzine` | 杂志风，大图排版 | 生活博客、摄影 |
| `heo` | 简洁现代 | 技术博客 |
| `hexo` | 经典双栏 | 传统博客 |
| `next` | 极简 | 文字为主 |
| `medium` | Medium 风格 | 长文阅读 |
| `nobelium` | 时间线 | 日记、记录 |
| `fukasawa` | 日系瀑布流 | 图片为主 |
| `plog` | 照片博客 | 摄影作品 |
| `gitbook` | 文档风格 | 知识库 |
| `simple` | 极简单页 | 个人主页 |

切换方法：修改 `blog.config.js` 第 9 行的 `THEME` 值。

### 6.2 配置文件速查表

所有配置都在 `blog.config.js`（主配置）和 `conf/` 目录下（分类配置）：

| 你想改什么 | 改哪个文件 | 改什么字段 |
|------------|-----------|-----------|
| 博客名字/简介 | `blog.config.js` | `AUTHOR`, `BIO` |
| 网站地址 | `blog.config.js` | `LINK` |
| 主题 | `blog.config.js` | `THEME` |
| 语言 | `blog.config.js` | `LANG`（`zh-CN` / `en-US`） |
| 导航菜单顺序 | `blog.config.js` | `MENU_SORT_ORDER` 数组 |
| 社交链接 | `conf/contact.config.js` | `CONTACT_GITHUB`, `CONTACT_TWITTER` 等 |
| 评论系统 | `conf/comment.config.js` | 见下方评论配置 |
| 数据统计 | `conf/analytics.config.js` | `ANALYTICS_GOOGLE_ID` 等 |
| 字体 | `conf/font.config.js` | `FONT_URL`, `FONT_SANS` |
| 文章列表样式 | `conf/post.config.js` | `POST_LIST_STYLE`, `POSTS_PER_PAGE` |
| 代码块样式 | `conf/code.config.js` | `CODE_THEME` |
| 宠物挂件 | `conf/widget.config.js` | `WIDGET_PET` |
| 图片压缩 | `conf/image.config.js` | `IMAGE_COMPRESS_WIDTH` |

### 6.3 主题专属配置

每个主题还有自己的配置，在 `themes/主题名/config.js` 里。比如 magzine 主题：

```javascript
// themes/magzine/config.js
MAGZINE_HOME_TITLE: '你的首页标语',
MAGZINE_HOME_DESCRIPTION: '副标题',
MAGZINE_SOCIAL_CARD_TITLE_2: '你的邮箱',
MAGZINE_FOOTER_LINKS: [...]  // 页脚链接
```

### 6.4 评论系统配置

推荐两个免费方案：

**方案 A：Twikoo（国内友好）**

1. 在 Vercel 上部署 Twikoo 后端：https://twikoo.js.org
2. 得到一个 URL 如 `https://twikoo-xxx.vercel.app`
3. 配置：

```javascript
// conf/comment.config.js
COMMENT_TWIKOO_ENV_ID: 'https://twikoo-xxx.vercel.app',
```

**方案 B：Giscus（基于 GitHub Discussions）**

1. 去 https://giscus.app 按步骤配置
2. 得到 repo、repo_id、category_id
3. 配置：

```javascript
// conf/comment.config.js
COMMENT_GISCUS_REPO: '你的GitHub用户名/仓库名',
COMMENT_GISCUS_REPO_ID: '...',
COMMENT_GISCUS_CATEGORY_ID: '...',
```

### 6.5 添加 Google Analytics

```javascript
// conf/analytics.config.js
ANALYTICS_GOOGLE_ID: 'G-XXXXXXXXXX',  // 从 Google Analytics 后台获取
```

---

## 7. 用 AI 改写文章风格

项目里内置了一个 `scripts/notion-tool.mjs` 工具，配合 Claude Code 或其他 AI，可以批量改写文章风格。

### 7.1 前提

确保你已经：
- 创建了 Notion API Integration 并拿到 `ntn_` 开头的 token（见 3.3 节）
- 把 token 写入了 `.env.notion` 文件
- 把你的 Notion 数据库添加了这个 Integration 的 Connection

### 7.2 工具用法

```bash
# 搜索文章
node scripts/notion-tool.mjs search "关键词"
# 输出: pageId | 标题 | 状态 | 最后编辑时间

# 读取文章内容
node scripts/notion-tool.mjs read <pageId>

# 读取为 JSON（给 AI 用）
node scripts/notion-tool.mjs read <pageId> --json

# 用 JSON 文件覆盖文章内容
node scripts/notion-tool.mjs write <pageId> blocks.json
```

### 7.3 配合 AI 改写的完整流程

**第一步：找到文章**

```bash
node scripts/notion-tool.mjs search "我的文章标题"
# 输出: 33cad398-d145-806c-b6ef-cb17c364ec73 | 我的文章标题 | Draft | 2026-04-08
```

**第二步：读取内容**

```bash
node scripts/notion-tool.mjs read 33cad398-d145-806c-b6ef-cb17c364ec73
# 输出每一段的类型和文字内容
```

**第三步：让 AI 改写**

打开 Claude Code（或其他 AI 工具），把读到的内容粘贴给它，告诉它你想要的风格。比如：

> 帮我把这篇文章改成豆瓣文艺青年的风格：短句为主，多用省略号，
> 有自省和留白感，结尾不给答案。以下是原文：
> [粘贴内容]

AI 改好后，让它生成 Notion blocks JSON 格式的输出。

**第四步：写回 Notion**

```bash
node scripts/notion-tool.mjs write 33cad398-d145-806c-b6ef-cb17c364ec73 rewritten.json
```

**如果你用 Claude Code：** 可以直接跟它说"帮我改这篇 Notion 文章的风格"，它会自动调用这个工具，不需要手动操作。

### 7.4 Notion Blocks JSON 格式参考

```json
[
  {
    "object": "block",
    "type": "paragraph",
    "paragraph": {
      "rich_text": [{ "type": "text", "text": { "content": "这是一段文字。" } }]
    }
  },
  {
    "object": "block",
    "type": "heading_2",
    "heading_2": {
      "rich_text": [{ "type": "text", "text": { "content": "这是二级标题" } }]
    }
  },
  {
    "object": "block",
    "type": "quote",
    "quote": {
      "rich_text": [{ "type": "text", "text": { "content": "这是引用块。" } }]
    }
  },
  {
    "object": "block",
    "type": "divider",
    "divider": {}
  }
]
```

支持的 block 类型：`paragraph`, `heading_1/2/3`, `quote`, `divider`, `bulleted_list_item`, `numbered_list_item`, `code`, `image`

---

## 8. 日常写作流程

搭建完成后，日常发文章只需要在 Notion 里操作：

### 发布新文章

1. 在 Notion 数据库中新建一行
2. 填写：
   - `title`：文章标题
   - `type`：选 `Post`
   - `status`：选 `Published`
   - `date`：发布日期
   - `slug`：URL 路径（英文，用短横线分隔，如 `my-new-post`）
   - `category`：选一个分类
   - `tags`：选标签
   - `summary`：写一句摘要
3. 在页面正文里写内容（支持 Notion 所有排版功能）
4. 等约 60 秒，网站自动更新

### 添加导航菜单

1. 在 Notion 数据库中新建一行
2. `type` 选 `Menu`（主菜单）或 `SubMenu`（子菜单）
3. `title` 填显示名称
4. `slug` 填跳转路径（如 `/category/生活` 或 `/tag/travel`）
5. `icon` 填图标（如 Font Awesome 类名 `fas fa-home`）
6. `status` 设为 `Published`
7. 在 `blog.config.js` 的 `MENU_SORT_ORDER` 数组中添加对应路径来控制顺序

### 创建独立页面（如"关于"页面）

1. 新建一行，`type` 选 `Page`
2. `slug` 填 `about`
3. 正文里写内容
4. 访问 `/about` 即可

---

## 9. 进阶玩法

### 9.1 中英双语博客

如果你想让博客同时支持中文和英文：

1. 在 Notion 里再 Duplicate 一份模板，作为英文数据库
2. 获取英文数据库的页面 ID
3. 修改 `blog.config.js`：

```javascript
NOTION_PAGE_ID: '中文ID,en:英文ID',
// 例如：'40a6b3c04d614c50a20be410cc859162,en:1eaad398d1458291b95401ae12f8ed8a'
```

4. 用户可以通过 `/en/` 前缀访问英文版本

### 9.2 自定义 CSS

在 `styles/index.css` 中添加自定义样式，会覆盖主题默认样式。

### 9.3 密码保护文章

在 Notion 数据库中，给某篇文章的 `password` 字段填一个密码，读者访问时就需要输入密码。

### 9.4 更新上游代码

如果原项目（tangly1024/NotionNext）有更新，你可以合并：

```bash
git remote add upstream https://github.com/tangly1024/NotionNext.git
git fetch upstream
git merge upstream/main
# 解决冲突后 commit 并 push
```

---

## 10. 常见问题

### Q: 部署后网站是空白/报错？

检查 Vercel 环境变量中 `NOTION_PAGE_ID` 是否正确。必须是数据库的页面 ID，不是普通页面的 ID。

### Q: 文章更新了但网站没变？

默认缓存 60 秒。等一分钟刷新。如果还是没变，去 Vercel Dashboard 手动 Redeploy。

### Q: 怎么修改缓存时间？

```javascript
// blog.config.js
NEXT_REVALIDATE_SECOND: 60,  // 改成你想要的秒数，越大越省资源但延迟越高
```

### Q: Notion 数据库是私有的怎么办？

需要配置 `NOTION_TOKEN_V2`（从浏览器 Cookie 中获取）和 `NOTION_ACTIVE_USER`。

获取方法：
1. 打开 Notion 网页版，按 F12 打开开发者工具
2. Application → Cookies → `token_v2` 就是你的 token
3. 在同一个 Cookie 列表找 `notion_user_id` 就是 active user

### Q: 图片加载很慢？

Notion 的图片有防盗链，项目会自动处理。如果还是慢，可以在 `conf/image.config.js` 中配置图片压缩：

```javascript
IMAGE_COMPRESS_WIDTH: 800,  // 压缩宽度
```

### Q: 本地开发时报错 "Notion page not found"？

确认 `.env.local` 中的 `NOTION_PAGE_ID` 没有多余空格或引号。

---

## 快速检查清单

部署前确认：

- [ ] Notion 数据库已复制模板
- [ ] 拿到了 NOTION_PAGE_ID
- [ ] `blog.config.js` 中修改了 AUTHOR、BIO、LINK
- [ ] 选好了 THEME
- [ ] `.env.local`（本地）或 Vercel 环境变量中配置了 NOTION_PAGE_ID
- [ ] `npm run dev` 本地预览正常
- [ ] 部署到 Vercel 成功
- [ ] （可选）绑定了自定义域名
- [ ] （可选）配置了评论系统
- [ ] （可选）配置了 AI 改写工具（`.env.notion`）
