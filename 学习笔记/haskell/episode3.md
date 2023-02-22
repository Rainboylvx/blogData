# 第三章 types and typeclasses

## 1 believe the type 相信类型

使用`:t` 来得到表达式的类型

```plaintext

ghci> :t 'a'
'a' :: Char
ghci> :t "a"
"a" :: String
ghci> :t 1
1 :: Num p => p
ghci> :t True
True :: Bool
ghci> :t "HEL"
"HEL" :: String
ghci> :t (True,1)
(True,1) :: Num b => (Bool, b)
ghci> :t (True,'a')
(True,'a') :: (Bool, Char)
ghci> 
```

声明函数时给它一个类型
```plaintext
removeNonUppercase :: [Char] -> [Char]   
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]
```

一个多参数函数的类型

```plaintext
addThree :: Int -> Int -> Int -> Int   
addThree x y z = x + y + z
```

一些常用的类型`Int,Integer,Float,Double,Bool,Char`

## Type variables 类型变量

`head`函数的类型

```plaintext
ghci> :t head
head :: [a] -> a

ghci> :t fst
fst :: (a, b) -> a
```

`a`是一个类型变量,表示它可以是任何一种类型,就像其它语言的泛型(generic)
一样

使用类型变量的函数,叫做polymorphic function(多态函数)

## 3 typeclasses 101 类类型101

typeclass 定义了一系列的接口

```plaintext
ghci> :t (==)
(==) :: Eq a => a -> a -> Bool
```

`Eq`是一个`typeclass`

```plaintext
ghci> :t (>)
(>) :: Ord a => a -> a -> Bool
```
