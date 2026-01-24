export const javascriptQuestionData = [
  {
    "id": 1,
    "topic": "javascript",
    "question": "What is JavaScript?",
    "answer": "JavaScript is a high-level, dynamic, and interpreted programming language that is widely used for building interactive and dynamic web applications. It is one of the core technologies of the World Wide Web, alongside HTML and CSS. ",
    "tags": [
      "fundamental"
    ],
    "keyFeatures": [],
    "actionWords": [
      "Interpreted",
      " dynamic",
      " single threaded",
      " synchronous"
    ],
    "codeExample": ""
  },
  {
    "id": 2,
    "topic": "javascript",
    "question": "Explain the meaning of An 'interpreted programming language'",
    "answer": "An interpreted programming language is a type of programming language in which most of its implementations execute instructions directly, without the need for prior compilation into machine-language instructions. Instead of being translated into machine code at the start (like compiled languages), the source code is read and executed line by line or statement by statement by an interpreter.",
    "tags": [
      "fundamental"
    ],
    "keyFeatures": [],
    "actionWords": [
      "instruction execute directly without prior compilation."
    ],
    "codeExample": ""
  },
  {
    "id": 3,
    "topic": "javascript",
    "question": "List some key disadvantages of JavaScript ?",
    "answer": "JavaScript, despite its widespread use and versatility, has several key disadvantages that developers need to be aware of:\n\n1.   Security Issues  :\n   -   Cross-Site Scripting (XSS)  : JavaScript can be exploited to inject malicious scripts into web pages, leading to security vulnerabilities.\n   -   Cross-Site Request Forgery (CSRF)  : Attackers can trick users into executing unwanted actions on a different website where the user is authenticated.\n   -   Code Injection  : Because JavaScript is executed on the client side, it can be manipulated by users, potentially leading to security breaches.\n\n2.   Browser Compatibility  :\n   -   Inconsistent Behavior  : Different browsers may interpret JavaScript code differently, leading to inconsistencies in how a script functions across various platforms.\n   -   Versioning Issues  : Not all users update their browsers regularly, which can result in JavaScript features not being supported by older browser versions.\n\n3.   Performance Issues  :\n   -   Single-Threaded Nature  : JavaScript is single-threaded, which means it can only execute one task at a time. This can lead to performance bottlenecks, especially with complex computations.\n   -   Blocking Behavior  : Heavy computations or blocking scripts can cause the UI to become unresponsive.\n\n4.   Lack of Debugging Facilities  :\n   -   Console-Based Debugging  : While browser developer tools have improved, debugging JavaScript can still be challenging compared to other languages that offer more advanced integrated debugging environments.\n   -   Error Handling  : JavaScript's error handling mechanisms can sometimes be less robust, making it harder to track down and fix issues.\n\n5.   Dynamic Typing  :\n   -   Type-Related Errors  : The flexibility of dynamic typing can lead to unexpected behavior and bugs that are difficult to track down, especially in large codebases.\n   -   Runtime Errors  : Many errors in JavaScript occur at runtime rather than compile time, making it harder to catch and fix issues early in the development process.\n\n6.   Global Variable Usage  :\n   -   Pollution of Global Namespace  : In JavaScript, it's easy to accidentally create global variables, which can lead to conflicts and bugs that are difficult to debug.\n   -   Encapsulation Issues  : Lack of proper encapsulation can lead to code that is harder to maintain and understand.\n\n7.   Asynchronous Programming Challenges  :\n   -   Callback Hell  : Managing asynchronous operations using callbacks can lead to deeply nested code that is difficult to read and maintain.\n   -   Complexity with Promises and async/await  : While promises and async/await simplify asynchronous programming, they still add a layer of complexity compared to synchronous code.\n\n8.   Limited Standard Library  :\n   -   Feature Gaps  : JavaScript's standard library is less comprehensive compared to some other languages, requiring developers to rely on external libraries and frameworks for additional functionality.\n\n9.   Interpreted Language Overheads  :\n   -   Performance Penalties  : As an interpreted language, JavaScript can be slower than compiled languages like C++ or Java, especially for CPU-intensive tasks.\n",
    "tags": [
      "disadvantages"
    ],
    "keyFeatures": [],
    "actionWords": [
      "security issues",
      " browser compatibility",
      " perfomance issues",
      " lack of debugging facilities",
      ""
    ],
    "codeExample": ""
  },
  {
    "id": 4,
    "topic": "javascript",
    "question": "Mention some of the key feature of Jasvascript",
    "answer": "Key Features of JavaScript:\n\n1.Client-Side Scripting: JavaScript is commonly used on the client-side (in the browser) to manipulate web page content and handle user interactions without requiring a page reload.\n\n2.Dynamic Typing: Variables in JavaScript are not bound to a specific data type, which allows for more flexible and dynamic code.\n\n3.Prototype-Based: JavaScript uses prototype-based inheritance, meaning objects can inherit properties and methods from other objects.\n\n4.Event-Driven Programming: JavaScript is designed to respond to events such as user clicks, form submissions, and mouse movements, enabling interactive web experiences.\n\n5.First-Class Functions: Functions in JavaScript are first-class objects, meaning they can be assigned to variables, passed as arguments, and returned from other functions.\n\n6.Asynchronous Programming: JavaScript supports asynchronous programming using callbacks, promises, and async/await syntax, which is essential for handling tasks like fetching data from servers.\n",
    "tags": [
      "key-features"
    ],
    "keyFeatures": [],
    "actionWords": [
      "client side scripting",
      " dynamic typing",
      " prototype-based",
      " event-driven programming",
      " asynchronous programming"
    ],
    "codeExample": ""
  },
  {
    "id": 5,
    "topic": "javascript",
    "question": "Difference between Loosely typed vs strongly typed vs dynamically typed language ?",
    "answer": "The terms \"loosely typed,\" \"strongly typed,\" and \"dynamically typed\" describe different aspects of how programming languages handle types. Here's a breakdown of each concept and how they differ from one another:\n\n       Loosely Typed vs. Strongly Typed:\n\n -These terms describe the level of strictness a language imposes on type conversions and type checking.\n\n         Loosely Typed (Weakly Typed):\n\n-   Definition  : In a loosely typed language, the language allows more flexibility in how types are handled and converted. Implicit type conversions (also known as coercions) are common, and the language may automatically convert types to perform operations.\n-   Examples  : JavaScript, PHP, Perl\n-   Characteristics  :\n  - Implicit type coercion: The language automatically converts types as needed.\n  - Fewer type-related errors at compile-time, but potentially more at runtime.\n  - More flexibility, but can lead to unexpected behavior and bugs.\n\n  \n  let x = \"5\";\n  let y = x  2; // y becomes 10 (string \"5\" is implicitly converted to number 5)\n  \n\n         Strongly Typed:\n\n-   Definition  : In a strongly typed language, the language enforces strict rules on how types can be used and converted. Implicit conversions are either limited or not allowed, and type errors are caught at compile-time or runtime.\n-   Examples  : Java, Python, Haskell\n-   Characteristics  :\n  - Explicit type conversions: Types must be explicitly converted by the programmer.\n  - More type-related errors are caught at compile-time or runtime, improving reliability.\n  - Less flexibility, but more predictable behavior and fewer type-related bugs.\n\n  python\n  x = \"5\"\n  y = int(x)  2     y becomes 10 (explicit conversion from string to int)\n  \n\n       Dynamically Typed vs. Statically Typed:\n\nThese terms describe when type checking is performed.\n\n         Dynamically Typed:\n\n-   Definition  : In a dynamically typed language, types are checked at runtime. Variables can change type during execution, and the type of a variable is determined by the value it holds at any given time.\n-   Examples  : Python, JavaScript, Ruby\n-   Characteristics  :\n  - Type flexibility: Variables can change type dynamically.\n  - Easier to write and more flexible code, but potential for runtime type errors.\n  - No need to declare variable types explicitly.\n\n  python\n  x = 10         x is an integer\n  x = \"hello\"    x is now a string\n  \n\n         Statically Typed:\n\n-   Definition  : In a statically typed language, types are checked at compile-time. The type of a variable must be declared and cannot change, leading to more type safety and catching type errors before the program runs.\n-   Examples  : Java, C++, Go\n-   Characteristics  :\n  - Type consistency: Variable types are fixed after declaration.\n  - Type errors are caught early during compilation, reducing runtime errors.\n  - Requires more upfront type declarations, which can be verbose.\n\n  java\n  int x = 10;     // x is declared as an integer\n  x = \"hello\";    // Compile-time error: incompatible types\n  \n\n       Summary:\n\n-   Loosely Typed  : Languages allow implicit type conversions, offering flexibility but potentially leading to unexpected behaviors (e.g., JavaScript).\n-   Strongly Typed  : Languages enforce strict type rules, requiring explicit type conversions, leading to more reliable and predictable code (e.g., Java, Python).\n-   Dynamically Typed  : Type checking occurs at runtime, allowing variables to change types during execution (e.g., Python, JavaScript).\n-   Statically Typed  : Type checking occurs at compile-time, with variable types fixed after declaration, catching type errors early (e.g., Java, C++).\n\nUnderstanding these distinctions helps in choosing the right language for a given task and writing code that leverages the strengths of each type system.",
    "tags": [
      "fundamental"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 6,
    "topic": "javascript",
    "question": "What are the JavaScript Data Types?",
    "answer": "In JavaScript, there are several data types, which can be broadly classified into two categories:   Primitive Data Types   and   Reference Data Types (Objects)  . \n\n       Primitive Data Types\n\n1.   Number  : Represents both integer and floating-point numbers.\n2.   String  : Represents a sequence of characters used to form text.\n3.   Boolean  : Represents a logical entity and can have two values:  \"true \" or  \"false \".\n \n4.   Null  : Represents the intentional absence of any object value. It is a special keyword and only has one value:  \"null \".\n  \n5.   Undefined  : Indicates that a variable has been declared but not yet assigned a value.\n   \n6.   Symbol  : Represents a unique identifier. Every symbol value returned from  \"Symbol() \" is unique.\n \n7.   BigInt  : Provides a way to represent whole numbers larger than the  \"Number \" type can handle.\n   \n       Reference Data Types (Objects)\n\n1.   Object  : Represents a collection of key-value pairs. It is the base for many other data types.\n  \n2.   Array  : A special type of object used for storing ordered collections.\n  \n3.   Function  : A callable object that can be invoked to perform a task or calculate a value.\n  \n\n4.   Date  : Used for representing dates and times.\n \n5.   RegExp  : Used for matching text with a pattern.\n  \n6.   Map  : A collection of keyed data items, similar to an object but with more features.\n\n7.   Set  : A collection of values where each value must be unique.\n ",
    "tags": [
      "data-types"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 7,
    "topic": "javascript",
    "question": "Difference between primitive vs non - primitive data types ?",
    "answer": "\nThe key differences between primitive and non-primitive data types in JavaScript lie in their nature, how they are stored and accessed, and how they are handled in memory. \n\n       Primitive Data Types\n\n1.   Nature  :\n   - Primitive data types are basic and immutable, meaning their values cannot be altered after creation.\n\n2.   Storage and Access  :\n   - They are stored directly in the memory location associated with the variable.\n\n3.   Memory Handling  :\n   - Stored on the stack, making access faster.\n   - Each variable directly holds the value.\n\n4.   Behavior  :\n   - Comparison is done by value.\n\n       Non-Primitive Data Types (Reference Data Types)\n\n1.   Nature  :\n   - Non-primitive data types are complex and mutable, meaning their values can be changed.\n\n2.   Storage and Access  :\n   - They are stored as references to memory locations, not the actual data itself.\n\n3.   Memory Handling  :\n   - Stored on the heap, allowing for dynamic memory allocation.\n   - Variables hold a reference to the data, not the data itself.\n\n4.   Behavior  :\n   - Comparison is done by reference.\n\n       Summary\n\n-   Primitive Data Types  :\n  - Simple, immutable, stored directly in the variable.\n  - Compared by value.\n\n-   Non-Primitive Data Types  :\n  - Complex, mutable, stored as references.\n  - Compared by reference.\n",
    "tags": [
      "data-types"
    ],
    "keyFeatures": [],
    "actionWords": [
      "Primitive are basic and immutable",
      "\nPrimitive stored directly in memory location",
      "\nNont-primitive are complex & mutable",
      "\nNon-primitive stored as a references to memory location",
      ""
    ],
    "codeExample": ""
  },
  {
    "id": 8,
    "topic": "javascript",
    "question": "What are undeclared and undefined variables?",
    "answer": "Undeclared and undefined variables are both related to variable usage in JavaScript but represent different states:\n\n       Undeclared Variables:\n\nAn undeclared variable is a variable that has been used in code without being formally declared (i.e., using the  \"var \",  \"let \", or  \"const \" keywords) anywhere within the scope. Using an undeclared variable leads to a runtime error in strict mode, while in non-strict mode, JavaScript creates a global variable with that name.\n\n       Undefined Variables:\n\nAn undefined variable is a variable that has been declared but not assigned a value. When you try to access the value of an undefined variable, JavaScript returns the special value  \"undefined \".\n\nIn summary:\n\n-   Undeclared variables   are those that have not been formally declared anywhere in the scope.\n-   Undefined variables   are those that have been declared but not yet assigned a value, resulting in the variable having the value  \"undefined \".",
    "tags": [
      "variables"
    ],
    "keyFeatures": [],
    "actionWords": [
      "used in code without being formally declared",
      "\ndeclared but not assigned a value",
      "\n"
    ],
    "codeExample": ""
  },
  {
    "id": 9,
    "topic": "javascript",
    "question": "What do you mean by global variables? Define the Declaration and Problem with Global Variable?",
    "answer": "Global variables in JavaScript are variables that are declared outside of any function, hence they are accessible from anywhere within the code, including other functions and scripts.\n\n       Declaration of Global Variables:\n\nGlobal variables can be declared using the  \"var \",  \"let \", or  \"const \" keywords outside of any function scope.\n\n       Problems with Global Variables:\n\nWhile global variables offer accessibility across the entire codebase, they can introduce various issues:\n\n1.   Name Conflicts  : Since global variables are accessible everywhere, there's a risk of unintentionally overriding their values due to name conflicts. This can happen when different parts of a large codebase use the same variable names.\n\n2.   Accidental Modification  : Any part of the code can potentially modify the value of a global variable, leading to unintended consequences and bugs. This makes it harder to track down the source of issues.\n\n3.   Scope Pollution  : As the codebase grows, the number of global variables can increase, leading to \"scope pollution.\" This makes it harder to maintain and understand the code because it's not clear where and how these variables are being used.\n\n4.   Dependency on Context  : Global variables create dependencies on the global context, making the code less modular and harder to test. It becomes challenging to isolate and test individual components since they rely on global state.\n\n5.   Performance Impact  : Accessing global variables can be slower compared to accessing local variables due to the need to traverse the scope chain.\n\n       Best Practice:\n\nIt's generally recommended to minimize the use of global variables and instead encapsulate data within functions or modules where possible. This approach helps to reduce the risk of naming conflicts, accidental modifications, and scope pollution, leading to cleaner, more maintainable code. When variables need to be shared across multiple parts of the code, consider using techniques like dependency injection or module patterns to manage dependencies more effectively.",
    "tags": [
      "variables"
    ],
    "keyFeatures": [],
    "actionWords": [
      "declared outside of any function",
      "\naccessible from anywhere"
    ],
    "codeExample": ""
  },
  {
    "id": 10,
    "topic": "javascript",
    "question": "What do you mean by the ‘this’ keyword in JavaScript?",
    "answer": "In JavaScript, the  \"this \" keyword refers to the context within which a function is executed. Its value is determined by how a function is called and where it is called from. The value of  \"this \" can change dynamically based on the invocation context.\n\nHere are the common rules that determine the value of  \"this \":\n\n1.   Global Context  : When used in the global scope (outside of any function),  \"this \" refers to the global object ( \"window \" in browsers,  \"global \" in Node.).\n\n2.   Function Context  : Inside a function, the value of  \"this \" depends on how the function is called:\n   -   Function Invocation  : If a function is called as a standalone function (not as a method of an object),  \"this \" refers to the global object (in non-strict mode) or  \"undefined \" (in strict mode).\n   -   Method Invocation  : If a function is called as a method of an object,  \"this \" refers to the object that owns the method.\n   -   Constructor Invocation  : If a function is called with the  \"new \" keyword,  \"this \" refers to the newly created instance of the object.\n\n3.   Arrow Functions  : Arrow functions do not have their own  \"this \" context. Instead, they inherit the  \"this \" value from the surrounding lexical context.\n\n4.   Event Handlers  : In event handler functions,  \"this \" typically refers to the element that triggered the event.\n\nUnderstanding how  \"this \" behaves in different contexts is crucial for writing effective JavaScript code, especially when working with object-oriented programming paradigms or event-driven programming. Incorrect usage of  \"this \" can lead to unexpected behavior and bugs.",
    "tags": [
      "this-keyword"
    ],
    "keyFeatures": [],
    "actionWords": [
      "keyword refers to the context within which a function is executed",
      "\nArrow functions do not have their own  \"this \" context."
    ],
    "codeExample": ""
  },
  {
    "id": 11,
    "topic": "javascript",
    "question": "What do you mean by the “===” operator?",
    "answer": "The  \"=== \" operator, also known as the \"strict equality operator\" or \"identity operator,\" is a comparison operator in JavaScript. It compares two values for equality without performing type conversion. Here's what it means:\n\n       Strict Equality Operator (===):\n\n1.   Comparison  :\n   - The  \"=== \" operator checks whether the two operands are equal in value and of the same data type.\n   - It returns  \"true \" if the operands are equal without any type conversion, and  \"false \" otherwise.\n\n2.   Type Check  :\n   - In strict equality ( \"=== \"), both the value and the data type of the operands are compared.\n   - If the data types of the operands are different, they are considered unequal, even if their values are similar.\n\n\n4.   Advantages  :\n   - Using the  \"=== \" operator ensures that the comparison is strict and prevents unexpected behavior due to type coercion.\n   - It leads to more predictable and reliable code, especially in scenarios where type conversion could introduce bugs.\n\n       Summary:\n\n- The  \"=== \" operator in JavaScript checks for strict equality, comparing both value and data type.\n- It returns  \"true \" if both operands are equal without any type conversion, and  \"false \" otherwise.\n- Using  \"=== \" is preferred over  \"== \" for most comparisons, as it avoids the pitfalls of implicit type conversion and leads to more robust code.",
    "tags": [
      "operators"
    ],
    "keyFeatures": [],
    "actionWords": [
      "equal in value and of the same data type"
    ],
    "codeExample": ""
  },
  {
    "id": 12,
    "topic": "javascript",
    "question": "What is Type Coercion in  JS?",
    "answer": "Type coercion in JavaScript refers to the automatic or implicit conversion of one data type to another. This typically happens when operators or expressions are used with operands of different types, and JavaScript tries to convert one or both of the operands to a compatible type to perform the operation.\n\nThere are two types of type coercion:\n1. Implicit Coercion: JavaScript automatically converts the types when necessary.\n2. Explicit Coercion: The developer manually converts the types using functions or methods.\n\n\n\n Key Points:\n- Loose equality (==) performs type coercion and tries to compare values after converting them to a common type.\n- Strict equality (===) does not perform type coercion; both the value and the type must be the same.\n  \nType coercion can sometimes lead to unexpected results, so understanding how it works is important for debugging and writing reliable code.",
    "tags": [
      "data-types"
    ],
    "keyFeatures": [],
    "actionWords": [
      "automatic or implicit conversion of one data type to another."
    ],
    "codeExample": " Example of Implicit Coercion:\n\nWhen performing operations with mixed data types, JavaScript might automatically convert one type to another:\n\n\nlet result = '5' + 1;\nconsole.log(result); // Output: \"51\"\n\nHere, JavaScript implicitly converts the number 1 to a string and concatenates it with '5'.\n\nAnother example:\n\n\nlet result = '5' - 1;\nconsole.log(result); // Output: 4\n\nIn this case, JavaScript converts the string '5' to a number and then subtracts 1.\n\n Example of Explicit Coercion:\n\nExplicit coercion happens when you manually convert one type to another:\n\n\nlet num = '123';\nlet convertedNum = Number(num);\nconsole.log(convertedNum); // Output: 123 (Number)\n\n\nIn this case, the string '123' is explicitly converted to a number using the Number() function.\n\n Coercion with Equality Operators:\nJavaScript also performs coercion with equality operators (==, ===):\n\n\nconsole.log(5 == '5');  // true (implicit coercion, string '5' is converted to number)\nconsole.log(5 === '5'); // false (strict equality, no coercion)"
  },
  {
    "id": 13,
    "topic": "javascript",
    "question": "Does JavaScript support automatic type conversion (AutoConversion)?",
    "answer": "Yes, JavaScript does support automatic type conversion, often referred to as \"type coercion\" or \"type conversion.\" This means that JavaScript can automatically convert values from one data type to another in certain situations, such as when performing operations or comparisons involving different data types.\r\n\r\nHere are some common scenarios where automatic type conversion occurs:\r\n\r\n1.   Numeric/String Conversion  :\r\n   - When a value of one type is used in a context that expects another type, JavaScript will attempt to convert it to the expected type.\r\n   - For example, concatenating a string with a number will convert the number to a string:\r\n\r\n     \r\n     let num = 10;\r\n     let str = \"The number is: \" + num; // \"The number is: 10\"\r\n     \r\n\r\n2.   Comparison Operations  :\r\n   - When comparing values of different types using comparison operators like  \"== \", JavaScript will attempt to convert one or both operands to a common type before making the comparison.\r\n   - For example, when comparing a string to a number using  \"== \", JavaScript will convert the string to a number if possible before making the comparison:\r\n\r\n     \r\n     \"10\" == 10; // true (string \"10\" is converted to the number 10)\r\n   \r\n\r\n3.   Boolean Conversion  :\r\n   - Values can be automatically converted to boolean values ( \"true \" or  \"false \") in contexts that expect boolean values, such as in  \"if \" statements or boolean operations ( \"&& \",  \"|| \",  \"! \").\r\n   - JavaScript treats certain values as \"falsy\" (e.g.,  \"0 \",   \",  \"null \",  \"undefined \",  \"NaN \"), and all other values are treated as \"truthy\".\r\n\r\n4.   Implicit Type Coercion  :\r\n   - JavaScript will implicitly coerce values to the expected type in certain situations, which can lead to unexpected behavior if not understood properly.\r\n   - For example, adding a number to a string using the  \"+ \" operator will implicitly convert the number to a string and perform string concatenation:\r\n\r\n     \r\n     5 + \"10\"; // \"510\"\r\n   \r\n\r\nWhile automatic type conversion can be convenient in some cases, it's important to understand how it works to avoid unexpected results and bugs in your code. In situations where clarity and predictability are important, explicit type conversion using functions like  \"parseInt() \",  \"parseFloat() \", or  \"String() \" is recommended.",
    "tags": [
      "data-types"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 14,
    "topic": "javascript",
    "question": "What are all the loops available in JavaScript?",
    "answer": "JavaScript provides several types of loops for iterating over data or executing code repeatedly. Here are the main types of loops available:\n\n1.   for Loop  :\n   - Executes a block of code multiple times, with a different value each time.\n   - Syntax:\n  \n     for (initialization; condition; iteration) {\n         // code to be executed\n     }\n    \n\n2.   while Loop  :\n   - Executes a block of code as long as a specified condition is true.\n   - Syntax:\n     \n     while (condition) {\n         // code to be executed\n     }\n     \n\n3.   do...while Loop  :\n   - Similar to the  \"while \" loop, but the condition is evaluated after executing the block of code, so the block is guaranteed to execute at least once.\n   - Syntax:\n   \n     do {\n         // code to be executed\n     } while (condition);\n  \n\n4.   for...in Loop  :\n   - Iterates over the enumerable properties of an object.\n   - Syntax:\n   \n     for (variable in object) {\n         // code to be executed\n     }\n  \n\n5.   for...of Loop  :\n   - Iterates over iterable objects (e.g., arrays, strings, maps, sets) and provides the ability to access each item's value directly.\n   - Syntax:\n  \n     for (variable of iterable) {\n         // code to be executed\n     }\n    \n\n6.   forEach() Method  :\n   - Iterates over the elements of an array and executes a provided function once for each array element.\n   - Syntax:\n  \n     array.forEach(function(currentValue, index, array) {\n         // code to be executed\n     });\n    \n\n",
    "tags": [
      "loops"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 15,
    "topic": "javascript",
    "question": "What is  Variable typing in JavaScript?",
    "answer": "Variable typing in JavaScript means variables can store different data types and the data type of a variable can be dynamically changed during runtime of a program. JavaScript is a dynamically typed language, so variables are not tied to any data type when the program gets compiled but, rather, the data type of a variable at runtime depends upon the type of value stored within it.\r\n\r\nThis dynamic typing provides flexibility and makes coding easier in most situations, but it also needs careful attention to data types to prevent unexpected behavior or errors. Some of the main points regarding variable typing in JavaScript are:\r\n\r\n1.   Dynamic Typing  : JavaScript variables can store values of any type, and the type of a variable may change over time as different values are stored in it.\r\n\r\n2.   Implicit Type Conversion  : JavaScript automatically performs implicit type conversion (type coercion) if required, converting values from one type to another in some operations or comparisons.\r\n\r\n3.   Data Types  : JavaScript has a number of data types, such as numbers, strings, booleans, objects, arrays, functions, symbols, and null/undefined values.\r\n\r\n4.   Type Checking  : JavaScript is dynamically typed, but you can still check the type using operators like  \"typeof \", which gives the data type of a value or variable.\r\n\r\n5.   Type Stability  : Although JavaScript supports dynamic typing, it is advisable to have type stability in your code for better readability and to minimize the chances of errors.\r\n\r\nIn general, variable typing in JavaScript is convenient and flexible but also needs careful attention from developers regarding data types and type conversions to guarantee code correctness and reliability.",
    "tags": [
      "variables"
    ],
    "keyFeatures": [],
    "actionWords": [
      "variables can hold values of different data types"
    ],
    "codeExample": ""
  },
  {
    "id": 16,
    "topic": "javascript",
    "question": "Explain the difference between the “==” and “===” operator?",
    "answer": "The  \"== \" and  \"=== \" operators in JavaScript are used for comparison, but they behave differently in terms of strictness and type coercion.\n\n       Loose Equality Operator ( \"== \"):\n\n1.   Comparison  :\n   - The  \"== \" operator compares two values for equality, allowing type coercion if the operands are of different types.\n   - It attempts to convert the operands to a common type before making the comparison.\n\n2.   Type Coercion  :\n   - If the operands are of different types, JavaScript will attempt to convert one or both of them to a common type before comparing.\n   - This can lead to unexpected results, especially when comparing values of different types.\n\n3.   Examples  :\n   \n   5 == \"5\" // true (number 5 is coerced to string \"5\" before comparison)\n   null == undefined // true (both are considered equal in loose equality)\n   0 == false // true (number 0 is coerced to boolean false)\n   \n\n       Strict Equality Operator ( \"=== \"):\n\n1.   Comparison  :\n   - The  \"=== \" operator, also known as the strict equality operator, compares two values for equality without performing type coercion.\n   - It returns  \"true \" only if the operands are of the same type and have the same value.\n\n2.   Type Check  :\n   - In strict equality ( \"=== \"), both the value and the data type of the operands are compared.\n   - If the data types of the operands are different, they are considered unequal, even if their values are similar.\n\n3.   Examples  :\n   \n   5 === \"5\" // false (number 5 is not equal to string \"5\" in strict equality)\n   null === undefined // false (null and undefined are of different types)\n   0 === false // false (number 0 and boolean false are of different types)\n   \n\n       Summary:\n\n-   Loose Equality ( \"== \")  :\n  - Allows type coercion, converting values to a common type before comparison.\n  - Can lead to unexpected results due to type conversion.\n  - Use with caution, as it may not always produce intuitive results.\n\n-   Strict Equality ( \"=== \")  :\n  - Does not perform type coercion, comparing both value and data type.\n  - Ensures more predictable and reliable comparisons.\n  - Generally recommended for most comparisons to avoid unexpected behavior.",
    "tags": [
      "operators"
    ],
    "keyFeatures": [],
    "actionWords": [
      "\"== \" operator compares two values for equality & can perform type conversion",
      "\n\"===\"  compares two values for equality without performing type coercion\n"
    ],
    "codeExample": ""
  },
  {
    "id": 17,
    "topic": "javascript",
    "question": "What is a continue statement in JS ?",
    "answer": "In JavaScript, the continue statement is used inside loops to skip the current iteration and proceed to the next iteration of the loop. When the continue statement is encountered, the remaining code inside the loop for the current iteration is skipped, and the loop proceeds with the next iteration.",
    "tags": [
      "statement"
    ],
    "keyFeatures": [],
    "actionWords": [
      "skip the current iteration and proceed to the next iteration of the loop"
    ],
    "codeExample": ""
  },
  {
    "id": 18,
    "topic": "javascript",
    "question": "List the differences between .call() and .apply() and bind() ?",
    "answer": "The .call(), .apply(), and .bind() methods in JavaScript are all used to set the this value within a function.\n\nHere's a breakdown of their differences:\n\n   1.Call() The .call() method invokes a function with a given this value, and arguments provided individually. It takes the this value and a list of arguments as parameters and executes the function immediately.\n\n   \n    function test(arg1, arg2){\n      console.log(this.num, arg1, arg2); // 100, 10, 20\n    }\n    test.call({num: 100}, 10, 20);\n   \n\n   2.Apply() The .apply() method also invokes a function and sets the this value. However, .apply() accepts arguments as a single array. Like .call(), it executes the function immediately.\n\n   \n    function test(...arguments){\n      console.log(this.num, arguments);//100, [1,2,3]\n    }\n    test.apply({num: 100}, [1,2,3]);\n   \n\n   3.Bind() The .bind() method binds the this value to the function and returns a new function. It does not execute the function immediately. The returned function needs to be invoked separately.\n\n   \n    function test(arg){\n      console.log(this.number, arg);\n    }\n    let bindedFn = test.bind({number: 99}, \"argument\");\n    bindedFn(); // 99, \"argument\"\n   \n\nIn essence, .call() and .apply() are quite similar; the main distinction lies in how arguments are passed to the function. With .call(), arguments are passed individually, while .apply() expects an array of arguments[1]. Meanwhile, .bind() differs from both as it only creates a new function with the specified this value, requiring a separate invocation to execute the function. They are used to explicitly define what this should reference within the calling function. These methods are inherited by every function and are useful for callbacks and event handlers.\n",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 19,
    "topic": "javascript",
    "question": "What do you understand by event bubbling?",
    "answer": "Event bubbling is a concept in JavaScript where events triggered on an element are propagated or \"bubbled\" up through its parent elements in the DOM tree. When an event occurs on a nested element (e.g., a button inside a div), the event is first captured and handled by the innermost element, then propagated up through its ancestor elements, triggering their respective event handlers along the way.\n\nHere's how event bubbling works:\n\n1.   Event Capture Phase  : When an event is triggered on an element, the browser first captures the event during the capture phase. During this phase, the event propagates down from the root of the DOM tree to the target element.\n\n2.   Target Element  : Once the event reaches the target element, it triggers the event handler bound to that element, allowing for specific actions to be performed in response to the event.\n\n3.   Event Bubbling Phase  : After the event has been handled by the target element, it then begins to bubble up through the ancestor elements in the DOM tree. This means that the same event is triggered on each ancestor element, allowing their event handlers to be executed in sequence.\n\nEvent bubbling allows for event delegation, which means you can attach a single event handler to a parent element and handle events for multiple child elements. This can lead to more efficient and manageable code, especially in cases where there are many dynamically created elements.\n\nHowever, event bubbling can also lead to unexpected behavior if not handled properly, as events triggered on child elements may inadvertently trigger event handlers on parent elements as well. In such cases, event.stopPropagation() can be used to stop the propagation of the event to parent elements.",
    "tags": [
      "event"
    ],
    "keyFeatures": [],
    "actionWords": [
      "Propogation of triggered event to its parent elements."
    ],
    "codeExample": ""
  },
  {
    "id": 20,
    "topic": "javascript",
    "question": "What is  event delegation  in JS ? ",
    "answer": "Event delegation is a technique in JavaScript where a single event listener is added to a parent element to manage events for multiple child elements. Instead of adding individual event listeners to each child element, you take advantage ofevent bubbling—where an event propagates up the DOM tree—to handle events from all children in one place.\n\nKey Benefits:\n-Efficiency: Reduces memory usage by having fewer event listeners.\n-Dynamic Content: Easily handles events on elements that are added to the DOM dynamically.\n-Simpler Code: Centralizes event handling logic in one place.\n\n",
    "tags": [
      "event"
    ],
    "keyFeatures": [],
    "actionWords": [
      "single event listener to manage events of multiple child",
      ""
    ],
    "codeExample": "Example:\nSuppose you have a list of items, and you want to handle clicks on any list item:\n\n\n<ul id=\"itemList\">\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n\n\nYou can add a single click event listener on the <ul> element:\n\n\ndocument.getElementById('itemList').addEventListener('click', function(event) {\n  // Check if the clicked element is an <li>\n  if (event.target && event.target.nodeName === 'LI') {\n    console.log('List item clicked:', event.target.textContent);\n  }\n});\n\n\nIn this example, no matter how many <li> items are present or added later, the single event listener on the <ul> element handles the click events for all list items.\n\nThis approach makes your code cleaner and more efficient, especially when dealing with dynamic content."
  },
  {
    "id": 21,
    "topic": "javascript",
    "question": "Is JavaScript case-sensitive?",
    "answer": "Yes, JavaScript is case-sensitive, meaning that it distinguishes between uppercase and lowercase letters in identifiers such as variable names, function names, object keys, and so on. This means that myVariable, MyVariable, and myvariable would all be considered as distinct identifiers in ",
    "tags": [
      "fundamental"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 22,
    "topic": "javascript",
    "question": "What is Deferred Script & Describe the role of deferred scripts in JS .",
    "answer": "In HTML, the  \"defer \" attribute is used with the  \"<script> \" element to specify that the execution of the script should be deferred until after the document has been parsed. When a script is marked as deferred, it will be executed after the HTML document has been fully loaded and parsed, but before the  \"DOMContentLoaded \" event is fired.\n\n       Role of Deferred Scripts:\n\n1.   Asynchronous Loading  : Deferred scripts are loaded asynchronously, meaning that they do not block the parsing of the HTML document. Instead, they are downloaded in parallel with other resources, such as CSS stylesheets and images.\n\n2.   Execution Timing  : Deferred scripts are executed in the order they appear in the HTML document, after the HTML document has been fully parsed. This ensures that the script has access to all elements in the document's DOM tree.\n\n3.   DOMContentLoaded Event  : Deferred scripts are executed before the  \"DOMContentLoaded \" event is fired, which indicates that the HTML document has been fully loaded and parsed. This allows scripts to manipulate the DOM or perform other actions as soon as the document is ready.\n\n4.   Improved Performance  : By deferring the execution of scripts until after the document has been parsed, deferred scripts can improve the performance of web pages by reducing the time it takes for the initial content to be displayed to the user.\n\n5.   Script Dependencies  : Deferred scripts are useful when you have scripts that depend on other resources or scripts that need to be executed in a specific order. By deferring the execution of scripts, you can ensure that dependent scripts are loaded and executed at the appropriate time.\n\nOverall, deferred scripts are a useful tool for optimizing the loading and execution of scripts in web pages, particularly for scripts that are not critical for rendering the initial content of the page but still need to be executed as part of the page's functionality.",
    "tags": [
      "html"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 23,
    "topic": "javascript",
    "question": "What do you mean by screen objects? Explain.",
    "answer": "In the context of web development, screen objects generally refer to the built-in Screen interface provided by the browser. This object contains information about the user's physical screen, which you can access via the global window.screen object.\n\n Key Points About the Screen Object:\n\n- Properties:  \n  The Screen object provides read-only properties such as:\n  - screen.width and screen.height: Represent the total width and height of the screen.\n  - screen.availWidth and screen.availHeight: Indicate the available width and height, excluding features like the taskbar.\n  - screen.colorDepth and screen.pixelDepth: Provide information about the color and pixel depth of the screen.\n\n- Usage:  \n  You might use these properties to:\n  - Adapt your website layout based on the user's screen dimensions.\n  - Detect the available screen space when creating full-screen applications.\n  - Make decisions about media queries or responsive designs.\n\n- Limitations:  \n  Remember that the Screen object does not represent the browser's viewport or the document's size. Instead, it reflects the physical screen's characteristics. For viewport information, you would use properties like window.innerWidth and window.innerHeight.\n\n Summary:\nScreen objects (or the Screen interface) provide a way to retrieve important data about the user's display. This information can be useful for tailoring user experiences, especially in responsive or full-screen applications.",
    "tags": [
      "object"
    ],
    "keyFeatures": [],
    "actionWords": [
      "user's screen",
      "\nprovide information about user's screen",
      "\n"
    ],
    "codeExample": "console.log(\"Screen width:\", screen.width);\r\nconsole.log(\"Screen height:\", screen.height);\r\nconsole.log(\"Available width:\", screen.availWidth);\r\nconsole.log(\"Available height:\", screen.availHeight);\r"
  },
  {
    "id": 24,
    "topic": "javascript",
    "question": "What do you mean by NULL in JavaScript?",
    "answer": "In JavaScript, null is a special value that represents the absence of any object value. It is a primitive data type, and it is often used to explicitly indicate that a variable does not currently have a value assigned to it.",
    "tags": [
      "data-types"
    ],
    "keyFeatures": [],
    "actionWords": [
      "absence of any object value"
    ],
    "codeExample": ""
  },
  {
    "id": 25,
    "topic": "javascript",
    "question": "What is 'Strict’ mode in JavaScript ?",
    "answer": "Strict mode in JavaScript is a feature introduced in ECMAScript 5 (ES5) that allows developers to opt in to a restricted version of JavaScript that enforces stricter rules and better error handling. When strict mode is enabled, certain actions that would otherwise be silently ignored or fail silently will instead throw errors, making it easier to write secure and more reliable code.",
    "tags": [
      "mode"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 26,
    "topic": "javascript",
    "question": "What is closures in JavaScript? When are they used?",
    "answer": "In JavaScript, a closure is a combination of a function and the lexical environment within which that function was declared. This lexical environment consists of any variables, objects, or functions that were in scope at the time the closure was created. The closure retains access to these variables even after the outer function has finished executing.\n\nHere are some key points about closures:\n\n1.   Function and Lexical Environment  : When a function is defined within another function (nested function), it forms a closure. The inner function has access to the variables and parameters of the outer function, as well as its own local variables.\n\n2.   Access to Outer Scope  : Closures allow inner functions to access and manipulate variables from the outer function, even after the outer function has returned. This behavior is known as \"closing over\" or \"capturing\" the variables.\n\n3.   Private Variables  : Closures are often used to create private variables and encapsulate functionality within a function scope. By defining variables within the outer function that are only accessible to the inner function, you can create a level of data hiding and encapsulation.\n\n4.   Maintaining State  : Closures can be used to maintain state across multiple function calls. Since variables in the outer scope are retained by the closure, their values can be modified and accessed across different invocations of the inner function.\n\n5.   Callbacks and Event Handlers  : Closures are commonly used in asynchronous programming, such as event handling and callbacks. They allow you to pass functions as arguments to other functions and maintain access to the surrounding context in which they were defined.\n\n6.   Memory Management  : Closures can also have implications for memory management, as they may retain references to variables and objects even after they are no longer needed. This can lead to memory leaks if closures are not used carefully, especially in long-running applications.\n\n       \n\nClosures are a powerful and fundamental concept in JavaScript, and they are widely used in many programming patterns and techniques, including functional programming, asynchronous programming, and module patterns. Understanding closures is essential for writing expressive and efficient JavaScript code.",
    "tags": [
      "closure"
    ],
    "keyFeatures": [],
    "actionWords": [
      "combination of function & lexical environment",
      "\n"
    ],
    "codeExample": "Example:\n\n\nfunction outerFunction() {\n    var outerVariable = 'I am outer';\n\n    function innerFunction() {\n        console.log(outerVariable); // Accessing outerVariable from the outer scope\n    }\n\n    return innerFunction;\n}\n\nvar closure = outerFunction(); // The inner function is returned from outerFunction\nclosure(); // Prints: \"I am outer\"\n\n\nIn this example,  \"innerFunction \" forms a closure that retains access to the  \"outerVariable \" even after  \"outerFunction \" has finished executing. When  \"closure \" is called, it can still access and log the value of  \"outerVariable \" from the outer scope."
  },
  {
    "id": 27,
    "topic": "javascript",
    "question": "Explain passed by value and passed by reference.",
    "answer": "In JavaScript, \"passed by value\" and \"passed by reference\" refer to how data is handled when it is passed to a function. The difference is crucial in understanding how variables behave when they are passed to functions.\n\n 1. Passed by Value:\nWhen a primitive value (like a number, string, boolean, undefined, null, symbol, or bigint) is passed to a function, it is passed by value. This means that a copy of the original value is passed to the function. Any changes made to the variable inside the function do not affect the original variable outside the function.\n\n\n 2. Passed by Reference:\nWhen a non-primitive value (like an object, array, or function) is passed to a function, it is passed by reference. This means that the function receives a reference (or address) to the original value, not a copy. Any changes made to the object or array inside the function will affect the original object or array outside the function because both the original and the copy point to the same memory location.\n\n \n Key Differences:\n- Primitive types (e.g., numbers, strings, booleans) are passed by value.\n- Objects, arrays, and functions are passed by reference.\n\n Summary:\n- Passed by Value: The function gets a copy of the value. Changes inside the function do not affect the original variable.\n- Passed by Reference: The function gets a reference to the original object. Changes inside the function will affect the original object.",
    "tags": [
      "misc"
    ],
    "keyFeatures": [],
    "actionWords": [
      "copy of the original value is passed ",
      "\nreference of the original value is passed",
      ""
    ],
    "codeExample": " Example (Passed by Value):\n\n\nfunction modifyValue(num) {\n  num = 10;\n}\n\nlet a = 5;\nmodifyValue(a);\n\nconsole.log(a); // Output: 5 (Original value of 'a' remains unchanged)\n\n\n- Explanation: When a is passed to the function, the value of a is copied into the num parameter. Changing num inside the function does not affect a because only the copy of the value was passed.\n\nExample (Passed by Reference):\n\n\nfunction modifyObject(obj) {\n  obj.name = \"John\";\n}\n\nlet person = { name: \"Alice\" };\nmodifyObject(person);\n\nconsole.log(person.name); // Output: \"John\" (Original object is modified)\n\n\n- Explanation: In this case, when person is passed to the modifyObject function, the reference (memory address) to the person object is passed. Changing the name property of obj inside the function also changes the person object because both refer to the same memory location.\n"
  },
  {
    "id": 28,
    "topic": "javascript",
    "question": "What is an Immediately Invoked Function in JavaScript?",
    "answer": "An Immediately Invoked Function Expression (IIFE) is a JavaScript function that runs as soon as it is defined. Its primary purpose is to create a new scope, helping avoid polluting the global namespace.\n\n Common Use Cases\n\n1. Encapsulation & Data Privacy:  \n   Variables and functions declared within an IIFE cannot be accessed from the global scope. This is especially useful when you want to prevent conflicts between variables in different parts of your code or third-party libraries.\n   \n   \n   \n   \n\n2. Initialization:  \n   IIFEs are often used to execute code immediately for initialization tasks. For instance, setting up event listeners, initializing modules, or performing a one-time configuration.\n   \n   \n   \n\n3. Avoiding Global Scope Pollution:  \n   By wrapping your code in an IIFE, you limit the exposure of your variables and functions to the global scope, which minimizes the risk of conflicts.\n   \n \n\n4. Module Pattern:  \n   IIFEs are often used as the foundation of the module pattern in JavaScript, where you return an object exposing only the parts of your code that you want to be public.\n   \n \n\n Summary\nAn IIFE allows you to run code immediately while keeping variables and functions contained within a local scope. This technique is valuable for module encapsulation, initialization tasks, and preventing global namespace pollution in JavaScript.",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [
      "runs as soon as it is defined",
      "\navoid global name-space pollution"
    ],
    "codeExample": "Example 1 : \n(function() {\n     const secret = \"hidden\";\n     console.log(\"Inside IIFE:\", secret);\n   })();\n   \n   // Trying to access secret here will result in an error:\n   // console.log(secret); // ReferenceError: secret is not defined\n\nExample 2 : \n\n (function() {\n     // Perform one-time setup actions\n     console.log(\"Initialization complete\");\n   })();\n\nExample3:\n  \n   (function() {\n     let count = 0;\n     function increment() {\n       count++;\n       console.log(count);\n     }\n     // Code using count and increment without affecting global scope.\n     increment();\n   })();\n   \nExample 4 : \n\n\n const counterModule = (function() {\n     let count = 0;\n     return {\n       increment() {\n         count++;\n         return count;\n       },\n       reset() {\n         count = 0;\n       }\n     };\n   })();\n   \n   console.log(counterModule.increment()); // 1\n   console.log(counterModule.increment()); // 2\n   counterModule.reset();\n   "
  },
  {
    "id": 29,
    "topic": "javascript",
    "question": "Explain Higher-Order Functions in JavaScript",
    "answer": "A higher-order function in JavaScript is a function that either:\n\n1. Accepts one or more functions as arguments, or\n2. Returns a function as its result.\n\nThis is a fundamental idea in functional programming and makes your code more modular, reusable, and expressive.\n\n\n\n Key Features:\n\n- Accepting Functions as Arguments:\n - You can pass functions to other functions in order to customize behavior.\n- This enables you to abstract shared patterns and make your code more versatile.\n\n- Returning Functions:\n- A function may create and return another function.\n- This can be used for function factories or for currying, where you partially apply the arguments of a function.\n\n\n\n Use Cases:\n\n1. Array Methods:\n   - JavaScript array methods such as .map(), .filter(), and .reduce() are higher-order functions.\n\n\n2. Event Handlers:\n   - When you add an event listener, you're usually providing a callback function to process the event.\n  \n     \n\n3. Function Composition and Currying:\n- You can make functions that output new functions so that you can construct specialized functions from more generic ones.\n\n     \n\n4. Middleware in Frameworks:\n- In systems such as Express., higher-order functions are employed to define middleware functions that transform request/response objects or carry out certain operations prior to hitting the end route handler.\n\n5. Throttling and Debouncing:\n   - Higher-order functions can produce debounced or throttled functions to manage the frequency at which a function is called.\n   \n\n\n\n Summary:\n\nHigher-order functions give you the power to create more abstract and versatile code by enabling functions to take other functions as arguments. Whether you're dealing with array methods, event handling, or creating your own utility functions, having control over higher-order functions can make a huge difference in your capacity to write clean, maintainable JavaScript.",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [
      "either takes/returns a function"
    ],
    "codeExample": "- Example:\n     \n     const numbers = [1, 2, 3, 4, 5];\n     const doubled = numbers.map(num => num  2);\n     console.log(doubled); // [2, 4, 6, 8, 10]\n     \n   - In this example, .map() takes a function as an argument to change each element of the array.\n\n - Example:\n     \n     document.getElementById('myButton').addEventListener('click', () => {\n       console.log('Button clicked!');\n     });\n\n   - Example (Currying):\n     \n     const add = (x) => (y) => x + y;\n     const addFive = add(5);\n     console.log(addFive(3)); // 8\n\n- Example (Debounce):\n     \nfunction debounce(func, delay) {\n       let timer;\n       return function(.args) {\n         clearTimeout(timer);\n         timer = setTimeout(() => func.apply(this, args), delay);\n       };\n     }\nwindow.addEventListener('resize', debounce(() => {\n       console.log('Resize event handled!');\n     }, 300));\n     "
  },
  {
    "id": 30,
    "topic": "javascript",
    "question": "What is Currying in JavaScript?",
    "answer": "Currying in JavaScript is an interesting technique based on functional programming, where a function that is supposed to accept multiple arguments is transformed into a sequence of functions, each of which accepts one argument. Rather than accepting all arguments at once, a curried function neatly returns a new function expecting the next argument, and this goes on until all arguments have been supplied.\n\n How Currying Works\n\n- Step-by-Step Argument Application:\n  In a curried function, each call takes a single argument, returning another function that eagerly expects the next argument. It is only when all the arguments have been supplied that the function is brought to life, running to reveal the final result.\n\n- Simplified Function Reuse:\n  Currying can help create more reusable functions, as it allows you to pre-configure a function with some arguments and create specialized versions.\n\n \n\n\n Advantages of Currying\n\n- Partial Application:\n  Currying enables you to supply some arguments of a function, and then define a new function. For instance:\n\n  \n  const addOne = curriedAdd(1);\n  const addOneAndTwo = addOne(2);\n  console.log(addOneAndTwo(3)); // Output: 6\n  \n\n- Code Reusability:\nBy writing partially applied functions, it is possible to reuse them in various parts of an application without duplicating the same logic.\n\n- Better Readability:\n  Currying can make functions more modular and readable, particularly when working with complicated operations that need multiple parameters.\n\n Real-World Applications\n\n- Event Handling:\n  Consider curried functions processing events, where the event type is the first argument, and the curried functions work with specific actions pertaining to the event.\n  \n- Configuration Functions:\n  When working with a function that takes configuration options, currying can be employed to create a configuration layer, with dynamic data to be added later.\n\n Conclusion\n\nIn JavaScript, currying is a fantastic tool that converts multi-argument functions into a series of single-argument functions, enabling partial application and cleaner, more modular code. This design pattern is widely applied in functional programming and is particularly useful when one needs to reuse or pre-configure functions for certain tasks.",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [
      "sequence of functions",
      "\neach call takes a single arguement"
    ],
    "codeExample": "Example: Basic Currying\n\nSuppose we have a function that is in charge of adding three numbers:\n  \n\n// A non-curried version:\nfunction add(a, b, c) {\n  return a + b + c;\n}\nconsole.log(add(1, 2, 3)); // Output: 6\n\n\nA curried version of the above function might be defined as follows:\n\n\nfunction curriedAdd(a) {\n  return function(b) {\n    return function(c) {\n      return a + b + c;\n    };\n  };\n}\n\n// Usage:\nconst result = curriedAdd(1)(2)(3);\nconsole.log(result); // Output: 6"
  },
  {
    "id": 31,
    "topic": "javascript",
    "question": "Explain Scope and Scope Chain in JavaScript?",
    "answer": "In JavaScript, scope determines the accessibility (visibility) of variables, functions, and objects in a particular part of your code during runtime. The scope chain is the mechanism by which JavaScript resolves variable names by looking through nested scopes in a hierarchical order.\n\n\n\n 1. Scope\nScope defines the region where a variable or function can be accessed. JavaScript has three types of scope:\n- Global Scope: Variables declared outside any function or block.\n- Function (Local) Scope: Variables declared inside a function.\n- Block Scope: Variables declared inside a block (e.g., {} with let/const).(refer example1).\n\n \n\n\n\n 2. Scope Chain\nWhen a variable is referenced, JavaScript searches for it in the current scope. If not found, it moves up to the outer/parent scope, continuing until the global scope is reached. This hierarchy of nested scopes is called the scope chain.\n\n How It Works:\n1. Lexical Scoping: The scope chain is determined by the physical placement of functions/blocks in the code (not where they’re called).\n2. Closures: Inner functions retain access to their outer scope even after the outer function has executed. (refer example2).\n\n \n\n\n\n\n Key Concepts\n1. Variable Lookup:\n   - Moves inward → outward (current scope → outer scopes → global scope).\n   - If a variable isn’t found, a ReferenceError occurs.\n\n2. Lexical Environment:\n   - Each function/block creates a new lexical environment.\n   - Scopes are nested, forming a chain.\n\n3. Block Scope (ES6):\n   - let and const are block-scoped (confined to {}).\n   - var is function-scoped (ignores blocks like if/for).\n\n4. Closures:\n   \n   function outer() {\n     let outerVar = \"outer\";\n     return function inner() {\n       console.log(outerVar); // Still accessible via scope chain\n     };\n   }\n   const closureFunc = outer();\n   closureFunc(); // \"outer\"\n   \n\n\n\n Scope Chain vs. Execution Context\n- When a function is called, a new execution context is created, which includes:\n  - Its own variable environment (local variables).\n  - A reference to the outer lexical environment (scope chain).\n\n\n\n Common Pitfalls\n1. Accidental Global Variables:\n   \n   function leak() {\n     leaked = \"global\"; // ❌ No declaration → global variable!\n   }\n   \n2. Variable Shadowing:\n   \n   let x = \"global\";\n   function outer() {\n     let x = \"outer\"; // Shadows the global x\n     console.log(x); // \"outer\"\n   }\n   \n\n\n\n Summary\n- Scope: Defines where variables/functions are accessible.\n- Scope Chain: The hierarchy of scopes used to resolve variables.\n- Lexical Scoping: Scopes are determined by where code is written, not where it’s called.\n- Closures: Inner functions \"remember\" their outer scope via the scope chain.",
    "tags": [
      "scope"
    ],
    "keyFeatures": [],
    "actionWords": [
      "context in which variables/fucntions/objects are accessible",
      ""
    ],
    "codeExample": "Example1:\n\nlet globalVar = \"global\"; // Global scope\n\nfunction outer() {\n  let outerVar = \"outer\"; // Function scope (outer)\n\n  if (true) {\n    let blockVar = \"block\"; // Block scope (inside if)\n    console.log(globalVar); // Accessible (global scope)\n    console.log(outerVar); // Accessible (outer function scope)\n  }\n\n  console.log(blockVar); // ❌ Error: blockVar not defined (block-scoped)\n}\nouter();\nconsole.log(outerVar); // ❌ Error: outerVar not defined (function-scoped)\n\nExample2:\n\nlet globalVar = \"global\";\n\nfunction outer() {\n  let outerVar = \"outer\";\n  \n  function inner() {\n    let innerVar = \"inner\";\n    console.log(globalVar); // \"global\" (from global scope)\n    console.log(outerVar);  // \"outer\" (from outer scope)\n    console.log(innerVar);  // \"inner\" (from inner scope)\n  }\n  inner();\n}\nouter();\n"
  },
  {
    "id": 32,
    "topic": "javascript",
    "question": "What are object prototypes?",
    "answer": "In JavaScript, object prototypes are the mechanism by which objects inherit properties and methods from other objects. Every JavaScript object has a\n [[Prototype]], an internal property that links it to another object (its prototype). This forms a prototype chain, enabling inheritance and shared behavior across objects.\n\n\n\n Key Concepts\n1. Prototype Chain:\n   - When accessing a property/method on an object, JavaScript:\n     1. Checks the object itself.\n     2. If not found, traverses up the prototype chain via [[Prototype]].\n     3. Stops at null (end of the chain) or returns undefined.\n   - Example:\n     \n2. prototype Property (Constructor Functions):\n   - Functions have a prototype property, used when the function is a constructor.\n   - Instances created with new inherit from the constructor’s prototype.\n   - Example:\n     \n     \n     \n\n3. __proto__ vs. prototype:\n   - __proto__ (deprecated): A property of an object pointing to its prototype.\n   - prototype: A property of constructor functions, defining the blueprint for instances.\n   - Use Object.getPrototypeOf(obj) and Object.setPrototypeOf(obj, proto) instead of __proto__.\n\n\n\n How Prototypes Work\n- Object Literals: Inherit from Object.prototype.\n  \n  const obj = {};\n  console.log(Object.getPrototypeOf(obj) === Object.prototype); // true\n  \n- Constructor Instances: Inherit from the constructor’s prototype.\n  \n  function Car() {}\n  const myCar = new Car();\n  console.log(Object.getPrototypeOf(myCar) === Car.prototype); // true\n  \n- Modifying Prototypes:\n  Changes to a prototype affect all existing and future instances:\n  \n  Car.prototype.drive = function() { console.log(\"Vroom!\"); };\n  myCar.drive(); // \"Vroom!\"\n  \n\n\n\n Prototype Inheritance\nJavaScript uses prototypal inheritance (not classical). You can create inheritance chains:\n\nfunction Animal(name) {\n  this.name = name;\n}\nAnimal.prototype.eat = function() { console.log(\"Eating...\"); };\n\nfunction Bird(name) {\n  Animal.call(this, name); // Inherit properties\n}\nBird.prototype = Object.create(Animal.prototype); // Inherit methods\nBird.prototype.fly = function() { console.log(\"Flying!\"); };\n\nconst eagle = new Bird(\"Eagle\");\neagle.eat(); // \"Eating...\" (from Animal.prototype)\neagle.fly(); // \"Flying!\" (from Bird.prototype)\n\n\n\n\n ES6 Classes (Syntactic Sugar)\nES6 class simplifies prototype-based inheritance:\njavascript\nclass Animal {\n  constructor(name) { this.name = name; }\n  eat() { console.log(\"Eating...\"); }\n}\n\nclass Bird extends Animal {\n  fly() { console.log(\"Flying!\"); }\n}\n\nconst eagle = new Bird(\"Eagle\");\neagle.eat(); // \"Eating...\"\neagle.fly(); // \"Flying!\"\n\n\n\n\n Important Notes\n1. Object.prototype is the top of the chain. Its prototype is null.\n2. Own Properties vs. Inherited:\n   - Use obj.hasOwnProperty(\"key\") to check if a property is on the object itself (not inherited).\n3. Shadowing:\n   - If an object defines a property with the same name as its prototype, the object’s own property takes precedence.\n   javascript\n   const obj = { toString: () => \"Custom toString\" };\n   console.log(obj.toString()); // \"Custom toString\" (not Object.prototype.toString)\n   \n\n\n\n Summary\n- Prototype: A template object from which other objects inherit properties/methods.\n- Prototype Chain: A lookup mechanism for resolving properties/methods.\n- Constructor Prototypes: Define shared behavior for instances.\n- Inheritance: Achieved via chaining prototypes (Object.create(), class syntax).",
    "tags": [
      "object"
    ],
    "keyFeatures": [],
    "actionWords": [
      "prototypes are the mechanism by which objects inherit properties and methods from other objects"
    ],
    "codeExample": "Example1:\nconst parent = { name: \"Parent\" };\n     const child = { age: 10 };\n     Object.setPrototypeOf(child, parent); // child's prototype is parent\n\n     console.log(child.name); // \"Parent\" (inherited from prototype)\n\nExample2:\nfunction Dog(name) {\n       this.name = name;\n     }\n     Dog.prototype.bark = function() { // Method added to prototype\n       console.log(\"Woof!\");\n     };\n\n     const dog1 = new Dog(\"Max\");\n     dog1.bark(); // \"Woof!\" (inherited from Dog.prototype)"
  },
  {
    "id": 33,
    "topic": "javascript",
    "question": " What are callbacks? ",
    "answer": "Callbacks in JavaScript are functions that are passed as arguments to other functions and are invoked (or \"called back\") once a certain task is completed or a specific event occurs.\n\n Key Points About Callbacks:\n\n- Asynchronous Operations:  \n  Callbacks are especially useful for handling asynchronous operations like network requests, file reading, or timers. Once the asynchronous operation is done, the callback is executed.\n\n- Event Handling:  \n  In event-driven programming (e.g., UI events in the browser), callbacks are used to handle events like clicks, mouse movements, or key presses.\n\n- Function Composition:  \n  They allow you to build complex operations by combining simpler functions, passing them around as arguments to be executed at a later time.\n\n Example:\n\n\n\n Summary\n\nCallbacks are essential for managing asynchronous code, event handling, and building modular, reusable functions in JavaScript. They help ensure that code executes in the desired order, especially when operations may take time to complete.",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [
      " functions that are passed as arguments to other functions",
      "\nasynchronous",
      " function as argument",
      " event handling",
      " inversion of control",
      " higher-order functions",
      " callback hell",
      " setTimeout",
      " error-first callback\r\n"
    ],
    "codeExample": "Imagine you have a function that performs an asynchronous task (simulated with setTimeout) and then calls a callback function:\n\n\nfunction fetchData(callback) {\n  // Simulate an asynchronous operation (e.g., API call)\n  setTimeout(() => {\n    const data = { user: \"Alice\", age: 25 };\n    callback(data); // Execute the callback with the fetched data\n  }, 2000);\n}\n\nfunction handleData(data) {\n  console.log(\"Data received:\", data);\n}\n\n// Call fetchData and pass handleData as the callback function\nfetchData(handleData);\n\n\nIn this example:\n- fetchData simulates fetching data asynchronously.\n- handleData is passed as a callback to process the data once it's available."
  },
  {
    "id": 34,
    "topic": "javascript",
    "question": "What is memoization?",
    "answer": "Memoization is an optimization technique used in computer science and programming to improve the performance of functions by caching the results of expensive function calls and returning the cached result when the same inputs occur again. This avoids redundant computations and reduces the overall execution time of the program.\n\nHere are some key points about memoization:\n\n1.   Caching Results  :\n   - Memoization involves storing the results of function calls in a cache (such as an object or a map) based on the function's inputs (arguments). If the function is called again with the same inputs, the cached result is returned instead of recalculating the result.\n\n2.   Avoiding Redundant Computations  :\n   - By caching the results of function calls, memoization prevents redundant computations for the same inputs, especially for functions with expensive or time-consuming computations.\n\n3.   Improving Performance  :\n   - Memoization can significantly improve the performance of functions, especially in situations where the function is called repeatedly with the same inputs.\n\n4.   Pure Functions  :\n   - Memoization is most effective with pure functions, which produce the same output for the same inputs and have no side effects. Pure functions are deterministic and can safely be memoized.\n\n5.   Implementation  :\n   - Memoization can be implemented manually by storing the results of function calls in a cache object. Alternatively, it can be achieved using higher-order functions or libraries that provide memoization utilities.\n",
    "tags": [
      "optimization"
    ],
    "keyFeatures": [],
    "actionWords": [
      "\n\ncaching the results ",
      " pure functions",
      " optimization",
      " performance improvement",
      " redundant computations",
      " cache object",
      " deterministic",
      " expensive function calls",
      " higher-order functions\n"
    ],
    "codeExample": ""
  },
  {
    "id": 35,
    "topic": "javascript",
    "question": "What is the use of a constructor function in JavaScript?",
    "answer": "A constructor function in JavaScript is used to create and initialize objects. When you call a constructor function with the new keyword, it:\n\n- Creates a new empty object.\n- Sets the this context to that new object.\n- Executes the code within the constructor to assign properties and methods.\n- Returns the new object (unless an object is explicitly returned).\n\n Use Cases and Benefits:\n\n- Object Creation:  \n  Allows you to create multiple instances of similar objects, each with its own properties and methods.\n  \n- Code Reusability:  \n  Encapsulates object initialization logic, making your code more modular and maintainable.\n  \n- Simulating Classes:  \n  Before the introduction of ES6 classes, constructor functions were the primary way to simulate class-like behavior in JavaScript.\n\n \n Summary:\n\n- Constructor functions allow you to efficiently create and initialize new objects.\n- They provide a way to reuse initialization logic across multiple object instances.\n- When invoked with the new keyword, they create a new object, assign properties/methods, and return the new instance.\n\nLet me know if you need more details!",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [
      "object creation",
      " initialization",
      " new keyword",
      " prototype",
      " instance",
      " encapsulation",
      " code reusability",
      " object-oriented programming\n"
    ],
    "codeExample": "Example:\n\n\n// Constructor Function\nfunction Person(name, age) {\n  this.name = name;\n  this.age = age;\n  this.greet = function() {\n    console.log(Hi, I'm ${this.name} and I'm ${this.age} years old.);\n  };\n}\n\n// Creating instances using the new keyword\nconst person1 = new Person(\"Alice\", 30);\nconst person2 = new Person(\"Bob\", 25);\n\nperson1.greet(); // Hi, I'm Alice and I'm 30 years old.\nperson2.greet(); // Hi, I'm Bob and I'm 25 years old.\n"
  },
  {
    "id": 36,
    "topic": "javascript",
    "question": "What are arrow functions?",
    "answer": "Arrow functions are a concise syntax for writing functions in JavaScript. They were introduced in ES6 (ECMAScript 2015) and come with some distinct features:\n1.Concise Syntax:\nArrow functions allow you to write functions with a shorter syntax, often reducing boilerplate code. \n2.Lexical this:\nUnlike traditional functions, arrow functions do not have their own this context. Instead, they inherit this from the enclosing scope, which can help avoid common pitfalls related to this in callbacks or event handlers.\n3.No arguments Object:\nArrow functions do not have their own arguments object. If you need to access the arguments, you should use rest parameters (...args) instead.\n4.Not Suitable as Constructors:\nArrow functions cannot be used as constructors and will throw an error if you try to use them with the new keyword.",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [
      "concise syntax"
    ],
    "codeExample": ""
  },
  {
    "id": 37,
    "topic": "javascript",
    "question": "What are the rest parameter and spread operators?",
    "answer": "The rest parameter and spread operators are two related features introduced in ECMAScript 6 (ES6) that provide flexible ways to handle function arguments and arrays in JavaScript.\n\n       Rest Parameter ( \"... \"):\n\n1.The rest parameter allows a function to accept an indefinite number of arguments as an array. It is denoted by an ellipsis ( \"... \") followed by the parameter name and is useful when the number of arguments passed to a function is not known in advance.\n2.Can be used to Collecting function arguments into an array for easier processing.\n\n       Spread Operator ( \"... \"):\n\n1.The spread operator allows an iterable (e.g., an array or a string) to be expanded or spread into individual elements. It is denoted by an ellipsis ( \"... \") placed before the iterable and is useful for combining arrays, passing multiple arguments to a function, and creating shallow copies of arrays or objects.\n2.Used to expanding arrays or objects, merging arrays or objects, and passing a list of elements as separate arguments to a function.\n\n",
    "tags": [
      "es6"
    ],
    "keyFeatures": [],
    "actionWords": [
      "rest parameters",
      " spread operator",
      " variadic function",
      " iterable expansion",
      " function arguments",
      " array merging",
      " object merging",
      " ES6",
      " syntax",
      " \r\n"
    ],
    "codeExample": ""
  },
  {
    "id": 38,
    "topic": "javascript",
    "question": " What is the use of promises in JavaScript?",
    "answer": "A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It provides a way to handle asynchronous tasks in a more readable and structured way compared to traditional callback-based approaches.\nPromises in JavaScript are used to handle asynchronous operations such as fetching data from a server, reading files, or executing code that takes some time to complete. They provide a cleaner and more flexible way to manage asynchronous code compared to traditional callback-based approaches.\n\nHere are some key points about promises and their uses:\n\n1.   Asynchronous Operations  :\n   - Promises are primarily used to handle asynchronous operations, where the result of the operation is not immediately available and may take some time to complete.\n\n2.   Cleaner Code  :\n   - Promises allow asynchronous code to be written in a more sequential and readable manner, avoiding deeply nested callback functions (known as \"callback hell\") and improving code maintainability.\n\n3.   State Management  :\n   - Promises have three states: pending, fulfilled, and rejected. They represent the eventual completion (or failure) of an asynchronous operation.\n   - When a promise is pending, the operation is still in progress. When it is fulfilled, the operation has completed successfully, and the promise resolves with a value. When it is rejected, an error has occurred, and the promise rejects with an error object.\n\n4.   Chaining  :\n   - Promises support method chaining, allowing multiple asynchronous operations to be chained together in a sequential manner.\n   - Each promise in the chain returns a new promise, which allows for the propagation of success or failure through the chain.\n\n5.   Error Handling  :\n   - Promises provide built-in error handling mechanisms through the use of the  \"catch \" method, allowing errors to be caught and handled in a centralized manner.\n\n6.   Composition  :\n   - Promises can be composed together using methods like  \"Promise.all \" and  \"Promise.race \".  \"Promise.all \" waits for all promises to be fulfilled, while  \"Promise.race \" waits for the first promise to be settled (either fulfilled or rejected).\n\n",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [
      " eventual completion (or failure)",
      "asynchronous operations",
      " pending/fulfilled/rejected",
      " chaining",
      " error handling",
      " Promise.all/Promise.race",
      " callback hell",
      " state management",
      " cleaner code\n"
    ],
    "codeExample": ""
  },
  {
    "id": 39,
    "topic": "javascript",
    "question": "What are classes in JavaScript?",
    "answer": "Classes in JavaScript are a blueprint for creating objects, introduced in ES6 as a more familiar and cleaner syntax for implementing object-oriented programming. While JavaScript is inherently prototype-based, classes provide a more conventional structure for defining object constructors and methods.\nClasses offer a cleaner, more concise syntax over traditional prototype-based inheritance, making the code more readable and organized.\n",
    "tags": [
      "es6"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": "class Animal {\r\n  constructor(name) {\r\n    this.name = name;\r\n  }\r\n  \r\n  speak() {\r\n    console.log(${this.name} makes a noise.);\r\n  }\r\n}\r\n\r\nclass Dog extends Animal {\r\n  constructor(name, breed) {\r\n    super(name); // Calls the parent class constructor\r\n    this.breed = breed;\r\n  }\r\n  \r\n  speak() {\r\n    console.log(${this.name} barks.);\r\n  }\r\n}\r\n\r\nconst dog = new Dog(\"Buddy\", \"Golden Retriever\");\r\ndog.speak(); // Output: Buddy barks.\r"
  },
  {
    "id": 40,
    "topic": "javascript",
    "question": "What are generator functions?",
    "answer": "Generator functions in JavaScript are special types of functions that enable the creation of iterators, allowing iterative control flow using the  \"yield \" keyword. Unlike regular functions that execute to completion and return a single value, generator functions can pause and resume their execution, yielding multiple values one at a time.\n\nHere are key points about generator functions:\n\n1.   Syntax  :\n   - Generator functions are defined using the  \"function  \" syntax or the  \"function  \" keyword followed by the function name.\n   - Within a generator function, the  \"yield \" keyword is used to pause the function's execution and produce a value.\n\n2.   Iterator Protocol  :\n   - Generator functions automatically implement the iterator protocol, making them iterable. They return an iterator object that can be used to iterate over the values produced by the generator.\n\n3.   Stateful  :\n   - Generator functions maintain their internal state between successive calls, allowing them to resume execution from where they were last paused.\n   - The  \"yield \" keyword not only produces a value but also suspends the generator's execution, allowing it to be resumed later.\n\n4.   Iterable  :\n   - Generator functions produce iterable sequences of values, making them useful for generating sequences of data or handling asynchronous operations in a sequential manner.\n\n5.    \"next() \" Method  :\n   - The iterator object returned by a generator function has a  \"next() \" method that can be used to resume the execution of the generator and retrieve the next yielded value.\n   - Each call to  \"next() \" returns an object with two properties:  \"value \", which contains the yielded value, and  \"done \", which indicates whether the generator has finished producing values.\n\n",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [
      "PAUSE",
      " RESUME",
      " YIELD",
      " MAINTAIN",
      " SUSPEND",
      " ITERATE",
      " PRODUCE",
      " IMPLEMENT",
      " RETURN",
      " iterative control flow"
    ],
    "codeExample": "function numberGenerator() {\r\n    yield 1;\r\n    console.log(\"After first yield\");\r\n    yield 2;\r\n    console.log(\"After second yield\");\r\n    yield 3;\r\n}\r\n\r\n// Create an iterator\r\nconst gen = numberGenerator();\r\n\r\n// Use the generator\r\nconsole.log(gen.next());  // {value: 1, done: false}\r\nconsole.log(gen.next());  // \"After first yield\" then {value: 2, done: false}\r\nconsole.log(gen.next());  // \"After second yield\" then {value: 3, done: false}\r\nconsole.log(gen.next());  // {value: undefined, done: true}"
  },
  {
    "id": 41,
    "topic": "javascript",
    "question": "What is Object Destructuring?",
    "answer": "Object destructuring is a feature in JavaScript that allows you to extract properties from objects and assign them to variables in a concise and convenient way. It provides a syntax for breaking down the structure of objects and extracting only the values that you need.",
    "tags": [
      "object"
    ],
    "keyFeatures": [],
    "actionWords": [
      "UNZIP (opening the object structure)",
      " GRAB (taking what you need)",
      " PICK (selecting specific properties)",
      " LABEL (renaming variables)",
      " ORGANIZE (structuring the extracted data)",
      " COPY (copying values to new variables)",
      " UNPACK (breaking down the object)",
      " SORT (arranging into new variables)",
      " SPLIT (separating object properties)",
      " MATCH (matching property names)"
    ],
    "codeExample": "// Basic object destructuring\r\nconst person = { name: 'John', age: 30, city: 'New York' };\r\nconst { name, age } = person;\r\n// name = 'John', age = 30\r\n\r\n// Renaming variables\r\nconst { name: fullName } = person;\r\n// fullName = 'John'\r\n\r\n// Default values\r\nconst { country = 'USA' } = person;\r\n// country = 'USA' (since it wasn't in original object)\r\n\r\n// Nested destructuring\r\nconst user = {\r\n    id: 1,\r\n    details: {\r\n        firstName: 'John',\r\n        lastName: 'Doe'\r\n    }\r\n};\r\nconst { details: { firstName } } = user;\r\n// firstName = 'John'"
  },
  {
    "id": 42,
    "topic": "javascript",
    "question": "What is a Temporal Dead Zone?",
    "answer": "The Temporal Dead Zone (TDZ) <mark>refers to the period within a lexical scope (such as a block, function, or module) where a variable exists but cannot be accessed before it is declared</mark>. \nIn JavaScript, variables declared with \"let\" and \"const\" are hoisted to the top of their lexical scope during the compilation phase, but unlike variables declared with var, they are not initialized with a default value (undefined). Instead, they enter a temporal dead zone until their declaration is reached during runtime.\n\nBlock Scope:\nVariables declared with let or const are block-scoped. They are not accessible before their declaration in the block.\n\nInitialization Timing:\nAlthough these variables are hoisted to the top of their block, they remain uninitialized until their declaration is encountered in the code.\n\nReferenceError:\nAccessing a variable in its TDZ causes a ReferenceError, preventing the use of uninitialized variables.",
    "tags": [
      "hoisting"
    ],
    "keyFeatures": [],
    "actionWords": [
      " let",
      " const",
      " block scope",
      " hoisting",
      " uninitialized",
      " ReferenceError",
      " variable declaration",
      " ES6\r\n"
    ],
    "codeExample": "{\r\n  // Start of the block scope\r\n  // Trying to access 'x' here will throw a ReferenceError\r\n  // console.log(x); // Uncaught ReferenceError: Cannot access 'x' before initialization\r\n  \r\n  let x = 10; // 'x' is now initialized\r\n  console.log(x); // Outputs: 10\r\n}\r"
  },
  {
    "id": 43,
    "topic": "javascript",
    "question": "What it the difference between var, let & const ? ",
    "answer": "The  \"var \",  \"let \", and  \"const \" keywords are used for variable declaration in JavaScript, but they have some key differences in terms of scope, hoisting, and mutability. Here's a comparison:\n\n1.    \"var \":  \n   - Function-scoped: Variables declared with  \"var \" are function-scoped, meaning they are accessible throughout the entire function in which they are declared.\n   - Hoisting: Variables declared with  \"var \" are hoisted to the top of their function scope during the compilation phase, which means they can be accessed before their declaration, but they are initialized with the value  \"undefined \".\n   - Re-declaration: Variables declared with  \"var \" can be re-declared within the same scope without throwing an error.\n   - Example1:\n     \n    \n     \n\n2.    \"let \":  \n   - Block-scoped: Variables declared with  \"let \" are block-scoped, meaning they are accessible only within the block (e.g., if statement, loop, or function) in which they are declared.\n   - Hoisting: Variables declared with  \"let \" are hoisted to the top of their block scope during the compilation phase, but they remain uninitialized in the Temporal Dead Zone until their declaration is reached.\n   - Re-declaration: Variables declared with  \"let \" cannot be re-declared within the same scope. Attempting to do so will result in a SyntaxError.\n   - Example2:\n     \n    \n\n3.    \"const \":  \n   - Block-scoped: Variables declared with  \"const \" are also block-scoped, similar to  \"let \".\n   - Hoisting: Like  \"let \", variables declared with  \"const \" are hoisted to the top of their block scope during the compilation phase, but they remain uninitialized in the Temporal Dead Zone until their declaration is reached.\n   - Constant value: Variables declared with  \"const \" must be initialized with a value at the time of declaration, and their value cannot be changed or reassigned once initialized.\n   - Re-declaration: Variables declared with  \"const \" cannot be re-declared or re-assigned to a different value within the same scope.\n   - Example3:\n \n\n",
    "tags": [
      "es6"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": "Example1: \nfunction example() {\n         var x = 10;\n         if (true) {\n             var x = 20;\n             console.log(x); // Output: 20\n         }\n         console.log(x); // Output: 20\n     }\n\nExample2:\n function example() {\n         let x = 10;\n         if (true) {\n             let x = 20;\n             console.log(x); // Output: 20\n         }\n         console.log(x); // Output: 10\n     }\n     \nExample3: \n    \n     function example() {\n         const x = 10;\n         // x = 20; // Error: Assignment to constant variable.\n     }\n     "
  },
  {
    "id": 44,
    "topic": "javascript",
    "question": "What are differences between Named functions , Anonymous function & Arrow function : -",
    "answer": "Named functions, anonymous functions, and arrow functions are different ways to define functions in JavaScript, each with its own syntax and behavior. Here's a comparison of these types of functions:\r\n\r\n1.   Named Function:  \n\r\n   - A named function is a function that has a name identifier, which can be used to reference the function within its scope and from outside.\r\n   - Named functions are typically defined using the  \"function \" keyword followed by the function name and the function body.\r\n   - They are useful when the function needs to be referenced by name, such as for recursion or event handling.\r\n   - Example:\r\n    \r\n     function add(x, y) {\r\n         return x + y;\r\n     }\r\n\r\n2.   Anonymous Function:  \n\r\n   - An anonymous function is a function that does not have a name identifier and is typically defined inline without a name.\r\n   - Anonymous functions are often used as function expressions, where they are assigned to a variable or passed as an argument to another function.\r\n   - They are useful for one-time use or when a function does not need to be referenced by name.\r\n   - Example:\r\n  \r\n     const add = function(x, y) {\r\n         return x + y;\r\n     };\r\n    \r\n\r\n3.   Arrow Function:  \n\r\n   - An arrow function is a concise syntax for defining functions introduced in ECMAScript 6 (ES6).\r\n   - Arrow functions are always anonymous, meaning they do not have a name identifier by default.\r\n   - They are defined using the arrow ( \"=> \") syntax, which can have either a concise or a block body.\r\n   - Arrow functions have lexical scoping of  \"this \", meaning they inherit  \"this \" from the surrounding code.\r\n   - They are commonly used for short, one-liner functions or for preserving the value of  \"this \".\r\n   - Example:\r\n     \r\n     const add = (x, y) => x + y;\r\n   ",
    "tags": [
      "es6"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 45,
    "topic": "javascript",
    "question": "Explain the Hoisting in Named functions , Anonymous function & Arrow function ",
    "answer": "Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compilation phase. However, there are some differences in how named functions, anonymous functions, and arrow functions are hoisted:\n\n1.   Named Function:  \n\n   - Named functions are hoisted completely. This means both the function name and its implementation are hoisted to the top of their containing scope.\n   - This allows you to call a named function before its actual declaration in the code, as the function declaration is processed first during hoisting.\n   - Example:\n \n     // Function call before declaration\n     console.log(add(2, 3)); // Output: 5\n\n     // Function declaration\n     function add(x, y) {\n         return x + y;\n     }\n     \n   - During hoisting, the entire  \"add \" function, including its name and implementation, is hoisted to the top of the scope.\n\n2.   Anonymous Function (Function Expression):  \n\n   - Function expressions, including anonymous functions, are hoisted differently compared to named functions.\n   - Only the variable declaration (if using  \"var \",  \"let \", or  \"const \") is hoisted to the top of the scope, not the function implementation.\n   - This means that if you try to call an anonymous function before its declaration, you will encounter a  \"TypeError \" indicating that the variable is not a function.\n   - Example:\n    \n     // Function call before declaration\n     // console.log(add(2, 3)); // Error: add is not a function\n\n     // Function declaration (as a function expression)\n     const add = function(x, y) {\n         return x + y;\n     };\n \n   - During hoisting, only the  \"add \" variable declaration is hoisted to the top of the scope, but the function implementation remains in place.\n\n3.   Arrow Function:  \n\n   - Arrow functions, like anonymous functions, are also hoisted differently compared to named functions.\n   - Similar to anonymous functions, only the variable declaration (if using  \"var \",  \"let \", or  \"const \") is hoisted to the top of the scope, not the function implementation.\n   - This means that if you try to call an arrow function before its declaration, you will encounter a  \"ReferenceError \".\n   - Example:\n     \n     // Function call before declaration\n     // console.log(add(2, 3)); // Error: Cannot access 'add' before initialization\n\n     // Function declaration (as an arrow function)\n     const add = (x, y) => x + y;\n     \n   - During hoisting, only the  \"add \" variable declaration is hoisted to the top of the scope, but the arrow function implementation remains in place.\n\n",
    "tags": [
      "hoisting"
    ],
    "keyFeatures": [],
    "actionWords": [
      "declaration moved to top",
      "\nnamed-hoisted",
      " anonymous-only variable declaration is hoited",
      "arrow-only variable declaration is hoited"
    ],
    "codeExample": ""
  },
  {
    "id": 46,
    "topic": "javascript",
    "question": "What is BOM ?\n",
    "answer": "The Browser Object Model (BOM) is a collection of objects provided by the web browser that allows JavaScript to interact with the browser itself. The BOM enables scripts to interact with the browser window and control various browser aspects, such as manipulating the URL, handling browser history, and dealing with browser events.",
    "tags": [
      "dom"
    ],
    "keyFeatures": [],
    "actionWords": [
      "collection of objects",
      " enable interaction with browser",
      "s"
    ],
    "codeExample": ""
  },
  {
    "id": 47,
    "topic": "javascript",
    "question": "What is a polyfill",
    "answer": "A polyfill is a piece of code (usually JavaScript) that implements functionality that is not natively supported by certain web browsers. It allows developers to use modern web features while maintaining compatibility with older browsers that do not support these features. Polyfills essentially \"fill in\" the gaps in a browser's functionality to provide a consistent experience across different environments.",
    "tags": [
      "object"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 48,
    "topic": "javascript",
    "question": "Can We use reserved words as identifiers",
    "answer": "In JavaScript, reserved words (also known as keywords) have special meanings and purposes within the language. Using these reserved words as identifiers for variables, functions, or other entities is not allowed and will result in syntax errors. Identifiers are names you assign to variables, functions, and properties.",
    "tags": [
      "misc"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 49,
    "topic": "javascript",
    "question": "What is a freeze method in JavaScript ?",
    "answer": "The Object.freeze() method in JavaScript is used to freeze an object, preventing new properties from being added to it, existing properties from being removed, and existing properties (except for properties with values that are objects) from being changed. This makes the object immutable, meaning its structure and data cannot be altered after it has been frozen.",
    "tags": [
      "object"
    ],
    "keyFeatures": [],
    "actionWords": [
      "freeze an object",
      ""
    ],
    "codeExample": ""
  },
  {
    "id": 50,
    "topic": "javascript",
    "question": "What are the bitwise operators available in  ?",
    "answer": "JavaScript uses 32-bit Bitwise operands. A number is stored as a 64-bit floating-point number but the bit-wise operation is performed on a 32-bit binary number i.e. to perform a bit-operation JavaScript converts the number into a 32-bit binary number (signed) and performs the operation and converts back the result to a 64-bit number.\n1.Bitwise AND(&)        a & b        Returns true if both operands are true\n2.Bitwise OR(|)        a | b        Returns true even if one operand is true\n3.Biwise XOR(^)        a ^ b        Returns true if both operands are different\n4.Bitwise NOT(~)        a ~ b        Flips the value of the operand\n5.Bitwise Left Shift(<<)        a << b        Shifts the bit toward the left\n6.Bitwise Right Shift(>>)        a >> b        Shifts the bit towards the right\n7.Zero Fill Right Shift(>>>)        a >>> b        Shifts the bit towards the right but adds 0 from left",
    "tags": [
      "operators"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 51,
    "topic": "javascript",
    "question": "What is a proxy object ?",
    "answer": "A Proxy object acts as a wrapper or intermediary for another object (called the target), allowing you to intercept and redefine fundamental operations like property lookup, assignment, enumeration, and function invocation.",
    "tags": [
      "object"
    ],
    "keyFeatures": [],
    "actionWords": [
      "INTERCEPT - catches operations before they reach the target",
      "VALIDATE - can check values before allowing changes",
      "CUSTOMIZE - can modify how basic operations work",
      "MONITOR - can track access and modifications",
      "PROTECT - can prevent unauthorized access or modifications",
      "EXTEND - can add custom behavior to existing objects"
    ],
    "codeExample": "const target = {\r\n    name: 'John',\r\n    age: 30\r\n};\r\n\r\nconst handler = {\r\n    // Intercept when getting a property\r\n    get: function(target, prop) {\r\n        console.log(Accessing property: ${prop});\r\n        return target[prop];\r\n    },\r\n    \r\n    // Intercept when setting a property\r\n    set: function(target, prop, value) {\r\n        console.log(Setting property: ${prop} = ${value});\r\n        target[prop] = value;\r\n        return true;\r\n    }\r\n};\r\n\r\nconst proxy = new Proxy(target, handler);\r\n\r\n// Using the proxy\r\nproxy.name;  // Logs: \"Accessing property: name\" then returns \"John\"\r\nproxy.age = 31;  // Logs: \"Setting property: age = 31\""
  },
  {
    "id": 52,
    "topic": "javascript",
    "question": "What is the purpose of seal method ?",
    "answer": "The Object.seal() method in JavaScript is used to seal an object, which means:\n1.Prevents Adding New Properties:\n-Once an object is sealed, no new properties can be added to it.\n\n2.Prevents Deleting Existing Properties:\n-You cannot remove properties from a sealed object.\n\n3.Preserves Current Properties' Configuration:\n-Existing properties become non-configurable, so you cannot change their descriptors (e.g., convert a data property into an accessor property).\n\n4.-Allows Modification of Property Values:\nIf an existing property is writable, you can still update its value.",
    "tags": [
      "object"
    ],
    "keyFeatures": [],
    "actionWords": [
      "non-extensible",
      " non-configurable",
      " prevent property addition",
      " prevent property deletion",
      " modify property values",
      " immutable structure\r\n"
    ],
    "codeExample": "// Create an object\r\nconst user = {\r\n  name: \"Alice\",\r\n  age: 30,\r\n};\r\n\r\nconsole.log(\"Before sealing:\", user);\r\n\r\n// Seal the object\r\nObject.seal(user);\r\n\r\n// Attempt to add a new property (this will not work)\r\nuser.email = \"alice@example.com\";\r\nconsole.log(\"After adding property:\", user); // No 'email' property added\r\n\r\n// Attempt to delete an existing property (this will not work)\r\ndelete user.age;\r\nconsole.log(\"After deleting property:\", user); // 'age' property still exists\r\n\r\n// Modify an existing property's value (this is allowed if the property is writable)\r\nuser.name = \"Bob\";\r\nconsole.log(\"After modifying property:\", user); // 'name' is now \"Bob\"\r"
  },
  {
    "id": 53,
    "topic": "javascript",
    "question": "What are the differences between freeze and seal methods",
    "answer": "If an object is frozen using the Object.freeze() method then its properties become immutable and no changes can be made in them whereas if an object is sealed using the Object.seal() method then the changes can be made in the existing properties of the object.",
    "tags": [
      "object"
    ],
    "keyFeatures": [],
    "actionWords": [
      "Immutable properties/no change",
      " changes can be made"
    ],
    "codeExample": ""
  },
  {
    "id": 54,
    "topic": "javascript",
    "question": "What is call stack",
    "answer": "Call Stack is a data structure for  interpreters to keep track of function calls(creates execution context) in the program. It has two major actions,\n\nWhenever you call a function for its execution, you are pushing it to the stack.\nWhenever the execution is completed, the function is popped out of the stack.",
    "tags": [
      "fundamental"
    ],
    "keyFeatures": [],
    "actionWords": [
      "track of function calls"
    ],
    "codeExample": ""
  },
  {
    "id": 55,
    "topic": "javascript",
    "question": "What is an empty statement and purpose of it",
    "answer": "An empty statement in JavaScript is a statement that consists of a single semicolon (;). It does nothing and is used to provide no operation where a statement is syntactically required.",
    "tags": [
      "fundamental"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 56,
    "topic": "javascript",
    "question": "What Is Obfuscation in ",
    "answer": "Obfuscation in JavaScript is the process of transforming the code into a version that is difficult for humans to understand, while still maintaining its functionality. The primary goal of obfuscation is to protect the source code from being easily read or reverse-engineered by others.",
    "tags": [
      "misc"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 57,
    "topic": "javascript",
    "question": "Why do you need Obfuscation ?",
    "answer": "Below are the few reasons for Obfuscation,\r\n\r\n1.The Code size will be reduced. So data transfers between server and client will be fast.\r\n2.It hides the business logic from outside world and protects the code from others\r\n3.Reverse engineering is highly difficult\r\n4.The download time will be reduced",
    "tags": [
      "misc"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 58,
    "topic": "javascript",
    "question": "What is Minification ?",
    "answer": "Minification is the process of removing all unnecessary characters(empty spaces are removed) and variables will be renamed without changing it's functionality. It is also a type of obfuscation .",
    "tags": [
      "misc"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 59,
    "topic": "javascript",
    "question": "What are the advantages of minification",
    "answer": "Normally it is recommended to use minification for heavy traffic and intensive requirements of resources. It reduces file sizes with below benefits,\r\n\r\n1.Decreases loading times of a web page\r\n2.Saves bandwidth usages",
    "tags": [
      "misc"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 60,
    "topic": "javascript",
    "question": "What are scalar arrays in JavaScript ?",
    "answer": "A scalar array typically refers to an array that contains only scalar values (primitive values), such as numbers, strings, booleans, etc. In this context, it is simply an array where each element is a primitive data type, without nested arrays or objects.",
    "tags": [
      "arrays"
    ],
    "keyFeatures": [],
    "actionWords": [
      "contains only  primitive values",
      ""
    ],
    "codeExample": ""
  },
  {
    "id": 61,
    "topic": "javascript",
    "question": "List down some of the features of ES6",
    "answer": "Below are the list of some new features of ES6,\n\n1.Support for constants or immutable variables\n2.Block-scope support for variables, constants and functions\n3.Arrow functions\n4.Default parameters\n5.Rest and Spread Parameters\n6.Template Literals\n7.Multi-line Strings\n8.Destructuring Assignment\n9.Enhanced Object Literals\n10.Promises\n11.Classes\n12.Modules",
    "tags": [
      "es6"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 62,
    "topic": "javascript",
    "question": "Difference between ternary operator and if-else statements?",
    "answer": "The ternary operator and if-else statements both handle conditional logic but differ in use:\n\nSyntax: Ternary is concise (condition ? trueValue : falseValue), while if-else uses a block structure.\nReadability: Ternary is ideal for simple, single-line conditions; if-else is better for complex logic.\nReturn Value: Ternary evaluates to a value directly(can be stored in a variable), useful for assignments. If-else handles multiple operations but doesn’t return a value directly.\nUse Case: Use the ternary for short conditions, like const message = isLoggedIn ? \"Welcome\" : \"Please log in\";, and if-else for multi-step logic.",
    "tags": [
      "es6"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 63,
    "topic": "javascript",
    "question": "Difference between Statement & Expression ?",
    "answer": "In simple terms:\r\n\r\n- An   expression   is like a calculator. It does something and gives you a result or value. For example:  \r\n  - 2 + 3  gives 5 .  \r\n  - \"Hello\" + \" World\"  gives \"Hello World\" .  \r\n\r\n- A   statement   is like a command. It tells the computer to do something but doesn’t always give you a value. For example:  \r\n  - if (x > y) { console.log(\"x is bigger\"); }  is a statement that tells the computer to check something and do an action if it's true.  \r\n\r\n    Key Difference:\r\n-   Expression  : Think of it as \"What is the result?\"  \r\n-   Statement  : Think of it as \"What action should be done?\"",
    "tags": [
      "misc"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 64,
    "topic": "javascript",
    "question": "What is slice() & splice() ?",
    "answer": "Both slice() and splice() are JavaScript array methods, but they have different purposes and behaviors. Here's a clear explanation:\n\n\n\n 1. slice()\n\n Purpose:\n- Extracts a portion of an array and returns a new array.\n- Does not modify the original array.\n\n Syntax:\n\narray.slice(start, end)\n\n\n Parameters:\n- start: The index where the extraction begins (inclusive).\n- end (optional): The index where the extraction ends (exclusive). If omitted, it slices until the end of the array.\n\n\n\n\n\n\n 2. splice()\n\n Purpose:\n- Modifies the original array by adding, removing, or replacing elements.\n\n Syntax:\n\narray.splice(start, deleteCount, item1, item2, ...)\n\n\n Parameters:\n- start: The index where changes will begin.\n- deleteCount: The number of elements to remove. If 0, no elements are removed.\n- item1, item2, ... (optional): Elements to add to the array at the start position.\n\n\n\n\n",
    "tags": [
      "comparison"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": " slice-Example:\n\nconst arr = [1, 2, 3, 4, 5];\n\n// Extract elements from index 1 to 3 (3 is excluded)\nconst slicedArr = arr.slice(1, 3);\nconsole.log(slicedArr); // [2, 3]\nconsole.log(arr); // [1, 2, 3, 4, 5] (original array is unchanged)\n\n\n Example 1: Remove elements\n\nconst arr = [1, 2, 3, 4, 5];\n\n// Remove 2 elements starting from index 1\nconst removed = arr.splice(1, 2);\nconsole.log(removed); // [2, 3]\nconsole.log(arr); // [1, 4, 5] (original array is modified)\n\n\n Example 2: Add elements\n\nconst arr = [1, 4, 5];\n\n// Add 2 and 3 at index 1\narr.splice(1, 0, 2, 3);\nconsole.log(arr); // [1, 2, 3, 4, 5]\n\n\n Example 3: Replace elements\n\nconst arr = [1, 2, 3, 4, 5];\n\n// Replace 2 elements at index 1 with 8 and 9\narr.splice(1, 2, 8, 9);\nconsole.log(arr); // [1, 8, 9, 4, 5]"
  },
  {
    "id": 65,
    "topic": "javascript",
    "question": "What is strict mode in  ?",
    "answer": "Strict mode in JavaScript is a way to enforce stricter parsing and error handling in your code. It is activated by including the string \"use strict\"; at the top of a script or function. It helps catch common coding mistakes, makes the code more secure, and often improves performance.\n\nBenefits of Strict Mode:\n1.Prevents accidental globals and enforces proper scoping.\n2.Allows JavaScript engines to optimize code more effectively.\n3.Forces developers to write cleaner, more modern JavaScript.\nLimitations:\n1.It can only be applied to entire scripts or individual functions. You cannot selectively enable strict mode for specific blocks of code.\n2.It might break older, poorly written code, so it's best used in modern projects.\n",
    "tags": [
      "mode"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 66,
    "topic": "javascript",
    "question": "What is Shallow copy & Deep copy ?",
    "answer": " Shallow Copy vs. Deep Copy (Simplified)\n\n\n\n Shallow Copy\nA shallow copy makes a copy of an object or array, but it only copies the top-level values. If the object has nested objects (objects inside objects), it doesn't create a new copy of those nested objects. Instead, it shares the nested objects between the original and the copied object.\n\n Example:\nImagine copying a book. The title and cover are copied, but if the book has notes inside, the copy will just point to the same notes as the original.\n\n Code Example:\n\nconst original = { a: 1, b: { c: 2 } };\n\n// Shallow copy\nconst shallowCopy = { ...original };\n\n// Changing the nested object in the copy\nshallowCopy.b.c = 42;\n\nconsole.log(original.b.c); // Output: 42 (both share the same nested object)\n\n\n\n\n Deep Copy\nA deep copy makes a full, independent copy of an object or array. It duplicates everything, including nested objects or arrays. If you change something in the copied object, it won’t affect the original object.\n\n Example:\nImagine copying a book and also copying all the notes inside the book. Now the copy has its own notes, and changes in one book don’t affect the other.\n\n Code Example:\n\nconst original = { a: 1, b: { c: 2 } };\n\n// Deep copy\nconst deepCopy = JSON.parse(JSON.stringify(original));\n\n// Changing the nested object in the copy\ndeepCopy.b.c = 42;\n\nconsole.log(original.b.c); // Output: 2 (the original is not affected)\n\n When to Use Them?\n- Use shallow copy when you don’t plan to modify nested data.\n- Use deep copy when the copied data must be completely separate from the original.\n\n\n\n",
    "tags": [
      "comparison"
    ],
    "keyFeatures": [],
    "actionWords": [
      "only copies the top-level values",
      "\nindependent copy of an object or array",
      "\nconst shallowCopy = { ...original }",
      "const deepCopy = JSON.parse(JSON.stringify(original));"
    ],
    "codeExample": ""
  },
  {
    "id": 67,
    "topic": "javascript",
    "question": "What is difference between forEach() & map() ?",
    "answer": "forEach() and map() are both array methods in JavaScript used for iterating over arrays, but they have some key differences:\n\n forEach()\n- Purpose:  \n  Used for executing a provided function on each element in the array.\n  \n- Return Value:  \n  It does not return a new array; it returns undefined.\n  \n- Usage:  \n  Best suited for performing side effects, such as modifying external variables or logging values.\n  \n- Example:\n  \n  const numbers = [1, 2, 3];\n  numbers.forEach(num => console.log(num  2)); // Logs: 2, 4, 6\n  \n\n map()\n- Purpose:  \n  Creates a new array populated with the results of calling a provided function on every element in the array.\n  \n- Return Value:  \n  Returns a new array with transformed values.\n  \n- Usage:  \n  Ideal when you need to transform each element in the array and work with the new array.\n  \n- Example:\n  \n  const numbers = [1, 2, 3];\n  const doubled = numbers.map(num => num  2);\n  console.log(doubled); // Output: [2, 4, 6]\n  \n\n Key Differences:\n- Return:  \n  forEach() returns undefined, while map() returns a new array.\n  \n- Side Effects vs Transformation:  \n  forEach() is used when you need to perform operations for side effects, and map() is used for transforming data.\n\n\n\n\n",
    "tags": [
      "comparison"
    ],
    "keyFeatures": [],
    "actionWords": [
      "undefined",
      " new array"
    ],
    "codeExample": ""
  },
  {
    "id": 68,
    "topic": "javascript",
    "question": "Explain how async await works",
    "answer": "async/await is a syntax introduced in ES2017 (es8) that simplifies working with promises, allowing you to write asynchronous code in a more synchronous, readable manner.\n\n How It Works:\n\n1. Async Functions:  \n   - When you declare a function with the async keyword, it automatically returns a promise.\n   - Inside an async function, you can use the await keyword to pause execution until a promise settles (either resolved or rejected).\n\n2. Await Keyword:  \n   - The await keyword is used to wait for a promise to resolve.\n   - It can only be used inside an async function.\n   - When the promise resolves, await returns the resolved value. If the promise is rejected, it throws an error, which can be caught using try...catch.\n\n3. Syntactic Sugar for Promises:  \n   - async/await doesn't replace promises; it simplifies promise consumption by making asynchronous code appear synchronous.\n   - This leads to clearer, more maintainable code, especially when dealing with multiple asynchronous operations.\n\n \n",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": "Example:\n\n\n// A function that returns a promise (simulating an API call)\nfunction fetchData() {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve(\"Data received!\");\n    }, 2000);\n  });\n}\n\n// Using async/await to handle the promise\nasync function getData() {\n  try {\n    // The function pauses here until fetchData() resolves\n    const result = await fetchData();\n    console.log(result); // Output after 2 seconds: \"Data received!\"\n  } catch (error) {\n    console.error(\"Error:\", error);\n  }\n}\n\ngetData();\n\n\n Step-by-Step Explanation:\n\n- Defining an Async Function:  \n  getData() is defined with the async keyword, meaning it will return a promise.\n\n- Using await:  \n  Inside getData(), we call fetchData() with await. The execution of getData() pauses until fetchData() resolves, then assigns the resolved value to result.\n\n- Error Handling:  \n  If fetchData() were to reject, the error would be caught in the catch block, allowing for centralized error management."
  },
  {
    "id": 69,
    "topic": "javascript",
    "question": "What is the difference between   sort()  and  arr.sort((a, b) => a - b) ?",
    "answer": "The difference between  sort()  and  arr.sort((a, b) => a - b)  lies in how they handle sorting and what type of sorting they perform:\n\n    1.  sort()  (without a comparator):\n- Default Behavior: The  sort()  method, when called without a comparator, converts each element of the array to a string and sorts them lexicographically (alphabetically). This means the elements are compared as strings, and not as numbers, so their order may not be what you expect for numbers.\n  \n- Example:\n\n     \n  const arr = [10, 1, 21, 2];\n  arr.sort();\n  console.log(arr); // Output: [1, 10, 2, 21]\n     \n\n  In this case, the array is sorted alphabetically based on the string values, not numerically. So,  '10'  comes before  '2'  because  '1'  is lexicographically less than  '2' .\n\n    2.  arr.sort((a, b) => a - b)  (with a comparator):\n- Behavior: When you provide a comparator function like  (a, b) => a - b  to the  sort()  method, it sorts the elements numerically (or based on any custom logic you define in the comparator). The comparator function receives two arguments ( a  and  b ) and returns:\n  - A negative number if  a  should come before  b .\n  - A positive number if  a  should come after  b .\n  -  0  if  a  and  b  are considered equal.\n\n- Example:\n\n  const arr = [10, 1, 21, 2];\n  arr.sort((a, b) => a - b);\n  console.log(arr); // Output: [1, 2, 10, 21]\n     \n\n  Here, the array is sorted in ascending numerical order because of the comparator function  (a, b) => a - b .\n\n    Summary of Differences:\n-  sort()  (without a comparator): Sorts elements as strings, which might not work as expected for numbers.\n-  arr.sort((a, b) => a - b) : Sorts elements numerically (or according to the logic you define in the comparator). This is the correct approach for sorting numbers in ascending order.\n\n    When to Use:\n- Use  sort()  without a comparator for sorting strings or when the default lexicographical sort is fine.\n- Use  arr.sort((a, b) => a - b)  for sorting numbers or when you need specific sorting logic.",
    "tags": [
      "comparison"
    ],
    "keyFeatures": [],
    "actionWords": [
      "alphabetically",
      ""
    ],
    "codeExample": ""
  },
  {
    "id": 70,
    "topic": "javascript",
    "question": "What is lambda function in  ?",
    "answer": "In JavaScript, a lambda function is another term for an anonymous function or arrow function. These functions are typically concise, unnamed, and often used in situations where a function is needed temporarily or as a callback. The term \"lambda\" originates from lambda calculus, a mathematical formalism often associated with functional programming.",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [
      "anonymous function or arrow function"
    ],
    "codeExample": ""
  },
  {
    "id": 71,
    "topic": "javascript",
    "question": "what is Factory functions in  ? ",
    "answer": "A factory function in JavaScript is a function that creates and returns an object. Unlike classes or constructors, factory functions allow you to define and customize object creation without using the new keyword. They are particularly useful for creating multiple similar objects, especially when you want more control over the object creation process.\n\n",
    "tags": [
      "fuction"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": "function createPerson(name, age) {\n    return {\n        name,\n        age,\n        greet() {\n            console.log(Hi, I'm ${this.name} and I'm ${this.age} years old.);\n        }\n    };\n}\n\nconst person1 = createPerson(\"Alice\", 25);\nconst person2 = createPerson(\"Bob\", 30);\n\nperson1.greet(); // Hi, I'm Alice and I'm 25 years old.\nperson2.greet(); // Hi, I'm Bob and I'm 30 years old."
  },
  {
    "id": 72,
    "topic": "javascript",
    "question": "What is REST API ? ",
    "answer": "A REST API (Representational State Transfer Application Programming Interface) is a way for different software systems to communicate over the internet using the principles of REST architecture. It's commonly used for building web services that are lightweight, scalable, and maintainable.",
    "tags": [
      "misc"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  }, {
    "id": "r0:072",
    "topic": "javascript",
    "question": "What is a first-class function in Javascript?",
    "answer": "In JavaScript, functions are considered \"first-class citizens.\" This means that functions are treated like any other value in the language. You can:\n\n- Assign a function to a variable:  \n  Functions can be stored in variables, just like strings or numbers.\n\n- Pass a function as an argument to another function:  \n  Functions can be passed around as parameters to other functions.\n\n- Return a function from another function:  \n  Functions can be created and returned dynamically from other functions.\n\n- Store functions in data structures:  \n  Functions can be added to arrays, objects, and more.\n\n",
    "tags": [
      "functions"
    ],
    "keyFeatures": [],
    "actionWords": [

    ],
    "codeExample": ""
  }
]