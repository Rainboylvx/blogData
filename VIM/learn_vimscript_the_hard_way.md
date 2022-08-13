---
_id: "40214179b5"
title: learn_vimscript_the_hard_way
date: 2022-08-08 22:02
update: 2022-08-08 22:02
author: Rainboy
tags:
    - vim
    - vimscript
catalog: 学习笔记
---

# Learn Vimscript The Hard Way 读书笔记

## 前言

一直想要学习vimL,这样可以加深对Vim的理解, Learn Vimscript The Hard Way 这本书本质上是一本vimscript的教程.

你可以在 https://github.com/blogData/VIM/vimscripts 这里找到我写的学习中产生的vimscript

书本要求我们

1. you need to **TYPE ALL THE COMMANDS**
2. you need to **DO ALL THE EXERICESES**

## Prerequisties

1. kown `buffer`,`window`,`normal mode`,`insert mode`,`text object`
2. create a vimrc file
  - to easily find the location and name of the file on any operating system,use`echo $MYVIMRC`


## 1 Echoing Message

### 1.2 how to print something

- `echo` ,will not save messages
- `echom`,will save messages
- `messages`,show history messages

`echom`will save the output and let you run `:messages` to view it later.

### 1.2 comments

```plaintext
" this is comment
```

### 1.3 exercises

::: details
```
<%- include("vimscripts/1-3exercises.vim") _%>
```
:::

## 2 setting options

### 2.1 boolean options

```plaintext
set number
set nonumber
set number! " toggling boolean options
" how to know wath an option is currently set to by using a ?
set number?
```

all boolean options work this way `:set <name>` turns the options on and `:set no<name>` turns it off.

### 2.4 options with values

```plaintext
set number

" the numberwidth options changes how wide the column containing line numbers 
" will be.
set numberwidth=10
set numberwidth=4
set numberwidth?
```

### 2.5 setting multiple options at once

```plaintext
set numberwidth=2
set nonumber
set number numberwidth=4
"both options were set and took effect in the last command
```


::: details
```plaintext
<%- include("vimscripts/2-6exercises.vim") _%>
```
:::


## 3 Basic Mapping

```plaintext
map - x  " - 映射成 x
map - dd
```

### 3.3 exercises

::: details
```plaintext
<%- include("vimscripts/3-3exercises.vim") _%>
```
:::

- how to remove a mapping :`unmap [key]`

## 4 modal mapping

- nmap,normal modal
- vmap,visual modal
- imap,insert modal

```plaintext
imap <c-d> <esc>ddi
```

## 5 strict mapping

```plaintext
nmap dd O<esc>jddk" recursive
```

- Open a line
- exit insert mode 
- move down a line
- but `dd` is mapped,so perform the above mapping,never finish!

```plaintext
nmap x dd
nnoremap \ x
```

**Always use nonrecursive map**

## 6 leaders

pick a key as a **prefix** key

```plaintext
nnoremap -d dd
nnoremap -c ddO
let mapleader = "-"
nnoremap <leader>d dd
```
you can use `<leader>` to mean "whatever i have my leader key set to"


### local leader

only take effect for certain types of files.(for this buffer ?)

```plaintext
let maplocalleader = "\\"
nnoremap <buffer> <localleader>d dd
```

## 7 Editing Your Vimrc

Find a way to make it easier to add new mappings to vimrc files.

