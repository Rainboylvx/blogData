// 得用concept 来确定 函数是否 正常执行
// 对值就行特化
#include "utils.hpp"
#define mod 20123


template<typename T>
void func(T&& a ){

    std::cout << 
        type_name<T>()
        << std::endl;

}

int main(){
    int && a = 1;
    // int a = 1;
    log("func(1)");
    func(1); // T&& a
    log("func(a)");
    func(a); // int & a; T == int & ; int &&& -> int &
             
    log("func(a+1)");
    func(a+1); // int&& a

    return 0;
}
