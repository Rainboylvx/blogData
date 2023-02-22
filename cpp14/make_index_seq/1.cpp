#include <bits/stdc++.h>

template <typename... Args, typename F, std::size_t... Idx>
constexpr void for_each_l(std::tuple<Args...>& t, F&& f, std::index_sequence<Idx...>) {
    (std::forward<F>(f)(std::get<Idx>(t)), ...);
}

void f1() { std::cout << 1 << std::endl; }
void f2() { std::cout << 2 << std::endl; }
void f3() { std::cout << 3 << std::endl; }

int main(){
    auto tp = std::make_tuple(10,8,7);
    for_each_l(tp, [](auto& item){
            std::cout << item << std::endl;
            }, std::make_index_sequence<std::tuple_size_v<decltype(tp)>>{});
    return 0;
}
