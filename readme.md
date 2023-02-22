# 我的blog 

这里是我的Blog(Rainboy)

http://blog.roj.ac.cn

## 使用

1. clone 本仓库
2. `yarn install`
3. 查看 `yarn dev`
4. 编译 `yarn build`



## 思路

- 使用vue作为 side-nav(侧边目录树)
- localStorage 保留 


工具链

- 文章检索[lunr.js](https://github.com/olivernn/lunr.js/)
- markdown-it,markdown渲染  +

## 我

![Rainboy](https://github.com/rainboylvx.png)

## 我的目的

写了博客,很长时间了,其时blog对我来就是一个笔记,方便我需要的时候来查找.

用过hexo,但是不方便查找,对我来说太复杂,

也用了vitepress,源码太复杂,看不懂,不是我的习惯(看不懂源码的东西少用)

还是自己实现一个简单的,静态blog生成的项目吧

Demo : https://blog.roj.ac.cn

## 使用方式


创建一个自己的blog,目录如下

```
+myblog
├── 学习笔记
│   ├── 笔记1.md
│   └── 笔记2.md
└── 源码分析
    └── nginx
        └── index.md
```

安装staticWebGen

```
yarn global add https://github.com/rbookr/staticBlogGen
```

使用

```
cd myblog
staticWebGen 
```

就会生成一个`myblog/dist`目录

配置文件 `staticWebGen.config.yaml`

```plaintext
# 忽略的目录
ignores:
  - "dist/" # 不扫描dist/目录

# 忽略的md文件
ignores_md:
  - "_*" # 以_开头的md文件
  - reg1
```


```
python3 -m http.server 8888
```
访问`http://127.0.0.1:8888/dist/index.html`,查看结果


## 渲染方式


有两种方式,

1. 在创建时,把每一个md文件渲染,优点,
  - 部署网站后,访问速度快
  - 可以直接静态部署,不需要服务器
  缺点
  - 如果md文件多,可以渲染在时间长(基本上你应该没有1万个以上的md文件),
2. 懒惰渲染
  - 部署网站后,访问速度慢
  - 需要服务器
  缺点
  - 如果md文件多,可以渲染在时间小(基本上你应该没有1万个以上的md文件),



### nginx部署

#### 1. 创建时生成json文件的部署方式

nginx配置
```plaintext
server  {

  listen 8000;

  root /path/to/blog;
  index dist/index.html;

# 如果请求md文件,就去找json文件
  location ~ ^/(.*)\.md$ {
    default_type application/json;
    try_files /dist/$1.json =404;
  }

# 如果请求html文件,那么选去dist下寻找
  location ~ .*\.html {
    try_files /dist/$uri $uri =404;
  }
}

```


#### 2.cgi的部署方式

```plaintext
sudo apt install nginx fcgiwrap spwan-cgi
git clone --depth 1 https://github.com/rbookr/staticBlogGen
cd staticBlogGen
yarn install
yarn build
```

启动`spwan`程序

```
/usr/bin/spwan-cgi -f /usr/bin/fcgiwrap -p 8888
```

- 创建一个`/etc/nginx/conf.d/blog.conf`文件,拷贝下面的内容
- 当然也可以直接下面的内容复制到`/etc/nginx/nginx.conf`里正确的位置

```
server {
    listen 80; # 监听的端口
    server_name 你的blog域名,例如 myblog.com; # 写你的blog域名

    location = / {
      root /path_to_blog/dist; # 你的上传blog的目录
      index index.html;
      try_files $uri/index.html $uri;
    }

    location ~ ^/assets { 
        root /path_to_blog/dist; # assets资源的访问
    }

    location / {
      root /path_to_blog;
    }

    # markdown 渲染的cgi程序
	location ~ .*\.md$ {
		root /home/rainboy/mycode/RainboyDefault/staticWebGen/cgi;
		fastcgi_pass 127.0.0.1:8081;
		fastcgi_index  index.cgi;
		fastcgi_param  SCRIPT_FILENAME    $document_root/staticWebGen.cgi;
		fastcgi_param  BLOG_ROOT /home/rainboy/mycode/RainboyDefault/blogData/;
		fastcgi_param  REQUEST_URI        staticWebGen.cgi;

		fastcgi_param  REQUEST_URI        $request_uri;
		fastcgi_param  REMOTE_ADDR        $remote_addr;
		fastcgi_param  REMOTE_PORT        $remote_port;
		fastcgi_param  SERVER_ADDR        $server_addr;
		fastcgi_param  SERVER_PORT        $server_port;
		fastcgi_param  SERVER_NAME        $server_name;
		#include fastcgi.conf;
	}
}
```

## 我需要的功能

- 可以自定义渲染markdown的样式,`markdown-it`,可以写插件
- 目录树对文章进行分类,而不是列表,方便查找
- 前端可以查找文章,lur.js
- tab 可以现时打开多篇文章

## 我的思路

使用vue3+vite实现

其它项目需要用的时候,直接使用编译好的js文件

流程

数据格式

```
[
  {
    "title":"目录1"
    items:[
      {
        title:"article title1",
        ext:"md" | "html"
        org: org_path
        path:"output/hash.html"
        children:[]
      }
      ...
    ]
  },
  ...
]
```

使用rsync上传整个blog目录

```
cd myblog
rsync -avzP --delete . MYPS:/path_to_blog
```

## 如果调试

```
cd BlogData 

python3 -m http.server 8888
```

```
cd this_project
yarn dev
```

## markdown-it

所用到的插件:

- 添加属性 [arve0/markdown-it-attrs: Add classes, identifiers and attributes to your markdown with {} curly brackets, similar to pandoc's header attributes](https://github.com/arve0/markdown-it-attrs) 
- 为 markdown-it 设计的标题锚点生成. [markdown-it-anchor/README-zh\_CN.md at master · valeriangalliat/markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor/blob/master/README-zh_CN.md)
- Renders `[[x]]` as `<kbd>x</kbd>` [jGleitz/markdown-it-kbd: markdown-it plugin for keystrokes. Renders [[x]] as <kbd>x</kbd>](https://github.com/jGleitz/markdown-it-kbd)
- parser, adding emoji & emoticon syntax support. [markdown-it/markdown-it-emoji: Emoji syntax plugin for markdown-it markdown parser](https://github.com/markdown-it/markdown-it-emoji)
- TOC work with markdown-it-anchor [nagaozen/markdown-it-toc-done-right: A table of contents (TOC) plugin for Markdown-it with focus on semantic and security. Made to work gracefully with markdown-it-anchor.](https://github.com/nagaozen/markdown-it-toc-done-right)

## 感谢下面的文章给我提供的思路


- lunr.js 提供前端搜索功能
- 提供了sideNavTree实现的思路 [hyounoo/v-treeview: A treeview component for Vue.js2](https://github.com/hyounoo/v-treeview)
- [外部js调用vue事件方法 - MELANCHOLYS - 博客园](https://www.cnblogs.com/melancholys/p/16547793.html)
- 给我提供了tabbar实现的思路 [vue 后台管理系统实现页面多tab，右键菜单关闭、刷新等功能 - 简书](https://www.jianshu.com/p/78d09060bbb0)
- [vite打包lib库 - 掘金](https://juejin.cn/post/7073646687968821256)
- [Dealing with SVG icons in Vue + Vite - DEV Community 👩‍💻👨‍💻](https://dev.to/geowrgetudor/dealing-with-svg-icons-in-vue-vite-an9)
- [vuejs3 - How to call a custom Vue 3 method from outside vue app in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/64758293/how-to-call-a-custom-vue-3-method-from-outside-vue-app-in-javascript)
  还要加`defineExpose`才可以调用暴露的方法



为什么我用vite+ts ,import vue 一直有Error TS7016
https://github.com/vuematerial/vue-material/issues/530

ts 如何在window上添加数据
