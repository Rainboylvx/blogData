#include <iostream>
#include <functional>

int main(){
    int a = 10;
    std::reference_wrapper<int> t1(a);
    t1.get() = 11;
    std::cout << a << std::endl;
    return 0;
}
