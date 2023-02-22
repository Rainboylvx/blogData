//markdown 渲染
import MarkdownIt from "markdown-it";

//[javascript - How to resolve Node.js ES6 (ESM) Modules with the TypeScript Compiler (TSC). TSC doesn't emit the correct file-ext - Stack Overflow](https://stackoverflow.com/questions/44979976/how-to-resolve-node-js-es6-esm-modules-with-the-typescript-compiler-tsc-tsc)

import { join,extname ,dirname} from 'path'
import {existsSync,readFileSync,writeFileSync} from 'fs'
// import yamlFront from "yaml-front-matter";
import GrayMatter from 'gray-matter'
import {ensureDirSync,emptyDirSync as _emptyDirSync} from 'fs-extra'
import * as ejs from 'ejs'
import { recursiveMenu ,MenuInterface} from './analy'

import anchor from "markdown-it-anchor";
import kbdplugin from "markdown-it-kbd";
import attrs from "markdown-it-attrs";
import emoji from 'markdown-it-emoji';
import toc from "markdown-it-toc-done-right";
import mathjax3 from "markdown-it-mathjax3"


export const emptyDirSync = (d:string) => _emptyDirSync(d)

// var re = new MarkdownIt()
// console.log( re.render('# hel') )

export const createMarkdownRenderer = (options= {},base = '/') => {

    const md = MarkdownIt({
        html :true,
        linkify:true,
        // highlight : options.highlight || 
        ...options
    })

    md.use(anchor, {})
    .use(attrs)
    .use(toc,{level:[2,3]})
    .use(emoji)
    .use(kbdplugin)
    .use(mathjax3)

    return md
}

//默认的markdown
export const __MD = createMarkdownRenderer();

export const Render = ( md_text:string ):string => {
    return __MD.render(md_text)
}


// const rFrontMatter = /^(-{3,}|;{3,})[\n,\r]{1,2}([\s\S]+?)[\n,\r]{1,2}\1(?:$|[\n,\r]{1,2}([\s\S]*)$)/;
// export const fetch_md = async (src : string) => {
//     return myAxios({
//         url: src,
//         method: 'get',
//     }).then( ({data}) => {
//         console.log("1---")
//         console.log(data)
//
//         if( rFrontMatter.test(data)) {
//             let match = data.match(rFrontMatter);
//             return __MD.render( match[3] || '')
//         }
//         return __MD.render( data  )
//     })
// }


//对指定的md文件进行ejs渲染
export const ejs_render =  (md_file_path:string) =>
    ejs.render(readFileSync(md_file_path,{encoding:'utf8'}),
                        {} , // data TODO
                        //options
                        {
                            filename:md_file_path
                        });

export interface md_html_with_yamlheader_interface {
    __content:string,
    [key:string]:any
}

// 对给定的string 渲染出来带有yaml_header的md渲染后html数据
export const md_render_with_yamlheader = (md_text:string):md_html_with_yamlheader_interface => {
    const yamlLoad = GrayMatter(md_text)
    const md_html = Render(yamlLoad.content)

    return {
        data : {
            ...yamlLoad.data
        },
        __content:md_html
    }
}


// 路径转换
// org_path
// out_dir
// 
// org_path a/foo.md
// out_dir dist
// --> dist/a/foo.json

export const md_json_path_convert = (org_path:string,out_dir:string) =>{
    let ext = extname(org_path)
    return join(out_dir,org_path.replace(ext, '.json'))
}



/** 
 * 把对应的md文件渲染到指定的目录下的json文件
 * src: 原md 文件路径
 * dst: 输出的json文件路径
* */
export const render_to_json_file = (src:string,dst:string)=>{
    if( extname(src).toLowerCase() !== '.md' )
        return

    //1.保证路径的存在
    ensureDirSync(dirname(dst));
    console.log('org->', src )
    console.log('_.', dst )
    console.log('_.', dirname(dst) )

    let md_html_with_yamlheader = md_render_with_yamlheader(
        ejs_render(src)
    );
    //2.写入
    writeFileSync(dst,JSON.stringify(md_html_with_yamlheader),{encoding:'utf8'})

}


export const deal_menu_data = (search_dir:string,outDir:string,search_data:MenuInterface[]) :void =>{

    //清空
    emptyDirSync(join(search_dir,outDir))

    // 对blogData进行处理
    
    recursiveMenu(search_data,(d:MenuInterface) => {

        let org_path = d.path
        let md_json_path = md_json_path_convert(org_path,outDir)

        render_to_json_file(
            join(search_dir,d.path),
            join(search_dir,md_json_path)
        )
    })
}
