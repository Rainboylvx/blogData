CXX=g++
CFLAGS= -std=c++17 -g

SRC=$(wildcard *.cpp)
TARGET=$(patsubst %.cpp,%.out,$(SRC))
INCLUDE = ../../common_hpp

all: $(TARGET)
	@echo done

%.out : %.cpp
	$(CXX) $(CFLAGS) -o $@ $< -I$(INCLUDE)

clean:
	rm -rf $(TARGET)
