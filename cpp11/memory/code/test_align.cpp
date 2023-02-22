#include <iostream>
#include <memory>
using namespace std;
int main(){
    char a[100];
    cout << (void*)a << "\n";

    void * p = (void*)a;

    std::size_t space = 100;
    std::align(4, 30, p, space);

    cout << p << "\n";
    cout << space << "\n";

    return 0;
}
