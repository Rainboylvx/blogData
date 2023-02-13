//#!/usr/bin/env node
//desc: 分析指定目录下的文件,生成需要的数据
import {readFileSync} from 'fs'
import * as fs from 'fs'
import {join,relative,extname, basename} from 'path'
import {ensureDirSync} from 'fs-extra'
// import * as yamlFront from "yaml-front-matter";
import glob from 'glob';
// import yamlFront from "yaml-front-matter";
import GrayMatter from 'gray-matter'

function filename_remove_ext(filename:string) :string{
    if( /\/$/.test(filename))
        filename = filename.replace(/\/$/,'')
    return filename.replace( extname(filename),'')
}

// 递归事件目录
// 路过

// 扫描目录后形成所目录结构数据的interface
export interface MenuInterface{
    title:string,
    path:string,
    out_path?:string
    children?: MenuInterface[]
}

class AnalyzeBlogDataClass {
    search_dir:string;
    output_prefix:string
    ignores:string[]

    constructor(search_dir:string, output_prefix:string = "dist" ,ignores : string[]= []) {
        this.search_dir = search_dir
        this.output_prefix = output_prefix
        this.ignores = ignores
    }

    
    //得到path路径下的md文件
    Glob_md(path:string) {
        return glob.glob.sync("[^_]*.md",{ignore:this.ignores,cwd:path,nodir:true})
    }

    //得到path路径下的 dir 目录
    Glob_dir(path:string) {
        return glob.glob.sync("*/",{ignore:this.ignores,cwd:path})
    }

    //扫描一个md文件
    do_for_one_md_file(path :string,filename:string): MenuInterface {
        let absolute_file_path = join(path,filename)
        let relative_file_path = relative(this.search_dir,absolute_file_path)
        let out_path = join(this.search_dir,this.output_prefix,basename(relative_file_path))
        let relative_out_path = relative(this.search_dir,out_path)

        //1. read file content
        let content = fs.readFileSync(absolute_file_path,{encoding:'utf8'})

        //2. get front yaml
        // let yaml = yamlFront.loadFront(content)
        let yaml = GrayMatter(content)

        //3. get file info
        return {
            title: yaml.data.title || filename_remove_ext(filename),
            path: relative_file_path,
            out_path : relative_out_path
        }
    }


    // 返回值 bool 
    // if 返回 true ,则说明返回无内容
    work(path:string,title:string,object:MenuInterface) : Boolean {

        object.title = filename_remove_ext(title)
        console.log("path:",relative(this.search_dir,path) )

        console.log("====md_files====")
        let md_files = this.Glob_md(path);
        if( md_files.length ) 
            object.children = []
        console.log(md_files)
        for( let md_file of md_files) {
            let a:MenuInterface = this.do_for_one_md_file(path, md_file);
            object.children!.push(a);
        }
        console.log( object )

        console.log("====dirs====")
        let dirs = this.Glob_dir(path)
        console.log( dirs )
        console.log( dirs.length )
        if(dirs.length){
            console.log('yes')
            if(!object.children ) object.children = [];
        }
        //没有子文件夹的情况下,通过md_file来判断是否空
        else { 
            // return true; //没有内容
            return !(object.children)
        }

        console.log( dirs )
        for( let dir of dirs){
            console.log("-->", dir )
            let new_path = join(path,dir);
            let a :MenuInterface = { title:'', path:''}
            let bret = this.work(new_path,dir,a)
            console.log('bret->',bret )
            console.log('bret->',a)
            if( bret == false) // 扫描这个dir,不空
            {

                //只有一个孩子,证明此时是一个单一文件夹,里面只有一个md
                if( a.children!.length == 1) {
                    object.children!.push({
                        ...a.children![0],
                        title:a.title
                    })
                }
                else
                    object.children.push(a) // 作为当前的子孩子

            }
        }
        return !(object.children)
    }

}


export const Analyze = (search_dir:string):MenuInterface[] => {

    let results:MenuInterface[] = []

    //最上级过滤的文件夹
    const ignores = ['__src/','node_modules/','bin/','dist/','public/','images/']

    let AnalyzeBlogData  = new AnalyzeBlogDataClass(search_dir,'dist',ignores)

    let first_leve_dirs = glob.glob.sync("*/",{ignore:ignores,cwd:search_dir})

//1 遍历的结构
for( let dir of first_leve_dirs) {
    let _path = join(search_dir,dir);
    let a:MenuInterface = {title:'',path:''}
    AnalyzeBlogData.work(_path ,dir,a)
    results.push(a)
}

// let json_result = JSON.stringify(results,null,4)
// fs.writeFileSync(join(output_prefix,'data.json'), json_result,{encoding:'utf8'})
return results
}

/** 
 * 对Analyze 分析出来的数据,进行递归的处理
 * */
export const recursiveMenu = (data : MenuInterface[],fn:(d:MenuInterface)=>void) =>{
    for(let i = 0 ;i < data.length ;i++) {
        if( data[i].children )
            recursiveMenu(data[i].children!,fn)
        else {
            fn(data[i]) //处理
        }
    }
}
