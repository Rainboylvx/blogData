目的: 有时候，可能有这样一种情况：即通过访问一个 http 请求，运行一下某台远程机器上的一个 shell 脚本，比如：用来启动一个测试，用来发送一个邮件，或者短信通知一下管理员，诸如此类的一个任务，等等；


什么是cgi：

Common Gateway Interface，简称CGI。在物理上是一段程序，运行在服务器上，提供同客户端HTML页面的接口。（百度百科）

CGI是一种协义,规定了应该传递的格式

什么是fastcgi?

> 那么CGI相较于Fastcgi而言其性能瓶颈在哪呢？CGI针对每个http请求都是fork一个新进程来进行处理，处理过程包括解析php.ini文件，初始化执行环境等，然后这个进程会把处理完的数据返回给web服务器，最后web服务器把内容发送给用户，刚才fork的进程也随之退出。 如果下次用户还请求动态资源，那么web服务器又再次fork一个新进程，周而复始的进行。而Fastcgi则会先fork一个master，解析配置文件，初始化执行环境，然后再fork多个worker。当请求过来时，master会传递给一个worker，然后立即可以接受下一个请求。这样就避免了重复的劳动，效率自然是高。而且当worker不够用时，master可以根据配置预先启动几个worker等着；当然空闲worker太多时，也会停掉一些，这样就提高了性能，也节约了资源。这就是Fastcgi的对进程的管理。大多数Fastcgi实现都会维护一个进程池。注：swoole作为httpserver，实际上也是类似这样的工作方式。
> 来自 如何通俗地解释 CGI、FastCGI、php-fpm 之间的关系？ - Journey Lin的回答 - 知乎
https://www.zhihu.com/question/30672017/answer/127048585

[fcgiwrap](https://www.nginx.com/resources/wiki/start/topics/examples/fcgiwrap/),则是一个
对fastcgi协议实现的程序


spwan-cgi,[GitHub - lighttpd/spawn-fcgi: spawn-fcgi on github for easier collaboration - main repo still on lighttpd.net](https://github.com/lighttpd/spawn-fcgi),一个大概600行左右的
则是一个可以让`fcgiwrap`在端口上监听


## fcgiwrap 启动与配置
来自: [fcgiwrap 启动配置 - 知乎](https://zhuanlan.zhihu.com/p/372452886)

启动程序,创建一个用于传递数据的socket文件

```plaintext
$ fcgiwrap -f -s unix:/home/cai/opt/fcigwrap/var/fcgiwrap.socket &
```

设置nginx配置

```plaintext
location / {
    fastcgi_param       SCRIPT_FILENAME     "/home/cai/opt/bin/hello.sh";
    fastcgi_param       PATH_INFO           $uri;
    fastcgi_param       QUERY_STRING        $args;
    fastcgi_param       HTTP_HOST           $server_name;
    fastcgi_pass        unix:/var/run/fcgiwrap.socket;
    include             fastcgi_params;     # 必须放在最后
}
```

## 安装与配置


安装

```
sudo pacman -S nginx fcgiwrap spwan-fcgi
```


根据`fastcgi.conf`里的内容,我们可以通过类似`c`的`getenv`得到相应的环境变量,进而得到
相应的参数

```plaintext
fastcgi_param  SCRIPT_FILENAME    $document_root$fastcgi_script_name;
fastcgi_param  QUERY_STRING       $query_string;
fastcgi_param  REQUEST_METHOD     $request_method;
fastcgi_param  CONTENT_TYPE       $content_type;
fastcgi_param  CONTENT_LENGTH     $content_length;

fastcgi_param  SCRIPT_NAME        $fastcgi_script_name;
fastcgi_param  REQUEST_URI        $request_uri;
fastcgi_param  DOCUMENT_URI       $document_uri;
fastcgi_param  DOCUMENT_ROOT      $document_root;
fastcgi_param  SERVER_PROTOCOL    $server_protocol;
fastcgi_param  REQUEST_SCHEME     $scheme;
fastcgi_param  HTTPS              $https if_not_empty;

fastcgi_param  GATEWAY_INTERFACE  CGI/1.1;
fastcgi_param  SERVER_SOFTWARE    nginx/$nginx_version;

fastcgi_param  REMOTE_ADDR        $remote_addr;
fastcgi_param  REMOTE_PORT        $remote_port;
fastcgi_param  SERVER_ADDR        $server_addr;
fastcgi_param  SERVER_PORT        $server_port;
fastcgi_param  SERVER_NAME        $server_name;

# PHP only, required if PHP was built with --enable-force-cgi-redirect
fastcgi_param  REDIRECT_STATUS    200;
```

## 使用nodejs作为cgi程序

[Nginx + fcgiwrap + nodejs + zx 搭建便捷服务端 API - 掘金](https://juejin.cn/post/7084157548143575077)

## 参考
使用nodejs作为cgi程序
- [fcgiwrap 启动配置 - 知乎](https://zhuanlan.zhihu.com/p/372452886)
- [FCGI Wrap | NGINX](https://www.nginx.com/resources/wiki/start/topics/examples/fcgiwrap/)使用nodejs作为cgi程序
