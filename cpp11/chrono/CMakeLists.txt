cmake_minimum_required (VERSION 3.8)
project(chrono_test)

add_compile_options(-std=c++11 -Wfatal-errors -g -march=native)
message("Compiler: ${CMAKE_CXX_COMPILER_ID}")

aux_source_directory(. SRC_LIST)
foreach(cppfile ${SRC_LIST})
    get_filename_component(withoutExtNam ${cppfile} NAME_WE)
    add_executable(${withoutExtNam}.out ${cppfile})
endforeach(cppfile ${SRC_LIST})



# include_directories(../include)

# add_subdirectory("some_fold")

# target_link_libraries(test PRIVATE Threads::Threads)
