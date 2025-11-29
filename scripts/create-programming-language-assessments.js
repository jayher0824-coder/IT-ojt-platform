const mongoose = require('mongoose');
const { Assessment } = require('../models/Assessment');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Python Assessment Questions (20)
const pythonQuestions = [
  {
    question: "What is the correct way to declare a variable in Python?",
    type: "multiple-choice",
    options: ["var x = 10", "x = 10", "int x = 10", "declare x = 10"],
    correctAnswer: "x = 10",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Python uses dynamic typing - no type declaration needed."
  },
  {
    question: "Which of these is NOT a valid Python data type?",
    type: "multiple-choice",
    options: ["list", "tuple", "array", "dict"],
    correctAnswer: "array",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Python has lists, tuples, and dicts, but 'array' is from other languages."
  },
  {
    question: "What does the 'len()' function return?",
    type: "multiple-choice",
    options: ["Length of string", "Length of any sequence", "Length of list only", "Length of dict only"],
    correctAnswer: "Length of any sequence",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "len() works with strings, lists, tuples, dicts, etc."
  },
  {
    question: "How do you start a comment in Python?",
    type: "multiple-choice",
    options: ["//", "#", "/* */", "<!-- -->"],
    correctAnswer: "#",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Python uses # for single-line comments."
  },
  {
    question: "What is the output of: print(2 ** 3)",
    type: "multiple-choice",
    options: ["6", "8", "9", "Error"],
    correctAnswer: "8",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "** is the exponentiation operator in Python."
  },
  {
    question: "What is list comprehension in Python?",
    type: "short-answer",
    correctAnswer: "A concise way to create lists using a single line of code",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "List comprehensions provide a compact syntax for creating lists."
  },
  {
    question: "What is the difference between 'is' and '==' in Python?",
    type: "short-answer",
    correctAnswer: "'is' checks identity (same object), '==' checks equality (same value)",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "'is' compares object identity, '==' compares values."
  },
  {
    question: "What does the 'yield' keyword do in Python?",
    type: "multiple-choice",
    options: ["Creates a generator", "Returns a value", "Pauses execution", "All of the above"],
    correctAnswer: "All of the above",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "yield creates generators, returns values, and pauses execution."
  },
  {
    question: "What is a lambda function in Python?",
    type: "short-answer",
    correctAnswer: "An anonymous function defined with the lambda keyword",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Lambda functions are small anonymous functions."
  },
  {
    question: "What is the purpose of __init__ in Python classes?",
    type: "multiple-choice",
    options: ["Initialize instance variables", "Create class", "Define methods", "Import modules"],
    correctAnswer: "Initialize instance variables",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "__init__ is the constructor method in Python classes."
  },
  {
    question: "What is the Global Interpreter Lock (GIL) in Python?",
    type: "short-answer",
    correctAnswer: "A mutex that prevents multiple threads from executing Python bytecode simultaneously",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "GIL prevents true parallel execution of threads in CPython."
  },
  {
    question: "What is a decorator in Python?",
    type: "short-answer",
    correctAnswer: "A function that takes another function and extends its behavior without modifying it",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Decorators modify function behavior using @ syntax."
  },
  {
    question: "What is the difference between deepcopy and shallow copy?",
    type: "short-answer",
    correctAnswer: "Shallow copy creates new object but references same nested objects, deepcopy creates completely independent copy",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "copy.copy() is shallow, copy.deepcopy() is deep."
  },
  {
    question: "What is a context manager in Python?",
    type: "multiple-choice",
    options: ["Manages memory", "Handles exceptions", "Manages resources with __enter__ and __exit__", "Manages threads"],
    correctAnswer: "Manages resources with __enter__ and __exit__",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Context managers handle setup and cleanup with with statement."
  },
  {
    question: "What is metaclass in Python?",
    type: "short-answer",
    correctAnswer: "A class whose instances are classes - defines behavior of classes",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Metaclasses create and control class creation."
  },
  {
    question: "How does Python's garbage collection work?",
    type: "short-answer",
    correctAnswer: "Uses reference counting and cyclic garbage collector for unreachable objects",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Python uses refcounting + cycle detection for GC."
  },
  {
    question: "What is the purpose of __slots__ in Python classes?",
    type: "multiple-choice",
    options: ["Create methods", "Restrict instance attributes", "Define properties", "Create metaclasses"],
    correctAnswer: "Restrict instance attributes",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "__slots__ limits attributes to save memory."
  },
  {
    question: "What is monkey patching in Python?",
    type: "short-answer",
    correctAnswer: "Dynamically modifying classes or modules at runtime",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Changing code behavior without modifying source."
  },
  {
    question: "What is the difference between iter() and next()?",
    type: "short-answer",
    correctAnswer: "iter() creates iterator from iterable, next() gets next item from iterator",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "iter() converts to iterator, next() advances iterator."
  },
  {
    question: "What is asyncio in Python?",
    type: "short-answer",
    correctAnswer: "A library for writing concurrent code using coroutines, multiplexing I/O access",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Asyncio enables asynchronous programming in Python."
  }
];

