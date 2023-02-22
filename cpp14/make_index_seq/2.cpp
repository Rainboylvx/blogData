#include <iostream>

template<typename T,T... ints>
struct integer_sequence {
    using value_type = T;
    static constexpr size_t size() noexcept {
        return sizeof...(ints);
    }
};

template<typename T,T... ints>
void print(integer_sequence<T, ints... >){
    ((std::cout << ints << ' '),...); //fold expression
    std::cout  << std::endl;
}


int main(){
    print(integer_sequence<int, 1,2,3,4,5>{});
    std::make_index_sequence<10> a;
    return 0;
}
