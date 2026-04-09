/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* ===== Notion-inspired Design System ===== */

      /* 暗色模式：表面阶梯，不再是纯黑 */
      .dark body {
        background-color: #1a1a1a;
      }

      /* 排版层级系统 */
      h1, h2, h3, h4 {
        font-family: 'Noto Serif SC', 'Bitter', 'PingFang SC', serif;
        color: rgba(0, 0, 0, 0.95);
      }
      .dark h1, .dark h2, .dark h3, .dark h4 {
        color: #f0efee;
      }

      /* Display: 大标题 letter-spacing 压缩 */
      h1 { letter-spacing: -0.04em; }
      h2 { letter-spacing: -0.02em; }
      h3, h4 { letter-spacing: -0.01em; }

      /* 正文色：暖黑而非纯黑 */
      body {
        color: rgba(0, 0, 0, 0.88);
      }
      .dark body {
        color: #d4d3d0;
      }

      /* Whisper border：全局柔和分割线 */
      hr {
        border-color: rgba(0, 0, 0, 0.08);
      }
      .dark hr {
        border-color: rgba(255, 255, 255, 0.08);
      }

      /* 链接：统一使用强调蓝 */
      #theme-magzine a:not(.no-accent) {
        transition: color 0.2s ease, opacity 0.2s ease;
      }

      /* Focus ring：全局可访问性 */
      #theme-magzine button:focus-visible,
      #theme-magzine a:focus-visible,
      #theme-magzine input:focus-visible {
        outline: 2px solid #0075de;
        outline-offset: 2px;
      }

      /* 自定义滚动条样式 */
      html::-webkit-scrollbar {
        width: 8px;
      }

      html::-webkit-scrollbar-track {
        background-color: transparent;
      }

      html::-webkit-scrollbar-thumb {
        background: #a39e98;
        border-radius: 9999px;
      }
      html::-webkit-scrollbar-thumb:hover {
        background: #615d59;
      }

      .dark html::-webkit-scrollbar-thumb {
        background: #363634;
      }
    `}</style>
  )
}

export { Style }