// JavaScript Assessment Questions (20)
const javascriptQuestions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    type: "multiple-choice",
    options: ["var x = 10", "let x = 10", "const x = 10", "All of the above"],
    correctAnswer: "All of the above",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "JavaScript supports var, let, and const for variable declaration."
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    type: "multiple-choice",
    options: ["//", "#", "/* */", "Both // and /* */"],
    correctAnswer: "Both // and /* */",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "JavaScript supports both single-line (//) and multi-line (/* */) comments."
  },
  {
    question: "What is the result of: typeof null",
    type: "multiple-choice",
    options: ["null", "undefined", "object", "boolean"],
    correctAnswer: "object",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "typeof null returns 'object' due to a historical bug in JavaScript."
  },
  {
    question: "How do you check if a variable is an array?",
    type: "multiple-choice",
    options: ["typeof arr === 'array'", "arr.isArray()", "Array.isArray(arr)", "arr instanceof Array"],
    correctAnswer: "Array.isArray(arr)",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Array.isArray() is the most reliable way to check for arrays."
  },
  {
    question: "What does NaN stand for?",
    type: "multiple-choice",
    options: ["Not a Number", "No a Number", "Null a Number", "None a Number"],
    correctAnswer: "Not a Number",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "NaN represents 'Not a Number' in JavaScript."
  },
  {
    question: "What is the difference between == and ===?",
    type: "short-answer",
    correctAnswer: "== performs type coercion, === checks both value and type strictly",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "=== is strict equality, == allows type conversion."
  },
  {
    question: "What is a closure in JavaScript?",
    type: "short-answer",
    correctAnswer: "A function that has access to variables in its outer scope even after the outer function has returned",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Closures capture variables from their lexical scope."
  },
  {
    question: "What is the purpose of the 'this' keyword?",
    type: "multiple-choice",
    options: ["Refers to current function", "Refers to current object context", "Refers to global object", "Refers to parent function"],
    correctAnswer: "Refers to current object context",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "'this' refers to the object that is executing the current function."
  },
  {
    question: "What is event bubbling?",
    type: "short-answer",
    correctAnswer: "When an event triggers on a nested element, it propagates up through parent elements",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Events bubble up the DOM tree from child to parent."
  },
  {
    question: "What is the purpose of async/await?",
    type: "multiple-choice",
    options: ["Make code synchronous", "Handle asynchronous operations more cleanly", "Speed up code", "Replace promises"],
    correctAnswer: "Handle asynchronous operations more cleanly",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "async/await provides syntactic sugar for promises."
  },
  {
    question: "What is the event loop in JavaScript?",
    type: "short-answer",
    correctAnswer: "A mechanism that handles asynchronous callbacks and manages the execution order",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "The event loop processes messages in a queue for asynchronous operations."
  },
  {
    question: "What is hoisting in JavaScript?",
    type: "short-answer",
    correctAnswer: "The behavior where variable and function declarations are moved to the top of their scope",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Declarations are hoisted, but initializations are not."
  },
  {
    question: "What is the difference between call, apply, and bind?",
    type: "short-answer",
    correctAnswer: "call/apply invoke function with specific 'this', bind creates new function with bound 'this'",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "call/apply execute immediately, bind returns new function."
  },
  {
    question: "What is a Promise in JavaScript?",
    type: "short-answer",
    correctAnswer: "An object representing eventual completion or failure of asynchronous operation",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Promises handle asynchronous operations with then/catch."
  },
  {
    question: "What is the prototype chain?",
    type: "short-answer",
    correctAnswer: "The mechanism by which objects inherit properties from other objects through __proto__",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "JavaScript uses prototypal inheritance via prototype chain."
  },
  {
    question: "What is currying in JavaScript?",
    type: "short-answer",
    correctAnswer: "Transforming a function that takes multiple arguments into sequence of functions each taking single argument",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Currying breaks down function calls into chained calls."
  },
  {
    question: "What is the temporal dead zone?",
    type: "short-answer",
    correctAnswer: "The time between entering scope and variable declaration where let/const variables cannot be accessed",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "TDZ prevents access to let/const before declaration."
  },
  {
    question: "What is a generator function?",
    type: "short-answer",
    correctAnswer: "A function that can pause and resume execution, yielding values one at a time",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Generators use function* and yield for lazy evaluation."
  },
  {
    question: "What is the module pattern in JavaScript?",
    type: "short-answer",
    correctAnswer: "A design pattern that uses closures to create private and public encapsulation",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Module pattern provides encapsulation using IIFE."
  },
  {
    question: "What is the spread operator used for?",
    type: "multiple-choice",
    options: ["Mathematical operations", "Array/object spreading and rest parameters", "String concatenation", "DOM manipulation"],
    correctAnswer: "Array/object spreading and rest parameters",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "... spreads iterables or collects rest arguments."
  }
];

