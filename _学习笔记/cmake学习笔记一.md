---
_id: H1qsteGkM
title: cmake学习笔记一
date: 2017-11-10 22:05
update: 2018-09-11 10:01
series: cmake学习笔记
categories:
    - 学习笔记
tags:
    - linux
    - cmake
---



## 安装cmake

`arch linux`下安装
```sh
pacman -S make
pacman -S cmake
```

下面按[cmake 从入门到粗通](https://wenku.baidu.com/view/473211985ef7ba0d4b733b1d.html)学习一遍

我学习的代码放在:[git-cmake练习代码](https://github.com/rainboy-learn/cmake)

## 例子一:构建一个经典的程序


```c
#include <cstdio>

int main(){
    printf("hello world\n");
    return 0;
}
```

创建一个`CMakeLists.txt`

```
project(HELLO)
set(SRC_LIST main.cpp)
add_executable(hello ${SRC_LIST})
```
执行

```bash
mkdir build
cmake ..
make
```

创建`hello`程序成功,`add_executable($1,$2)` 应该添加一个编译文件

## 例子1.1 查看变量


```
project(HELLO)
set(SRC_LIST main.cpp)

# 输出变量
message("can you see me ?")

message(${HELLO_BINARY_DIR})
message(${HELLO_SOURCE_DIR})

message(${PROJECT_BINARY_DIR})
message(${PROJECT_SOURCE_DIR})

#add_executable(hello ${SRC_LIST})
```

执行后可以看到变量输出

 - set 设置变量
 - add_executable 生成一个可执行文件
 - add_library  生成一个库文件
 - message  输出信息
 - `set( CMAKE_VERBOSE_MAKEFILE on)` 输出更详细的信息

## 例子2: 三个文件编译

`hello.h`

```c
#ifndef _HELLO_
#define _HELLO_
void hello(char *name);
#endif
```

`hello.cpp`

```c
#include "hello.h"
#include <cstdio>

void hello(char *name){
    printf("Hello %s!\n",name);
}
```

`main.cpp`

```c
#include <cstdio>
#include "hello.h"

int main(){
    hello("rainboy");
    return 0;
}

```

手动编译
```bash
mkdir handle_build
# 生成 .o 文件
g++ -c hello.cpp -o handle_build/hello.o
# 生成 lib文件
ar crv handle_build/libhello.a handle_build/hello.o
# 生成 目标程序
g++ main.cpp handle_build/libhello.a -o handle_build/hello
```


建立`CMakeLists.txt`

```
project(HELLO)
set(SRC_LIST main.cpp hello.cpp)
add_executable(hello ${SRC_LIST})
```

## 例子3: hello.c 编译成库

手动
```bash
mkdir handle_build
# 生成 .o 文件
g++ -c hello.cpp -o handle_build/hello.o
# 生成 lib文件
ar crv handle_build/libhello.a handle_build/hello.o
# 生成 目标程序
g++ main.cpp handle_build/libhello.a -o handle_build/hello
```

```
project(HELLO)
set(lib_src hello.cpp)
set(app_src main.cpp)

add_library(libhello ${lib_src})

add_executable(hello ${app_src})

target_link_libraries(hello libhello)
```

## cmake 关键字

```
cmake_minimum_required      注意最小的需要的cmake版本
project                     设置项目名,主要作用是可以改变<projectname>_bin_path 等变量
set                         设置变量
configure_file ()           ??
include_directories()       包含的头文件目录 相当于 -I
add_executable()            生成的目标文件
target_link_libraries()     生成的目标文件 要和哪些库 链接
```

## 例子4:

```
.
├── CMakeLists.txt
├── lib
│   ├── CMakeLists.txt
│   ├── hello.cpp
│   └── hello.h
└── src
    ├── CMakeLists.txt
    └── main.cpp
```

顶层的 CMakeList.txt 文件中使用 add_subdirectory 告诉 cmake 去子目录寻找新的 CMakeList.txt 子文件  
在 src 的 CMakeList.txt 文件中，新增加了 include_directories，用来指明头文件所在的路径

## 例子5: 生成的目标文件输出到对应的目录

如果想让可执行文件在 bin 目录，库文件在 lib 目录怎么办

修改例子4:

在`lib/CMakeLists.txt`加入
```
set(LIBRARY_OUTPUT_PATH ${PROJECT_BINARY_DIR}/lib)
```
在`src/CMakeLists.txt`加入
```
set(EXECUTABLE_OUTPUT_PATH ${PROJECT_BINARY_DIR}/bin)
```

**原理:**这里主要是修改了两个默认的变量`LIBRARY_OUTPUT_PATH,EXECUTABLE_OUTPUT_PATH`

## 例子6:动态库

在例子三至五中，我们始终用的静态库，那么用动态库应该更酷一点吧。 试着写一下
如 果 不 考 虑 windows 下 ， 这 个 例 子 应 该 是 很 简 单 的 ， 只 需 要 在 上 个 例 子 的
libhello/CMakeList.txt 文件中的 add_library 命令中加入一个 SHARED 参数：
add_library(libhello SHARED ${LIB_SRC})

略!

## 例子7:Debug 和 Release

具体参看git上的`7/`文件下的`CMakeLists.txt`

```
SET(CMAKE_CXX_FLAGS_DEBUG "$ENV{CXXFLAGS} -O0 -Wall -g -ggdb")
SET(CMAKE_CXX_FLAGS_RELEASE "$ENV{CXXFLAGS} -O3 -Wall")
SET(CMAKE_BUILD_TYPE Debug)
# 设置输出文件
message(${CMAKE_CXX_COMPILER})
IF(${CMAKE_BUILD_TYPE} STREQUAL Debug)
    MESSAGE("DEBUG-------------------")
    set(EXECUTABLE_OUTPUT_PATH ${PROJECT_BINARY_DIR}/Debug)
ELSE()
    MESSAGE("Realse-------------------")
    set(EXECUTABLE_OUTPUT_PATH ${PROJECT_BINARY_DIR}/Realse)
ENDIF()
```

不仅可以在`CMakeLists.txt`里改变`CMAKE_BUILD_TYPE`的值,也可以在命令行里改变

```sh
cmake CMAKE_BUILD_TYPE=Debug
```
## 相关资料

 - [cmake 入门-CMake Tutorial](http://www.jianshu.com/p/6b7aabfbace0)
 - [cmake 从入门到精通](https://wenku.baidu.com/view/473211985ef7ba0d4b733b1d.html)
 - [CMake简明教程](http://www.jianshu.com/p/bbf68f9ddffa)
 - [cmake 官方文档](https://cmake.org/documentation/)
 - [cmake 手册详解](https://wenku.baidu.com/view/27fdeb23168884868662d63a.html)
 - [cmake 中文手册](https://wenku.baidu.com/view/8fceba7eb9d528ea80c7797a.html)
 - [CMake 入门实战](http://www.hahack.com/codes/cmake/)
