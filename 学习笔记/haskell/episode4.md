# 第四章 syntax in Function 函数的语法 

## 1 模式匹配

lucky 7 

```
<%- include("code/lucky.hs") _%>
```

```plaintext
GHCi, version 9.0.2: https://www.haskell.org/ghc/  :? for help
ghci> :l lucky.hs
[1 of 1] Compiling Main             ( lucky.hs, interpreted )
Ok, one module loaded.
ghci> lucky 7
"LUCKY NUMBER SEVEN!!"
ghci> lucky 8
"Sorry, you're out of lock,pal!"
ghci>
```

as 模式

```plaintext
capital :: String -> String   
capital "" = "Empty string, whoops!"   
capital all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]  
```
## 2 什么是 Guards

模式用来检查一个值是否合适并从中取值，而 guard 则用来检查一个值的某项属性是否为真

```plaintext
bmiTell :: (RealFloat a) => a -> String  
bmiTell bmi  
    | bmi <= 18.5 = "You're underweight, you emo, you!"  
    | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"  
    | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"  
    | otherwise   = "You're a whale, congratulations!"
```

```plaintext
bmiTell :: (RealFloat a) => a -> a -> String  
bmiTell weight height  
    | weight / height ^ 2 <= 18.5 = "You're underweight, you emo, you!"  
    | weight / height ^ 2 <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"  
    | weight / height ^ 2 <= 30.0 = "You're fat! Lose some weight, fatty!"  
    | otherwise                 = "You're a whale, congratulations!"
```

```plaintext
max' :: (Ord a) => a -> a -> a  
max' a b   
    | a > b     = a  
    | otherwise = b
```
guard 也可以塞在一行里面。但这样会丧失可读性，因此是不被鼓励的。即使是较短的函数也是如此，不过出于展示，我们可以这样重写 ​max'​：

```plaintext
max' :: (Ord a) => a -> a -> a  
max' a b | a > b = a | otherwise = b
```
## 3 关键字 Where

很像sql语句啊,是一个命名方式
```plaintext
bmiTell :: (RealFloat a) => a -> a -> String  
bmiTell weight height  
    | bmi <= 18.5 = "You're underweight, you emo, you!"  
    | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"  
    | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"  
    | otherwise   = "You're a whale, congratulations!"  
    where bmi = weight / height ^ 2
```

```plaintext
bmiTell :: (RealFloat a) => a -> a -> String  
bmiTell weight height  
    | bmi <= skinny = "You're underweight, you emo, you!"  
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"  
    | bmi <= fat    = "You're fat! Lose some weight, fatty!"  
    | otherwise     = "You're a whale, congratulations!"  
    where bmi = weight / height ^ 2  
          skinny = 18.5  
          normal = 25.0  
          fat = 30.0
```

`where` 绑定不会在多个模式中共享。如果你在一个函数的多个模式中重复用到同一名字，就应该把它置于全局定义之中。

`where` 绑定也可以使用_模式匹配_！前面那段代码可以改成：

    ...  
    where bmi = weight / height ^ 2  
          (skinny, normal, fat) = (18.5, 25.0, 30.0)

我们完全按可以在函数的参数上直接使用模式匹配


where 定义函数
```plaintext
calcBmis :: (RealFloat a) => [(a, a)] -> [a]  
calcBmis xs = [bmi w h | (w, h) <- xs] 
    where bmi weight height = weight / height ^ 2
```

`where` 绑定还可以一层套一层地来使用。 有个常见的写法是，在定义一个函数的时候也写几个辅助函数摆在 `where` 绑定中。 而每个辅助函数也可以透过 `where` 拥有各自的辅助函数。


## 4 关键字 Let

`let` 的格式为 `let [bindings] in [expressions]`。在 `let` 中绑定的名字仅对 `in` 部分可见。

```plaintext
cylinder :: (RealFloat a) => a -> a -> a  
cylinder r h = 
    let sideArea = 2 * pi * r * h  
        topArea = pi * r ^2  
    in  sideArea + 2 * topArea
```

`let` 绑定本身是个表达式,因而可以随处安放

## 5 Case expressions

`case`是一种表达式

```plaintext
head' :: [a] -> a  
head' [] = error "No head for empty lists!"  
head' (x:_) = x
```

```plaintext
head' :: [a] -> a  
head' xs = case xs of [] -> error "No head for empty lists!"  
                      (x:_) -> x
```

模式匹配本质上不过就是 case 语句的语法糖而已。这两段代码就是完全等价的：

case的语法
```plaintext
case expression of pattern -> result  
                   pattern -> result  
                   pattern -> result  
                   ...
```

`case`表达式可以用在任何地方。例如：

    describeList :: [a] -> String  
    describeList xs = "The list is " ++ case xs of [] -> "empty."  
                                                   [x] -> "a singleton list."   
                                                   xs -> "a longer list."
                                                   

```plaintext
describeList :: [a] -> String  
describeList xs = "The list is " ++ case xs of [] -> "empty."  
                                               [x] -> "a singleton list."   
                                               xs -> "a longer list."

describeList :: [a] -> String  
describeList xs = "The list is " ++ what xs  
    where what [] = "empty."  
          what [x] = "a singleton list."  
          what xs = "a longer list."
```