// Ruby Assessment Questions (20)
const rubyQuestions = [
  {
    question: "What is the correct way to declare a variable in Ruby?",
    type: "multiple-choice",
    options: ["var x = 10", "$x = 10", "@x = 10", "x = 10"],
    correctAnswer: "x = 10",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Ruby uses simple assignment without type declaration."
  },
  {
    question: "What does 'puts' do in Ruby?",
    type: "multiple-choice",
    options: ["Reads input", "Prints with newline", "Prints without newline", "Creates variable"],
    correctAnswer: "Prints with newline",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "puts outputs text followed by a newline character."
  },
  {
    question: "How do you start a comment in Ruby?",
    type: "multiple-choice",
    options: ["//", "#", "/* */", "<!-- -->"],
    correctAnswer: "#",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Ruby uses # for single-line comments."
  },
  {
    question: "What is a symbol in Ruby?",
    type: "multiple-choice",
    options: ["A string", "An immutable identifier", "A number", "A boolean"],
    correctAnswer: "An immutable identifier",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Symbols are immutable, reusable constants represented by :symbol."
  },
  {
    question: "What does 'nil' represent in Ruby?",
    type: "multiple-choice",
    options: ["Zero", "Empty string", "Nothing/absence of value", "False"],
    correctAnswer: "Nothing/absence of value",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "nil represents the absence of a value in Ruby."
  },
  {
    question: "What is a block in Ruby?",
    type: "short-answer",
    correctAnswer: "A chunk of code that can be passed to methods, enclosed in do/end or {}",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Blocks are anonymous functions passed to methods."
  },
  {
    question: "What is the difference between 'proc' and 'lambda'?",
    type: "short-answer",
    correctAnswer: "Lambda checks arguments strictly, proc doesn't; lambda returns from itself, proc returns from calling scope",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Lambdas are stricter than procs in argument handling and returns."
  },
  {
    question: "What does 'include' do in Ruby?",
    type: "multiple-choice",
    options: ["Imports files", "Mixes module methods as instance methods", "Creates classes", "Defines methods"],
    correctAnswer: "Mixes module methods as instance methods",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "include mixes module methods into a class as instance methods."
  },
  {
    question: "What is a mixin in Ruby?",
    type: "short-answer",
    correctAnswer: "A module that provides methods to be mixed into classes using include or extend",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Mixins allow code reuse through composition."
  },
  {
    question: "What is metaprogramming in Ruby?",
    type: "short-answer",
    correctAnswer: "Writing code that writes or modifies code at runtime",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Metaprogramming allows dynamic code generation and modification."
  },
  {
    question: "What is the difference between 'class' and 'module'?",
    type: "short-answer",
    correctAnswer: "Classes can be instantiated, modules cannot; modules are for namespacing and mixins",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Classes create objects, modules organize code and provide mixins."
  },
  {
    question: "What is duck typing in Ruby?",
    type: "short-answer",
    correctAnswer: "An object is defined by what it can do, not its type - 'if it walks like a duck...'",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Duck typing focuses on behavior rather than inheritance."
  },
  {
    question: "What is the 'method_missing' method?",
    type: "short-answer",
    correctAnswer: "A hook method called when undefined method is invoked, allowing dynamic method handling",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "method_missing enables dynamic method dispatch."
  },
  {
    question: "What is a singleton method in Ruby?",
    type: "short-answer",
    correctAnswer: "A method defined on a specific object instance rather than its class",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Singleton methods belong to individual objects."
  },
  {
    question: "What is the Ruby object model?",
    type: "short-answer",
    correctAnswer: "Everything is an object, classes are objects, inheritance through singleton classes",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Ruby's object model is class-based with prototypal features."
  },
  {
    question: "What is 'eval' in Ruby?",
    type: "short-answer",
    correctAnswer: "A method that executes string as Ruby code at runtime",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "eval allows dynamic code execution from strings."
  },
  {
    question: "What is the difference between 'load' and 'require'?",
    type: "short-answer",
    correctAnswer: "require loads once and for .rb files, load loads every time and for any file",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "require prevents multiple loads, load allows reloading."
  },
  {
    question: "What is a Ruby gem?",
    type: "short-answer",
    correctAnswer: "A packaged Ruby application or library distributed via RubyGems",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Gems are Ruby's package format for distributing code."
  },
  {
    question: "What is the 'send' method?",
    type: "short-answer",
    correctAnswer: "A method that invokes another method by name (string/symbol) dynamically",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "send enables dynamic method invocation."
  },
  {
    question: "What is Rails in Ruby context?",
    type: "short-answer",
    correctAnswer: "A web application framework that provides structure for MVC web applications",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Rails is Ruby's most popular web framework."
  }
];

