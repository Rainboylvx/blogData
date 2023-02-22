#include <iostream>
#include <type_traits>

using namespace std;
using type_b = std::integral_constant<int, 100>;
int main(){
    std::cout << type_b::value << std::endl;
    std::cout << type_b() << std::endl;
    return 0;
}
