const CONFIG = {
  // 首屏信息栏按钮文字
  MAGZINE_HOME_BANNER_ENABLE: true, // 首屏右上角的宣传位
  MAGZINE_HOME_BUTTON: true,
  MAGZINE_HOME_BUTTON_URL: '/about',
  MAGZINE_HOME_BUTTON_TEXT: { 'zh-CN': '关于我', en: 'About Me' },

  MAGZINE_HOME_HIDDEN_CATEGORY: '模板', //不希望在首页展示的文章分类，用英文逗号隔开

  MAGZINE_HOME_TITLE: { 'zh-CN': '认真生活，记录生活', en: 'Live fully, write it down' },
  MAGZINE_HOME_DESCRIPTION: {
    'zh-CN': '一个在美国读博的普通人，用文字记录生活感悟、旅行见闻和成长点滴。',
    en: 'A PhD student in the US, documenting life reflections, travel stories, and personal growth.'
  },
  MAGZINE_HOME_TIPS: { 'zh-CN': '生活不在别处，就在此刻。', en: 'Life is not elsewhere — it is right here, right now.' },

  // 首页底部推荐文章标签, 例如 [推荐] , 最多六篇文章; 若留空白''，则推荐最近更新文章
  MAGZINE_RECOMMEND_POST_TAG: '',
  MAGZINE_RECOMMEND_POST_COUNT: 6,
  MAGZINE_RECOMMEND_POST_TITLE: { 'zh-CN': '最近更新', en: 'Recent Updates' },
  MAGZINE_RECOMMEND_POST_SORT_BY_UPDATE_TIME: true, // 推荐文章排序，为`true`时将强制按最后修改时间倒序

  // Style
  MAGZINE_RIGHT_PANEL_DARK: process.env.NEXT_PUBLIC_MAGZINE_RIGHT_DARK || false, // 右侧面板深色模式

  MAGZINE_POST_LIST_COVER: true, // 文章列表显示图片封面
  MAGZINE_POST_LIST_PREVIEW: true, // 列表显示文章预览
  MAGZINE_POST_LIST_CATEGORY: true, // 列表显示文章分类
  MAGZINE_POST_LIST_TAG: true, // 列表显示文章标签

  MAGZINE_POST_DETAIL_CATEGORY: true, // 文章显示分类
  MAGZINE_POST_DETAIL_TAG: true, // 文章显示标签

  // 文章页面联系卡
  MAGZINE_SOCIAL_CARD: true, // 是否显示右侧，点击加入社群按钮
  MAGZINE_SOCIAL_CARD_TITLE_1: { 'zh-CN': '联系我', en: 'Contact Me' },
  MAGZINE_SOCIAL_CARD_TITLE_2: 'chu034@odu.edu',
  MAGZINE_SOCIAL_CARD_TITLE_3: { 'zh-CN': '访问个人主页', en: 'Visit Homepage' },
  MAGZINE_SOCIAL_CARD_URL: 'https://chunyuhu.com',

  // 页脚菜单
  MAGZINE_FOOTER_LINKS: {
    'zh-CN': [
      {
        name: '博客分类',
        menus: [
          { title: '生活随笔', href: '/category/生活随笔' },
          { title: '学术科研', href: '/category/学术研究' },
          { title: '技术分享', href: '/category/技术分享' }
        ]
      },
      {
        name: '关于',
        menus: [
          { title: '关于我', href: '/about' },
          { title: '个人主页', href: 'https://chunyuhu.com' },
          { title: '友情链接', href: '/links' }
        ]
      },
      {
        name: '社交',
        menus: [
          { title: 'GitHub', href: 'https://github.com/Chunyu-Hugh' },
          { title: 'LinkedIn', href: 'https://www.linkedin.com/in/chunyu-hu-249970a7' }
        ]
      }
    ],
    en: [
      {
        name: 'Categories',
        menus: [
          { title: 'Life', href: '/category/Life' },
          { title: 'Academic', href: '/category/Academic' },
          { title: 'Tech', href: '/category/Tech' }
        ]
      },
      {
        name: 'About',
        menus: [
          { title: 'About Me', href: '/about' },
          { title: 'Homepage', href: 'https://chunyuhu.com' },
          { title: 'Links', href: '/links' }
        ]
      },
      {
        name: 'Social',
        menus: [
          { title: 'GitHub', href: 'https://github.com/Chunyu-Hugh' },
          { title: 'LinkedIn', href: 'https://www.linkedin.com/in/chunyu-hu-249970a7' }
        ]
      }
    ]
  },

  // 旧版本顶部菜单
  MAGZINE_MENU_CATEGORY: true, // 显示分类
  MAGZINE_MENU_TAG: true, // 显示标签
  MAGZINE_MENU_ARCHIVE: true, // 显示归档
  MAGZINE_MENU_SEARCH: true, // 显示搜索

  MAGZINE_WIDGET_TO_TOP: true // 跳回顶部
}
export default CONFIG
