import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader';
import MyVirtualBlogDataPlugin from './__src/tools/virtualDataModule.js';
import node_qs from 'node:querystring'

import * as url from 'url'

import.meta.env = import.meta.env  || {}
import.meta.env.outDir = 'dist'


import {Analyze,recursiveMenu,MenuInterface} from './__src/tools/analy'

import {md_json_path_convert,render_to_json_file,emptyDirSync,deal_menu_data} from './__src/tools/markdown'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

var search_dir = __dirname
var search_data = Analyze(search_dir)
let outDir = import.meta.env.outDir

//清空,对blogData进行处理
deal_menu_data(search_dir,outDir,search_data)
render_to_json_file(path.join(__dirname,'readme.md'),path.join(outDir,'readme.json'))

var proxy = {
  // target: {
  //   protocol: 'http:',
  //   //host: '192.168.8.247',
  //   host: '127.0.0.1',
  //   port: 8000,
  //   // rewrite: (path:string) => '/staticWebGen.cgi?' + node_qs.encode({md:path}) ,
  //   // rewrite: (p:string) => {return md_json_path_convert(p,outDir)}
  //   //pfx: fs.readFileSync('path/to/certificate.p12'),
  //   //passphrase: 'password',
  // },
    // changeOrigin: true,
    // rewrite: (p:string) => md_json_path_convert(p,outDir)
}

// https://vitejs.dev/config/
export default defineConfig({
  //root:path.resolve(__dirname,'./__src/frontEnd'),
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
      // '^.*\.md': proxy
    }
  }
})
