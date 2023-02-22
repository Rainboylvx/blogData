#include <iostream>

struct node {
    template<bool T = false>
    node(std::integral_constant<bool, T> = std::false_type{}) {
        std::cout << T << "\n";
    }
};

template<bool T = false>
void test(bool a = T) {
    std::cout << T << "\n";
}
int main(){
    node a;
    node b(std::true_type{});

    std::cout << "==" << "\n";
    test<true>();
    return 0;

} 
