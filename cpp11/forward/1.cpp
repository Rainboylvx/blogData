#include <iostream>
#include <type_traits>
using namespace std;

struct node { };

template<typename T>
void wrapper(T&& t){ // 万能引用
    cout << "T is lvalue reference: ";
    cout << is_lvalue_reference<T>::value << endl;
    cout << "T is rvalue reference: ";
    cout << is_rvalue_reference<T>::value << endl;
    cout << typeid(T).name() << endl;

    cout << "t is lvalue reference: ";
    cout << is_lvalue_reference<decltype(t)>::value << endl;
    cout << "t is rvalue reference: ";
    cout << is_rvalue_reference<decltype(t)>::value << endl;
    cout << typeid(t).name() << endl;
}

int main(){
    wrapper(node()); // 传递一个右值 T 是node 类型
    cout << "=====================" << endl;
    node a;
    wrapper(a); // T 是 node & 类型
    return 0;
}
