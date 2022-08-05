## 静态页面
```
server {
    listen : 80 ;
    server_name : 你想要转发的
    root
    error_page {}
    lscrollToocation / {
    }
}
```
https://www.cnblogs.com/zy-tester/p/9805012.html

最常用的，将域名转发到本地另一个端口上
```
server{
  listen 80;
  server_name  tomcat.shaochenfeng.com;
  index  index.php index.html index.htm;

  location / {
    proxy_pass  http://127.0.0.1:8080; # 转发规则
    proxy_set_header Host $proxy_host; # 修改转发请求头，让8080端口的应用可以受到真实的请求
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```
这样访问 http://tomcat.shaochenfeng.com 时就会转发到本地的 8080 端口

## 学习的教程

 - https://www.yiibai.com/nginx/beginners_guide.html
 - https://juejin.im/post/5bd7a6046fb9a05d2c43f8c7
