# vim的折叠

- 为什么要用`fold`:因为可以加快代码的阅读速度
- 常用的配置
  ```vimL
  set foldmethod=syntax " 语法折叠
  set foldnestmax=1
  set foldlevel=0
  "set foldclose=all "离开时,自动折叠
  augroup my_fold_group
    aucmd!
    " 空格切换 展开/折叠
    autocmd FileType cpp noremap <buffer> <space> za
  augroup end
  ```

查看这个

[vimscript - What is the difference of using \`au BufNewFile,BufRead \*.py\` and \`au Filetype python\` in .vimrc? - Vi and Vim Stack Exchange](https://vi.stackexchange.com/questions/18231/what-is-the-difference-of-using-au-bufnewfile-bufread-py-and-au-filetype-py)

为什么 `~/.vim/after/ftplugin/python.vim` 会加载呢?
而我在nvim下`~/.config/vim/ftplugin/python.vim` 不会加载呢?

## FAQ

- 折叠的设置有哪些?各有什么用?
- fold如何折叠所有相应折叠等级呢?
- 撤销上次的折叠呢?
- 退出时保留上次的视图,打开时再次加载

foldopen 哪种类型的命令会导致`fold`打开
foldclose=all 效果,鼠标离开时,会自动`fold`
