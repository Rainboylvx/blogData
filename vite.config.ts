import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader';
import MyVirtualBlogDataPlugin from './tools/virtualDataModule.js';
import node_qs from 'node:querystring'

import {Analyze,recursiveMenu,MenuInterface} from './tools/analy'

import {md_json_path_convert,render_to_json_file,emptyDirSync,deal_menu_data} from './tools/markdown'

var search_dir = '/home/rainboy/mycode/RainboyDefault/blogData'
var search_data = Analyze(search_dir)
let outDir = 'dist'

//清空,对blogData进行处理
deal_menu_data(search_dir,outDir,search_data)

var proxy = {
  target: {
    protocol: 'http:',
    //host: '192.168.8.247',
    host: '127.0.0.1',
    port: 8000,
    // rewrite: (path:string) => '/staticWebGen.cgi?' + node_qs.encode({md:path}) ,
    // rewrite: (p:string) => {return md_json_path_convert(p,outDir)}
    //pfx: fs.readFileSync('path/to/certificate.p12'),
    //passphrase: 'password',
  },
    changeOrigin: true,
    //rewrite: (p:string) => md_json_path_convert(p,outDir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),svgLoader(),MyVirtualBlogDataPlugin(search_data)],
    // build:{
    //     lib:{
    //         entry: 'tools/markdown_cgi.ts',
    //         name:'webApp',
    //         fileName: (format) => `markdown-cgi.${format}.js` // 打包后的文件名
    //     }
    // },
  server: {
    proxy: {
      '^.*\.md': proxy
    }
  }
})
