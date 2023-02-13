/* *
 * cgi程序,配合 nginx + fcgiwrap + spwan-cgi 使用
 * 作用: 根据传递过来的env参数,渲染对应的markdown
 * */

//[javascript - How to resolve Node.js ES6 (ESM) Modules with the TypeScript Compiler (TSC). TSC doesn't emit the correct file-ext - Stack Overflow](https://stackoverflow.com/questions/44979976/how-to-resolve-node-js-es6-esm-modules-with-the-typescript-compiler-tsc-tsc)

import {Render as mdRender,ejs_render,md_render_with_yamlheader} from './markdown.js'
import {existsSync,readFileSync} from 'fs'
import { join } from 'path'
import * as node_qs from 'node:querystring'
import yamlFront from "yaml-front-matter";



const respone_type_text = 'text/plain'
const respone_type_json = 'application/json'

function respond(body:string, { status = 200, contentType = respone_type_json } = {}) {
  process.stdout.write(`\
Status: ${status}\r\n\
Content-Type: ${contentType}\r\n\
\r\n\
${body}\r\n\
`)
  process.exit()
}

function respond_error( msg:string,error_code:number) {
    let res = JSON.stringify({
        code:-1,
        msg
    })
    respond(msg,{status:error_code})
}

function respond_right(msg:string) {
    let res = JSON.stringify({
        code:0,
        __content:msg
    })
}


// 1. 得到需要的环境变量
// const query_string = process.env['QUERY_STRING']
const request_uri = process.env['REQUEST_URI']
// fastcgi_param BLOG_ROOT xxxxx
const blog_root = process.env['BLOG_ROOT']

// 对query 进行分析,得到相应的数据
if( !request_uri) {
    respond_error('需要携带有请求地址,如path/to/foo.md',400)
}

if( !blog_root) {
    respond_error('nginx服务器没有设置fastcgi_param BLOG_ROOT /path/to/blog_root',500)
}

//var qs = node_qs.parse(query_string!)
//if( !qs.md ){
//    respond_error('querystring需要携带md的信息,如?md=/path/to/foo.md',400)
//}

// console.log( decodeURIComponent(encodedURIComponent) )
// 2. 调用ejs渲染,得到md_text
const md_file_path = join(blog_root!,decodeURIComponent(<string>request_uri))

if( !existsSync(md_file_path) ) {
    respond_error(`${md_file_path} 没有找到`, 404)
}

const md_text = ejs_render(md_file_path)

// 产生对应的markdown

var md_html_with_yamlheader = md_render_with_yamlheader(md_text)
respond(JSON.stringify({
    code:0,
    data : md_html_with_yamlheader
}))

