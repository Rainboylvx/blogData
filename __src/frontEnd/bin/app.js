import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';
import MyVirtualBlogDataPlugin from './virtualDataModule.js';
import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'
import {Analyze,recursiveMenu,MenuInterface} from '../cgi/analy.js'
import {md_json_path_convert,render_to_json_file,deal_menu_data} from '../cgi/markdown.js'


// 1. 得到当前运行的路径
const cwd = process.cwd()
    // 当前文件的路径
const __dirname = fileURLToPath(new URL('.', import.meta.url))

let blogData = Analyze(cwd)

// 对blogData进行处理,渲染成json文件
deal_menu_data(cwd,'dist',blogData)


;(async () => {
  await build({

    root: path.resolve(__dirname, './'),
    base: '/',
    plugins: [vue(),svgLoader(),MyVirtualBlogDataPlugin(blogData)],
    
    build: {
        // lib:{
        //     entry: path.join(__dirname,'../src/main.js'),
        //     name:'webApp',
        //     fileName: (format) => `main.${format}.js` // 打包后的文件名
        // },
        outDir: path.join(cwd,'dist'),
      rollupOptions: {
          input : path.join(__dirname,"../src/main.js")
      },
    },
  })
})()
