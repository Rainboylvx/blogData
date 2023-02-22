#include <iostream>
#include <string>
#include <unordered_map>
 
int main()
{
    // Create an unordered_map of three strings (that map to strings)
    std::unordered_map<std::string, std::string> u = {
        {"RED","#FF0000"},
        {"GREEN","#00FF00"},
        {"BLUE","#0000FF"}
    };
 
    std::cout << "Iterate and print keys and values of unordered_map, being explicit with\n"
                 "the type of the iterator, n:\n";
    for( const std::pair<std::string, std::string>& n : u ) {
        std::cout << "Key:[" << n.first << "] Value:[" << n.second << "]\n";
    }
 
    std::cout << "Iterate and print keys and values of unordered_map, using auto:\n";
    for( const auto& n : u ) {
        std::cout << "Key:[" << n.first << "] Value:[" << n.second << "]\n";
    }
 
    std::cout << "Iterate and print keys and values using structured binding (since C++17):\n";
    for( const auto& [key, value] : u ) {
        std::cout << "Key:[" << key << "] Value:[" << value << "]\n";
    }
 
    // Add two new entries to the unordered_map
    u["BLACK"] = "#000000";
    u["WHITE"] = "#FFFFFF";
 
    std::cout << "Output values by key:\n";
    std::cout << "The HEX of color RED is:[" << u["RED"] << "]\n";
    std::cout << "The HEX of color BLACK is:[" << u["BLACK"] << "]\n";

    std::cout << u.size() << std::endl;
    std::cout << u.bucket_count() << std::endl;
    std::cout << u.max_bucket_count() << std::endl;
    std::cout << std::distance(u.begin(),u.end()) << std::endl;
    std::cout << "RED" <<std::distance(u.find("RED"),u.end()) << std::endl;
    std::cout <<"GREEN" <<std::distance(u.find("GREEN"),u.end()) << std::endl;
    std::cout << "BLUE"<<std::distance(u.find("BLUE"),u.end()) << std::endl;
    std::cout <<"BLACK" <<std::distance(u.find("BLACK"),u.end()) << std::endl;
    std::cout <<"WHITE" <<std::distance(u.find("WHITE"),u.end()) << std::endl;
    std::cout << u.begin()->first << std::endl;
    std::cout << u.begin()->second<< std::endl;

}
