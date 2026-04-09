const BLOG = require('./blog.config')
const { fontFamilies } = require('./lib/utils/font')

module.exports = {
  content: [
    './pages/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './themes/**/*.js'
  ],
  darkMode: BLOG.APPEARANCE === 'class' ? 'media' : 'class', // or 'media' or 'class'
  theme: {
    fontFamily: fontFamilies,
    screens: {
      sm: '540px',
      // => @media (min-width: 576px) { ... }
      md: '720px',
      // => @media (min-width: 768px) { ... }
      lg: '960px',
      // => @media (min-width: 992px) { ... }
      xl: '1140px',
      // => @media (min-width: 1200px) { ... }
      '2xl': '1536px'
    },
    container: {
      center: true,
      padding: '16px'
    },
    extend: {
      colors: {
        day: {
          DEFAULT: BLOG.BACKGROUND_LIGHT || '#ffffff'
        },
        night: {
          DEFAULT: BLOG.BACKGROUND_DARK || '#111827'
        },
        hexo: {
          'background-gray': '#f5f5f5',
          'black-gray': '#101414',
          'light-gray': '#e5e5e5'
        },
        // Notion-inspired warm neutral palette
        warm: {
          white: '#f6f5f4',   // 暖白底色，交替段落背景
          dark: '#31302e',    // 暖色深色文字
          500: '#615d59',     // 次要文字
          300: '#a39e98'      // 占位符/禁用
        },
        accent: {
          DEFAULT: '#0075de', // Notion Blue — 唯一强调色
          dark: '#005bab',    // hover / active
          light: '#f2f9ff',   // badge 背景
          text: '#097fe8'     // badge 文字
        },
        // 暗色表面阶梯
        surface: {
          1: '#1a1a1a',       // 最深背景
          2: '#222221',       // 面板/sidebar
          3: '#2c2c2b',       // 卡片/浮层
          4: '#363634'        // hover 提升
        },
        // 保留兼容
        'dark-700': '#090e34b3',
        dark: {
          DEFAULT: '#111928',
          2: '#1F2A37',
          3: '#374151',
          4: '#4B5563',
          5: '#6B7280',
          6: '#9CA3AF',
          7: '#D1D5DB',
          8: '#E5E7EB'
        },
        primary: '#0075de',
        'blue-dark': '#005bab',
        secondary: '#0075de',
        'body-color': '#615d59',
        'body-secondary': '#a39e98',
        warning: '#FBBF24',
        stroke: '#DFE4EA',
        'gray-1': '#F9FAFB',
        'gray-2': '#F3F4F6',
        'gray-7': '#CED4DA'
      },
      maxWidth: {
        side: '14rem',
        '9/10': '90%',
        'screen-3xl': '1440px',
        'screen-4xl': '1560px'
      },
      borderRadius: {
        micro: '4px',
        standard: '6px',
        card: '12px',
        panel: '16px',
        pill: '9999px'
      },
      boxShadow: {
        // Notion 风格：多层微透明叠加
        'notion-sm': '0px 0.175px 1.04px rgba(0,0,0,0.01), 0px 0.8px 2.93px rgba(0,0,0,0.02), 0px 2px 7.85px rgba(0,0,0,0.027), 0px 4px 18px rgba(0,0,0,0.04)',
        'notion-md': '0px 1px 3px rgba(0,0,0,0.01), 0px 3px 7px rgba(0,0,0,0.02), 0px 7px 15px rgba(0,0,0,0.02), 0px 14px 28px rgba(0,0,0,0.04)',
        'notion-lg': '0px 1px 3px rgba(0,0,0,0.01), 0px 3px 7px rgba(0,0,0,0.02), 0px 7px 15px rgba(0,0,0,0.02), 0px 14px 28px rgba(0,0,0,0.04), 0px 23px 52px rgba(0,0,0,0.05)',
        // 保留原有兼容
        input: '0px 7px 20px rgba(0, 0, 0, 0.03)',
        form: '0px 1px 55px -11px rgba(0, 0, 0, 0.01)',
        pricing: '0px 0px 40px 0px rgba(0, 0, 0, 0.08)',
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
        testimonial: '0px 10px 20px 0px rgba(92, 115, 160, 0.07)',
        'testimonial-btn': '0px 8px 15px 0px rgba(72, 72, 138, 0.08)',
        1: '0px 1px 3px 0px rgba(166, 175, 195, 0.40)',
        2: '0px 5px 12px 0px rgba(0, 0, 0, 0.10)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
