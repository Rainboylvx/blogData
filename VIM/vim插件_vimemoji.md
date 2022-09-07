# vim-emoji 源码阅读

源码地址: [junegunn/vim-emoji: Emoji in Vim](https://github.com/junegunn/vim-emoji)


## 使用的函数

- exists,判断是否定义,`*funcname`,函数是否定义
- strwidth,字符串长度
- keys,返回包含dict,key的列表
- get,得到list或dict的item
- empty,数据是否为空
- join
- type
- nr2char,数字转字符
- copy,复制
- repeat
- map
- match
- getline
- filter
- sort

## 源码理解

- 主函数 `emoji#complete`
- 得到所的emoji数据`emoji#list`
- ? `emoji#for(name,...)`

