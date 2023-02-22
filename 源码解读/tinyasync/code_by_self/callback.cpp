//实现 不基于的虚类的虚函数的类
// 动态性
// a -> b -> c
// 中间层的类b，实现基于不同的类c，重载不同的函数
// 
// 底层次原理，函数重载
// b类的构造函数是重载型的,可以根据c类的指针的重载相应的函数
#include <iostream>

// ====== 最基本原理 ================ 
struct A {
    using call_ptr = void (*)(A *,int);
    
    call_ptr m_callback;

    void do_call(int a){
        this->m_callback(this,a);
    }

};

struct B : public A {
    
    template<typename U>
    B(U * drived){
        this->m_callback = b_do_call<U>;
    }

    template<typename U>
    static void b_do_call(A * t,int a){
        auto call = static_cast<U*>(t);
        //调用
        call->on_callback(a);
    }

};

struct C1 : public B {
    
    C1() : B(this) {}

    void on_callback(int a){
        std::cout << "on call back at struct C1,parameter a = " << a << "\n";
    }
};

struct C2 : public B {
    
    C2() : B(this) {}

    void on_callback(int a){
        std::cout << "on call back at struct C2,parameter a = " << a << "\n";
    }
};



// ====== 最基本原理 结束 ================ 

int main(){
    C1 c1;
    C2 c2;

    auto a1 = static_cast<A*>(&c1);
    auto a2 = static_cast<A*>(&c2);

    a1->do_call(100);// on call back at struct C1
    a2->do_call(200);// on call back at struct C2
    return 0;
}
