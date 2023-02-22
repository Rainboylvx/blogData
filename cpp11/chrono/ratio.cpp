// std::chrono::ratio 时间精度的使用 

#include <iostream>
#include <ratio>

using namespace std;

int main(){
    std::ratio<3, 6> x1;
    cout << "x1 num = " << decltype(x1)::num << endl;
    cout << "x1 den = " << decltype(x1)::den << endl;
    return 0;
}
