## Starting Out



## Ready,set,go!

讲了数值计算,和`c++`一样,

`5/2=2.5`

执行`5 * -3`会使ghci报错,像`5*(-3)`就不会有问题。

逻辑运行符号:`&&,||,not`

`5 /= 4 -> True`

类型自动转换`5+4.0`

`*`是一个函数

`succ`是一个函数

`succ 9 *10 -> 100` 运算符优先级


`div 92 10 equ 92 \`div\`10 `

`div 92 10 -> 92` 整除

`bar(bar 3) -> bar(bar(3))` 相等

## 2.2 Baby's first function

函数的声明与它的调用形式大体相同，都是先函数名，后跟由空格分隔的参数表。但在声明中一定要在 = 后面定义函数的行为。

```plaintext
double x = x+x

两个参数的函数
double x y = x*2 + y*2

调用其它函数
doubleUs x y = doubleMe x + doubleMe y
```

haskell中的函数并没有顺序,先定义哪个都可以

我们编写一个函数，它将小于100的数都乘以2，因为大于100的数都已经足够大了！

```plaintext
doubleSmallNumber x = if x > 100 then x else x*2
```

else不能省略

- haskell中每个函数和表表达式,都必须返回一个结果
- if是一个表达式

```plaintext
doubleSmallNumber' x = (if x > 100 then x else x*2) + 1
```

## List

List是一种单类型的数据结构

可以用`let`定义一个名字(变量名),但不用好像也没有什么区别

合并

```plaintext
[1,2,3] ++ [2,3,4] -> [1,2,3,2,3,4]
"hello" ++ " " ++ "world"
  -> hello world
```

```plaintext
ghci> 'A':" SMALL CAT"   
"A SMALL CAT"   
ghci> 5:[1,2,3,4,5]  
[5,1,2,3,4,5] 

1:2:3[]
```

`:`运算符可以连接一个元素到一个List或者字符串之中
`[1,2,3]`实际上是`1:2:3:[]`的语法糖

索引运算 `!!`

```plaintext
(1:2:3:[] )!! 2
->3
```

List中的List可以是不同长度，但必须得是相同的类型

当List内装有可比较的元素时,List是可比较的

```plaintext
[3,2,1] > [2,1,0]
```

其它操作

```plaintext
head [5,4,3,2,1]  
tail [5,4,3,2,1]   
last [5,4,3,2,1]   
init [5,4,3,2,1]   
head []   > error
length [5,4,3,2,1]   
null [1,2,3]  
null [1,2,3]  
reverse [5,4,3,2,1]   
take 3 [5,4,3,2,1]   
take 5 [1,2]   
take 0 [6,6,6]  
 drop 3 [8,4,2,1,5,6]   
minimum [8,4,2,1,5,6]   
maximum [1,9,2,3,4]   
sum [5,2,1,6,3,2,5,7]   
product [6,2,1,2]   
4 `elem` [3,4,5,6]   
10 `elem` [3,4,5,6]   
```

## 德州区间 Texas ranges

这个很像python的列表生成
```plaintext
[1..20]
['a'..'z']
['A'..'z']
```

```plaintext
[2,4..20]
[2,4,6,8,10,12,14,16,18,20]

[3,6..20]
[3,6,9,12,15,18]
```

```plaintext
[20..1] 会得到一个空list []

正确的做法
[20,19..1]
```

不指定`upper limit`来创建一个无限的list

```plaintext
[1..]
```
由于 Haskell 是惰性的，它不会对无限长度的 List 求值，否则会没完没了的.
它会等着，看你会从它那儿取多少。

下面写一个常用的操作

```plaintext
cycle
repeat
take

take 10 (cycl)

ghci> take 10 [1..]
[1,2,3,4,5,6,7,8,9,10]

ghci> take 10 (repeat 10)
[10,10,10,10,10,10,10,10,10,10]


ghci> take 10 (cycle [1,2,3])
[1,2,3,1,2,3,1,2,3,1]

ghci> take 10 (cycle "LOL ")
"LOL LOL LO"

ghci> replicate 3 10
[10,10,10]
```

