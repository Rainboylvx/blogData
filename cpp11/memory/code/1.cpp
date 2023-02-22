#include <iostream>
#include <bitset>
using namespace std;

int main(){
    // i 是起点
    // j 对齐方式
    int E = 2;
    for(int i=10;i<=20;++i){
        for(int j=E;j<=E;++j){
            int y = 1 << j;
            cout << "dec : x,y : " << dec << i << " " << y << "\n";
            cout << "hex : x,y : " << hex << i << " " << y << "\n";
            int a = i-1+y;
            cout << "x-1+y : " << dec << a << " " << hex << a << " "<< bitset<32>(a) << "\n";
            cout << "-y : " << dec << -y << " " << hex << -y << " " << bitset<32>(-y) << "\n";
            int c = ((i-1+y) & -y);
            cout << "(x-1+y) & -y : " << dec << c << " "<< hex << c  << "\n";
            cout << bitset<32>(((i-1+y) & -y));
            cout << "\n\n";
        }
    }
    return 0;
}
