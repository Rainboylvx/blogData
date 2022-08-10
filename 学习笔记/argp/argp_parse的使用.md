---
_id: S1f30EtnQ
title: argp_parse的使用
date: 2018-11-02 11:04
update: 2018-11-02 11:04
series: 无
categories:
    - 学习笔记
tags:
    - c语言
    - 参数解析
---

## 相关

使用c语言来解析 `argv`有这几种常用方式`getopt`,`argp`,[相关说明](https://www.gnu.org/software/libc/manual/html_node/Argp.html#Argp),这里学习一下`argp`的使用.


## 函数原型

```c
Function: error_t argp_parse (const struct argp *argp, int argc, char **argv, unsigned flags, int *arg_index, void *input)
```



**参数**

 - `const struct argp *argp`
 - `int argc`       参数的数量
 - `char **argv`    参数列表
 - `unsigned flags` 影响解析parser的表现
 - `int *arg_index` 非空,第一个不被解析的参数下标会被return
 - `void *input`    一个指针,最后传给parse_function的里arg_state->input

`ARGP_NO_EXIT` or `ARGP_NO_HELP` flags 被包含了,不会在程序退出的时候输出一个参数信息

如果成功,`return 0`

## 全局变量

全局变量,在`--version, --help`的时候使用

 - 变量: `const char * argp_program_version`,`--version`的时候使用
 - 变量: `const char * argp_program_bug_address` `--help`的时候使用
 - 变量: `argp_program_version_hook`,如果想自己定义一个`--version`输出函数,使用它
 - 变量:`error_t argp_err_exit_status`,解析错误的返回值.


## 设定argp参数解析器

需要定义**struct argp**,它包含下面的参数

 - `const struct argp_option *options`,指向`argp_option`结构体数组,表示哪些参数被解析
 - `argp_parser_t parser`,指向一个解析函数
 - `const char *args_doc` 非空,在一个末定义的参数出现后被输出
 - `const char *doc`    会在`--help`时输出
 - `const struct argp_child *children`  可以不用
 - `char *(*help_filter)(int key, const char *text, void *input)`,过滤help信息,可以不用
 - `const char *argp_domain` 可以不用

### 设定Argp Parser的选项

一个结构体,提供给`struct argp`的第一个参数使用,

```c

struct argp_option {
    const char *name;  //长名,是0,表明只有短名
    int key;          //短名,同样是一个关键key值,一定是一个ascii值
    const char *arg;  //如果不为0,表明这个选项必须提供,出错时 输出这个名字
    int flags;      //标记 具体看 Argp Option Flags.
    const char *doc; // 文档,--help 里输出
    int group;      // 组 ? 不知道怎么用
}
```

例子:

```c
struct argp_option _example[]= {
    //长名,短名,     "arg名",flag,                 doc,  group
    {"in",  'I',"input_file",  0,"the input file name",     1},
    {"out", 'O',"output_file", 0,"the output file name",    2},
    {0},        //结束
};
```

#### argp_parser_t parser

指向一个解析函数,对上面的`argp_option`的提供的每一条进行解析,如果为0,会指向的一个返回`ARGP_ERR_UNKNOWN`的函数

函数的写法如下,[参考](https://www.gnu.org/software/libc/manual/html_node/Argp-Parser-Functions.html#Argp-Parser-Functions)

```c
error_t parser (int key, char *arg, struct argp_state *state)
```

 - key,就是上面`argp_option`的key值
 - arg,应该是key后跟的值,如` -I 1024 ` 1024 就是
 - state,指向`argp_state`结构,包含了一些有用的信息

## 实例关系图

```

+===========================================================+
|               struct argp                                 |
+===========================================================+
|const struct argp_option *options                          +------------+
+-----------------------------------------------------------+            |
|argp_parser_t parser                                       |------------+---+
+-----------------------------------------------------------+            |   |
|const char *args_doc                                       |            |   |
+-----------------------------------------------------------+            |   |
|const char *doc                                            |            |   |
+-----------------------------------------------------------+            |   |
|const struct argp_child *children                          |            |   |
+-----------------------------------------------------------+            |   |
|char *(*help_filter)(int key, const char *text, void *input)            |   |
+-----------------------------------------------------------+            |   |
|const char *argp_domain                                    |            |   |
+-----------------------------------------------------------+            |   |
                                                                         |   |
  +====================+                                                 |   |
  | struct argp_option | <-----------------------------------------------+   |
  +====================+                                                     |
  | const char *name   |                                                     |
  +--------------------+                                                     |
  | int key;           |                                                     |
  +--------------------+                                                     |
  | const char *arg    |                                                     |
  +--------------------+                                                     |
  | int flags          |                                                     |
  +--------------------+                                                     |
  | const char *doc    |                                                     |
  +--------------------+                                                     |
  | int group          |                                                     |
  +--------------------+                                                     |
                                                                             |
 +-------------------------------------------------------------+             |
 |error_t parser (int key, char *arg, struct argp_state *state)|<------------+
 +-------------------------------------------------------------+             

```

### flags

ARGP_NO_EXIT or ARGP_NO_HELP



## 例子一:


```c

#include <argp.h>
#include <stdlib.h>
#include <stdio.h>

const char *argp_program_version= "rainboy'parser ver1.0";
const char * argp_program_bug_address = "rainboylvx@qq.com";
char args_doc[]= "args_doc";
char doc[]= "all doc";

struct argp_option _example[]= {
    //长名,短名,     "arg名",flag,                 doc,     group
    {"in",  'i',"input_file",  0,"the input file name",     1},
    {"out", 'o',"output_file", 0,"the output file name",    2},
    {0},        //结束
};

error_t arg_parser(int key, char *arg,struct argp_state *state){
    switch(key){
        case 'i':
            printf("this opt is in,-i,arg is :%s\n",arg);
            break;
        case 'o':
            printf("this opt is in,-o,arg is :%s\n",arg);
            break;
        default:
            printf("unkonw opt\n");
            /*printf("key:\t%c\n",key);*/
            /*printf("arg:\t%s\n",arg);*/
            return ARGP_ERR_UNKNOWN;
    }
    return 0;
}

struct argp _argp_ = {
    _example,
    arg_parser,
    args_doc,
    doc
};


int main(int argc ,char **argv){
    
    int res = argp_parse(&_argp_,argc,argv,0, 0, 0);
    exit (0);
}
```

## argp_use 函数的使用

 > Outputs the standard usage message for the argp parser referred to by state to state->err_stream and terminates the program with exit (argp_err_exit_status). See Argp Global Variables.

输出usage 信息,并且结束程序
## state->input 的指针


## 自动输出usage

没有参数的时候
