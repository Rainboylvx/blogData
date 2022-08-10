---
_id: By1aYVI_m
title: cmake学习笔记二
date: 2018-09-12 15:01
update: 2018-09-12 15:01
series: cmake学习笔记
categories:
    - 学习笔记
tags:
    - linux
    - cmake
---

## 简单语法

**1.注释**

```
# 我是注释
```
**.2命令语法**

```
COMMAND(参数 1 参数 2 ...)
```
**3.字符串列表**

```
A;B;C # 分号分割或空格分隔的值
```
**4.变量(字符串或字符串列表)**

```
set(Foo a b c) 设置变量 Foo
command(${Foo}) 等价于 command(a b c)
command("${Foo}") 等价于 command("a b c")
command("/${Foo}") 转义，和 a b c 无关联
```

**5.流控制结构**

```
IF()...ELSE()/ELSEIF()...ENDIF()
WHILE()...ENDWHILE()
FOREACH()...ENDFOREACH()
```

## 部分常用命令

![](http://ww1.sinaimg.cn/large/618359cbly1fv6ruscy1ej20o80xwwfz.jpg)

## 常用变量
工程路径

- CMAKE_SOURCE_DIR
- PROJECT_SOURCE_DIR
- `<projectname>_SOURCE_DIR`

这三个变量指代的内容是一致的，是工程顶层目录

- CMAKE_BINARY_DIR
- PROJECT_BINARY_DIR
- `<projectname>_BINARY_DIR`

这三个变量指代的内容是一致的，如果是 in source 编译，指得就是工程顶层目录，如果 是 out-of-source 编译，指的是工程编译发生的目录

- CMAKE_CURRENT_SOURCE_DIR

指的是当前处理的 CMakeLists.txt 所在的路径。

- CMAKE_CURRRENT_BINARY_DIR

如果是 in-source 编译，它跟 CMAKE_CURRENT_SOURCE_DIR 一致，如果是 out-ofsource 编译，他指的是 target 编译目录。

- CMAKE_CURRENT_LIST_FILE

输出调用这个变量的 CMakeLists.txt 的完整路径

 - CMAKE_CXX_FLAGS_DEBUG 
 - CMAKE_CXX_FLAGS_RELEASE

这两个变量是分别用于 debug 和 release 的编译选项。

CMAKE_BUILD_TYPE

控制 Debug 和 Release 模式的构建CMakeList.txt 文件

 - SET(CMAKE_BUILD_TYPE Debug)

命令行参数

 - cmake DCMAKE_BUILD_TYPE=Release

编译器参数

- CMAKE_C_FLAGS
- CMAKE_CXX_FLAGS

也可以通过指令 ADD_DEFINITIONS()添加


 - CMAKE_INSTALL_PREFIX

控制 make install 是文件会安装到什么地方。默认定义是/usr/local 或 %PROGRAMFILES%
BUILD_SHARED_LIBS
如果不进行设置，使用 ADD_LIBRARY 且没有指定库类型，默认编译生成的库是静态库。
