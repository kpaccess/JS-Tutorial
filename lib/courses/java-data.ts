import { Lesson, QuizQuestion } from '@/types'

export const lessons: Lesson[] = [
  // ─── WEEK 1: BASICS ───────────────────────────────────────────────────────
  {
    id: 'java-l1',
    week: 1, day: 1, level: 'basic', order: 1,
    title: 'Introduction to Java & Setup',
    description: 'Understand the Java virtual machine ecosystem and write your first compilation-based application.',
    minDurationMinutes: 60,
    content: `## What is Java?

Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It follows the **"Write Once, Run Anywhere" (WORA)** philosophy, meaning compiled Java code can run on all platforms that support Java without the need for recompilation.

### The Java Ecosystem
- **JVM (Java Virtual Machine)**: The engine that drives the Java code. It converts Java bytecode into machine language.
- **JRE (Java Runtime Environment)**: Contains the JVM and libraries required to run Java applications.
- **JDK (Java Development Kit)**: Contains the JRE plus development tools (compiler \`javac\`, debugger, etc.). You need this to write Java code.

### Your First Program
In Java, every line of executable code must be inside a class.

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

### Key Elements of HelloWorld:
- **public class HelloWorld**: Declares a class named \`HelloWorld\`. The class name must match the filename (\`HelloWorld.java\`).
- **public static void main**: The entry point of any Java application.
  - \`public\`: Accessible from anywhere.
  - \`static\`: Can be run without creating an instance of the class.
  - \`void\`: Does not return any value.
  - \`String[] args\`: Accept command-line arguments.
- **System.out.println()**: Prints text to the standard output.`,
    codeExample: `// Save as HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Mastery!");
        System.out.println("Platform version: " + System.getProperty("java.version"));
    }
}`,
  },
  {
    id: 'java-l2',
    week: 1, day: 2, level: 'basic', order: 2,
    title: 'Variables & Data Types',
    description: 'Learn about Java\'s static type system, primitive types, reference types, and type casting.',
    minDurationMinutes: 60,
    content: `## Java Data Types

Java is a **statically-typed** language, which means all variables must be declared before they can be used, and their type cannot change.

Java data types are divided into two main categories:
1. **Primitive Types**: Predefined by the language and named by a reserved keyword.
2. **Reference Types**: Created by the programmer (except for String, arrays, etc.) and point to objects in memory.

### Primitive Data Types

| Type | Size | Description | Example |
|------|------|-------------|---------|
| **byte** | 1 byte | Integer from -128 to 127 | \`byte b = 100;\` |
| **short** | 2 bytes | Integer from -32,768 to 32,767 | \`short s = 5000;\` |
| **int** | 4 bytes | Integer from -2B to 2B (Default) | \`int i = 42000;\` |
| **long** | 8 bytes | Large integer values (Suffix \`L\`) | \`long l = 15000000000L;\` |
| **float** | 4 bytes | Fractional numbers (Suffix \`f\`) | \`float f = 5.75f;\` |
| **double** | 8 bytes | Fractional numbers (Default) | \`double d = 19.99;\` |
| **boolean** | 1 bit | True or false values | \`boolean isJavaFun = true;\` |
| **char** | 2 bytes | Single character/ASCII value | \`char grade = 'A';\` |

### Type Casting
Type casting is when you assign a value of one primitive data type to another type.

- **Widening Casting (automatically)**: Converting a smaller type to a larger type size.
  \`int\` -> \`double\`
  \`\`\`java
  int myInt = 9;
  double myDouble = myInt; // Automatic casting: 9.0
  \`\`\`
- **Narrowing Casting (manually)**: Converting a larger type to a smaller type size.
  \`double\` -> \`int\`
  \`\`\`java
  double myDouble = 9.78;
  int myInt = (int) myDouble; // Manual casting: 9 (truncates decimal)
  \`\`\``,
    codeExample: `public class DataTypes {
    public static void main(String[] args) {
        int age = 25;
        double salary = 85000.50;
        char status = 'M';
        boolean active = true;

        System.out.println("Age: " + age);
        System.out.println("Salary (casted to int): " + (int)salary);
        System.out.println("Active: " + active);
    }
}`,
  },
  {
    id: 'java-l3',
    week: 1, day: 3, level: 'basic', order: 3,
    title: 'Operators & Expressions',
    description: 'Master arithmetic, assignment, relational, logical, and bitwise operators in Java.',
    minDurationMinutes: 60,
    content: `## Java Operators

Operators are symbols that perform operations on variables and values.

### Arithmetic Operators
Used to perform common mathematical operations:
- \`+\` (Addition)
- \`-\` (Subtraction)
- \`*\` (Multiplication)
- \`/\` (Division - truncates decimals for integers!)
- \`%\` (Modulus - returns division remainder)

### Relational (Comparison) Operators
Used to compare two values, returning a boolean:
- \`==\` (Equal to)
- \`!=\` (Not equal to)
- \`>\` (Greater than)
- \`<\` (Less than)
- \`>=\` (Greater than or equal to)
- \`<=\` (Less than or equal to)

### Logical Operators
Used to determine the logic between variables or values:
- \`&&\` (Logical AND - short-circuits)
- \`||\` (Logical OR - short-circuits)
- \`!\` (Logical NOT)

### Short-Circuit Evaluation
If the first condition of an \`&&\` expression is false, the second is not evaluated. Similarly, if the first condition of \`||\` is true, the second is skipped. This is critical for preventing runtime exceptions.

\`\`\`java
String str = null;
if (str != null && str.length() > 0) {
    // Safe! Does not throw NullPointerException because str != null is false,
    // causing the evaluation to short-circuit.
}
\`\`\``,
    codeExample: `public class OperatorsDemo {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        
        System.out.println("a / b = " + (a / b)); // Prints 3 (integer division)
        System.out.println("a % b = " + (a % b)); // Prints 1 (remainder)

        boolean result = (a > 5) && (b < 5);
        System.out.println("Logical AND result: " + result);
    }
}`,
  },
  {
    id: 'java-l4',
    week: 1, day: 4, level: 'basic', order: 4,
    title: 'Control Flow (if / switch)',
    description: 'Make decisions in your code using conditional branching, nested conditions, and modern switch expressions.',
    minDurationMinutes: 60,
    content: `## Conditionals in Java

### if-else Statement
Executes a block of code if a specified condition is true.

\`\`\`java
int score = 85;
if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else {
    System.out.println("Grade: F");
}
\`\`\`

### switch Statement
Selects one of many code blocks to be executed.
- Traditional switch statements require a \`break\` statement to prevent execution from "falling through" to the next block.

\`\`\`java
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:
        System.out.println("Weekend/Other");
}
\`\`\`

### Modern Switch Expressions (Java 14+)
Modern Java supports switch expressions, which return a value directly and use arrows (\`->\`) without requiring break statements.

\`\`\`java
String dayType = switch (day) {
    case 1, 2, 3, 4, 5 -> "Weekday";
    case 6, 7 -> "Weekend";
    default -> "Unknown";
};
\`\`\``,
    codeExample: `public class Conditionals {
    public static void main(String[] args) {
        int month = 4;
        String season = switch (month) {
            case 12, 1, 2 -> "Winter";
            case 3, 4, 5 -> "Spring";
            case 6, 7, 8 -> "Summer";
            case 9, 10, 11 -> "Autumn";
            default -> "Invalid Month";
        };
        System.out.println("Season: " + season);
    }
}`,
  },
  {
    id: 'java-l5',
    week: 1, day: 5, level: 'basic', order: 5,
    title: 'Loops & Iteration',
    description: 'Learn loop constructs (for, while, do-while) and control loop statements using break and continue.',
    minDurationMinutes: 60,
    content: `## Loops in Java

Loops are used to execute a block of code repeatedly as long as a specified condition is met.

### 1. for Loop
Used when you know exactly how many times you want to loop.

\`\`\`java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
\`\`\`

### 2. while Loop
Loops through a block of code as long as a specified condition is true.

\`\`\`java
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}
\`\`\`

### 3. do-while Loop
A variant of the while loop that executes the code block **once** before checking if the condition is true, then repeats the loop as long as the condition is true.

\`\`\`java
int count = 10;
do {
    System.out.println("Runs at least once");
} while (count < 5);
\`\`\`

### break and continue
- **break**: Exits the loop immediately.
- **continue**: Skips the current iteration and goes to the next condition evaluation.`,
    codeExample: `public class LoopsDemo {
    public static void main(String[] args) {
        System.out.println("Even numbers (skipping 4):");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 != 0) {
                continue; // Skip odd numbers
            }
            if (i == 4) {
                continue; // Skip 4 specifically
            }
            System.out.println(i);
        }
    }
}`,
  },

  // ─── WEEK 2: OBJECT-ORIENTED PROGRAMMING ──────────────────────────────────
  {
    id: 'java-l6',
    week: 2, day: 1, level: 'intermediate', order: 6,
    title: 'Classes & Objects',
    description: 'Master the foundation of Java: declaring classes, defining fields/methods, and instantiating objects.',
    minDurationMinutes: 60,
    content: `## Classes and Objects

Java is a pure Object-Oriented Programming (OOP) language. Everything in Java is associated with classes and objects.

- **Class**: A blueprint or template for creating objects. It defines the state (fields/attributes) and behavior (methods) of the object.
- **Object**: An instance of a class. When an object is created, it allocates memory to store the properties defined by the class.

### Creating a Class and Object
\`\`\`java
// Blueprint Class
class Car {
    String color;
    String model;

    void displayDetails() {
        System.out.println("Model: " + model + ", Color: " + color);
    }
}

// Main Class
public class Main {
    public static void main(String[] args) {
        Car myCar = new Car(); // Object Instantiation
        myCar.model = "Tesla Model 3";
        myCar.color = "Red";
        myCar.displayDetails(); // Invoking method
    }
}
\`\`\`

### Memory Allocation
In Java:
- **Objects** are allocated on the **Heap** memory.
- **Reference variables** pointing to these objects (like \`myCar\`) are stored on the **Stack**.
- Assigning one reference to another (\`Car anotherCar = myCar;\`) copies the reference address, not the object itself.`,
    codeExample: `class Dog {
    String name;
    int age;

    void bark() {
        System.out.println(name + " says: Woof Woof!");
    }
}

public class ObjectsDemo {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.name = "Buddy";
        d.age = 3;
        d.bark();
    }
}`,
  },
  {
    id: 'java-l7',
    week: 2, day: 2, level: 'intermediate', order: 7,
    title: 'Constructors & Method Overloading',
    description: 'Learn how to initialize objects with constructors, use the `this` reference, and overload methods.',
    minDurationMinutes: 60,
    content: `## Constructors

A **constructor** is a special block of code that is called when an object is instantiated. It has the same name as the class and has no return type (not even void).

- **Default Constructor**: Provided automatically by the compiler if no constructors are declared. It initializes instance variables with default values (0, null, false).
- **Parameterized Constructor**: Defined by the developer to initialize an object with custom initial values.

\`\`\`java
class Person {
    String name;
    
    // Parameterized constructor
    Person(String name) {
        this.name = name; // 'this' keyword resolves naming conflicts
    }
}
\`\`\`

### Method Overloading
Method overloading allows a class to have more than one method with the same name, as long as their parameter lists are different (different type, count, or order of parameters). It is a form of compile-time polymorphism.

\`\`\`java
class MathHelper {
    int add(int a, int b) {
        return a + b;
    }
    double add(double a, double b) { // Overloaded
        return a + b;
    }
}
\`\`\``,
    codeExample: `class Book {
    String title;
    double price;

    // Constructor Overloading
    Book() {
        this.title = "Unknown";
        this.price = 0.0;
    }

    Book(String title, double price) {
        this.title = title;
        this.price = price;
    }

    void show() {
        System.out.println("Book: " + title + ", Price: $" + price);
    }
}

public class ConstructorsDemo {
    public static void main(String[] args) {
        Book b1 = new Book();
        Book b2 = new Book("Effective Java", 45.00);
        b1.show();
        b2.show();
    }
}`,
  },
  {
    id: 'java-l8',
    week: 2, day: 3, level: 'intermediate', order: 8,
    title: 'Encapsulation & Access Modifiers',
    description: 'Protect object state using private attributes, getters/setters, and Java access modifiers.',
    minDurationMinutes: 60,
    content: `## Encapsulation

Encapsulation is the OOP principle of binding data (fields) and code (methods) together as a single unit, and restricting direct access to some of the object's components.
This is achieved by:
1. Declaring class fields as \`private\`.
2. Providing public \`getter\` and \`setter\` methods to read and modify the fields with validation.

\`\`\`java
public class Account {
    private double balance; // Hidden field

    public double getBalance() { // Getter
        return this.balance;
    }

    public void deposit(double amount) { // Setter with validation
        if (amount > 0) {
            this.balance += amount;
        }
    }
}
\`\`\`

### Java Access Modifiers

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| \`private\` | Yes | No | No | No |
| \`default\` (no modifier) | Yes | Yes | No | No |
| \`protected\` | Yes | Yes | Yes | No |
| \`public\` | Yes | Yes | Yes | Yes |`,
    codeExample: `class Student {
    private String name;
    private int score;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getScore() { return score; }
    public void setScore(int score) {
        if (score >= 0 && score <= 100) {
            this.score = score;
        } else {
            System.out.println("Invalid score ignored.");
        }
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        Student s = new Student();
        s.setName("Alice");
        s.setScore(95);
        System.out.println(s.getName() + " scored " + s.getScore());
    }
}`,
  },
  {
    id: 'java-l9',
    week: 2, day: 4, level: 'intermediate', order: 9,
    title: 'Inheritance & Overriding',
    description: 'Learn code reuse using class inheritance, method overriding, dynamic binding, and the super keyword.',
    minDurationMinutes: 60,
    content: `## Inheritance

Inheritance is the mechanism by which one class (subclass/child class) acquires the fields and methods of another class (superclass/parent class). It promotes code reusability and builds relationships (IS-A) between classes.
- Java uses the \`extends\` keyword.
- Java does **NOT** support multiple inheritance of classes (e.g. \`class A extends B, C\` is illegal) to avoid the "Diamond Problem".

\`\`\`java
class Animal {
    void eat() {
        System.out.println("Eating...");
    }
}

class Dog extends Animal { // Subclass
    void bark() {
        System.out.println("Barking...");
    }
}
\`\`\`

### Method Overriding
When a subclass provides a specific implementation of a method that is already defined in its superclass, it is called **method overriding**.
- Overridden methods should be marked with the \`@Override\` annotation.
- The method signature (name, parameter list, and return type) must be identical.
- Access level cannot be more restrictive than the overridden method.

### The \`super\` Keyword
Used to refer to immediate parent class objects, invoke parent constructors, or call parent overridden methods:
\`\`\`java
super.eat(); // Calls parent eat() method
\`\`\``,
    codeExample: `class Employee {
    double getSalary() { return 50000; }
}

class Manager extends Employee {
    @Override
    double getSalary() {
        return super.getSalary() + 20000; // Salary + bonus
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Employee emp = new Manager(); // Polymorphic assignment
        System.out.println("Salary: $" + emp.getSalary()); // Prints 70000.0
    }
}`,
  },
  {
    id: 'java-l10',
    week: 2, day: 5, level: 'intermediate', order: 10,
    title: 'Abstract Classes & Interfaces',
    description: 'Understand abstraction using abstract classes and interfaces, multiple inheritance of types, and default methods.',
    minDurationMinutes: 60,
    content: `## Abstraction in Java

Abstraction is the process of hiding implementation details and showing only functional properties to the user.

### Abstract Classes
- Cannot be instantiated.
- Declared using the \`abstract\` keyword.
- Can contain both abstract methods (without body) and concrete methods (with body).

\`\`\`java
abstract class Shape {
    abstract void draw(); // Abstract method
    void display() { System.out.println("Showing shape"); } // Concrete method
}
\`\`\`

### Interfaces
An interface is a blueprint of a class. It contains only static constants and abstract methods (prior to Java 8).
- Declared using the \`interface\` keyword.
- Classes use the \`implements\` keyword. A class can implement **multiple** interfaces.
- Starting with Java 8, interfaces can have **default** and **static** methods with implementations.

\`\`\`java
interface Flyable {
    void fly(); // implicitly public abstract
    default void glide() { System.out.println("Gliding..."); } // Default method
}
\`\`\``,
    codeExample: `interface Vehicle {
    void start();
}

interface GPS {
    void track();
}

class AutonomousCar implements Vehicle, GPS {
    public void start() { System.out.println("Engine started."); }
    public void track() { System.out.println("Position tracked."); }
}

public class AbstractionDemo {
    public static void main(String[] args) {
        AutonomousCar car = new AutonomousCar();
        car.start();
        car.track();
    }
}`,
  },

  // ─── WEEK 3: CORE JAVA APIS ───────────────────────────────────────────────
  {
    id: 'java-l11',
    week: 3, day: 1, level: 'advanced', order: 11,
    title: 'Arrays & ArrayLists',
    description: 'Work with fixed-size arrays and dynamic ArrayLists, including element access and list manipulation.',
    minDurationMinutes: 60,
    content: `## Arrays & ArrayLists

### 1. Java Arrays (Fixed-Size)
An array is a container object that holds a fixed number of values of a single type. The length of an array is established when the array is created.

\`\`\`java
int[] numbers = new int[5]; // Fixed size of 5
numbers[0] = 10;
int length = numbers.length; // Property length
\`\`\`

### 2. ArrayList (Dynamic Sizing)
Part of \`java.util\` package. It implements the List interface and automatically resizes itself when elements are added or removed.
- Can only store reference types (objects). To store primitives, Java uses wrapper classes (like \`Integer\` instead of \`int\`) via **autoboxing**.

\`\`\`java
import java.util.ArrayList;

ArrayList<String> list = new ArrayList<>();
list.add("Java");
list.add("Kotlin");
String first = list.get(0); // Accessing
int size = list.size(); // Method size()
\`\`\`

### Comparison

| Feature | Array | ArrayList |
|---------|-------|-----------|
| **Sizing** | Fixed | Dynamic |
| **Data Types** | Primitive & Objects | Objects Only |
| **Length check** | \`arr.length\` | \`list.size()\` |
| **Performance** | Faster | Slightly slower due to resizing overhead |`,
    codeExample: `import java.util.ArrayList;

public class ArrayDemo {
    public static void main(String[] args) {
        // Primitive array
        int[] arr = {1, 2, 3};
        System.out.println("Array length: " + arr.length);

        // ArrayList with wrapper class Integer (Autoboxing)
        ArrayList<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);
        
        list.remove(1); // Removes element at index 1 (20)
        System.out.println("ArrayList size: " + list.size());
        System.out.println("ArrayList content: " + list);
    }
}`,
  },
  {
    id: 'java-l12',
    week: 3, day: 2, level: 'advanced', order: 12,
    title: 'Exception Handling',
    description: 'Learn defensive programming: catch runtime errors, checked vs unchecked exceptions, and try-with-resources.',
    minDurationMinutes: 60,
    content: `## Exception Handling in Java

An exception is an unwanted or unexpected event, which occurs during the execution of a program, disrupting the normal flow of instructions.

### The try-catch-finally Block
- **try**: Encloses code that might throw an exception.
- **catch**: Handles the exception. You can have multiple catch blocks.
- **finally**: Code that is *always* executed, regardless of whether an exception is thrown or caught. Often used for cleanup.

\`\`\`java
try {
    int data = 50 / 0; // Throws ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Division by zero!");
} finally {
    System.out.println("Cleanup executed.");
}
\`\`\`

### Checked vs Unchecked Exceptions
- **Checked Exceptions**: Checked at compile-time. Code will not compile if these are not caught or declared in the method signature using the \`throws\` keyword. (e.g. \`IOException\`).
- **Unchecked Exceptions (RuntimeExceptions)**: Checked at runtime. They usually occur due to programming bugs (e.g., \`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`).

### Try-With-Resources (Java 7+)
Automatically closes resources (like files or database connections) that implement the \`AutoCloseable\` interface.

\`\`\`java
try (BufferedReader br = new BufferedReader(new FileReader("test.txt"))) {
    System.out.println(br.readLine());
} catch (IOException e) {
    e.printStackTrace();
} // br is automatically closed here!
\`\`\``,
    codeExample: `class InvalidAgeException extends Exception { // Custom checked exception
    InvalidAgeException(String msg) { super(msg); }
}

public class ExceptionsDemo {
    static void checkAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Access Denied: Under 18");
        }
    }

    public static void main(String[] args) {
        try {
            checkAge(15);
        } catch (InvalidAgeException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}`,
  },
  {
    id: 'java-l13',
    week: 3, day: 3, level: 'advanced', order: 13,
    title: 'Java Collections Framework',
    description: 'Explore core data structures including List, Set, Map, and utility classes for searching and sorting.',
    minDurationMinutes: 60,
    content: `## The Collection Framework

Java Collections provide interfaces and classes to handle groups of objects efficiently.

### Core Interfaces
1. **List**: An ordered collection that allows duplicate elements (e.g., \`ArrayList\`, \`LinkedList\`).
2. **Set**: A collection that cannot contain duplicate elements (e.g., \`HashSet\`, \`TreeSet\`).
3. **Map**: An object that maps keys to values, keys cannot be duplicates (e.g., \`HashMap\`, \`TreeMap\`).

### HashMap, HashSet, ArrayList Usage
\`\`\`java
// HashMap (Key-Value pairs)
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 5);
map.get("Apple"); // 5

// HashSet (Unique values)
Set<String> set = new HashSet<>();
set.add("A");
set.add("A"); // Duplicate ignored, size is 1
\`\`\`

### Iteration methods
You can iterate collections using enhanced for-loops or the Stream API:
\`\`\`java
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
\`\`\``,
    codeExample: `import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        // HashSet prevents duplicates
        Set<String> uniqueNames = new HashSet<>();
        uniqueNames.add("Bob");
        uniqueNames.add("Alice");
        uniqueNames.add("Bob"); // Duplicate
        System.out.println("Unique Names: " + uniqueNames); // [Alice, Bob]

        // HashMap maps Keys to Values
        Map<String, Double> products = new HashMap<>();
        products.put("Laptop", 999.99);
        products.put("Phone", 499.50);
        System.out.println("Laptop price: $" + products.get("Laptop"));
    }
}`,
  },
  {
    id: 'java-l14',
    week: 3, day: 4, level: 'advanced', order: 14,
    title: 'String Manipulation & Immutability',
    description: 'Understand the String pool, String immutability, and efficient modifications with StringBuilder.',
    minDurationMinutes: 60,
    content: `## String Manipulation

In Java, **String is an object**, but it behaves differently from standard objects due to optimization features.

### String Immutability
Strings are **immutable**. Once created, their values cannot be changed in memory. Any modification generates a new String object.
- **Why?** Security, synchronization, and the **String Constant Pool** (which caches strings to save heap space).

\`\`\`java
String s1 = "Hello";
String s2 = "Hello"; // Points to the same object in the String Pool
String s3 = new String("Hello"); // Forces creation of a new heap object!

System.out.println(s1 == s2); // true (same reference)
System.out.println(s1 == s3); // false (different reference address)
System.out.println(s1.equals(s3)); // true (checks contents)
\`\`\`
> **Rule of thumb**: Always compare String contents using \`.equals()\`, never \`==\`.

### StringBuilder and StringBuffer
Since String is immutable, modifying a string in a loop creates many temporary objects. To solve this, use:
- **StringBuilder**: Mutable char array, not thread-safe (extremely fast, preferred for single threads).
- **StringBuffer**: Mutable, thread-safe (synchronized, slightly slower).

\`\`\`java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World"); // Modifies the object in place
System.out.println(sb.toString()); // "Hello World"
\`\`\``,
    codeExample: `public class StringDemo {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        
        // Inefficient
        String s = "";
        for (int i = 0; i < 10000; i++) {
            s += i;
        }
        
        // Efficient using StringBuilder
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10000; i++) {
            sb.append(i);
        }
        
        System.out.println("Finished string concatenations.");
    }
}`,
  },
  {
    id: 'java-l15',
    week: 3, day: 5, level: 'advanced', order: 15,
    title: 'Java I/O (Input & Output)',
    description: 'Learn console input, reading and writing files with streams, and modern java.nio files processing.',
    minDurationMinutes: 60,
    content: `## Java Input / Output

Java I/O is used to process input and output data. Java uses **Streams** (flows of data) to perform I/O operations.

### Console Input (Scanner)
The \`Scanner\` class is used to get user input from the console:

\`\`\`java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
System.out.print("Enter username: ");
String userName = scanner.nextLine();
\`\`\`

### File Writing (BufferedWriter)
\`\`\`java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    writer.write("Hello from Java File I/O!");
} catch (IOException e) {
    e.printStackTrace();
}
\`\`\`

### File Reading (BufferedReader)
\`\`\`java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

try (BufferedReader reader = new BufferedReader(new FileReader("output.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
\`\`\``,
    codeExample: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class IoDemo {
    public static void main(String[] args) {
        // Modern Java NIO.2 file write and read
        String path = "sample.txt";
        try {
            Files.writeString(Paths.get(path), "Line 1\\nLine 2");
            List<String> lines = Files.readAllLines(Paths.get(path));
            System.out.println("File Content: " + lines);
            Files.delete(Paths.get(path)); // Cleanup
        } catch (IOException e) {
            System.out.println("I/O error occurred: " + e.getMessage());
        }
    }
}`,
  },

  // ─── WEEK 4: ADVANCED TOPICS ──────────────────────────────────────────────
  {
    id: 'java-l16',
    week: 4, day: 1, level: 'advanced', order: 16,
    title: 'Generics & Wildcards',
    description: 'Enforce compile-time type safety with Generic classes, methods, and wildcard constraints.',
    minDurationMinutes: 60,
    content: `## Java Generics

Generics add stability to your code by making bugs detectable at compile time. They enable types (classes and interfaces) to be parameters when defining classes, interfaces, and methods.

### Generic Class
\`\`\`java
class Box<T> { // T stands for Type
    private T t;
    public void set(T t) { this.t = t; }
    public T get() { return t; }
}
\`\`\`

### Type Erasure
Java implements generics using **type erasure**. The compiler replaces all type parameters in generic classes with their bounds (or \`Object\` if unbounded). The compiled bytecode contains only ordinary classes, interfaces, and casts, maintaining backward compatibility with older JVM versions.

### Wildcards
The wildcard character \`?\` represents an unknown type.
- **Unbounded Wildcard**: \`List<?>\`
- **Upper Bounded Wildcard**: \`List<? extends Number>\` (accepts Number and its subclasses like Integer, Double)
- **Lower Bounded Wildcard**: \`List<? super Integer>\` (accepts Integer and its superclasses like Number, Object)`,
    codeExample: `import java.util.List;
import java.util.ArrayList;

public class GenericsDemo {
    // Upper-bounded wildcard method
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0.0;
        for (Number n : list) {
            sum += n.doubleValue();
        }
        return sum;
    }

    public static void main(String[] args) {
        List<Integer> li = List.of(1, 2, 3);
        System.out.println("Sum = " + sumOfList(li));
        
        List<Double> ld = List.of(1.5, 2.5, 3.5);
        System.out.println("Sum = " + sumOfList(ld));
    }
}`,
  },
  {
    id: 'java-l17',
    week: 4, day: 2, level: 'advanced', order: 17,
    title: 'Lambda Expressions & Functional Interfaces',
    description: 'Learn the functional style of Java: write concise lambda functions and work with built-in functional interfaces.',
    minDurationMinutes: 60,
    content: `## Lambda Expressions (Java 8+)

Lambda expressions are anonymous functions (functions without names) that allow you to treat functionality as a method argument. They make code much more concise.

\`\`\`java
// Traditional Anonymous Class
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running!");
    }
};

// Lambda version
Runnable r2 = () -> System.out.println("Running!");
\`\`\`

### Functional Interfaces
A lambda expression can only implement a **functional interface** — an interface containing exactly **one abstract method**. They can be marked with the optional \`@FunctionalInterface\` annotation.

### Built-in Functional Interfaces (\`java.util.function\`)
- **Predicate<T>**: Takes an argument, returns boolean (\`t -> boolean\`).
- **Function<T, R>**: Takes one argument, returns a result (\`t -> r\`).
- **Consumer<T>**: Takes an argument, returns nothing (performs action) (\`t -> void\`).
- **Supplier<T>**: Takes no argument, returns a result (\`() -> t\`).`,
    codeExample: `import java.util.function.Predicate;
import java.util.function.Function;

public class LambdasDemo {
    public static void main(String[] args) {
        // Predicate checks condition
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println("Is 4 even? " + isEven.test(4));

        // Function maps Input -> Output
        Function<String, Integer> lengthMapper = s -> s.length();
        System.out.println("Length of 'Java': " + lengthMapper.apply("Java"));
    }
}`,
  },
  {
    id: 'java-l18',
    week: 4, day: 3, level: 'advanced', order: 18,
    title: 'Streams API',
    description: 'Process collections of data declaratively with Stream filter, map, collect, and reduce.',
    minDurationMinutes: 60,
    content: `## Java Streams API

Introduced in Java 8, the Streams API is used to process collections of objects in a declarative manner. It supports functional-style operations like map, filter, reduce, and collect.
> Streams do not store data; they fetch data from a source (like collections) and process it without modifying the original source.

### Pipeline Operations
Streams operations are divided into:
1. **Intermediate Operations**: Return another stream, allowing chaining (lazy evaluation) (e.g. \`filter()\`, \`map()\`, \`sorted()\`).
2. **Terminal Operations**: Produce a result or side-effect and close the stream (e.g., \`collect()\`, \`forEach()\`, \`reduce()\`).

\`\`\`java
import java.util.List;
import java.util.stream.Collectors;

List<String> names = List.of("Alice", "Bob", "Charlie");
List<String> filtered = names.stream()
    .filter(name -> name.startsWith("A")) // Intermediate
    .map(String::toUpperCase)              // Intermediate
    .collect(Collectors.toList());        // Terminal
\`\`\``,
    codeExample: `import java.util.List;

public class StreamsDemo {
    public static void main(String[] args) {
        List<Integer> scores = List.of(90, 65, 80, 45, 95);

        // Find the sum of scores >= 80
        int sum = scores.stream()
            .filter(score -> score >= 80)
            .mapToInt(Integer::intValue)
            .sum();

        System.out.println("Sum of high scores: " + sum);
    }
}`,
  },
  {
    id: 'java-l19',
    week: 4, day: 4, level: 'advanced', order: 19,
    title: 'Multithreading & Concurrency',
    description: 'Write concurrent Java code using Threads, the Runnable interface, and basic synchronization mechanisms.',
    minDurationMinutes: 60,
    content: `## Multithreading

Multithreading is a process of executing multiple threads simultaneously to maximize CPU utilization.

### Creating a Thread
1. **Extending Thread Class**:
   \`\`\`java
   class MyThread extends Thread {
       public void run() { System.out.println("Thread running."); }
   }
   new MyThread().start();
   \`\`\`
2. **Implementing Runnable Interface (Preferred)**:
   \`\`\`java
   class MyRunnable implements Runnable {
       public void run() { System.out.println("Runnable running."); }
   }
   new Thread(new MyRunnable()).start();
   \`\`\`

### Thread Safety & Synchronization
When multiple threads share resources (e.g., modifying a shared variable), it can cause data corruption (Race Conditions).
- Use the **\`synchronized\`** keyword to ensure that only one thread can access the shared block/method at a time.

\`\`\`java
public class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++; // Thread-safe
    }
}
\`\`\``,
    codeExample: `public class MultithreadingDemo {
    private static int counter = 0;

    private static synchronized void increment() {
        counter++;
    }

    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) increment();
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) increment();
        });

        t1.start();
        t2.start();
        t1.join(); // Wait for t1 to finish
        t2.join(); // Wait for t2 to finish

        System.out.println("Final Counter: " + counter); // Should be 2000
    }
}`,
  },
  {
    id: 'java-l20',
    week: 4, day: 5, level: 'advanced', order: 20,
    title: 'SOLID Principles & Design Patterns',
    description: 'Learn architectural best practices: write clean OOP code following SOLID principles, Singleton, and Builder patterns.',
    minDurationMinutes: 60,
    content: `## Software Design in Java

### SOLID Principles
1. **S**ingle Responsibility: A class should have only one reason to change.
2. **O**pen/Closed: Open for extension, closed for modification.
3. **L**iskov Substitution: Subclasses should be substitutable for their base classes.
4. **I**nterface Segregation: Prefer many specific interfaces over one general-purpose interface.
5. **D**ependency Inversion: Depend on abstractions, not concretions.

### Design Patterns
- **Singleton**: Ensures a class has only one instance and provides a global access point to it.
- **Builder**: Separation of object construction from its representation, extremely useful for classes with many optional parameters.

\`\`\`java
// Thread-Safe Singleton
public class DatabaseConnection {
    private static DatabaseConnection instance;
    private DatabaseConnection() {}

    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}
\`\`\``,
    codeExample: `// Builder Pattern Demo
class User {
    private final String username;
    private final String email; // Optional

    private User(Builder builder) {
        this.username = builder.username;
        this.email = builder.email;
    }

    public static class Builder {
        private final String username; // Required
        private String email; // Optional

        public Builder(String username) { this.username = username; }
        public Builder email(String email) { this.email = email; return this; }
        public User build() { return new User(this); }
    }

    @Override
    public String toString() {
        return "User: " + username + " (Email: " + (email != null ? email : "none") + ")";
    }
}

public class DesignPatternsDemo {
    public static void main(String[] args) {
        User user = new User.Builder("john_doe")
                            .email("john@example.com")
                            .build();
        System.out.println(user);
    }
}`,
  },
]

