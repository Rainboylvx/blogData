CXX=g++
CFLAGS=-g

SRC=$(wildcard *.cpp)
TARGET=$(patsubst %.cpp,%,$(SRC))

all: $(TARGET)
	@echo done

% : %.cpp
	$(CXX) $(CFLAGS) -o $@ $<

clean:
	rm -rf $(TARGET)
