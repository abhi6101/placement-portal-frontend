const quizData = {
    html: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"], answer: "Hyper Text Markup Language" },
        { question: "Which HTML element is used to specify a header for a document or section?", options: ["<head>", "<header>", "<h1>", "<section>"], answer: "<header>" },
        { question: "What is the correct HTML element for inserting a line break?", options: ["<br>", "<break>", "<lb>", "<line>"], answer: "<br>" },
        { question: "Which character is used to indicate an end tag?", options: ["/", "*", "<", "^"], answer: "/" },
        { question: "How can you make a numbered list?", options: ["<ol>", "<ul>", "<dl>", "<list>"], answer: "<ol>" },
        { question: "Which HTML element is used for the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], answer: "<h1>" },
        { question: "What is the correct HTML for creating a hyperlink?", options: ["<a href='url'>link text</a>", "<a>url</a>", "<link>url</link>", "<http>url</http>"], answer: "<a href='url'>link text</a>" },
        { question: "Which attribute is used to provide an alternative text for an image, if it cannot be displayed?", options: ["alt", "title", "src", "longdesc"], answer: "alt" },
        { question: "What does the `<footer>` element represent?", options: ["The end of a document", "A footer for a document or section", "A concluding paragraph", "A navigation section"], answer: "A footer for a document or section" },
        { question: "Which HTML5 element is used to specify navigation links?", options: ["<nav>", "<navigate>", "<navigation>", "<menu>"], answer: "<nav>" },
        { question: "In HTML, which element is used to define a table row?", options: ["<tr>", "<td>", "<table>", "<th>"], answer: "<tr>" },
        { question: "What is the purpose of the `<!DOCTYPE html>` declaration?", options: ["It defines the document type to be HTML5", "It's a comment", "It links to a CSS file", "It creates a heading"], answer: "It defines the document type to be HTML5" },
        { question: "Which input type is used for fields that should contain a URL address?", options: ["type='url'", "type='email'", "type='text'", "type='link'"], answer: "type='url'" },
        { question: "What is the correct element for playing video files?", options: ["<video>", "<media>", "<movie>", "<source>"], answer: "<video>" },
        { question: "Which element is used to group related elements in a form?", options: ["<fieldset>", "<group>", "<formgroup>", "<section>"], answer: "<fieldset>" }
    ],
    css: [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
        { question: "Which HTML attribute is used to define inline styles?", options: ["style", "class", "styles", "font"], answer: "style" },
        { question: "Which is the correct CSS syntax?", options: ["body {color: black;}", "{body:color=black;}", "body:color=black;", "{body;color:black;}"], answer: "body {color: black;}" },
        { question: "Which property is used to change the background color?", options: ["background-color", "color", "bgcolor", "background"], answer: "background-color" },
        { question: "How do you add a background color for all <h1> elements?", options: ["h1 {background-color: #FFFFFF;}", "all.h1 {background-color: #FFFFFF;}", "h1.all {background-color: #FFFFFF;}", "h1 {bg-color: #FFFFFF;}"], answer: "h1 {background-color: #FFFFFF;}" },
        { question: "Which CSS property is used to change the text color of an element?", options: ["color", "text-color", "font-color", "fgcolor"], answer: "color" },
        { question: "Which property controls the font size of an element?", options: ["font-size", "text-style", "font-style", "size"], answer: "font-size" },
        { question: "What is the correct way to center a block element like a <div> horizontally?", options: ["margin: auto;", "text-align: center;", "align: center;", "center: true;"], answer: "margin: auto;" },
        { question: "How do you make the text bold?", options: ["font-weight: bold;", "text-style: bold;", "font: bold;", "style: bold;"], answer: "font-weight: bold;" },
        { question: "Which property is used to create space between the element's border and its content?", options: ["padding", "margin", "spacing", "border-spacing"], answer: "padding" },
        { question: "How do you select an element with id 'header'?", options: ["#header", ".header", "header", "*header"], answer: "#header" },
        { question: "How do you select elements with class name 'test'?", options: [".test", "#test", "test", "*test"], answer: ".test" },
        { question: "What does the 'box-sizing: border-box;' property do?", options: ["Includes padding and border in the element's total width and height", "Adds a border around the box", "Changes the box shape", "Applies a shadow to the box"], answer: "Includes padding and border in the element's total width and height" },
        { question: "Which property is used to make an element's text uppercase?", options: ["text-transform: uppercase;", "font-style: uppercase;", "text-decoration: uppercase;", "case: upper;"], answer: "text-transform: uppercase;" },
        { question: "What is the default value of the `position` property?", options: ["static", "relative", "absolute", "fixed"], answer: "static" }
    ],
    javascript: [
        { question: "Inside which HTML element do we put the JavaScript?", options: ["<script>", "<javascript>", "<js>", "<scripting>"], answer: "<script>" },
        { question: "What is the correct syntax for referring to an external script called 'xxx.js'?", options: ["<script src='xxx.js'>", "<script href='xxx.js'>", "<script name='xxx.js'>", "<script file='xxx.js'>"], answer: "<script src='xxx.js'>" },
        { question: "How do you write 'Hello World' in an alert box?", options: ["alert('Hello World');", "msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');"], answer: "alert('Hello World');" },
        { question: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "def myFunction()"], answer: "function myFunction()" },
        { question: "How do you call a function named 'myFunction'?", options: ["myFunction()", "call myFunction()", "call function myFunction()", "execute myFunction()"], answer: "myFunction()" },
        { question: "How to write an IF statement in JavaScript?", options: ["if (i == 5)", "if i = 5", "if i == 5 then", "if i = 5 then"], answer: "if (i == 5)" },
        { question: "How does a FOR loop start?", options: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", "for (i <= 5; i++)"], answer: "for (i = 0; i <= 5; i++)" },
        { question: "How can you add a comment in JavaScript?", options: ["//This is a comment", "<!--This is a comment-->", "'This is a comment", "#This is a comment"], answer: "//This is a comment" },
        { question: "What is the correct way to write a JavaScript array?", options: ["var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green')", "var colors = 1 = 'red', 2 = 'green'"], answer: "var colors = ['red', 'green', 'blue']" },
        { question: "Which operator is used to assign a value to a variable?", options: ["=", "*", "-", "x"], answer: "=" },
        { question: "What will the following code return: Boolean(10 > 9)?", options: ["true", "false", "NaN", "undefined"], answer: "true" },
        { question: "Which event occurs when the user clicks on an HTML element?", options: ["onclick", "onmouseclick", "onchange", "onmouseover"], answer: "onclick" },
        { question: "How do you declare a JavaScript variable?", options: ["var carName;", "v carName;", "variable carName;", "string carName;"], answer: "var carName;" },
        { question: "What is the difference between `==` and `===`?", options: ["`==` compares values, `===` compares values and types", "`===` compares values, `==` compares values and types", "They are the same", "None of the above"], answer: "`==` compares values, `===` compares values and types" },
        { question: "Which method can be used to find the length of a string?", options: ["length", "size()", "getLength()", "len()"], answer: "length" }
    ],
    react: [
        { question: "What is React?", options: ["A JavaScript library for building user interfaces", "A complete backend framework", "A database management system", "A CSS pre-processor"], answer: "A JavaScript library for building user interfaces" },
        { question: "What is JSX?", options: ["A syntax extension for JavaScript", "A templating engine for Java", "A CSS framework", "A type of database query"], answer: "A syntax extension for JavaScript" },
        { question: "Which command is used to create a new React app?", options: ["npx create-react-app my-app", "npm init react-app my-app", "react new my-app", "new react-app my-app"], answer: "npx create-react-app my-app" },
        { question: "What is the virtual DOM?", options: ["A lightweight copy of the real DOM in memory", "A server-side representation of the DOM", "A special type of HTML element", "A CSS feature for animations"], answer: "A lightweight copy of the real DOM in memory" },
        { question: "In React, what is used to pass data to a component from outside?", options: ["props", "state", "methods", "variables"], answer: "props" },
        { question: "What is 'state' in React?", options: ["An object that holds data and determines how the component renders and behaves", "A permanent storage for component data", "A way to pass data from parent to child", "A CSS class"], answer: "An object that holds data and determines how the component renders and behaves" },
        { question: "Which lifecycle method is invoked immediately after a component is mounted?", options: ["componentDidMount()", "componentWillMount()", "render()", "constructor()"], answer: "componentDidMount()" },
        { question: "How do you handle events in React?", options: ["Using camelCase event handler names like onClick", "Using lowercase event handler names like onclick", "Using HTML attributes directly", "By calling addEventListener in render"], answer: "Using camelCase event handler names like onClick" },
        { question: "What are React Hooks?", options: ["Functions that let you 'hook into' React state and lifecycle features from function components", "Special HTML tags for React", "A way to connect to external APIs", "CSS utilities for styling"], answer: "Functions that let you 'hook into' React state and lifecycle features from function components" },
        { question: "Which hook is used to manage state in a functional component?", options: ["useState", "useEffect", "useContext", "useReducer"], answer: "useState" },
        { question: "What is the purpose of the `useEffect` hook?", options: ["To perform side effects in function components", "To declare a state variable", "To create a context", "To handle user input"], answer: "To perform side effects in function components" },
        { question: "How do you conditionally render a component?", options: ["Using ternary operators or `&&` in JSX", "Using if/else statements directly in JSX", "Using CSS display property", "Using a special <if> component"], answer: "Using ternary operators or `&&` in JSX" },
        { question: "What is the `key` prop and why is it important?", options: ["A special string attribute you need to include when creating lists of elements", "A way to unlock features in React", "A unique identifier for a component's state", "A security feature"], answer: "A special string attribute you need to include when creating lists of elements" },
        { question: "What is Redux?", options: ["A predictable state container for JavaScript apps", "A React component library", "A build tool for React", "A testing framework for React"], answer: "A predictable state container for JavaScript apps" },
        { question: "What does 'lifting state up' mean in React?", options: ["Moving state to the closest common ancestor of components that need it", "Storing state in the browser's local storage", "Elevating a component's CSS z-index", "Promoting a variable to a global scope"], answer: "Moving state to the closest common ancestor of components that need it" }
    ],
    java: [
        { question: "Which keyword is used to define a class in Java?", options: ["class", "void", "int", "new"], answer: "class" },
        { question: "What is the entry point of a Java program?", options: ["public static void main(String[] args)", "public void main(String[] args)", "private static void start()", "main()"], answer: "public static void main(String[] args)" },
        { question: "Which of these is a primitive data type in Java?", options: ["int", "String", "Object", "Array"], answer: "int" },
        { question: "What is the correct way to create an object of the `Car` class?", options: ["Car myCar = new Car();", "new Car myCar = Car();", "Car myCar = Car.new();", "object Car myCar = new Car();"], answer: "Car myCar = new Car();" },
        { question: "What does the 'static' keyword mean?", options: ["The variable or method belongs to the class, rather than an instance", "The variable cannot be changed", "The method can only be called by the same class", "The variable is stored on the stack"], answer: "The variable or method belongs to the class, rather than an instance" },
        { question: "Which concept allows a class to inherit features from another class?", options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"], answer: "Inheritance" },
        { question: "What is method overriding?", options: ["A subclass providing a specific implementation of a method that is already provided by its superclass", "Having multiple methods with the same name but different parameters", "Hiding the implementation details of a method", "Creating a new method in a subclass"], answer: "A subclass providing a specific implementation of a method that is already provided by its superclass" },
        { question: "Which collection class allows unique elements and is unordered?", options: ["Set", "List", "Map", "Queue"], answer: "Set" },
        { question: "What is the purpose of the `final` keyword?", options: ["To make a variable constant, prevent method overriding, or prevent inheritance", "To indicate the final method in a class", "To mark a block of code that must be executed", "To free up memory"], answer: "To make a variable constant, prevent method overriding, or prevent inheritance" },
        { question: "How do you handle exceptions in Java?", options: ["Using a try-catch block", "Using an if-else statement", "Using a throw statement only", "Using the 'error' keyword"], answer: "Using a try-catch block" },
        { question: "What is an interface in Java?", options: ["A reference type that can contain only constants, method signatures, default methods, static methods, and nested types", "A class that cannot be instantiated", "A special type of loop", "A tool for debugging"], answer: "A reference type that can contain only constants, method signatures, default methods, static methods, and nested types" },
        { question: "Which package is automatically imported into every Java program?", options: ["java.lang", "java.util", "java.io", "java.net"], answer: "java.lang" },
        { question: "What is the difference between an `ArrayList` and a `LinkedList`?", options: ["ArrayList uses a dynamic array, LinkedList uses a doubly-linked list", "ArrayList is faster for manipulation, LinkedList is faster for access", "ArrayList can only store primitives", "LinkedList is synchronized by default"], answer: "ArrayList uses a dynamic array, LinkedList uses a doubly-linked list" },
        { question: "What does 'encapsulation' mean in OOP?", options: ["Binding data (variables) and code (methods) together into a single unit", "The ability of an object to take on many forms", "Hiding complex implementation details", "Inheriting properties from a parent class"], answer: "Binding data (variables) and code (methods) together into a single unit" },
        { question: "Which access modifier provides the widest accessibility?", options: ["public", "protected", "private", "default"], answer: "public" }
    ],
    springboot: [
        { question: "What is the primary goal of Spring Boot?", options: ["To simplify the setup and development of new Spring applications", "To replace the core Spring Framework", "To provide a frontend UI framework", "To manage database migrations"], answer: "To simplify the setup and development of new Spring applications" },
        { question: "Which annotation is used to mark the main class of a Spring Boot application?", options: ["@SpringBootApplication", "@EnableAutoConfiguration", "@ComponentScan", "@Configuration"], answer: "@SpringBootApplication" },
        { question: "What is the default embedded server in Spring Boot?", options: ["Tomcat", "Jetty", "Undertow", "GlassFish"], answer: "Tomcat" },
        { question: "Which file is commonly used for external configuration in Spring Boot?", options: ["application.properties or application.yml", "web.xml", "pom.xml", "config.json"], answer: "application.properties or application.yml" },
        { question: "Which annotation is used to create a REST controller?", options: ["@RestController", "@Controller", "@Service", "@Component"], answer: "@RestController" },
        { question: "How do you map an HTTP GET request to a method in a controller?", options: ["@GetMapping", "@RequestMapping(method = GET)", "@POST", "@Request"], answer: "@GetMapping" },
        { question: "What is Dependency Injection?", options: ["A design pattern where objects receive other objects they depend on", "A way to connect to a database", "A security feature", "A build management tool"], answer: "A design pattern where objects receive other objects they depend on" },
        { question: "Which annotation is used for dependency injection by type?", options: ["@Autowired", "@Inject", "@Resource", "@Qualifier"], answer: "@Autowired" },
        { question: "What is the purpose of Spring Data JPA?", options: ["To significantly reduce the amount of boilerplate code required to implement data access layers", "To automatically create database tables", "To provide a web interface for database management", "To define REST endpoints"], answer: "To significantly reduce the amount of boilerplate code required to implement data access layers" },
        { question: "How do you define a repository interface with Spring Data JPA?", options: ["Extend JpaRepository<Entity, ID>", "Implement Repository<Entity, ID>", "Annotate with @Repository", "Create a class named *Repository"], answer: "Extend JpaRepository<Entity, ID>" },
        { question: "Which annotation is used to mark a class as a service layer component?", options: ["@Service", "@Component", "@Controller", "@Repository"], answer: "@Service" },
        { question: "What is the purpose of the `@Transactional` annotation?", options: ["It defines the scope of a single database transaction", "It enables transaction security", "It logs all transactions", "It formats data for a transaction"], answer: "It defines the scope of a single database transaction" },
        { question: "How can you access request parameters in a controller method?", options: ["Using the @RequestParam annotation", "Using the @PathVariable annotation", "Using the @RequestBody annotation", "All of the above"], answer: "All of the above" },
        { question: "What is 'auto-configuration' in Spring Boot?", options: ["It automatically configures your Spring application based on the jar dependencies you have added", "It automatically writes code for you", "It configures the operating system", "It sets up the build environment"], answer: "It automatically configures your Spring application based on the jar dependencies you have added" },
        { question: "Which 'starter' dependency would you add to build a web application?", options: ["spring-boot-starter-web", "spring-boot-starter-data-jpa", "spring-boot-starter-security", "spring-boot-starter-test"], answer: "spring-boot-starter-web" }
    ],
    python: [
        { question: "Which keyword is used to define a function in Python?", options: ["def", "function", "fun", "define"], answer: "def" },
        { question: "What is the correct file extension for Python files?", options: [".py", ".pyth", ".pt", ".pyt"], answer: ".py" },
        { question: "How do you create a comment in Python?", options: ["#This is a comment", "//This is a comment", "<!--This is a comment-->", "/*This is a comment*/"], answer: "#This is a comment" },
        { question: "Which collection is ordered, changeable, and allows duplicate members?", options: ["List", "Tuple", "Set", "Dictionary"], answer: "List" },
        { question: "Which collection is a collection of key-value pairs?", options: ["Dictionary", "List", "Set", "Tuple"], answer: "Dictionary" },
        { question: "How do you start writing an if statement in Python?", options: ["if x > y:", "if x > y then", "if (x > y)", "if x > y"], answer: "if x > y:" },
        { question: "How do you start writing a while loop in Python?", options: ["while x > y:", "while (x > y)", "while x > y {", "while x > y do"], answer: "while x > y:" },
        { question: "What is the correct way to create a list in Python?", options: ["my_list = ['apple', 'banana']", "my_list = ('apple', 'banana')", "my_list = {'apple', 'banana'}", "my_list = list('apple', 'banana')"], answer: "my_list = ['apple', 'banana']" },
        { question: "Which method can be used to return a string in upper case letters?", options: ["upper()", "toUpperCase()", "uppercase()", "toUpper()"], answer: "upper()" },
        { question: "How do you get the length of a list?", options: ["len(my_list)", "my_list.length()", "my_list.size()", "length(my_list)"], answer: "len(my_list)" },
        { question: "What does the `pass` statement do?", options: ["It acts as a placeholder for future code", "It stops the execution of a loop", "It skips the current iteration", "It raises an exception"], answer: "It acts as a placeholder for future code" },
        { question: "Which library is commonly used for data analysis in Python?", options: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"], answer: "Pandas" },
        { question: "How do you import a module named 'math'?", options: ["import math", "include math", "module math", "use math"], answer: "import math" },
        { question: "What is a 'lambda' function in Python?", options: ["A small anonymous function", "A function that can't be called", "A built-in math function", "A recursive function"], answer: "A small anonymous function" },
        { question: "How do you handle potential errors in your code?", options: ["Using a try-except block", "Using an if-else statement", "Using a for-loop", "Using the 'error' keyword"], answer: "Using a try-except block" }
    ],
    sql: [
        { question: "What does SQL stand for?", options: ["Structured Query Language", "Strong Question Language", "Structured Question Language", "Simple Query Language"], answer: "Structured Query Language" },
        { question: "Which SQL statement is used to extract data from a database?", options: ["SELECT", "GET", "OPEN", "EXTRACT"], answer: "SELECT" },
        { question: "Which SQL statement is used to update data in a database?", options: ["UPDATE", "MODIFY", "SAVE AS", "CHANGE"], answer: "UPDATE" },
        { question: "Which SQL statement is used to delete data from a database?", options: ["DELETE", "REMOVE", "COLLAPSE", "ERASE"], answer: "DELETE" },
        { question: "Which SQL statement is used to insert new data in a database?", options: ["INSERT INTO", "ADD NEW", "ADD RECORD", "INSERT NEW"], answer: "INSERT INTO" },
        { question: "With SQL, how do you select a column named 'FirstName' from a table named 'Users'?", options: ["SELECT FirstName FROM Users", "SELECT Users.FirstName", "EXTRACT FirstName FROM Users", "GET FirstName FROM Users"], answer: "SELECT FirstName FROM Users" },
        { question: "With SQL, how do you select all the records from a table named 'Users'?", options: ["SELECT * FROM Users", "SELECT ALL FROM Users", "SELECT [all] FROM Users", "SELECT Users.*"], answer: "SELECT * FROM Users" },
        { question: "Which keyword is used to return only different values?", options: ["DISTINCT", "UNIQUE", "DIFFERENT", "ONLY"], answer: "DISTINCT" },
        { question: "Which keyword is used to sort the result-set?", options: ["ORDER BY", "SORT", "SORT BY", "ORDER"], answer: "ORDER BY" },
        { question: "How can you insert a new record into the 'Users' table?", options: ["INSERT INTO Users (FirstName, LastName) VALUES ('John', 'Doe')", "INSERT ('John', 'Doe') INTO Users", "INSERT VALUES ('John', 'Doe') INTO Users", "INSERT INTO Users VALUES ('John', 'Doe')"], answer: "INSERT INTO Users (FirstName, LastName) VALUES ('John', 'Doe')" },
        { question: "How can you change 'Doe' to 'Smith' in the 'LastName' column of the 'Users' table?", options: ["UPDATE Users SET LastName='Smith' WHERE LastName='Doe'", "MODIFY Users SET LastName='Smith' WHERE LastName='Doe'", "UPDATE Users SET LastName='Smith'", "SAVE Users SET LastName='Smith' WHERE LastName='Doe'"], answer: "UPDATE Users SET LastName='Smith' WHERE LastName='Doe'" },
        { question: "Which operator is used to search for a specified pattern in a column?", options: ["LIKE", "GET", "FROM", "SEARCH"], answer: "LIKE" },
        { question: "Which type of JOIN returns all records from the left table, and the matched records from the right table?", options: ["LEFT JOIN", "INNER JOIN", "RIGHT JOIN", "FULL JOIN"], answer: "LEFT JOIN" },
        { question: "Which SQL function is used to count the number of rows in a table?", options: ["COUNT()", "NUMBER()", "SUM()", "TOTAL()"], answer: "COUNT()" },
        { question: "What is a primary key?", options: ["A constraint that uniquely identifies each record in a table", "The first column of a table", "A key that is used to unlock the database", "A reference to another table"], answer: "A constraint that uniquely identifies each record in atable" }
    ],
    dsa: [
        { question: "Which data structure uses LIFO (Last-In, First-Out)?", options: ["Stack", "Queue", "Array", "Linked List"], answer: "Stack" },
        { question: "Which data structure uses FIFO (First-In, First-Out)?", options: ["Queue", "Stack", "Tree", "Graph"], answer: "Queue" },
        { question: "What is the time complexity of accessing an element in an array by its index?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: "O(1)" },
        { question: "A binary search algorithm can be applied to...", options: ["a sorted array", "an unsorted array", "a sorted linked list", "any array"], answer: "a sorted array" },
        { question: "What is the worst-case time complexity of Bubble Sort?", options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"], answer: "O(n^2)" },
        { question: "Which of the following is not a linear data structure?", options: ["Tree", "Array", "Stack", "Queue"], answer: "Tree" },
        { question: "In a binary search tree, which traversal visits nodes in ascending order?", options: ["In-order", "Pre-order", "Post-order", "Level-order"], answer: "In-order" },
        { question: "What is a 'hash collision'?", options: ["When two different keys hash to the same value", "When a key is not found", "When the hash table is full", "An error in the hashing function"], answer: "When two different keys hash to the same value" },
        { question: "Which algorithm is used to find the shortest path in an unweighted graph?", options: ["Breadth-First Search (BFS)", "Depth-First Search (DFS)", "Dijkstra's Algorithm", "A* Search"], answer: "Breadth-First Search (BFS)" },
        { question: "What is the time complexity for inserting an element at the beginning of a linked list?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: "O(1)" },
        { question: "Which sorting algorithm is known for its 'divide and conquer' strategy?", options: ["Merge Sort", "Bubble Sort", "Insertion Sort", "Selection Sort"], answer: "Merge Sort" },
        { question: "A data structure where elements can be inserted or deleted at/from both ends, but not in the middle is called...", options: ["Dequeue", "Queue", "Stack", "Priority Queue"], answer: "Dequeue" },
        { question: "What does 'Big O' notation represent?", options: ["The upper bound of the time complexity (worst-case)", "The exact time taken by an algorithm", "The lower bound of the time complexity (best-case)", "The average case time complexity"], answer: "The upper bound of the time complexity (worst-case)" },
        { question: "Which data structure is ideal for implementing a priority queue?", options: ["Heap", "Stack", "Array", "Queue"], answer: "Heap" },
        { question: "The process of visiting every node in a graph is called...", options: ["Traversal", "Searching", "Sorting", "Pathfinding"], answer: "Traversal" }
    ],
    git: [
        { question: "What is Git?", options: ["A distributed version control system", "A centralized version control system", "A cloud storage service", "A code editor"], answer: "A distributed version control system" },
        { question: "Which command is used to initialize a new Git repository?", options: ["git init", "git new", "git create", "git start"], answer: "git init" },
        { question: "Which command is used to stage changes for a commit?", options: ["git add", "git commit", "git stage", "git push"], answer: "git add" },
        { question: "How do you check the status of your working directory and staging area?", options: ["git status", "git check", "git log", "git diff"], answer: "git status" },
        { question: "Which command is used to record the staged changes to the repository?", options: ["git commit -m 'message'", "git save 'message'", "git record -m 'message'", "git store 'message'"], answer: "git commit -m 'message'" },
        { question: "How do you create a new branch named 'feature-x'?", options: ["git checkout -b feature-x", "git branch new feature-x", "git new-branch feature-x", "git create branch feature-x"], answer: "git checkout -b feature-x" },
        { question: "Which command is used to switch to an existing branch?", options: ["git checkout", "git switch", "git go", "Both A and B"], answer: "Both A and B" },
        { question: "How do you upload your local repository content to a remote repository?", options: ["git push", "git upload", "git remote add", "git send"], answer: "git push" },
        { question: "Which command is used to fetch and download content from a remote repository and immediately update your local repository to match?", options: ["git pull", "git fetch", "git download", "git update"], answer: "git pull" },
        { question: "What is a 'merge conflict'?", options: ["When Git is unable to automatically resolve differences in code between two commits", "An error in the Git installation", "When two branches have the same name", "When a push to a remote is rejected"], answer: "When Git is unable to automatically resolve differences in code between two commits" },
        { question: "How do you view the commit history?", options: ["git log", "git history", "git commits", "git show"], answer: "git log" },
        { question: "What is the purpose of a `.gitignore` file?", options: ["To specify intentionally untracked files that Git should ignore", "To ignore specific commits", "To store Git configuration", "To hide a repository"], answer: "To specify intentionally untracked files that Git should ignore" },
        { question: "Which command creates a copy of an existing remote repository on your local machine?", options: ["git clone", "git copy", "git duplicate", "git fork"], answer: "git clone" },
        { question: "What does 'HEAD' refer to in Git?", options: ["A reference to the last commit in the currently checked-out branch", "The first commit of the repository", "The main branch of the repository", "The remote repository's state"], answer: "A reference to the last commit in the currently checked-out branch" },
        { question: "How do you merge a branch named 'feature' into your current branch (e.g., 'main')?", options: ["git merge feature", "git combine feature", "git add feature", "git push feature"], answer: "git merge feature" }
    ]
};