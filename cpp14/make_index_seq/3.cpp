/* author: Rainboy email: rainboylvx@qq.com  time: 2022年 01月 27日 星期四 23:47:35 CST */
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 1e6+5,maxe = 1e6+5; //点与边的数量

int n,m;
/* 定义全局变量 */

template<typename T,T ints>
using int_seq = integer_sequence<T, __integer_pack(ints)...>;
    //using make_integer_sequence
//#if __has_builtin(__make_integer_seq)
      //= __make_integer_seq<integer_sequence, _Tp, _Num>;
//#else
      //= integer_sequence<_Tp, __integer_pack(_Num)...>;
int main(int argc,char * argv[]){
    int_seq<int,3> a;
    std::cout << a.size() << std::endl;
    std::cout << int_seq<int,4>::size() << std::endl;
    return 0;
}
