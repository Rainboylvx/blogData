#include <iostream>
#include <memory>

class A;
class B;

class A {
public:
    // A 或 B 中至少有一个使用 weak_ptr
    std::weak_ptr<B> pointer;
    ~A() {
        std::cout << "A 被销毁" << std::endl;
    }
};
class B {
public:
    std::shared_ptr<A> pointer;
    ~B() {
        std::cout << "B 被销毁" << std::endl;
    }
};
int main() {
    {
        std::shared_ptr<A> a = std::make_shared<A>();
        std::shared_ptr<B> b = std::make_shared<B>();
        a->pointer = b;
        b->pointer = a;
        // a中的pointer是弱引用 所以b的计数为1
        std::cout << "b.use_count()= " << b.use_count() <<std::endl;
    }

    //把b释放,引用减一 到0了
    //就把b批向的内存释放
    //a也释放,但a的计数从2->1
    
    //B被释放时,B里的 pointer被释放,a的引用计数减为0
    //A被释g
    // weak_ptr 它的唯一作用就是用于检查 std::shared_ptr 是否存在，expired() 方法在资源未被释放时，会返回 true，否则返回 false。
    return 0;
}
