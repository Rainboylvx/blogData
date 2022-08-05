## 参考


## gtag(gutentags)的使用

Gutentags是一个插件，负责VIM中标记文件的管理。它会在你工作的时候重新生成标签文件，同时完全不妨碍你的工作。它甚至会尽最大努力让这些标签文件远离你的方式。它没有依赖性，只起作用。

为了生成标记文件，Guentags必须找出项目中的内容。为此，它将定位众所周知的项目根标记，如scm文件夹（.git，.hg等）、您定义的任何自定义标记（使用guentags_project_root），甚至您可能已经用其他插件（如ctrlp）定义的内容。


如果您正在编辑的当前文件被发现在这样的项目中，那么guentags将确保该项目的标记文件是最新的。然后，当您处理该项目中的文件时，它将部分地重新生成标记文件。每次保存时，它都会在后台自动更新该文件的标记。

通常，ctags只能将标记附加到现有的标记文件中，因此guentags首先删除当前文件的标记，以确保标记文件始终与源代码一致。

此外，如果您将文件保存得很快，或者您的项目非常大，那么guentags足够聪明，不必通过触发多个ctags过程来绊倒自己。

### 安装

vimplugn
ctags

### 配置

在airline 中启用 gutentags ?

https://bolt80.com/gutentags/#overview

 - https://www.cnblogs.com/chenliyang/p/6634679.html
 - [Vim 中使用 gtags 的正确方法](https://www.v2ex.com/t/456788)

