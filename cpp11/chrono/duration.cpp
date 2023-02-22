// duration 的使用
#include <iostream>
#include <chrono>

int main(){

    //创建 区间: 用int来存,精度为 1 seconds
    using sec = std::chrono::duration<int>;

    auto s1 = sec(10);
    std::cout << s1.count() << "\n";

    //
    std::cout << std::chrono::seconds::period::num << "\n";
    std::cout << std::chrono::seconds::period::den << "\n";
    return 0;
}
