#include <iostream>
#include "utils.hpp"


template<typename T>
T&& my_forward(std::remove_reference_t<T>&& t) {
    log("in my_forward 1, type of t is ",type_name<decltype(t)>());
    return static_cast<T&&>(t);
}

template<typename T>
T&& my_forward(std::remove_reference_t<T>& t) {
    log("in my_forward 2, type of t is ",type_name<decltype(t)>());
    return static_cast<T&&>(t);
}

template<typename T>
void func2(T&& b){
    log("func2 argument type", type_name<decltype(b)>());
}

template<typename T>
void func1(T&& a){
    log("func1 argument type", type_name<decltype(a)>());
    //func2(std::forward<T>(a));
    func2(my_forward<T>(a));
}


int main(){
    int a = 1;
    func1(1); // argument type is int&&, T is int
    cout << "------------\n";
    func1(a); // argument type is int&, T is int&
              //
    cout << "------------\n";
    int&& b = my_forward<int&&>(1);

    log("b type : ",type_name<decltype(b)>());
    return 0;
}
