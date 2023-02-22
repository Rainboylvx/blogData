#include "utils.hpp"

int main(){
    int a;
    log(
            type_name<decltype(a)>()

            );
    log(
            type_name<decltype((a))>()

            );
    return 0;
}