使用`replicate`来得到一些同样数字的列表

## I'm a list comprehension

得到前10个偶数
```plaintext
ghci> take 10 [2,4..]
[2,4,6,8,10,12,14,16,18,20]
```

list comprehension,使用更复杂的function
```plaintext
ghci> [ x*2 | x <- [1..10]]
[2,4,6,8,10,12,14,16,18,20]
```

more predicates
```plaintext
ghci> [ x*2 | x <- [1..10],x*2>=12]
[12,14,16,18,20]
```

取 50 到 100 间所有除 7 的余数为 3 的元素
```plaintext
ghci> [ x | x <- [50..100],mod x 7 == 3]
[52,59,66,73,80,87,94]
```

odd函数
```plaintext
ghci> odd 3
True
ghci> odd 4
False
```


也可以加多个限制条件。若要达到 10 到 20 间所有不等于 13，15 或 19 的数，可以这样：

```plaintext
ghci> [ x | x <- [10..20], x /= 13, x /= 15, x /= 19]   
[10,11,12,14,16,17,18,20]
```

从多个 List 中取元素

假设有两个 List，[ 2 , 5 , 10 ] 和 [ 8 , 10 , 11 ] ， 要取它们所有组合的积，可以这样：
```
ghci> [ x*y | x <- [2,5,10], y <- [8,10,11]]   
[16,20,22,40,50,55,80,100,110]  
```


若只取乘积大于 50 的结果该如何？

```plaintext
ghci> [ x*y | x <- [2,5,10], y <- [8,10,11], x*y > 50]   
[55,80,100,110]  
```

取个包含一组名词和形容词的 List comprehension 吧，写诗的话也许用得着。

```
ghci> let nouns = ["hobo","frog","pope"]   
ghci> let adjectives = ["lazy","grouchy","scheming"]   
ghci> [adjective ++ " " ++ noun | adjective <- adjectives, noun <- nouns]   
["lazy hobo","lazy frog","lazy pope","grouchy hobo","grouchy frog", "grouchy pope","scheming hobo", 
"scheming frog","scheming pope"] 
```

sum函数,`_`表示我们不关心得到的数据

```plaintext
ghci> length1 xs = sum [1 | x <- xs]
ghci> length1 [1,2,3]
3
```

```plaintext
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]  
```

嵌套的 List comprehension ,对内部的每一个list单独过滤

```plaintext
ghci> let xxs = [[1,3,5,2,3,1,2,4,5],[1,2,3,4,5,6,7,8,9],[1,2,4,2,1,6,3,1,3,2,3,6]]   
ghci> [ [ x | x <- xs, even x ] | xs <- xxs]   
[[2,2,4],[2,4,6,8],[2,4,2,6,2,6]] 
```

## Tuple

tuple与list的不同就是,teupl有的类型由内部的类型与本身元素的数量决定

tuple的内部元素的类型不一定是相同的

```plaintext
[(1,1),(2,2),(3,3)]
[(1,1),(2,2,2),(3,3)] -> error
[(1,1),("one",2)] -> error
```

```plaintext
ghci> zip [1,2,3,4,5] [5,5,5,5,5]   
[(1,5),(2,5),(3,5),(4,5),(5,5)]


ghci> zip [1 .. 5] ["one", "two", "three", "four", "five"]   
[(1,"one"),(2,"two"),(3,"three"),(4,"four"),(5,"five")]



ghci> zip [1..] ["apple", "orange", "cherry", "mango"]   
[(1,"apple"),(2,"orange"),(3,"cherry"),(4,"mango")]
ghci> 


ghci> let rightTriangles = [ (a,b,c) | c <- [1..10], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2]
ghci> rightTriangles 
[(3,4,5),(6,8,10)]
```
