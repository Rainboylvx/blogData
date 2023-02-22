#include <type_traits>
#include <iostream>
#include <functional>

int main(){
    int a = 1;
    std::reference_wrapper<int> t1(a);

    t1.get() = 20;
    std::cout << "a = " << a << std::endl;

    using T = std::unwrap_reference_t<decltype(t1)>;
    T t2 = a;
    t2 = 30;
    std::cout << "a = " << a << std::endl;

    using t3=std::unwrap_reference_t<const std::reference_wrapper<int>>;
    std::cout << 
        typeid(t3).name()
        << std::endl;
    // type t3 is const std::reference_wrapper<int>
    return 0;
}