export const quizQuestions: QuizQuestion[] = [
  // Lesson 1 – Intro to Java
  { id: 'java-q1-1', lessonId: 'java-l1', question: 'What does "WORA" stand for in Java\'s philosophy?', options: ['Write Once, Read Anywhere', 'Write Once, Run Anywhere', 'Win Once, Run Always', 'Web Oriented Runtime Application'], correctIndex: 1, explanation: 'WORA stands for "Write Once, Run Anywhere", which means compiled Java bytecode runs on any system with a JVM.' },
  { id: 'java-q1-2', lessonId: 'java-l1', question: 'Which component is responsible for executing Java bytecode directly?', options: ['JDK', 'JRE', 'JVM', 'javac'], correctIndex: 2, explanation: 'The JVM (Java Virtual Machine) executes the compiled bytecode and converts it to platform-specific machine code.' },
  { id: 'java-q1-3', lessonId: 'java-l1', question: 'What is the correct syntax for declaring the main method in Java?', options: ['public static void Main(String args)', 'public static void main(String[] args)', 'static public void main(string args[])', 'void main(String[] args)'], correctIndex: 1, explanation: 'The exact signature is public static void main(String[] args) or public static void main(String args[]).' },
  { id: 'java-q1-4', lessonId: 'java-l1', question: 'What must be true about the class name in a Java source file containing a public class?', options: ['It can be anything', 'It must start with lowercase letters', 'It must exactly match the filename (with a .java extension)', 'It must contain the main method'], correctIndex: 2, explanation: 'In Java, if a file contains a public class, the name of the class must exactly match the name of the file.' },
  { id: 'java-q1-5', lessonId: 'java-l1', question: 'Which command compiles a Java file named Program.java?', options: ['java Program.java', 'javac Program.java', 'compile Program.java', 'java Program.class'], correctIndex: 1, explanation: '\`javac\` is the compiler tool in the JDK. Running \`javac Program.java\` outputs Program.class (bytecode).' },

  // Lesson 2 – Variables
  { id: 'java-q2-1', lessonId: 'java-l2', question: 'Which primitive data type has a size of exactly 8 bytes?', options: ['int', 'float', 'long', 'short'], correctIndex: 2, explanation: 'Both long and double are 64-bit (8 bytes) primitive types. int is 4 bytes.' },
  { id: 'java-q2-2', lessonId: 'java-l2', question: 'What happens when you narrow cast a double value of 9.78 to an int?', options: ['It throws an exception', 'It rounds up to 10', 'It truncates the decimals to 9', 'It stays 9.78'], correctIndex: 2, explanation: 'Narrowing cast (int)myDouble truncates the decimal part completely, yielding 9.' },
  { id: 'java-q2-3', lessonId: 'java-l2', question: 'Which data type is statically verified as true or false in Java?', options: ['int', 'boolean', 'Boolean', 'String'], correctIndex: 1, explanation: 'Java primitive type \`boolean\` holds exactly \`true\` or \`false\`. (Unlike C, it is not an integer).' },
  { id: 'java-q2-4', lessonId: 'java-l2', question: 'What suffix is required to declare a float literal in Java?', options: ['f or F', 'd or D', 'l or L', 'No suffix'], correctIndex: 0, explanation: 'Floating-point literals are treated as double by default. To make them float, you must add f or F (e.g., 3.14f).' },
  { id: 'java-q2-5', lessonId: 'java-l2', question: 'Is Java statically or dynamically typed?', options: ['Dynamically typed', 'Statically typed', 'Weakly typed', 'Untyped'], correctIndex: 1, explanation: 'Java is statically-typed. All variable types are verified at compile-time and cannot change during execution.' },

  // Lesson 3 – Operators
  { id: 'java-q3-1', lessonId: 'java-l3', question: 'What is the output of 10 / 3 in Java?', options: ['3.33333333333', '3', '4', 'NaN'], correctIndex: 1, explanation: 'Integer division in Java discards the fractional part. 10 / 3 results in the integer 3.' },
  { id: 'java-q3-2', lessonId: 'java-l3', question: 'Which operator checks for object identity/reference equality?', options: ['equals()', '==', '===', '!='], correctIndex: 1, explanation: '\`==\` checks if references point to the exact same object in memory. (equals() checks contents).' },
  { id: 'java-q3-3', lessonId: 'java-l3', question: 'What is the modulus operator in Java?', options: ['/', '\\', '%', '^'], correctIndex: 2, explanation: 'The modulus operator \`%\` returns the remainder of a division (e.g. 5 % 2 = 1).' },
  { id: 'java-q3-4', lessonId: 'java-l3', question: 'How does logical AND (&&) demonstrate short-circuiting?', options: ['It evaluates both sides always', 'If left side is false, right side is skipped', 'If left side is true, right side is skipped', 'It throws an exception if left is false'], correctIndex: 1, explanation: 'If the left operand of \`&&\` is false, the overall expression is guaranteed to be false, so the right side is not evaluated.' },
  { id: 'java-q3-5', lessonId: 'java-l3', question: 'What is the size in memory of a char in Java?', options: ['1 byte (8-bit)', '2 bytes (16-bit Unicode)', '4 bytes (32-bit)', 'Variable size'], correctIndex: 1, explanation: 'Java uses 16-bit Unicode (UTF-16) representation for character literals, so char is 2 bytes.' },

  // Lesson 4 – Conditionals
  { id: 'java-q4-1', lessonId: 'java-l4', question: 'Which values are evaluated as falsy in a Java if statement?', options: ['0', 'null', 'Only boolean false', 'Empty string ""'], correctIndex: 2, explanation: 'Unlike JS/C, Java boolean expressions must evaluate strictly to the boolean value \`true\` or \`false\`. Integers or null are not implicitly converted to booleans.' },
  { id: 'java-q4-2', lessonId: 'java-l4', question: 'What is the purpose of the default label in a switch statement?', options: ['To define a fallback when no case matches', 'To run at the start of the switch', 'To exit the switch statement', 'It is mandatory for all switch statements'], correctIndex: 0, explanation: 'The default block executes when none of the defined switch cases match the input expression.' },
  { id: 'java-q4-3', lessonId: 'java-l4', question: 'Which of the following is true about Java 14+ switch expressions?', options: ['They require break statements', 'They cannot return values', 'They use the arrow (->) syntax and do not require break statements to prevent fall-through', 'They only work with Strings'], correctIndex: 2, explanation: 'Modern switch expressions use the arrow syntax \`->\` to return values and eliminate the need for verbose \`break\` statements.' },
  { id: 'java-q4-4', lessonId: 'java-l4', question: 'What happens if you omit a break statement in a traditional switch case?', options: ['Compiler error', 'Program crashes', 'Execution falls through to the next case', 'Case is skipped'], correctIndex: 2, explanation: 'Traditional switch cases fall through automatically to subsequent cases until a break or the end of the block is reached.' },
  { id: 'java-q4-5', lessonId: 'java-l4', question: 'Can switch statements compare String variables in modern Java?', options: ['No, only integers and char', 'Yes, since Java 7', 'Only in Java 14+', 'Only if the strings are converted to char arrays'], correctIndex: 1, explanation: 'Since Java 7, switch statements natively support String variables.' },

  // Lesson 5 – Loops
  { id: 'java-q5-1', lessonId: 'java-l5', question: 'What does the break statement do inside a loop?', options: ['Restarts the current iteration', 'Skips the next iteration', 'Exits the loop block immediately', 'Causes a compiler error'], correctIndex: 2, explanation: '\`break\` exits the enclosing loop structure immediately and continues with the next statement outside the loop.' },
  { id: 'java-q5-2', lessonId: 'java-l5', question: 'Which loop is guaranteed to run at least once?', options: ['for', 'while', 'do-while', 'enhanced for'], correctIndex: 2, explanation: 'A do-while loop evaluates the condition at the end of the block, meaning it executes the block once prior to checking.' },
  { id: 'java-q5-3', lessonId: 'java-l5', question: 'What does the continue statement do?', options: ['Exits the loop', 'Skips the remaining statements in the current iteration and jumps to the next evaluation/increment', 'Restarts the application', 'Suspends the thread'], correctIndex: 1, explanation: '\`continue\` bypasses the rest of the loop statements for the current iteration and triggers the next iteration cycle.' },
  { id: 'java-q5-4', lessonId: 'java-l5', question: 'What is the correct syntax for an infinite loop using while?', options: ['while(1)', 'while(true)', 'while()', 'while(false)'], correctIndex: 1, explanation: 'In Java, loops require an explicit boolean expression, so \`while(true)\` is the correct format for an infinite loop.' },
  { id: 'java-q5-5', lessonId: 'java-l5', question: 'Which is a valid representation of a nested loop?', options: ['A loop declared inside another loop body', 'Two loops running concurrently in threads', 'A loop that calls itself recursively', 'A loop with multiple conditions'], correctIndex: 0, explanation: 'A nested loop is simply a loop structure placed inside the body of an outer loop.' },

  // Lesson 6 – Classes & Objects
  { id: 'java-q6-1', lessonId: 'java-l6', question: 'Where are objects allocated in Java memory?', options: ['Stack memory', 'Heap memory', 'Register memory', 'Cache memory'], correctIndex: 1, explanation: 'All objects in Java are allocated on the Heap memory. Object references are stored on the Stack.' },
  { id: 'java-q6-2', lessonId: 'java-l6', question: 'What keyword instantiates an object from a class?', options: ['create', 'new', 'instantiate', 'make'], correctIndex: 1, explanation: 'The \`new\` keyword allocates heap memory for a new instance of a class and invokes its constructor.' },
  { id: 'java-q6-3', lessonId: 'java-l6', question: 'A class is best described as a:', options: ['Specific object instance', 'Blueprint or template for creating objects', 'Function that returns data', 'Memory location'], correctIndex: 1, explanation: 'A class defines the blueprint (fields and methods) used to construct and configure specific objects.' },
  { id: 'java-q6-4', lessonId: 'java-l6', question: 'What happens when you assign one object reference to another (e.g. Car b = a)?', options: ['It duplicates the object on the heap', 'It copies the reference address, so both point to the same object', 'It throws a compilation error', 'It makes a read-only copy'], correctIndex: 1, explanation: 'Assigning a reference copies the memory address. Both variables now point to the exact same object on the heap.' },
  { id: 'java-q6-5', lessonId: 'java-l6', question: 'Can you call a non-static method without instantiating an object first?', options: ['Yes, from any static method', 'No — instance methods require an object instance to be invoked', 'Only if the class has a default constructor', 'Yes, by referencing the class name directly'], correctIndex: 1, explanation: 'Instance methods require an active object reference to run. Static methods can run without an instance.' },

  // Lesson 7 – Constructors
  { id: 'java-q7-1', lessonId: 'java-l7', question: 'What is the return type of a constructor in Java?', options: ['void', 'The class type itself', 'No return type at all (not even void)', 'int'], correctIndex: 2, explanation: 'Constructors do not declare any return type, not even void. Declaring a return type converts it to a standard method.' },
  { id: 'java-q7-2', lessonId: 'java-l7', question: 'When is a default constructor provided by the compiler?', options: ['Always', 'Never', 'Only if the class has no explicit constructors defined', 'Only if the class is public'], correctIndex: 2, explanation: 'If you define at least one constructor, the compiler does not generate a default constructor automatically.' },
  { id: 'java-q7-3', lessonId: 'java-l7', question: 'What does the this keyword refer to?', options: ['The parent class instance', 'The current class declaration', 'The current object instance', 'The main thread'], correctIndex: 2, explanation: '\`this\` is a reference to the current object whose method or constructor is being invoked.' },
  { id: 'java-q7-4', lessonId: 'java-l7', question: 'Which is a valid constructor declaration for a class named Employee?', options: ['void Employee()', 'Employee()', 'public int Employee()', 'new Employee()'], correctIndex: 1, explanation: 'Constructors must share the exact name of the class and have no return type.' },
  { id: 'java-q7-5', lessonId: 'java-l7', question: 'What is method overloading?', options: ['Overriding a parent class method', 'Declaring multiple methods with the same name but different parameter lists', 'Writing a method with too much logic', 'Making a method public and static'], correctIndex: 1, explanation: 'Method overloading allows methods to share the same name as long as their parameters differ in type, count, or order.' },

  // Lesson 8 – Encapsulation
  { id: 'java-q8-1', lessonId: 'java-l8', question: 'How is data hiding achieved in Java encapsulation?', options: ['By making all classes abstract', 'By declaring class fields as private and providing public getters/setters', 'By deleting the fields from the class', 'By using the public keyword'], correctIndex: 1, explanation: 'Data hiding protects fields from direct access via the private modifier, exposing them safely through getters/setters.' },
  { id: 'java-q8-2', lessonId: 'java-l8', question: 'Which access modifier restricts access to the enclosing class only?', options: ['public', 'protected', 'default', 'private'], correctIndex: 3, explanation: '\`private\` variables/methods are only accessible inside the class they are declared in.' },
  { id: 'java-q8-3', lessonId: 'java-l8', question: 'What is the package access modifier in Java (when no modifier is specified)?', options: ['private', 'protected', 'default/package-private', 'public'], correctIndex: 2, explanation: 'If no access modifier is written, it defaults to package-private, meaning it is accessible to all classes in the same package.' },
  { id: 'java-q8-4', lessonId: 'java-l8', question: 'Which access modifier allows access to subclasses in another package?', options: ['private', 'default', 'protected', 'public'], correctIndex: 2, explanation: '\`protected\` permits access by classes in the same package AND subclasses in other packages.' },
  { id: 'java-q8-5', lessonId: 'java-l8', question: 'Why use getters and setters instead of public fields?', options: ['It makes the compilation faster', 'It allows validation and read-only / write-only constraints', 'It is required by the JVM', 'It automatically creates subclasses'], correctIndex: 1, explanation: 'Getters and setters let you control how fields are accessed and modified, enforcing rules (like validation) in the setters.' },

  // Lesson 9 – Inheritance
  { id: 'java-q9-1', lessonId: 'java-l9', question: 'Which keyword is used to inherit from a class in Java?', options: ['inherits', 'implements', 'extends', 'super'], correctIndex: 2, explanation: 'The \`extends\` keyword is used to create a subclass that inherits from a superclass.' },
  { id: 'java-q9-2', lessonId: 'java-l9', question: 'Does Java support multiple inheritance of classes (inheriting from multiple classes)?', options: ['Yes, always', 'No, Java only supports single class inheritance', 'Only if they are abstract classes', 'Only in Java 17+'], correctIndex: 1, explanation: 'Java classes can only extend a single class to avoid ambiguity and the diamond problem.' },
  { id: 'java-q9-3', lessonId: 'java-l9', question: 'What is method overriding?', options: ['Declaring a method with same name but different parameters', 'Redefining a superclass method in a subclass with identical signature', 'Calling a method recursively', 'Exceeding the stack size'], correctIndex: 1, explanation: 'Method overriding happens when a subclass provides a specific implementation for a method defined in its parent class.' },
  { id: 'java-q9-4', lessonId: 'java-l9', question: 'How do you call a parent class method that has been overridden in the child class?', options: ['this.methodName()', 'super.methodName()', 'Parent.methodName()', 'Cannot be called'], correctIndex: 1, explanation: 'The \`super\` keyword references the parent class, allowing access to its methods and constructors.' },
  { id: 'java-q9-5', lessonId: 'java-l9', question: 'Which annotation is recommended for overridden methods?', options: ['@Override', '@Overload', '@Inherited', '@Subclass'], correctIndex: 0, explanation: '\`@Override\` tells the compiler that the method is meant to override a parent method, catching spelling errors.' },

  // Lesson 10 – Abstract Classes & Interfaces
  { id: 'java-q10-1', lessonId: 'java-l10', question: 'Can you instantiate an abstract class using the new keyword?', options: ['Yes, if it has a constructor', 'No, abstract classes cannot be instantiated directly', 'Only if all methods are concrete', 'Only in the main method'], correctIndex: 1, explanation: 'Abstract classes are incomplete blueprints and cannot be directly instantiated.' },
  { id: 'java-q10-2', lessonId: 'java-l10', question: 'Which keyword does a class use to adopt an interface?', options: ['extends', 'implements', 'uses', 'adopts'], correctIndex: 1, explanation: 'A class uses the \`implements\` keyword to implement interface methods.' },
  { id: 'java-q10-3', lessonId: 'java-l10', question: 'What are interface variables implicitly declared as?', options: ['private static final', 'public static final', 'protected final', 'public volatile'], correctIndex: 1, explanation: 'All variables declared in interfaces are implicitly public, static, and final (constants).' },
  { id: 'java-q10-4', lessonId: 'java-l10', question: 'Can a class implement multiple interfaces?', options: ['No, only one', 'Yes, a class can implement any number of interfaces', 'Only if the class is abstract', 'Yes, up to a maximum of three'], correctIndex: 1, explanation: 'Unlike class inheritance, Java permits implementing multiple interfaces.' },
  { id: 'java-q10-5', lessonId: 'java-l10', question: 'What is a default method in an interface?', options: ['A package-private method', 'A method with an implementation that subclasses can choose to override or use as-is', 'The first method in the file', 'An abstract method'], correctIndex: 1, explanation: 'Default methods (introduced in Java 8) allow adding new methods to interfaces without breaking existing implementing classes.' },

  // Lesson 11 – Arrays & ArrayLists
  { id: 'java-q11-1', lessonId: 'java-l11', question: 'What is a key difference between arrays and ArrayLists in Java?', options: ['Arrays are dynamic, ArrayLists are fixed-size', 'Arrays are fixed-size, ArrayLists are dynamic resizing', 'ArrayLists store primitives directly', 'Arrays do not support object types'], correctIndex: 1, explanation: 'Arrays have a fixed size once initialized. ArrayLists dynamically grow or shrink as elements are added/removed.' },
  { id: 'java-q11-2', lessonId: 'java-l11', question: 'How do you check the size/number of elements in an ArrayList?', options: ['list.length', 'list.length()', 'list.size()', 'list.count'], correctIndex: 2, explanation: '\`list.size()\` is a method on the List interface. (\`length\` is a property of native arrays).' },
  { id: 'java-q11-3', lessonId: 'java-l11', question: 'What is autoboxing in Java?', options: ['Wrapping a compiler error', 'Automatic conversion of primitive types to their corresponding wrapper object classes', 'Converting an array to a list', 'A method of thread synchronization'], correctIndex: 1, explanation: 'Autoboxing is the compiler\'s automatic conversion between primitives (like int) and objects (like Integer).' },
  { id: 'java-q11-4', lessonId: 'java-l11', question: 'Can an ArrayList store primitive types like int or double directly?', options: ['Yes, always', 'No — they can only store objects, so wrapper classes must be used', 'Only if the ArrayList is not generic', 'Only in Java 17+'], correctIndex: 1, explanation: 'Generics only support object types. To store numbers, you must use ArrayList<Integer> or ArrayList<Double>.' },
  { id: 'java-q11-5', lessonId: 'java-l11', question: 'What is the index of the first element in both arrays and lists?', options: ['-1', '0', '1', 'It varies'], correctIndex: 1, explanation: 'Java structures are zero-indexed, meaning the first element is at index 0.' },

  // Lesson 12 – Exception Handling
  { id: 'java-q12-1', lessonId: 'java-l12', question: 'What is the purpose of the finally block?', options: ['To catch exceptions that catch blocks missed', 'To compile the program', 'To execute cleanup code guaranteed to run regardless of exceptions', 'To throw new exceptions'], correctIndex: 2, explanation: 'The finally block always runs after try/catch, making it perfect for releasing resources like files/connections.' },
  { id: 'java-q12-2', lessonId: 'java-l12', question: 'Which exception category is verified by the compiler (compile-time exceptions)?', options: ['Unchecked Exceptions', 'Runtime Exceptions', 'Checked Exceptions', 'Errors'], correctIndex: 2, explanation: 'Checked exceptions must be explicitly caught or declared in the throws signature, or the compiler will reject the code.' },
  { id: 'java-q12-3', lessonId: 'java-l12', question: 'What does try-with-resources do?', options: ['Allows nesting try blocks', 'Automatically closes resources implementing AutoCloseable when the try block exits', 'Speeds up catching errors', 'Prevents memory allocation'], correctIndex: 1, explanation: 'Try-with-resources handles resource closing automatically, avoiding verbose finally blocks for closing writers/readers.' },
  { id: 'java-q12-4', lessonId: 'java-l12', question: 'Which keyword is used to declare that a method might throw an exception?', options: ['throw', 'throws', 'catch', 'throwable'], correctIndex: 1, explanation: 'The \`throws\` keyword is used in the method signature to specify checked exceptions it can propagate.' },
  { id: 'java-q12-5', lessonId: 'java-l12', question: 'What type of exception is NullPointerException?', options: ['Checked Exception', 'Unchecked Exception / RuntimeException', 'Compile-time error', 'System Error'], correctIndex: 1, explanation: 'NullPointerException inherits from RuntimeException, so it is an unchecked exception.' },

  // Lesson 13 – Collection Framework
  { id: 'java-q13-1', lessonId: 'java-l13', question: 'Which collection interface does not allow duplicate elements?', options: ['List', 'Map', 'Set', 'Queue'], correctIndex: 2, explanation: 'The \`Set\` interface represents an unordered collection of unique elements.' },
  { id: 'java-q13-2', lessonId: 'java-l13', question: 'Which class implements a Map using key-value pairs?', options: ['ArrayList', 'HashSet', 'HashMap', 'TreeSet'], correctIndex: 2, explanation: '\`HashMap\` maps unique keys to values. (\`HashSet\` only stores single values).' },
  { id: 'java-q13-3', lessonId: 'java-l13', question: 'Does List allow duplicate elements?', options: ['Yes', 'No', 'Only if it is a LinkedList', 'Only for String values'], correctIndex: 0, explanation: '\`List\` preserves insertion order and permits duplicates.' },
  { id: 'java-q13-4', lessonId: 'java-l13', question: 'How do you insert an element into a Map?', options: ['map.add(key, value)', 'map.put(key, value)', 'map.set(key, value)', 'map.insert(key, value)'], correctIndex: 1, explanation: 'The \`put(K key, V value)\` method inserts key-value mappings in a Map.' },
  { id: 'java-q13-5', lessonId: 'java-l13', question: 'What is a key difference between HashSet and TreeSet?', options: ['TreeSet is faster', 'TreeSet maintains ascending/natural sorted order; HashSet is unordered', 'HashSet has keys and values', 'They are identical'], correctIndex: 1, explanation: '\`TreeSet\` stores items in a sorted tree structure, while \`HashSet\` uses a hash table and is unsorted.' },

  // Lesson 14 – Strings
  { id: 'java-q14-1', lessonId: 'java-l14', question: 'What does it mean that String is immutable in Java?', options: ['A string cannot be assigned to another variable', 'String objects cannot be modified in memory after creation', 'Strings must be static', 'Strings cannot be compared'], correctIndex: 1, explanation: 'String immutability means modifying a string generates a new String instance, keeping the original object intact.' },
  { id: 'java-q14-2', lessonId: 'java-l14', question: 'Why should you compare String contents with equals() instead of ==?', options: ['equals() is faster', '== checks reference equality (memory addresses); equals() checks character content', '== is not allowed for strings', 'equals() converts to uppercase'], correctIndex: 1, explanation: '\`==\` verifies if they point to the exact same reference. \`equals()\` compares characters for logical equality.' },
  { id: 'java-q14-3', lessonId: 'java-l14', question: 'What class should you use to modify strings in a loop to avoid heap memory waste?', options: ['String', 'StringBuilder', 'StringBuffer', 'Both B and C'], correctIndex: 3, explanation: 'Both StringBuilder (not thread-safe, faster) and StringBuffer (thread-safe) allow mutable operations in place.' },
  { id: 'java-q14-4', lessonId: 'java-l14', question: 'What is the String Constant Pool?', options: ['A database of characters', 'A special memory area in the Heap that caches String literals for reuse', 'A cache on the CPU', 'An array of strings'], correctIndex: 1, explanation: 'The pool stores unique string literals, letting multiple variables share the same instances to conserve memory.' },
  { id: 'java-q14-5', lessonId: 'java-l14', question: 'Which class is mutable and thread-safe for modifying strings?', options: ['String', 'StringBuilder', 'StringBuffer', 'ArrayList'], correctIndex: 2, explanation: '\`StringBuffer\` has synchronized methods, making it thread-safe. \`StringBuilder\` is not synchronized.' },

  // Lesson 15 – Java I/O
  { id: 'java-q15-1', lessonId: 'java-l15', question: 'Which class is commonly used to read input from the console?', options: ['Scanner', 'System.out', 'BufferedReader', 'FileReader'], correctIndex: 0, explanation: '\`java.util.Scanner\` reads primitive types and strings from input streams (like System.in).' },
  { id: 'java-q15-2', lessonId: 'java-l15', question: 'What package contains Java I/O classes?', options: ['java.util', 'java.lang', 'java.io', 'java.nio'], correctIndex: 2, explanation: '\`java.io\` package houses standard stream readers, writers, and file components.' },
  { id: 'java-q15-3', lessonId: 'java-l15', question: 'What is the purpose of BufferedWriter?', options: ['Reads files byte by byte', 'Buffers output characters to write files efficiently in blocks', 'Validates file formats', 'Encrypts files'], correctIndex: 1, explanation: '\`BufferedWriter\` reduces the number of direct write operations by caching output characters in memory.' },
  { id: 'java-q15-4', lessonId: 'java-l15', question: 'How do you read a file line-by-line using BufferedReader?', options: ['reader.read()', 'reader.readLine()', 'reader.next()', 'reader.getLine()'], correctIndex: 1, explanation: '\`readLine()\` returns the next line as a String, or null when the end of file is reached.' },
  { id: 'java-q15-5', lessonId: 'java-l15', question: 'Which Java library contains Files and Paths for modern I/O operations?', options: ['java.io', 'java.nio.file', 'java.util.file', 'java.lang.reflect'], correctIndex: 1, explanation: 'NIO.2 (java.nio.file) offers the modern, convenient Files and Paths APIs.' },

  // Lesson 16 – Generics
  { id: 'java-q16-1', lessonId: 'java-l16', question: 'What is a major benefit of using Generics in Java?', options: ['Faster runtime speeds', 'Type safety with compile-time checks, avoiding runtime ClassCastExceptions', 'Automatic memory cleaning', 'Allows multiple class inheritance'], correctIndex: 1, explanation: 'Generics catch type errors during compilation rather than crashing at runtime with casts.' },
  { id: 'java-q16-2', lessonId: 'java-l16', question: 'What is type erasure in Java generics?', options: ['Deleting the compiled class file', 'The compiler replacing type parameters with Object or bounds, leaving only normal classes in bytecode', 'Removing variables at runtime', 'A bug in the JVM'], correctIndex: 1, explanation: 'To maintain backward compatibility, type parameters are removed (erased) after compilation.' },
  { id: 'java-q16-3', lessonId: 'java-l16', question: 'Which wildcard signature restricts values to a class and its subclasses (upper bounded)?', options: ['List<? super T>', 'List<? extends T>', 'List<T>', 'List<?>'], correctIndex: 1, explanation: '\`? extends T\` bounds the wildcard to T and anything that inherits from T (upper bound).' },
  { id: 'java-q16-4', lessonId: 'java-l16', question: 'Which wildcard signature restricts values to a class and its parent classes (lower bounded)?', options: ['List<? extends T>', 'List<? super T>', 'List<T>', 'List<?>'], correctIndex: 1, explanation: '\`? super T\` restricts the types to T and its ancestor classes in the hierarchy (lower bound).' },
  { id: 'java-q16-5', lessonId: 'java-l16', question: 'Can you use primitive types as generic arguments directly (e.g. List<int>)?', options: ['Yes, always', 'No — generics require object types, so wrapper classes like Integer must be used', 'Only in Java 14+', 'Only if variables are final'], correctIndex: 1, explanation: 'Generics operate on object references. Primitives cannot be used directly without autoboxing to wrappers.' },

  // Lesson 17 – Lambdas
  { id: 'java-q17-1', lessonId: 'java-l17', question: 'What is a functional interface?', options: ['An interface with no methods', 'An interface with exactly one abstract method', 'An interface containing only default methods', 'An interface for functional programming in C'], correctIndex: 1, explanation: 'Functional interfaces (like Runnable, Predicate) possess exactly one abstract method, qualifying them for lambda binding.' },
  { id: 'java-q17-2', lessonId: 'java-l17', question: 'Which annotation is used to enforce that an interface is functional?', options: ['@Override', '@FunctionalInterface', '@Interface', '@Lambda'], correctIndex: 1, explanation: '\`@FunctionalInterface\` prompts the compiler to flag an error if the interface adds more than one abstract method.' },
  { id: 'java-q17-3', lessonId: 'java-l17', question: 'What functional interface takes an argument and returns a boolean value?', options: ['Consumer', 'Supplier', 'Predicate', 'Function'], correctIndex: 2, explanation: '\`Predicate<T>\` evaluates an object and returns a boolean (e.g. \`x -> x > 10\`).' },
  { id: 'java-q17-4', lessonId: 'java-l17', question: 'What functional interface takes no arguments but returns a value?', options: ['Consumer', 'Supplier', 'Predicate', 'Function'], correctIndex: 1, explanation: '\`Supplier<T>\` takes nothing and supplies an object (\`() -> new User()\`).' },
  { id: 'java-q17-5', lessonId: 'java-l17', question: 'What does Consumer functional interface do?', options: ['Takes an argument and returns a mapped value', 'Takes an argument, performs an operation, and returns nothing', 'Supplies new values', 'Evaluates conditional logic'], correctIndex: 1, explanation: '\`Consumer<T>\` consumes an argument and returns void (e.g. \`System.out::println\`).' },

  // Lesson 18 – Streams API
  { id: 'java-q18-1', lessonId: 'java-l18', question: 'Does the Streams API store the data elements it processes?', options: ['Yes, in a stream buffer', 'No, it only acts as a pipeline to process data from a source (like a list)', 'Only if it is a parallel stream', 'Yes, in a temporary array'], correctIndex: 1, explanation: 'Streams do not hold values. They pipe elements from collections through operations.' },
  { id: 'java-q18-2', lessonId: 'java-l18', question: 'Which operation is a terminal operation in a Stream pipeline?', options: ['filter()', 'map()', 'collect()', 'sorted()'], correctIndex: 2, explanation: '\`collect()\` is a terminal operation that closes the stream and gathers results. The others are intermediate.' },
  { id: 'java-q18-3', lessonId: 'java-l18', question: 'What is lazy evaluation in streams?', options: ['Slow execution', 'Intermediate operations are only executed when a terminal operation is called', 'Streams running in background threads', 'Skipping operations to save memory'], correctIndex: 1, explanation: 'Streams are lazy: intermediate actions are only performed when a terminal operation triggers processing.' },
  { id: 'java-q18-4', lessonId: 'java-l18', question: 'Which method transforms elements in a stream to a different form?', options: ['filter()', 'map()', 'collect()', 'forEach()'], correctIndex: 1, explanation: '\`map()\` applies a function to transform each element of the stream (e.g. converting names to uppercase).' },
  { id: 'java-q18-5', lessonId: 'java-l18', question: 'What does filter() do in a stream?', options: ['Sorts the stream', 'Excludes elements that do not match the specified Predicate', 'Splits the stream in half', 'Converts elements to strings'], correctIndex: 1, explanation: '\`filter()\` takes a Predicate and returns a stream containing only the elements that evaluate to true.' },

  // Lesson 19 – Multithreading
  { id: 'java-q19-1', lessonId: 'java-l19', question: 'Which interface should you implement to define a thread\'s task without class inheritance limits?', options: ['Thread', 'Runnable', 'Callable', 'Task'], correctIndex: 1, explanation: 'Implementing \`Runnable\` is preferred over extending Thread because Java classes can only inherit from one parent class.' },
  { id: 'java-q19-2', lessonId: 'java-l19', question: 'Which method starts the execution of a thread?', options: ['run()', 'start()', 'execute()', 'init()'], correctIndex: 1, explanation: 'Calling \`start()\` allocates system resources and runs the thread\'s \`run()\` method concurrently. Calling \`run()\` directly executes it synchronously in the caller thread.' },
  { id: 'java-q19-3', lessonId: 'java-l19', question: 'What is a race condition?', options: ['A fast loop', 'When multiple threads concurrently modify shared data, causing corrupt or inconsistent values', 'A compiler error', 'An infinite loop in a thread'], correctIndex: 1, explanation: 'Race conditions occur when thread execution timing impacts shared state values without proper synchronization.' },
  { id: 'java-q19-4', lessonId: 'java-l19', question: 'Which keyword prevents race conditions by allowing only one thread to execute a method/block at a time?', options: ['synchronized', 'volatile', 'static', 'locked'], correctIndex: 0, explanation: '\`synchronized\` creates a monitor lock, ensuring mutual exclusion of thread access to code blocks.' },
  { id: 'java-q19-5', lessonId: 'java-l19', question: 'What does thread.join() do?', options: ['Merges two threads', 'Pauses the calling thread until the referenced thread completes execution', 'Terminates a thread', 'Starts a thread'], correctIndex: 1, explanation: '\`join()\` waits for the targeted thread to finish, synchronizing asynchronous operations.' },

  // Lesson 20 – Software Design
  { id: 'java-q20-1', lessonId: 'java-l20', question: 'What does the "S" in SOLID stand for?', options: ['Static methods', 'Single Responsibility Principle', 'Superclass Inheritance', 'Security first'], correctIndex: 1, explanation: 'Single Responsibility Principle states that a class should have exactly one responsibility/reason to change.' },
  { id: 'java-q20-2', lessonId: 'java-l20', question: 'Which design pattern ensures a class has only one single instance?', options: ['Factory', 'Builder', 'Singleton', 'Strategy'], correctIndex: 2, explanation: 'Singleton pattern restricts instantiation to a single object with a private constructor and static access method.' },
  { id: 'java-q20-3', lessonId: 'java-l20', question: 'What is the Builder pattern useful for?', options: ['Compiling programs', 'Creating objects with many optional parameters in a clean, readable way', 'Building loops', 'Class inheritance'], correctIndex: 1, explanation: 'Builder pattern provides a fluent API to build complex objects step-by-step, avoiding long constructors.' },
  { id: 'java-q20-4', lessonId: 'java-l20', question: 'What does the Open/Closed Principle state?', options: ['Classes should be open to changes but closed to extensions', 'Classes should be open for extension, but closed for modification', 'Interfaces must be public', 'Code should be open source'], correctIndex: 1, explanation: 'Open/Closed Principle states that you should add functionality by extending classes, not by modifying their original source code.' },
  { id: 'java-q20-5', lessonId: 'java-l20', question: 'What is dependency inversion?', options: ['Inheriting from subclasses', 'Depending on abstractions (interfaces) rather than concrete classes', 'Reversing loops', 'Calling methods backwards'], correctIndex: 1, explanation: 'Dependency Inversion decouples high-level and low-level modules by introducing a shared abstraction.' },
]

export function getLessonQuestions(lessonId: string): QuizQuestion[] {
  return quizQuestions.filter(q => q.lessonId === lessonId)
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(l => l.id === id)
}

export function getLessonsByWeek(week: number): Lesson[] {
  return lessons.filter(l => l.week === week).sort((a, b) => a.order - b.order)
}

export function getWeekLabel(week: number): string {
  const labels: Record<number, string> = {
    1: 'Week 1 — Java Basics',
    2: 'Week 2 — Object-Oriented Java',
    3: 'Week 3 — Core Java APIs',
    4: 'Week 4 — Advanced Java Topics',
  }
  return labels[week] ?? `Week ${week}`
}
