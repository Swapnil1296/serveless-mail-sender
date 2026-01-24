export const typescript = [
    {
      "id": 1,
      "topic": "typescript",
      "question": " What is TypeScript and how does it differ from JavaScript?",
      "answer": "TypeScript is a strongly typed, object-oriented programming language that is a superset of JavaScript. It adds optional static typing, classes, interfaces, and other features to JavaScript. The key differences are:\r\n- TypeScript adds static typing while JavaScript is dynamically typed\r\n- TypeScript requires compilation to JavaScript\r\n- TypeScript provides better tooling and IDE support through type information\r\n- TypeScript supports interfaces, generics, decorators, and other OOP features natively\r\n",
      "tags": [
        "Definition"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 2,
      "topic": "typescript",
      "question": "What are the basic types in TypeScript?",
      "answer": "TypeScript includes several basic types:\r\n- number: For all numeric values (integer and floating-point)\r\n- string: For text data\r\n- boolean: For true/false values\r\n- null and undefined\r\n- void: Used for functions that don't return a value\r\n- any: For variables that can hold any type\r\n- never: For values that never occur (like functions that always throw errors)\r\n- array: For collections of values\r\n- tuple: For fixed-length arrays with predefined types\r\n- enum: For enumerated values\r\n- object: For non-primitive types\r",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 3,
      "topic": "typescript",
      "question": "What is the 'interface' in TypeScript?",
      "answer": "An interface is a contract that defines the structure of an object. It specifies what properties and methods an object must have. For example:\n\n",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "interface Person {\n    name: string;\n    age: number;\n    greet(): void;\n}"
    },
    {
      "id": 4,
      "topic": "typescript",
      "question": "What are Generics in TypeScript?\r",
      "answer": " Generics allow you to write flexible, reusable code that can work with multiple types while maintaining type safety. They are denoted using angle brackets (<>). Example:\n\n",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "function identity<T>(arg: T): T {\n    return arg;\n}"
    },
    {
      "id": 5,
      "topic": "typescript",
      "question": "What is Type Inference in TypeScript?",
      "answer": "Type Inference is TypeScript's ability to automatically determine and assign types to variables based on their values. For example:\n\n\n\n",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "let name = \"John\"; // TypeScript infers type as string\nlet age = 25;      // TypeScript infers type as number"
    },
    {
      "id": 6,
      "topic": "typescript",
      "question": "What are Union Types in TypeScript?",
      "answer": " Union Types allow a variable to hold values of multiple types. They are denoted using the | (pipe) operator:\n\n\n",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "let value: string | number;\nvalue = \"Hello\"; // Valid\nvalue = 42;      // Valid\nvalue = true;    // Error"
    },
    {
      "id": 7,
      "topic": "typescript",
      "question": "What is the difference between 'interface' and 'type' in TypeScript?",
      "answer": "While both can be used to define custom types, they have some key differences:\r\n- Interfaces can be extended and implemented\r\n- Types can create union and intersection types\r\n- Interfaces can be merged with other declarations\r\n- Types can create mapped types and conditional types\r\n- Interfaces are generally preferred for object shapes\r\n",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 8,
      "topic": "typescript",
      "question": "What are Decorators in TypeScript?",
      "answer": " Decorators are special declarations that can be attached to class declarations, methods, properties, or parameters. They use the form @expression and can modify or enhance the behavior of the decorated item. \n",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Example:\n\nfunction log(target, key, descriptor) {\n    // decorator implementation\n}\n\nclass Example {\n    @log\n    method() {}\n}"
    },
    {
      "id": 9,
      "topic": "typescript",
      "question": "What is the 'readonly' modifier?\r",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "The readonly modifier prevents properties from being changed after their initial assignment:\n\n\ninterface Point {\n    readonly x: number;\n    readonly y: number;\n}\n"
    },
    {
      "id": 10,
      "topic": "typescript",
      "question": " What are Access Modifiers in TypeScript?",
      "answer": "TypeScript provides three access modifiers:\r\n- public: Members are accessible from anywhere (default)\r\n- private: Members are only accessible within the class\r\n- protected: Members are accessible within the class and its subclasses\r",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 11,
      "topic": "typescript",
      "question": "What is an Enum in TypeScript?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "An enum is a way to define a set of named constants. There are three types of enums:\n- Numeric enums\n- String enums\n- Heterogeneous enums\n\nenum Direction {\r\n    Up = \"UP\",\r\n    Down = \"DOWN\",\r\n    Left = \"LEFT\",\r\n    Right = \"RIGHT\"\r\n}\r\n"
    },
    {
      "id": 12,
      "topic": "typescript",
      "question": "What are Type Assertions in TypeScript?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Type assertions are a way to tell the compiler \"trust me, I know what I'm doing\" when you know more about a value's type than TypeScript does:\r\n\n\nlet someValue: any = \"hello\";\r\nlet strLength: number = (<string>someValue).length;\r\n// or\r\nlet strLength: number = (someValue as string).length;\r\n"
    },
    {
      "id": 13,
      "topic": "typescript",
      "question": " What is the difference between 'any' and 'unknown' types?",
      "answer": "While both can hold any value:\r\n- 'any' bypasses type checking\r\n- 'unknown' requires type checking or assertion before use\r\n- 'unknown' is the type-safe counterpart of 'any'\r",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 14,
      "topic": "typescript",
      "question": "What are Optional Parameters in TypeScript?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Optional parameters are denoted with a ? and can be omitted when calling the function:\r\n\n\nfunction buildName(firstName: string, lastName?: string) {\r\n    return lastName ? ${firstName} ${lastName} : firstName;\r\n}\r\n"
    },
    {
      "id": 15,
      "topic": "typescript",
      "question": "What is Type Compatibility in TypeScript?",
      "answer": "Type compatibility in TypeScript is based on structural subtyping. Types are compatible if they have the same structure, regardless of their declared type names.",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 16,
      "topic": "typescript",
      "question": "What are Index Signatures in TypeScript?\r",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Index signatures allow you to define types for properties that are accessed using an index:\ninterface StringArray {\r\n    [index: number]: string;\r\n}\r\n"
    },
    {
      "id": 17,
      "topic": "typescript",
      "question": "What is the 'keyof' operator?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "The keyof operator returns a union type of all property names of a type:\n    \ninterface Person {\n    name: string;\n    age: number;\n}\ntype PersonKeys = keyof Person; // \"name\" | \"age\""
    },
    {
      "id": 18,
      "topic": "typescript",
      "question": " What are Mapped Types in TypeScript?\r",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Mapped types allow you to create new types based on old ones by transforming properties:\r\n    \r\ntype Readonly<T> = {\r\n    readonly [P in keyof T]: T[P];\r\n}\r"
    },
    {
      "id": 19,
      "topic": "typescript",
      "question": "What is the 'never' type?",
      "answer": "The never type represents values that never occur. It's used for:\r\n- Functions that never return (throw errors)\r\n- Functions with infinite loops\r\n- Variables that can never have a valid value\r",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 20,
      "topic": "typescript",
      "question": "What are Conditional Types in TypeScript?\r",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Conditional types select one of two possible types based on a condition:\r\n    \r\ntype Check<T> = T extends string ? string : number;\r"
    },
    {
      "id": 21,
      "topic": "typescript",
      "question": "What is the difference between 'extends' and 'implements'?\r",
      "answer": "- extends is used for inheritance between classes or interfaces\r\n- implements is used when a class implements an interface\r\n",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 22,
      "topic": "typescript",
      "question": " What are Literal Types in TypeScript?",
      "answer": " Literal types allow you to specify exact values that a string, number, or boolean must have:\r\n    \r\ntype Direction = \"north\" | \"south\" | \"east\" | \"west\";\r",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 23,
      "topic": "typescript",
      "question": " What is the 'typeof' operator in TypeScript?\r\n",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": " typeof can be used in type contexts to refer to the type of a variable or property:\r\n    \r\nlet s = \"hello\";\r\nlet n: typeof s; // type is string\r"
    },
    {
      "id": 24,
      "topic": "typescript",
      "question": "What are Declaration Merging in TypeScript?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Declaration merging is the compiler's ability to merge multiple declarations with the same name into a single definition:\r\n    \r\ninterface Box {\r\n    height: number;\r\n}\r\ninterface Box {\r\n    width: number;\r\n}\r\n// Merged into:\r\n// interface Box {\r\n//     height: number;\r\n//     width: number;\r\n// }\r"
    },
    {
      "id": 25,
      "topic": "typescript",
      "question": "What is the 'infer' keyword?\r",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "infer is used in conditional types to infer type variables from the type we're checking against:\r\n    \r\ntype ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;\r"
    },
    {
      "id": 26,
      "topic": "typescript",
      "question": "What are Namespace Aliases in TypeScript?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Namespace aliases allow you to create shortcuts for namespaces:\r\n    \r\nimport Shapes = MyNamespace.Shapes;\r"
    },
    {
      "id": 27,
      "topic": "typescript",
      "question": " What is a Triple-Slash Directive?\r",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Triple-slash directives are single-line comments containing XML tags used to provide additional instructions to the TypeScript compiler:\r\n    \r\n/// <reference path=\"...\" />\r"
    },
    {
      "id": 28,
      "topic": "typescript",
      "question": "What is the difference between 'undefined' and 'null'?\r",
      "answer": "In TypeScript:\r\n- undefined means a variable has been declared but not assigned a value\r\n- null represents an intentional absence of any object value\r\nBoth are subtypes of all other types by default (unless strictNullChecks is enabled)\r",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 29,
      "topic": "typescript",
      "question": "What are Type Guards in TypeScript?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Type guards are expressions that perform runtime checks to guarantee the type of something:\r\n    \r\nfunction isString(value: any): value is string {\r\n    return typeof value === \"string\";\r\n}\r"
    },
    {
      "id": 30,
      "topic": "typescript",
      "question": "What is the 'as const' assertion?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "The as const assertion makes an object literal's properties readonly and converts arrays to readonly tuples:\r\n    \r\nconst colors = [\"red\", \"blue\", \"green\"] as const;\r"
    },
    {
      "id": 31,
      "topic": "typescript",
      "question": "What are Abstract Classes?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Abstract classes are base classes that cannot be instantiated and may contain abstract methods that must be implemented by derived classes:\r\n    \r\nabstract class Animal {\r\n    abstract makeSound(): void;\r\n    move(): void {\r\n        console.log(\"moving...\");\r\n    }\r\n}\r\n"
    },
    {
      "id": 32,
      "topic": "typescript",
      "question": "What is the 'Pick' utility type?\r",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": " Pick constructs a type by picking a set of properties from another type:\r\n    \r\ninterface Todo {\r\n    title: string;\r\n    description: string;\r\n    completed: boolean;\r\n}\r\ntype TodoPreview = Pick<Todo, \"title\" | \"completed\">;\r"
    },
    {
      "id": 33,
      "topic": "typescript",
      "question": "What is the 'Omit' utility type?\r\n",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Omit constructs a type by removing specified properties from another type:\n    \ninterface Todo {\n    title: string;\n    description: string;\n    completed: boolean;\n}\ntype TodoPreview = Omit<Todo, \"description\">;\n"
    },
    {
      "id": 34,
      "topic": "typescript",
      "question": "What are String Literal Types?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "String literal types allow you to specify the exact value a string must have:\r\n    \r\ntype Easing = \"ease-in\" | \"ease-out\" | \"ease-in-out\";\r"
    },
    {
      "id": 35,
      "topic": "typescript",
      "question": "What is the 'NonNullable' utility type?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "NonNullable removes null and undefined from a type:\r\n    \r\ntype T = string | null | undefined;\r\ntype NonNullableT = NonNullable<T>; // string\r"
    },
    {
      "id": 36,
      "topic": "typescript",
      "question": "What are Index Types?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": " Index types let you use the compiler to check code that uses dynamic property names:\r\n    \r\nfunction pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {\r\n    return propertyNames.map(n => o[n]);\r\n}\r\n"
    },
    {
      "id": 37,
      "topic": "typescript",
      "question": "What is the 'Partial' utility type?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Partial makes all properties of a type optional:\r\n    \r\ninterface Todo {\r\n    title: string;\r\n    description: string;\r\n}\r\ntype PartialTodo = Partial<Todo>;\r"
    },
    {
      "id": 38,
      "topic": "typescript",
      "question": "What are Function Overloads?\r",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Function overloads allow you to specify multiple function types for the same function:\r\n    \r\nfunction add(a: string, b: string): string;\r\nfunction add(a: number, b: number): number;\r\nfunction add(a: any, b: any): any {\r\n    return a + b;\r\n}\r\n   \r"
    },
    {
      "id": 39,
      "topic": "typescript",
      "question": " What is the 'Required' utility type?\r\n",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Required makes all properties of a type required:\r\n    \r\ninterface Props {\r\n    a?: number;\r\n    b?: string;\r\n}\r\nconst obj: Required<Props> = { a: 5, b: \"string\" };\r"
    },
    {
      "id": 40,
      "topic": "typescript",
      "question": "What is the 'Record' utility type?\r",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Record creates a type with a set of properties of the same type:\r\n    \r\ntype PageInfo = Record<string, string>;\r"
    },
    {
      "id": 41,
      "topic": "typescript",
      "question": " What are Intersection Types?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Intersection types combine multiple types into one:\r\n    \r\ninterface ErrorHandling {\r\n    success: boolean;\r\n    error?: { message: string };\r\n}\r\ninterface DataContainer {\r\n    data: string[];\r\n}\r\ntype ErrorDataResult = ErrorHandling & DataContainer;\r"
    },
    {
      "id": 42,
      "topic": "typescript",
      "question": "What is the 'typeof' type operator?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "The typeof type operator lets you create a type based on the type of a value:\r\n    \r\nconst person = { name: \"John\", age: 30 };\r\ntype Person = typeof person;\r\n"
    },
    {
      "id": 43,
      "topic": "typescript",
      "question": "What are Template Literal Types?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Template literal types build upon string literal types to create new string literal types based on existing ones:\r\n    \r\ntype World = \"world\";\r\ntype Greeting =  hello ${World} ; // type Greeting = \"hello world\"\r"
    },
    {
      "id": 44,
      "topic": "typescript",
      "question": "What is the 'satisfies' operator?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "The satisfies operator lets you verify that a value matches a type without widening its inference:\r\n    \r\nconst colors = {\r\n    red: [255, 0, 0],\r\n    green: [0, 255, 0],\r\n    blue: [0, 0, 255]\r\n} satisfies Record<string, [number, number, number]>;\r\n   \r"
    },
    {
      "id": 45,
      "topic": "typescript",
      "question": "What are Discriminated Unions?\r",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Discriminated unions are types that use a common property to discriminate between different variants:\r\n    \r\ninterface Square {\r\n    kind: \"square\";\r\n    size: number;\r\n}\r\ninterface Circle {\r\n    kind: \"circle\";\r\n    radius: number;\r\n}\r\ntype Shape = Square | Circle;\r"
    },
    {
      "id": 46,
      "topic": "typescript",
      "question": " What is Module Augmentation?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": " Module augmentation allows you to add new declarations to existing modules:\r\n    \r\ndeclare module \"myModule\" {\r\n    export interface MyInterface {\r\n        newProperty: string;\r\n    }\r\n}\r"
    },
    {
      "id": 47,
      "topic": "typescript",
      "question": "What are Ambient Declarations?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Ambient declarations tell TypeScript about types that exist elsewhere (like in JavaScript libraries):\r\n    \r\ndeclare var process: {\r\n    env: {\r\n        NODE_ENV: string;\r\n    };\r\n};\r"
    },
    {
      "id": 48,
      "topic": "typescript",
      "question": " What is the 'ReturnType' utility type?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "ReturnType extracts the return type of a function type:\r\n    \r\nfunction f() {\r\n    return { x: 10, y: 3 };\r\n}\r\ntype P = ReturnType<typeof f>; // { x: number, y: number }\r"
    },
    {
      "id": 49,
      "topic": "typescript",
      "question": "What are Const Assertions?",
      "answer": "",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Const assertions are a way to tell TypeScript to infer the most specific type possible:\r\n    \r\nconst tuple = [1, 2, 3] as const; // readonly [1, 2, 3]\r"
    },
    {
      "id": 50,
      "topic": "typescript",
      "question": "What is the difference between 'unknown' and 'never' types?",
      "answer": "- unknown is the type-safe counterpart of any. It can hold any value, but you must perform type checking before using it.\r\n- never represents values that never occur. It's used for functions that never return or variables that can never have a value.\r",
      "tags": [],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    }
  ]