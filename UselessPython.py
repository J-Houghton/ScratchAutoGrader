import math

class BasicPythonDemo:

    def __init__(self):
        # Basic data types:
        self.integer_type = 10
        self.float_type = 20.5
        self.string_type = "Hello, World!"
        self.boolean_type = True``

        # List (array) data type:
        self.list_type = [1, 2, 3, 4, 5]

        # Tuple (immutable array) data type:
        self.tuple_type = (1, 2, 3, 4, 5)

        # Dictionary (key-value pairs) data type:
        self.dict_type = {
            "name": "John",
            "age": 30,
            "is_student": False
        }

    def display_basic_types(self):
        print("Basic types in Python:")
        print(f"Integer: {self.integer_type}")
        print(f"Float: {self.float_type}")
        print(f"String: {self.string_type}")
        print(f"Boolean: {self.boolean_type}")
        print(f"List: {self.list_type}")
        print(f"Tuple: {self.tuple_type}")
        print(f"Dictionary: {self.dict_type}")

    def check_integer(self):
        if self.integer_type > 5:
            print("The integer is greater than 5!")
        elif self.integer_type == 5:
            print("The integer is equal to 5!")
        else:
            print("The integer is less than 5!")

    def for_loop_example(self):
        print("\nFor loop example:")
        for i in range(5):
            print(i)

    def while_loop_example(self):
        print("\nWhile loop example:")
        counter = 0
        while counter < 5:
            print(counter)
            counter += 1

    def greet(self, name):
        return f"Hello, {name}!"

    def demonstrate_math_module(self):
        print("\nUsing math module:")
        print(f"Square root of 16 is: {math.sqrt(16)}")


if __name__ == "__main__":
    demo = BasicPythonDemo()
    demo.display_basic_types()
    demo.check_integer()
    demo.for_loop_example()
    demo.while_loop_example()
    print("\nFunction call example:")
    print(demo.greet("Alice"))
    demo.demonstrate_math_module()