// PHP Assessment Questions (20)
const phpQuestions = [
  {
    question: "What is the correct way to start PHP code?",
    type: "multiple-choice",
    options: ["<?php", "<php>", "<?", "<script>"],
    correctAnswer: "<?php",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "PHP code starts with <?php opening tag."
  },
  {
    question: "How do you declare a variable in PHP?",
    type: "multiple-choice",
    options: ["var $x = 10", "$x = 10", "int $x = 10", "declare $x = 10"],
    correctAnswer: "$x = 10",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "PHP variables start with $ and use dynamic typing."
  },
  {
    question: "What does 'echo' do in PHP?",
    type: "multiple-choice",
    options: ["Reads input", "Outputs text", "Creates variables", "Defines functions"],
    correctAnswer: "Outputs text",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "echo outputs one or more strings to the browser."
  },
  {
    question: "How do you start a comment in PHP?",
    type: "multiple-choice",
    options: ["//", "#", "/* */", "All of the above"],
    correctAnswer: "All of the above",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "PHP supports //, #, and /* */ for comments."
  },
  {
    question: "What is the concatenation operator in PHP?",
    type: "multiple-choice",
    options: ["+", "&", ".", "="],
    correctAnswer: ".",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "The dot (.) operator concatenates strings in PHP."
  },
  {
    question: "What is the difference between == and === in PHP?",
    type: "short-answer",
    correctAnswer: "== checks value equality with type coercion, === checks both value and type strictly",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "=== is strict comparison, == allows type conversion."
  },
  {
    question: "What is a superglobal in PHP?",
    type: "short-answer",
    correctAnswer: "Built-in arrays that are always accessible, like $_GET, $_POST, $_SESSION",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Superglobals are predefined arrays available everywhere."
  },
  {
    question: "What is the purpose of 'include' vs 'require'?",
    type: "short-answer",
    correctAnswer: "Both include files, but require stops execution on failure, include continues with warning",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "require is stricter than include for file inclusion."
  },
  {
    question: "What is a session in PHP?",
    type: "short-answer",
    correctAnswer: "A way to store user data across multiple pages during a user's visit",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Sessions maintain state across page requests."
  },
  {
    question: "What is PDO in PHP?",
    type: "short-answer",
    correctAnswer: "PHP Data Objects - a database abstraction layer providing consistent interface",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "PDO provides database access abstraction."
  },
  {
    question: "What is dependency injection in PHP?",
    type: "short-answer",
    correctAnswer: "A design pattern where dependencies are passed to objects rather than created inside",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "DI improves testability and reduces coupling."
  },
  {
    question: "What is autoloading in PHP?",
    type: "short-answer",
    correctAnswer: "Automatic loading of PHP classes without explicit include/require statements",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Autoloading uses __autoload or spl_autoload_register."
  },
  {
    question: "What is the difference between abstract and interface?",
    type: "short-answer",
    correctAnswer: "Abstract classes can have implemented methods, interfaces only declare methods",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Interfaces are pure contracts, abstracts can provide implementation."
  },
  {
    question: "What is a trait in PHP?",
    type: "short-answer",
    correctAnswer: "A mechanism for code reuse that allows horizontal composition of behavior",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Traits solve single inheritance limitation."
  },
  {
    question: "What is the purpose of 'namespace' in PHP?",
    type: "short-answer",
    correctAnswer: "Organizes code into logical groups and prevents name collisions",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Namespaces provide code organization and avoid naming conflicts."
  },
  {
    question: "What is PSR in PHP context?",
    type: "short-answer",
    correctAnswer: "PHP Standards Recommendations - coding standards for PHP ecosystem",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "PSR defines coding standards for interoperability."
  },
  {
    question: "What is the 'finally' block in try-catch?",
    type: "short-answer",
    correctAnswer: "Code that always executes after try-catch, regardless of exception occurrence",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "finally ensures cleanup code always runs."
  },
  {
    question: "What is a closure in PHP?",
    type: "short-answer",
    correctAnswer: "An anonymous function that can capture variables from its surrounding scope",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Closures capture lexical scope variables."
  },
  {
    question: "What is the difference between GET and POST?",
    type: "short-answer",
    correctAnswer: "GET sends data in URL, POST in request body; GET is cached/bookmarked, POST is not",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "GET is for retrieval, POST for sending data."
  },
  {
    question: "What is Composer in PHP?",
    type: "short-answer",
    correctAnswer: "A dependency manager for PHP that manages packages and libraries",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Composer is PHP's package manager."
  }
];

