block_state

属性

```plaintext

  this.tokens = tokens

  this.bMarks = [] //每一行的起始位置
  this.eMarks = [] //每一行的结束位置
  this.tShift = [] //这一行的,第一个非空字符的偏移位置
  this.sCount = [] //对应行 space count (tab expanded)

  //行开头虚拟的空格
  //作为hack存在,blockquotes会重写 bMarks,在执行的时候丢失对应的信息
  // 只有在expand tab 时候有用
  this.bsCount = [] //通常为0

  this.blkIndent  = 0 // block indent

  this.line       = 0 // 第几行
  this.lineMax    = 0 // 一共有多少行
  this.tight      = false // list mod 1. loose 2 tight
  this.ddIndent   = -1 // for dd block
  this.listIndext = -1 // for list block

  // 可能 blockquote list root paragraph reference
  // 在list中使用时,可以判断是否打断 paragraph
  this.parentType = 'root'

  this.level  ?

```

## tokenize

### 1. table解析的规则

参数

- state 状态
- startLine 起始行
- endLine 终止行
- silent ,沉默? 表示解析后加入token

返回值,true 表示是否解析成功

[table语法](https://www.markdownguide.org/extended-syntax/#tables)


1. 创建一个table,由hyphens and pips 组成
2. alignment, `:---, :---:,---:`
3. format cell text
4. escape pipe char `&#124;`

代码实现的具体规则,按顺序

0. 起始行第0行是header,所以nextLine就是 column 行
1. 到少要有两行,因为 header + columns 要有两行
2. 常规查检: 在要求的blkIndent内
3. >=4个空格就是code block
4. 第二行不能是空行
5. 检查table的第二行
  1. 起始字符是`- | :`之一
  2. 不能只有一个字符
  3. 第二字符只能是`- | :,空白字符`之一
  4. 第一个字符是`-`,那第二个字符就必须不是空白
  5. 后面的字符只能是`- | : 空白`之一
  ```
  / ^[-:|][-:|\s]*$ /
  |||| ok
  -|--|--| ok
  -||||| ok
  :||||| ok
  ```
  6. 检查`|`中间的串,并确定align
6. 检查首行
  1. 常规查检: 在要求的blkIndent内
  2. 必须含有`|`
  3. 和第二行匹配
7. 进行tokenize
  - 7.1 parentType= 'table'
  ```
  table_oepn 
  thead_open
  tr_open
  for:
    th_open
    inline(columns)
    th_close
  tr_close
  thead_close
  table_close 
  ```
  - 7.2 一行一行检查tbody
  ```
  tbody_open
  tr_open
  for:
    td_open
    columns[i]
    td_close
  tr_close
  if tbodyLines 如果tbody 存在,存的tbody 对就的行,对应tbody_open token.map
    tbody_close
  ```
  - 7.3 ? terminatorRules -> blockquote: fence,blockquote,hr,list,html_block,heading


### 2. code解析的规则

很简单

连续的多个>=4个空格的(包含窄)行就是code

特点,没有silent

### 3. fence解析的规则

1. 不能多于4个空格
2. 首行至少有3个字符
3. 首个字符是`~ \``之一
4. 连续的mark大于3
5. params里不能`\``
6. 创建token
  - 6.1 结束的可能情况
  - 整个md文件结束
  - 当前行非空,且 不在 blkIndent 内,应该是特殊的一种list,list内的fence
  - 对应的fence endMark

### 4. blockquote解析的规则

1. 常规查检 在blkIndent内
2. 首个字符是`>`
