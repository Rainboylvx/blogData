/* author: Rainboy email: rainboylvx@qq.com  time: 2022年 07月 22日 星期五 17:22:25 CST */
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 1e6+5,maxe = 1e6+5; //点与边的数量

int n,m;
/* 定义全局变量 */
int main(int argc,char * argv[]){
    
    auto fib = [&](auto&& fib,int n) {
        if (n <= 1) return n;
        return fib(fib,n - 1) + fib(fib,n - 2);
    };
    auto i = fib(fib,7);
    std::cout << i << std::endl;
    return 0;
}
