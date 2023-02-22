# 模块

就像python一样,学习一下haskell模块的使用

## 装载模块

```plaintext
import Data.List
ghci> :m Data.List
ghci> :m Data.List Data.Map Data.Set
import Data.List (nub，sort)
import Data.List hiding (nub)
import qualified Data.Map
import qualified Data.Map as M
```
## Data.List

显而易见，Data.List是关于List操作的模块，它提供了一组非常有用的List处理函数。

intersperse取一个元素与List作参数，并将该元素置于List中每对元素的中间。如下是个例子:

    ghci> intersperse '.' "MONKEY"   
    "M.O.N.K.E.Y"   
    ghci> intersperse 0 [1,2,3,4,5,6]   
    [1,0,2,0,3,0,4,0,5,0,6]


intercalate取两个List作参数。它会将第一个List交叉插入第二个List中间，并返回一个List.

    ghci> intercalate " " ["hey","there","guys"]   
    "hey there guys"   
    ghci> intercalate [0,0,0] [[1,2,3],[4,5,6],[7,8,9]]   
    [1,2,3,0,0,0,4,5,6,0,0,0,7,8,9]追光

transpose函数可以反转一组List的List。你若把一组List的List看作是个2D的矩阵，那transpose的操作就是将其列为行。

    ghci> transpose [[1,2,3],[4,5,6],[7,8,9]]   
    [[1,4,7],[2,5,8],[3,6,9]]   
    ghci> transpose ["hey","there","guys"]   
    ["htg","ehu","yey","rs","e"]

- concat
- concatMap
- and
- or
- any
- splitAt 将该List在特定的位置断开。返回一个包含两个List的二元组
- takeWhile这一函数十分的实用。它从一个List中取元素，一旦遇到不符合条件的某元素就停止.
- dropWhile与此相似，不过它是扔掉符合条件的元素。一旦限制条件返回False，它就返回List的余下部分。方便实用!
- span
- break
- sort
- group 相邻
- inits
- tails
- find ,返回的是`Maybe a`
- findIndex
- findIndices
- elemIndex
- elemIndices
- zip3,zip4...
- zipWith3,zipWith4...
- lines
- unlines
- words
- unwords
- nub
- delete
- `\\` 差集操作
- union
- intersection
- insert
- 很多的更通用的替代版:generic
- groupby

`nub`,`delete`,`union`,`intsect`和`group`函数也有各自的通用替代版`nubBy`，`deleteBy`，`unionBy`，`intersectBy`和`groupBy`，它们的区别就是前一组函数使用(==)来测试是否相等，而带By的那组则取一个函数作参数来判定相等性，group就与groupBy (==)等价.

同样，`sort`，`insert`，`maximum`和`min`都有各自的通用版本。如`groupBy`类似，sortBy，insertBy，maximumBy和minimumBy都取一个函数来比较两个元素的大小。像sortBy的类型声明为:`sortBy :: (a -> a -> Ordering) -> [a] -> [a]`。前面提过，Ordering类型可以有三个值,`LT`，`EQ`和`GT`。`compare`取两个Ord类型类的元素作参数，所以`sort`与`sortBy compare`等价.

Maybe型的值只能为空或者单一元素

## Data.Char

如其名，`Data.Char`模块包含了一组用于处理字符的函数。由于字符串的本质就是一组字符的List，所以往往会在filter或是map字符串时用到它.

???
```plaintext
findKey :: (Eq k) => k -> [(k,v)] -> v  
findKey key xs = snd . head . filter (\(k,v) -> key == k) $ xs
```

## Data.Map
## Data.Set
## 建立自己的模块
