#include <iostream>

int main(){
    struct st1 {
        char a; 
    } ST1;
    std::cout << "sizeof st1: " << sizeof(st1) << "\n";
    std::cout << "sizeof ST1: " << sizeof(ST1) << "\n";

    struct st2 {
        char a; 
        char b; 
        char c; 
    } ST2;
    std::cout << "sizeof st2: " << sizeof(st2) << "\n";
    std::cout << "sizeof ST2: " << sizeof(ST2) << "\n";
    return 0;
}
