#include <iostream>
#include <memory> //allocator 在这个头文件里

int main(){
    std::allocator<int> int_alloc; //定义了一个alloc
                                   //
    int *p = int_alloc.allocate(1); //申请一个
    *p = 100;
    std::cout << *p << "\n";
    int_alloc.deallocate(p,1); //释放
    std::cout << *p << "\n";

    return 0;
}
