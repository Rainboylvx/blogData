const {join,dirname}  = require('path')

const customElements = ['mjx-container'];

const catlogs = [
    'VIM',
    'Linux命令与软件',
    'program_under_linux'
]

const sidebar = {}
for(let name of catlogs) {
  sidebar['/'+name] = require(
    join('..', name,'sidebar.js')
  )
}
//sidebar['/_学习笔记'] = require('../_学习笔记/sidebar.js')


export default {
  lang: 'zh-CN',
  title: 'RainboyBlog',
  description: 'RainboyBlog',
  appearance: true,
  head: [
    ['link', { rel: "shortcut icon", href: "/favicon.ico"}],
  ],

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },

  markdown: {
    theme: 'material-palenight',
    lineNumbers: true,

    toc: { level: [1, 2,3] }
  },

  themeConfig: {
    logo:'/favicon.ico',
    siteTitle:'RainboyBlog',

    siteConfgByRoute: [
      {start:"/",title:'RainboyBlog',logo:'/favicon.ico'}
    ],

    editLink: {
      pattern: 'https://github.com/Rainboylvx/blogData/edit/master/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Rainboylvx/blogData' }
    ],

    sidebar
  } // end themeConfig

}
