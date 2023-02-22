//#include "future.hpp"
#include "../../easy_log.hpp"
#include <iostream>
#include <future>
#include <chrono>
#include <utility>
#include <thread>
#include <functional>
#include <memory>
#include <exception> 
#include <numeric>
#include <vector>
#include <cmath>
#include <string>

namespace future_ {

    ///
    // reference: http://www.cplusplus.com/reference/future/packaged_task/
    int test_packaged_task_1()
    {

        { // constructor/get_future/operator=/valid
	        std::packaged_task<int(int)> foo; // default-constructed
	        std::packaged_task<int(int)> bar([](int x) { return x * 2; }); // initialized

	        foo = std::move(bar); // move-assignment
	        std::cout << "valid: " << foo.valid() << "\n";
	        std::future<int> ret = foo.get_future(); // get future
	        std::thread(std::move(foo), 10).detach(); // spawn thread and call task

	        int value = ret.get(); // wait for the task to finish and get result
	        std::cout << "The double of 10 is " << value << ".\n";
        }

        { // reset/operator()
	        std::packaged_task<int(int)> tsk([](int x) { return x * 3; }); // package task

	        std::future<int> fut = tsk.get_future();
	        tsk(33);
	        std::cout << "The triple of 33 is " << fut.get() << ".\n";

	        // re-use same task object:
	        tsk.reset();
	        fut = tsk.get_future();
	        std::thread(std::move(tsk), 99).detach();
	        std::cout << "Thre triple of 99 is " << fut.get() << ".\n";
        }

        { // constructor/get_future
	        auto countdown = [](int from, int to) {
		        for (int i = from; i != to; --i) {
			        std::cout << i << '\n';
			        std::this_thread::sleep_for(std::chrono::seconds(1));
		        }
		        std::cout << "Lift off!\n";
		        return from - to;
	        };

	        std::packaged_task<int(int, int)> tsk(countdown); // set up packaged_task
	        std::future<int> ret = tsk.get_future(); // get future

	        std::thread th(std::move(tsk), 5, 0); // spawn thread to count down from 5 to 0

	        int value = ret.get(); // wait for the task to finish and get result
	        std::cout << "The countdown lasted for " << value << " seconds.\n";

	        th.join();
        }

	    return 0;
    }

    ///
    // reference: https://en.cppreference.com/w/cpp/thread/packaged_task
    int test_packaged_task_2()
    {
        { // lambda
	        std::packaged_task<int(int, int)> task([](int a, int b) { return std::pow(a, b);});
	        std::future<int> result = task.get_future();

	        task(2, 9);
	        std::cout << "task_lambda:\t" << result.get() << '\n';
        }

        { // bind
	        std::packaged_task<int()> task(std::bind([](int x, int y) { return std::pow(x, y); }, 2, 11));
	        std::future<int> result = task.get_future();

	        task();
	        std::cout << "task_bind:\t" << result.get() << '\n';
        }

        { // thread
	        std::packaged_task<int(int, int)> task([](int x, int y) { return std::pow(x, y); });
	        std::future<int> result = task.get_future();

	        std::thread task_td(std::move(task), 2, 10);
	        task_td.join();
	        std::cout << "task_thread:\t" << result.get() << '\n';
        }

	    return 0;
    }

    ///
    // reference: https://thispointer.com/c11-multithreading-part-10-packaged_task-example-and-tutorial/
    struct DBDataFetcher {
	    std::string operator()(std::string token)
	    {
		    // Do some stuff to fetch the data
		    std::string data = "Data From " + token;
		    return data;
	    }
    };

    int test_packaged_task_3()
    {
	    // Create a packaged_task<> that encapsulated a Function Object
	    std::packaged_task<std::string(std::string)> task(std::move(DBDataFetcher()));

	    // Fetch the associated future<> from packaged_task<>
	    std::future<std::string> result = task.get_future();

	    // Pass the packaged_task to thread to run asynchronously
	    std::thread th(std::move(task), "Arg");

	    // Join the thread. Its blocking and returns when thread is finished.
	    th.join();

	    // Fetch the result of packaged_task<> i.e. value returned by getDataFromDB()
	    std::string data = result.get();
	    std::cout << data << std::endl;

	    return 0;
    }

    ///
    // reference: https://stackoverflow.com/questions/18143661/what-is-the-difference-between-packaged-task-and-async
    int test_packaged_task_4()
    {
	    // sleeps for one second and returns 1
	    auto sleep = []() {
		    std::this_thread::sleep_for(std::chrono::seconds(1));
		    return 1;
	    };

        { // std::packaged_task
	        // >>>>> A packaged_task won't start on it's own, you have to invoke it
	        std::packaged_task<int()> task(sleep);

	        auto f = task.get_future();
	        task(); // invoke the function

	        // You have to wait until task returns. Since task calls sleep
	        // you will have to wait at least 1 second.
	        std::cout << "You can see this after 1 second\n";

	        // However, f.get() will be available, since task has already finished.
	        std::cout << f.get() << std::endl;
        }

        { // std::async
	        // >>>>> On the other hand, std::async with launch::async will try to run the task in a different thread :
	        auto f = std::async(std::launch::async, sleep);
	        std::cout << "You can see this immediately!\n";

	        // However, the value of the future will be available after sleep has finished
	        // so f.get() can block up to 1 second.
	        std::cout << f.get() << "This will be shown after a second!\n";
        }

	    return 0;
    }

} // namespace future_

using namespace future_;
int main(){
    test_packaged_task_4();
    return 0;
}