// Go Assessment Questions (20)
const goQuestions = [
  {
    question: "What is the correct way to declare a variable in Go?",
    type: "multiple-choice",
    options: ["var x = 10", "x := 10", "int x = 10", "Both var and :="],
    correctAnswer: "Both var and :=",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Go supports both var declaration and := short declaration."
  },
  {
    question: "What does 'package main' mean in Go?",
    type: "multiple-choice",
    options: ["Main package", "Entry point package", "Primary package", "Default package"],
    correctAnswer: "Entry point package",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "package main defines the entry point for executable programs."
  },
  {
    question: "How do you start a comment in Go?",
    type: "multiple-choice",
    options: ["//", "#", "/* */", "Both // and /* */"],
    correctAnswer: "Both // and /* */",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Go supports both single-line (//) and multi-line (/* */) comments."
  },
  {
    question: "What is a goroutine in Go?",
    type: "multiple-choice",
    options: ["A function", "A lightweight thread", "A variable", "A package"],
    correctAnswer: "A lightweight thread",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Goroutines are lightweight threads managed by Go runtime."
  },
  {
    question: "What does 'defer' do in Go?",
    type: "multiple-choice",
    options: ["Defers execution", "Executes function at end of scope", "Creates goroutine", "Imports package"],
    correctAnswer: "Executes function at end of scope",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "defer executes functions when surrounding function returns."
  },
  {
    question: "What is a channel in Go?",
    type: "short-answer",
    correctAnswer: "A typed conduit for communication between goroutines",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Channels enable goroutine communication and synchronization."
  },
  {
    question: "What is the difference between arrays and slices in Go?",
    type: "short-answer",
    correctAnswer: "Arrays have fixed size, slices are dynamic and reference underlying array",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Slices are more flexible than fixed-size arrays."
  },
  {
    question: "What is an interface in Go?",
    type: "short-answer",
    correctAnswer: "A type that specifies a method set without implementation",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Interfaces define behavior contracts in Go."
  },
  {
    question: "What is the purpose of 'go mod'?",
    type: "multiple-choice",
    options: ["Run programs", "Manage dependencies", "Format code", "Test code"],
    correctAnswer: "Manage dependencies",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "go mod manages Go module dependencies."
  },
  {
    question: "What is a struct in Go?",
    type: "short-answer",
    correctAnswer: "A composite data type that groups together variables under one name",
    difficulty: "medium",
    category: "programming",
    points: 2,
    explanation: "Structs are Go's way of creating custom types."
  },
  {
    question: "What is the CSP model in Go?",
    type: "short-answer",
    correctAnswer: "Communicating Sequential Processes - concurrency model using channels",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Go's concurrency is based on CSP principles."
  },
  {
    question: "What is a pointer in Go?",
    type: "short-answer",
    correctAnswer: "A variable that stores memory address of another variable",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Pointers hold addresses, enabling indirect access."
  },
  {
    question: "What is the 'select' statement in Go?",
    type: "short-answer",
    correctAnswer: "Allows goroutine to wait on multiple channel operations",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "select enables multiplexing channel operations."
  },
  {
    question: "What is embedding in Go structs?",
    type: "short-answer",
    correctAnswer: "Including one struct as field in another for composition",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Embedding provides composition without inheritance."
  },
  {
    question: "What is the zero value in Go?",
    type: "short-answer",
    correctAnswer: "Default value assigned to variables when declared without initialization",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Go automatically initializes variables to zero values."
  },
  {
    question: "What is a mutex in Go?",
    type: "short-answer",
    correctAnswer: "Mutual exclusion lock preventing simultaneous access to shared resource",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Mutexes synchronize access to shared data."
  },
  {
    question: "What is the purpose of 'context' package?",
    type: "short-answer",
    correctAnswer: "Provides context for cancellation, timeouts, and request-scoped values",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Context manages request lifecycle and cancellation."
  },
  {
    question: "What is reflection in Go?",
    type: "short-answer",
    correctAnswer: "Ability to examine and modify program structure at runtime",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Reflection enables dynamic type inspection."
  },
  {
    question: "What is a buffer in Go channels?",
    type: "short-answer",
    correctAnswer: "A channel that can hold multiple values before blocking",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Buffered channels don't block until full."
  },
  {
    question: "What is the Go scheduler?",
    type: "short-answer",
    correctAnswer: "Component that manages goroutine execution on OS threads",
    difficulty: "hard",
    category: "programming",
    points: 3,
    explanation: "Go scheduler multiplexes goroutines onto threads."
  }
];

// Swift Assessment Questions (20)
const swiftQuestions = [
  {
    question: "What is the correct way to declare a variable in Swift?",
    type: "multiple-choice",
    options: ["var x = 10", "let x = 10", "Both var and let", "int x = 10"],
    correctAnswer: "Both var and let",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "var for mutable, let for immutable variables."
  },
  {
    question: "What does 'let' mean in Swift?",
    type: "multiple-choice",
    options: ["Variable", "Constant", "Function", "Class"],
    correctAnswer: "Constant",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "let declares immutable constants in Swift."
  },
  {
    question: "How do you start a comment in Swift?",
    type
