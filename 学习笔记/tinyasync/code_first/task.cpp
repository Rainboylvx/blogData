#define TINYASYNC_TRACE
#include <iostream>
#include "tinyasync.h"

using namespace tinyasync;

Name f1 = "func1";
Name f2 = "func2";

Task func1(const Name & name) {
    std::cout << "begin func1" << std::endl;
    // co_await std::suspend_always{};
    // std::cout << "end func1" << std::endl;
    co_return;
}

Task func2(const Name & name) {
    auto t1 = func1(f1);
    std::cout << "co_wait t1" << std::endl;
    co_await t1;
    std::cout << "co_wait t1 endl" << std::endl;
    co_await std::suspend_always{};

}


int main(){
    auto t2 = func2(f2);
    t2.coroutine_handle().resume(); //让func2 执行起来
    return 0;
}
