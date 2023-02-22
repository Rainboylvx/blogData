//是否(x-1+y) & -y 的规律符合所有的y 也就是y可以不是2^x
//[c++ 向上取整为8的倍数，或者2^x的倍数 - SneakyCrab - 博客园](https://www.cnblogs.com/SneakyCrab/p/6101093.html)
#include <iomanip>
#include <iostream>
#include <bitset>
using namespace std;
int main(){
    cout << hex << -8 << "\n";
    cout << hex << ~(8-1) << "\n";
    // 结论 -8 == ~(8-1)
    cout << "    ";
    for(int i = 1;i <= 10 ; i++ ) {
        cout << setw(2) << i << " ";
    }
    std::cout << "\n" ;

    for(int i = 10;i <= 100 ; i++ ) {
        cout << dec << i << ": ";
        for(int j=1;j<=10;++j){
            int c = (i-1+j) & -j;
            cout << c << " ";
        }
        cout << "\n";
    }
    // 结论: 只有 当y是2^x 才符合
    return 0;
}
