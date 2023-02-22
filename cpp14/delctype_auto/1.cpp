#include "utils.hpp"

int a;

auto func1(){
    return static_cast<int&>(a);
}

decltype(auto) func2(){
    return static_cast<int&>(a);
}

decltype(auto) func3(){
    return static_cast<int&&>(a);
}

int main(){
    log("auto func1 return type : ",type_name<decltype(func1())>());
    log(type_name<decltype(func1)>());

    log("auto func1 return type : ",
            type_name<std::invoke_result_t<decltype(func1)>>());

    log("auto func2 return type : ",
            type_name<std::invoke_result_t<decltype(func2)>>());

    log("auto func3 return type : ",
            type_name<std::invoke_result_t<decltype(func3)>>());
    return 0;
}
