/* author: Rainboy email: rainboylvx@qq.com  time: 2021年 09月 25日 星期六 20:31:33 CST */
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 1e6+5,maxe = 1e6+5; //点与边的数量

int n,m;
/* 定义全局变量 */

int main(int argc,char * argv[]){
    
    //通过async来获取异步操作结果
    std::future<int>  result = std::async([](){ 
            std::this_thread::sleep_for(std::chrono::milliseconds(5000));
            return 8; 
            });

    std::cout << "the future result : " << result.get() << std::endl;
    std::cout << "the future status : " << result.valid() << std::endl;

    try
    {
        result.wait();  //或者 result.get() ,会异常
        //因此std::future只能用于单线程中调用 ，多线程调用使用std::share_future();
    }
    catch (...)
    {
        std::cout << "get error....\n ";
    }
    return 0;
}
