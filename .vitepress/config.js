const {join,dirname}  = require('path')
import mathjax3 from 'markdown-it-mathjax3';
import markdownEjs from './markdown-plugin/ejs'
import extend_fence from './markdown-plugin/extend_fenc'

const customElements = ['mjx-container'];

const catlogs = ['_学习笔记']
//const sidebar = {}
//for(let name of catlogs) {
//sidebar['/'+name] = require(
//join(dirname(import.meta.url),'..', name,'sidebar.js')
//)
//}
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

    toc: { level: [1, 2,3] },
    config: (md) => {
      md.use(markdownEjs);
      md.use(extend_fence);
      md.use(mathjax3);
    }
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

    sidebar : {
      '/学习笔记' :
      [
        {
          text: '学习笔记',
          collapsible: true,
          //collapsed: true,
          items : [
            { text: 'Learn Vim Script The Hard Way', link: '/_学习笔记/learn_vimscript_the_hard_way.md' },
          ]
        }
      ]
    } // end sidebar
  } // end themeConfig

}
