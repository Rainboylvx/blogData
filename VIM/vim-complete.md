# vim-complete

vim是如何补全的呢?

User defined completion
需要设定 `completefunc`

`h complete-functions`

```vimL
set completefunc=CompleteMonths
```

### complete-items

`h complete-items`
由`complete`函数返回的值,可以是一个`string`或`dictionary`,

如果返回是一个`dictionary`list,包含下面的key值,具体含义查看help

- word
- abbr
- menu
- info -> show in preview
- kind
- icase
- equal
- dup
- empty
- user_data

completeopt ?

查询例子:`CompleteMonths` -> `:h E840`

### ins-completion-menu

需要`completeopt` 包含`menu`or`menuone`

- `pumheight`设置`menu`高度
- `pumwidth` 设置`menu`宽度

三种状态

- 完全匹配被插入
- 选择匹配时
- 部分匹配 [[backspace]]

### omni-complete

```vimL
h omnifunc
h compl-comni-filetypes
```

### complete()
```vimL
:h complete()
```


## 引用/学习
- vim,`h ins-complete`
- [vim 补全功能的一些使用经验 - 知乎](https://zhuanlan.zhihu.com/p/26156186)
