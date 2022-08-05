
import mathjax3 from 'markdown-it-mathjax3';
import markdownEjs from './markdown-plugin/ejs'
import extend_fence from './markdown-plugin/extend_fenc'

const customElements = ['mjx-container'];

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
    }

  }

}
