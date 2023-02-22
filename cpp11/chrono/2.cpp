//一个例子
#include <iostream>
#include <typeinfo>
#include <chrono>


using namespace std;

// 使用 D s ms 等 literal
using namespace std::chrono_literals;

int main(){
    
    // 系统时钟 system_clock 求出当前时间点
    auto t1 = std::chrono::system_clock::now();
    // t1 的类型为 
    // std::chrono::time_point
    //          <std::chrono::system_clock,
    //          std::chrono::duration<long,std::ratio<1l,10000000000l>
    //          >
    // cout <<type
    //
    //
    //
    // 转换
    std::chrono::time_point<std::chrono::system_clock, std::chrono::seconds> t2
        = std::chrono::time_point_cast<std::chrono::seconds>(t1);
    auto t3 = t2 + 100s;

    cout << " t3 > t2 " << std::boolalpha << (t3 > t2 ) << "\n";

    //可以运行
    std::chrono::seconds duration_1 = t3 - t2;

    std::cout << "t3 - t2 -> duration_1 count() = " <<   duration_1.count() << " seconds\n";
    std::cout 
        << "t1.time_since_epoch() = "
        << t1.time_since_epoch() << "\n";

    std::cout 
        << "t2.time_since_epoch() = "
        << t2.time_since_epoch() << "\n";


    std::cout 
        << "t3.time_since_epoch() = "
        << t3.time_since_epoch() << "\n";
    
    return 0;
}
