#inline namespace
```cpp
#include <stdio.h>

namespace Outer{

    inline
    namespace V2{
        void foo(){
            printf("V2::foo()\n");
        }
    }

    namespace V1{
        void foo(){
            printf("V1::foo()\n");
        }
    }
}

int main(){

    Outer::V1::foo();
    Outer::V2::foo();
    Outer::foo();
}
```
第23行，调用Outer中的默认名字空间V2的foo().   

用途：新版本的升级测试。foo升级到V2版本。如果升级不理想，可以把V1改成inline，V2改成非inline。这将就降级回旧版的foo函数。  

从前是用宏#ifdef V2  ...#endif之类的技术。使用inline namespace带来一个明显的好处是：可以同时使用新版本的foo和旧版本的foo（正如第21行所示）。

[C++ inline namespace - thomas76 - 博客园](https://www.cnblogs.com/thomas76/p/8707609.html)
