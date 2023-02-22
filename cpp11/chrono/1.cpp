/* author: Rainboy email: rainboylvx@qq.com  time: 2022年 04月 13日 星期三 17:48:29 CST */
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 1e6+5,maxe = 1e6+5; //点与边的数量

int n,m;
/* 定义全局变量 */

int main(int argc,char * argv[]){
    auto now_time_point = std::chrono::system_clock::now();
    std::cout << sizeof(now_time_point) << std::endl;
    //std::cout << 
        //std::chrono::duration_cast<std::chrono::seconds>(now_time_point).count()
        //<< std::endl;
        //
        
        auto t = std::chrono::duration_cast<std::chrono::milliseconds>(now_time_point.time_since_epoch()).count();
    std::cout << 
        typeid(decltype(t)).name()
        //std::chrono::duration_cast<std::chrono::seconds>(now_time_point).count()
        << std::endl;
    std::size_t st = t;
    std::cout << st << std::endl;
    return 0;
}
