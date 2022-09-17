# Linux下进程间通信方式——pipe（管道） 

先看这一篇文章

[Linux下进程间通信方式——pipe（管道） - cs\_wu - 博客园](https://www.cnblogs.com/wuyepeng/p/9747557.html)

结合`<<understanding unix/linux programming>>`这本书的`第10章:IO重定向与管道`,我希望写出如下的代码,

- popen,运行子进程,并与子进行进行通信
- 向子进程写入数据,对他进行读取
- 得到子进程的输出信息,与error信息


## 前置的知识

linux api

```
pipe
dup2
fcntl
eecvp
```


管道(pipe)读写的4种情况

```plaintext

 write    +---------+   read
 -------->|  Pipe   |--------->
          +---------+
```

1. read端如果一直在读,write端不写,会阻塞
2. write端如果一直在写,read端不读,会阻塞
3. read端如果一直在读,write端写了一部分,然后关闭了,read会读取到EOF,相当于文件的末尾
4. write端如果一直在写,read端读了一部分,然后关闭了,write端会得到`SIGPIPE`信号

## 代码

注意看相应的代码


1. 利用`execvp`调用另一个程序

::: details sample.cpp
```cpp
<%- include("code/sample.cpp") _%>
```
:::

2. 测试通信之间的时间间隔问题

::: details sample_1.cpp
```cpp
<%- include("code/sample_1.cpp") _%>
```
:::
