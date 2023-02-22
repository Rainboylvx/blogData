#include <atomic>
#include <iostream>

int main(void)
{
    std::atomic_flag  atomic_flag_test = ATOMIC_FLAG_INIT;
    std::cout << "init atomic_flag_test "<<atomic_flag_test.test_and_set()<<std::endl;

    std::atomic_bool  atomic_bool_test1;
    std::atomic_init(&atomic_bool_test1,false);
    std::cout << "init atomic_bool_test1 "<<atomic_bool_test1<<std::endl;

    std::atomic<bool> atomic_bool_test2;
    std::atomic_init(&atomic_bool_test2,true);
    std::cout << "init atomic_bool_test2 "<<atomic_bool_test2<<std::endl;

    std::atomic<int> atomic_int_test1(100);
    std::cout << "init atomic_int_test1 "<<atomic_int_test1<<std::endl;

    std::atomic<int> atomic_int_test2;
    std::atomic_init(&atomic_int_test2,200);
    std::cout << "init atomic_int_test2 "<<atomic_int_test2<<std::endl;

}
