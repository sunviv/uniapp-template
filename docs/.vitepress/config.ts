import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'uniapp 快速开发模版',
  description: 'uniapp 快速开发模版',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '开发指南', link: '/guides/start.md' },
      { text: '示例页面', link: '/examples' },
    ],

    sidebar: {
      '/guides/': [
        {
          text: '',
          items: [
            { text: '快速开始', link: '/guides/start.md' },
            { text: '项目结构布局', link: '/guides/project-layout.md' },
          ],
        },
      ],
      '/examples/': [
        {
          text: '数据筛选',
          items: [
            { text: '示例1', link: '/examples/examples.md' },
            { text: '示例2', link: '/examples' },
            { text: '示例3', link: '/examples' },
          ],
        },
        {
          text: '数据展示',
          items: [
            { text: '示例1', link: '/markdown-examples' },
            { text: '示例2', link: '/markdown-examples' },
            { text: '示例3', link: '/markdown-examples' },
          ],
        },
        {
          text: '数据录入',
          items: [
            { text: '示例1', link: '/markdown-examples' },
            { text: '示例2', link: '/markdown-examples' },
            { text: '示例3', link: '/markdown-examples' },
          ],
        },

      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sunviv/uniapp-template' },
    ],
  },
})
