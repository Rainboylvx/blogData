// import axios from 'axios'
// import cheerio from 'cheerio'
// import {extname,join } from 'path'
// import {existsSync,createWriteStream,readdirSync} from 'fs'
const axios = require("axios")
const cheerio = require("cheerio")
const {extname,join } = require('path')
const {existsSync,createWriteStream,readdirSync} = require('fs')


// [Alternatives to \_\_dirname in Node.js with ES modules - LogRocket Blog](https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/)
// import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//如果staticWebGen读取了可执行的程序
// 如 index.js 等,那会就会执行它
// child_process.execSync( cwd:)
// 并会得到一个返回的JSON的结果做为值
// 返回的值的格式
//
// {
//  title:"xxx"
//  path:
//  out_path:
//  children: [
//        ......
//  ]
// }


//参考: https://anotherdayu.com/douban/

let __headers = {headers:{'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'}}

// API 得到一个网页的内容
async function get_html(link){
    return axios.create({headers:__headers}).get(link).then( Response => Response.data)
}

// API 下载一个图片
//https://futurestud.io/tutorials/download-files-images-with-axios-in-node-js

//功能: 给指定的double id, 来下载douban的图片
class Douban {
    
    __init__(type,id) {
        this.type = type
        this.id = id

        // if( this.type.toLowerCase() === 'book')
        //     this.link = `https://book.douban.com/subject/${this.id}/`
        // else if ( this.type.toLowerCase() == 'movie')
        //     this.link = `https://movie.douban.com/subject/${this.id}/`
        // else if ( this.type.toLowerCase() === 'game')
        //     this.link = `https://www.douban.com/game/${this.id}/`
        // console.log( this.link )

    }

    constructor(link) {
        // console.log( link )
        this.link = link
        // book https://book.douban.com/subject/36152943/
        let bookReg = /https:\/\/book.douban.com\/subject\/(\d+)\//
        let movieReg = /https:\/\/movie.douban.com\/subject\/(\d+)\//
        let gameReg= /https:\/\/www.douban.com\/game\/(\d+)\//
        let __reg__ = null;

        if( bookReg.test(link) ){
            this.type = 'book'
            __reg__ = bookReg
        }
        else if ( movieReg.test(link)) {
            this.type = 'movie'
            __reg__ = movieReg
        }
        else if ( gameReg.test(link)) {
            this.type = 'game'
            __reg__ = gameReg
        }
        let match = link.match(__reg__)
        this.id = match[1]

        // console.log( this.type )
        // console.log( this.id)
    }

    //下载图片
    async downloadImage() {
        let html = await get_html(this.link)
        let $  = cheerio.load(html)
        let img_src = $('#mainpic > a > img').attr('src')
        // console.log( img_src )
        let resolve_out_img = join('images',this.img_name(extname(img_src)))
        let out_img_path = join(__dirname,resolve_out_img)
        if( ! existsSync(out_img_path) ) {
            const writer = createWriteStream(out_img_path)

            const response = await axios({
                url:img_src,
                method: 'GET',
                responseType: 'stream',
                headers:__headers
            })

            response.data.pipe(writer)

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve(resolve_out_img))
                writer.on('error', reject)
            })
        }
        return resolve_out_img
    }
    //得到相应的信息
    getInfo() {}

    //
    img_name(ext) {
        return `book_${this.id}${ext}`
    }
}

// var a = new Douban('https://movie.douban.com/subject/4811774/')
// a.downloadImage()
(async function() {


    let files = readdirSync(__dirname)
    for( let file of files) {
        if( extname(file) == '.js' && file !== 'index.js') {
            let datas = require('./' + file)
            let new_data = datas.map( async (data) => {
                // console.log( douban )
                // let _douban_instance = new Douban()
                let douban = data.douban
                let img = await (new Douban(douban))
                    .downloadImage()
                    .then( (img) => {
                        console.log(`${douban} img download ok : ${img}`)
                        return img
                    })
                return {...data,img}
            })
            new_data = await Promise.all(new_data)
            console.log( new_data )
            // 创建 index.ejs
            // console.log( data)
            // let _douban = new Douban(data.douban)
            // _douban.downloadImage().then( (img) => console.log(`${data.douban} img download ok : ${img}`))
        }
    }
})()
