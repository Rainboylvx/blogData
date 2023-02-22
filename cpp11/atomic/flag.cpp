#include <iostream>
#include <atomic>
using namespace std;
int main(){
    atomic_flag f = ATOMIC_FLAG_INIT;
    while( f.test_and_set(std::memory_order_acquire) ) //当这个为false 是会结束
        std::cout << "in test_and_set while" << std::endl;
    std::cout << "out test_and_set while" ;

    while( f.test_and_set(std::memory_order_acquire) )
        std::cout << "in test_and_set while" << std::endl;
    return 0;
}
