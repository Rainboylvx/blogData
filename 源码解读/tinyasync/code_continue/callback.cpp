#include <iostream>

struct callback {
    //定义一个函数指针
    using callback_ptr = void (*)(callback *,int a);

    callback_ptr m_ptr;
    void call(int a) {
        this->m_ptr(this,a);
    }
};

struct callbackImpl;
struct realCallback;


//中间类,
struct callbackImpl : public callback {

    //template 根据子类来设定 m_ptr 的值
    callbackImpl(realCallback *){
        m_ptr = bindRealCallback;
    }

    // 核心在于 
    // 利用template 给每一个子类产生一个static 绑定函数
    static void bindRealCallback(callback * p,int a);
};

struct realCallback: public callbackImpl {
    realCallback() : callbackImpl(this){}
    void on_callback(int a){
        std::cout << "get int : " << a << "\n";
    }
};

void callbackImpl::bindRealCallback(callback *p, int a) {
    realCallback * realCallback_ptr = static_cast<realCallback*>(p);
    realCallback_ptr -> on_callback(a);
}

int main(){
    realCallback rb;
    auto * base_p = static_cast<callback*>(&rb);
    base_p->call(100);
    return 0;
}
