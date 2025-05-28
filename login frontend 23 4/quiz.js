// quiz.js

// --- Quiz Data ---
const quizData = {
    html: [
        {
            question: "What does HTML stand for?",
            options: { a: "Hyper Text Markup Language", b: "High-level Text Machine Language", c: "Hyperlink and Text Management Language", d: "Home Tool Markup Language" },
            answer: "a"
        },
        {
            question: "Which HTML tag is used to define an internal style sheet?",
            options: { a: "<script>", b: "<css>", c: "<style>", d: "<link>" },
            answer: "c"
        },
        {
            question: "Which of the following is an attribute for the <img> tag?",
            options: { a: "src", b: "alt", c: "href", d: "Both a and b" },
            answer: "d"
        },
        {
            question: "What is the correct HTML element for inserting a line break?",
            options: { a: "<lb>", b: "<break>", c: "<br>", d: "<newline>" },
            answer: "c"
        },
        {
            question: "Which HTML element is used to specify a footer for a document or section?",
            options: { a: "<bottom>", b: "<footer>", c: "<section>", d: "<aside>" },
            answer: "b"
        },
        {
            question: "Which HTML tag is used to create a hyperlink?",
            options: { a: "<link>", b: "<a>", c: "<href>", d: "<url>" },
            answer: "b"
        },
        {
            question: "What is the correct HTML for adding a background color?",
            options: { a: "<body style=\"background-color:yellow;\">", b: "<background>yellow</background>", c: "<body bg=\"yellow\">", d: "<color>yellow</color>" },
            answer: "a"
        },
        {
            question: "Choose the correct HTML element for the largest heading:",
            options: { a: "<head>", b: "<h6>", c: "<heading>", d: "<h1>" },
            answer: "d"
        },
        {
            question: "What is the HTML element for playing video files?",
            options: { a: "<media>", b: "<play>", c: "<video>", d: "<movie>" },
            answer: "c"
        },
        {
            question: "Which input type defines a slider control?",
            options: { a: "range", b: "slider", c: "track", d: "level" },
            answer: "a"
        },
        {
            question: "Which HTML element is used to display a scalar measurement within a known range?",
            options: { a: "<gauge>", b: "<meter>", c: "<progress>", d: "<measure>" },
            answer: "b"
        },
        {
            question: "What is the purpose of the <article> element?",
            options: { a: "To define an external resource", b: "To define self-contained content", c: "To define a table article", d: "To define a navigation list" },
            answer: "b"
        },
        {
            question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
            options: { a: "title", b: "src", c: "alt", d: "longdesc" },
            answer: "c"
        },
        {
            question: "Which HTML element is used to define emphasized text?",
            options: { a: "<i>", b: "<em>", c: "<italic>", d: "<bold>" },
            answer: "b"
        },
        {
            question: "Which HTML tag is used to define a list item?",
            options: { a: "<ol>", b: "<ul>", c: "<li>", d: "<dl>" },
            answer: "c"
        },
        {
            question: "The HTML <canvas> element is used to:",
            options: { a: "Draw graphics via scripting", b: "Create database animations", c: "Display video content", d: "Embed PDF documents" },
            answer: "a"
        },
        {
            question: "What is the correct HTML for referring to an external style sheet?",
            options: { a: "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">", b: "<style src=\"mystyle.css\">", c: "<stylesheet>mystyle.css</stylesheet>", d: "<css>mystyle.css</css>" },
            answer: "a"
        },
        {
            question: "Which HTML element is used to create a table row?",
            options: { a: "<td>", b: "<th>", c: "<tr>", d: "<table>" },
            answer: "c"
        },
        {
            question: "Which HTML tag is used to define an HTML form for user input?",
            options: { a: "<input>", b: "<form>", c: "<fieldset>", d: "<label>" },
            answer: "b"
        },
        {
            question: "What does the HTML <aside> element represent?",
            options: { a: "Main content", b: "Content indirectly related to the main content", c: "A navigation bar", d: "A sidebar for advertisements" },
            answer: "b"
        },
        {
            question: "Which HTML element specifies a preformatted text?",
            options: { a: "<p>", b: "<pre>", c: "<text>", d: "<format>" },
            answer: "b"
        },
        {
            question: "Which attribute specifies a unique id for an HTML element?",
            options: { a: "class", b: "id", c: "name", d: "unique" },
            answer: "b"
        },
        {
            question: "What is the HTML element for a small text in a document, such as a copyright or disclaimer?",
            options: { a: "<small>", b: "<tiny>", c: "<footertext>", d: "<lite>" },
            answer: "a"
        },
        {
            question: "Which element is used to group related elements in a form?",
            options: { a: "<group>", b: "<fieldset>", c: "<section>", d: "<wrapper>" },
            answer: "b"
        },
        {
            question: "To embed a scalable vector graphic (SVG) in HTML, you can use the:",
            options: { a: "<img> tag", b: "<svg> tag", c: "<object> tag", d: "All of the above" },
            answer: "d"
        }
    ],
    css: [
        {
            question: "What does CSS stand for?",
            options: { a: "Cascading Style Sheets", b: "Creative Style Sheets", c: "Computer Style Sheets", d: "Colorful Style Sheets" },
            answer: "a"
        },
        {
            question: "Which CSS property controls the text size?",
            options: { a: "font-style", b: "text-size", c: "font-size", d: "text-style" },
            answer: "c"
        },
        {
            question: "Which property is used to change the background color?",
            options: { a: "color", b: "bgcolor", c: "background-color", d: "background" },
            answer: "c"
        },
        {
            question: "How do you select an element with id 'demo'?",
            options: { a: ".demo", b: "#demo", c: "*demo", d: "element#demo" },
            answer: "b"
        },
        {
            question: "Which of the following is NOT a valid CSS unit?",
            options: { a: "px", b: "em", c: "rem", d: "kg" }, // kg is not a valid CSS unit
            answer: "d"
        },
        {
            question: "How do you apply a style to all <p> elements?",
            options: { a: "p { }", b: ".p { }", c: "#p { }", d: "all.p { }" },
            answer: "a"
        },
        {
            question: "Which property is used to change the font of an element?",
            options: { a: "font-family", b: "font-name", c: "font", d: "font-type" },
            answer: "a"
        },
        {
            question: "How do you make text bold in CSS?",
            options: { a: "font-weight: bold;", b: "text-decoration: bold;", c: "font: bold;", d: "style: bold;" },
            answer: "a"
        },
        {
            question: "Which CSS property is used for controlling the layout of grid containers?",
            options: { a: "flex-direction", b: "grid-template-columns", c: "align-items", d: "justify-content" },
            answer: "b"
        },
        {
            question: "What is the default value of the 'position' property?",
            options: { a: "relative", b: "fixed", c: "static", d: "absolute" },
            answer: "c"
        },
        {
            question: "Which CSS property is used to create space between the element's border and its content?",
            options: { a: "margin", b: "padding", c: "spacing", d: "border-spacing" },
            answer: "b"
        },
        {
            question: "How do you select elements with the class name 'test'?",
            options: { a: "#test", b: "*test", c: ".test", d: "test" },
            answer: "c"
        },
        {
            question: "Which property is used to set the color of text?",
            options: { a: "background-color", b: "text-color", c: "color", d: "font-color" },
            answer: "c"
        },
        {
            question: "Which property would you use to change the order of flex items?",
            options: { a: "flex-order", b: "order", c: "flex-direction", d: "align-items" },
            answer: "b"
        },
        {
            question: "What does 'box-sizing: border-box;' do?",
            options: { a: "Includes padding and border in the element's total width and height", b: "Excludes padding and border from the element's total width and height", c: "Adds a border around the box", d: "Resizes the box automatically" },
            answer: "a"
        },
        {
            question: "Which pseudo-class is used to select an element that is being hovered over by the mouse pointer?",
            options: { a: ":active", b: ":focus", c: ":hover", d: ":visited" },
            answer: "c"
        },
        {
            question: "What is the purpose of 'z-index'?",
            options: { a: "To set the text alignment", b: "To control the stacking order of positioned elements", c: "To define the font size", d: "To adjust the line height" },
            answer: "b"
        },
        {
            question: "Which of the following is correct to apply a 2px red solid border?",
            options: { a: "border: 2px solid red;", b: "border-color: red; border-width: 2px; border-style: solid;", c: "Both a and b", d: "border: red 2px solid;" },
            answer: "c"
        },
        {
            question: "Which CSS property defines the transparency of an element?",
            options: { a: "visibility", b: "display", c: "opacity", d: "transparent" },
            answer: "c"
        },
        {
            question: "How do you select an element that is the first child of its parent?",
            options: { a: ":first-child", b: ":first", c: ":child(1)", d: ":nth-child(0)" },
            answer: "a"
        },
        {
            question: "Which function is used to include an image as a background?",
            options: { a: "img()", b: "background-image()", c: "url()", d: "src()" },
            answer: "c"
        },
        {
            question: "The 'display: none;' property will:",
            options: { a: "Make the element invisible but take up space", b: "Hide the element and remove it from the document flow", c: "Only hide the text inside the element", d: "Change the element's color to transparent" },
            answer: "b"
        },
        {
            question: "Which property is used to control the space between lines of text?",
            options: { a: "text-spacing", b: "line-height", c: "word-spacing", d: "letter-spacing" },
            answer: "b"
        },
        {
            question: "What is a 'media query' in CSS?",
            options: { a: "A way to query database information", b: "A technique to apply different styles based on device characteristics", c: "A method for animating elements", d: "A tool for debugging CSS errors" },
            answer: "b"
        },
        {
            question: "Which of the following is NOT a valid way to specify a color in CSS?",
            options: { a: "#RRGGBB", b: "rgb(R,G,B)", c: "color-name", d: "cmyk(C,M,Y,K)" }, // CMYK is not a standard web color model
            answer: "d"
        }
    ],
    javascript: [
        {
            question: "Which keyword is used to declare a variable in JavaScript?",
            options: { a: "var", b: "let", c: "const", d: "All of the above" },
            answer: "d"
        },
        {
            question: "What is the correct way to write a JavaScript array?",
            options: { a: "var colors = (1:'red', 2:'green');", b: "var colors = ['red', 'green'];", c: "var colors = 'red', 'green';", d: "var colors = {1:'red', 2:'green'};" },
            answer: "b"
        },
        {
            question: "Which function is used to print content to the console?",
            options: { a: "print()", b: "log()", c: "console.log()", d: "display()" },
            answer: "c"
        },
        {
            question: "What is a 'closure' in JavaScript?",
            options: { a: "A type of loop", b: "A way to end a function", c: "A function having access to its outer function scope even after the outer function has returned", d: "A data structure" },
            answer: "c"
        },
        {
            question: "What does 'NaN' stand for in JavaScript?",
            options: { a: "Not a Number", b: "New and Notable", c: "No Action Now", d: "Non-applicable" },
            answer: "a"
        },
        {
            question: "Which operator is used for strict equality in JavaScript?",
            options: { a: "==", b: "===", c: "=", d: "!=" },
            answer: "b"
        },
        {
            question: "What is the result of 'typeof null' in JavaScript?",
            options: { a: "null", b: "object", c: "undefined", d: "number" },
            answer: "b"
        },
        {
            question: "How do you add a single-line comment in JavaScript?",
            options: { a: "", b: "/* Comment */", c: "// Comment", d: "# Comment" },
            answer: "c"
        },
        {
            question: "Which method is used to remove the last element from an array and return that element?",
            options: { a: "shift()", b: "pop()", c: "splice()", d: "removeLast()" },
            answer: "b"
        },
        {
            question: "What is the JavaScript 'this' keyword referring to?",
            options: { a: "The current function", b: "The global object (window in browsers)", c: "The object that is currently executing the code", d: "The parent element" },
            answer: "c"
        },
        {
            question: "Which built-in method returns the calling string value converted to lower case?",
            options: { a: "toLowerCase()", b: "toLower()", c: "changeCase(lower)", d: "caseLower()" },
            answer: "a"
        },
        {
            question: "What is the purpose of 'async' and 'await'?",
            options: { a: "To handle synchronous operations", b: "To make asynchronous code easier to write and read", c: "To define variables", d: "To create new functions" },
            answer: "b"
        },
        {
            question: "How do you convert a string to a number in JavaScript?",
            options: { a: "parseInt()", b: "Number()", c: "+operator", d: "All of the above" },
            answer: "d"
        },
        {
            question: "Which event occurs when the user clicks on an HTML element?",
            options: { a: "onmouseover", b: "onchange", c: "onclick", d: "onkeydown" },
            answer: "c"
        },
        {
            question: "What is the correct syntax for an IF statement?",
            options: { a: "if i = 5 then", b: "if (i == 5)", c: "if i == 5", d: "if (i = 5)" },
            answer: "b"
        },
        {
            question: "Which of the following is NOT a JavaScript data type?",
            options: { a: "Boolean", b: "Undefined", c: "Float", d: "Symbol" },
            answer: "c"
        },
        {
            question: "What does 'DOM' stand for in JavaScript?",
            options: { a: "Document Object Model", b: "Data Output Module", c: "Document Order Management", d: "Dynamic Object Method" },
            answer: "a"
        },
        {
            question: "Which method is used to join two or more arrays?",
            options: { a: "join()", b: "concat()", c: "merge()", d: "append()" },
            answer: "b"
        },
        {
            question: "What is 'hoisting' in JavaScript?",
            options: { a: "A security mechanism", b: "A behavior where variable and function declarations are moved to the top of their scope", c: "A method for loading external scripts", d: "An error handling technique" },
            answer: "b"
        },
        {
            question: "How can you detect the client's browser name?",
            options: { a: "navigator.appName", b: "browser.name", c: "client.browser", d: "window.browserName" },
            answer: "a"
        },
        {
            question: "Which object allows you to perform mathematical tasks with JavaScript?",
            options: { a: "Calculator", b: "Math", c: "Number", d: "Arithmetic" },
            answer: "b"
        },
        {
            question: "What is a 'callback function'?",
            options: { a: "A function that calls itself", b: "A function passed as an argument to another function, to be executed later", c: "A function used to revert changes", d: "A function that returns multiple values" },
            answer: "b"
        },
        {
            question: "Which statement creates a new object in JavaScript?",
            options: { a: "var obj = {};", b: "var obj = new Object();", c: "Both a and b", d: "create object obj;" },
            answer: "c"
        },
        {
            question: "What is 'event bubbling'?",
            options: { a: "Events first captured by the inner-most element and then propagated to outer elements", b: "Events first captured by the outer-most element and then propagated to inner elements", c: "A way to stop event propagation", d: "A method for creating custom events" },
            answer: "a"
        },
        {
            question: "Which of these is NOT a valid loop in JavaScript?",
            options: { a: "for...in", b: "for...of", c: "do...while", d: "for each" },
            answer: "d"
        }
    ],
    java: [
        {
            question: "Which of these is not a Java keyword?",
            options: { a: "static", b: "volatile", c: "interface", d: "unsigned" },
            answer: "d"
        },
        {
            question: "What is the entry point of a Java application?",
            options: { a: "start() method", b: "main() method", c: "init() method", d: "run() method" },
            answer: "b"
        },
        {
            question: "Which concept is not part of OOP in Java?",
            options: { a: "Inheritance", b: "Polymorphism", c: "Pointers", d: "Encapsulation" },
            answer: "c"
        },
        {
            question: "Which of the following is used to implement a 'checked' exception?",
            options: { a: "Error", b: "RuntimeException", c: "Throwable", d: "IOException" },
            answer: "d"
        },
        {
            question: "What is the default value of a boolean variable in Java?",
            options: { a: "true", b: "false", c: "0", d: "null" },
            answer: "b"
        },
        {
            question: "Which class is the superclass of all classes in Java?",
            options: { a: "Class", b: "Object", c: "System", d: "Root" },
            answer: "b"
        },
        {
            question: "Which keyword is used to prevent any class from inheriting from a class?",
            options: { a: "abstract", b: "final", c: "static", d: "volatile" },
            answer: "b"
        },
        {
            question: "What does 'JVM' stand for?",
            options: { a: "Java Virtual Machine", b: "Java Validation Model", c: "Joint Venture Module", d: "JavaScript Virtual Machine" },
            answer: "a"
        },
        {
            question: "Which data type is used to store a sequence of characters?",
            options: { a: "char", b: "String", c: "Character", d: "Text" },
            answer: "b"
        },
        {
            question: "What is the correct way to declare an array of integers in Java?",
            options: { a: "int array[];", b: "int[] array;", c: "Both a and b", d: "array int[];" },
            answer: "c"
        },
        {
            question: "Which of the following is a correct statement to import a package?",
            options: { a: "include java.util.Scanner;", b: "import java.util.Scanner;", c: "add java.util.Scanner;", d: "load java.util.Scanner;" },
            answer: "b"
        },
        {
            question: "What is method overloading?",
            options: { a: "Defining multiple methods with the same name but different return types", b: "Defining multiple methods with the same name but different parameters", c: "Defining a method that overrides a superclass method", d: "Defining a method that handles exceptions" },
            answer: "b"
        },
        {
            question: "Which access modifier means the member is accessible only within its own class?",
            options: { a: "public", b: "protected", c: "private", d: "default" },
            answer: "c"
        },
        {
            question: "What is the purpose of the 'finally' block in Java exception handling?",
            options: { a: "It is executed only if an exception occurs.", b: "It is executed only if no exception occurs.", c: "It is always executed, regardless of whether an exception occurs.", d: "It is used to define the exception." },
            answer: "c"
        },
        {
            question: "Which keyword is used to call the constructor of the parent class?",
            options: { a: "this", b: "super", c: "parent", d: "base" },
            answer: "b"
        },
        {
            question: "What is 'Garbage Collection' in Java?",
            options: { a: "Manual memory deallocation by the programmer", b: "Automatic memory management that reclaims unused memory", c: "A process to delete unwanted files", d: "A tool for debugging memory leaks" },
            answer: "b"
        },
        {
            question: "Which interface should be implemented for a class to be sorted?",
            options: { a: "Runnable", b: "Serializable", c: "Comparable", d: "Cloneable" },
            answer: "c"
        },
        {
            question: "What is the output of 'System.out.println(10 + 20 + \"Java\");'?",
            options: { a: "1020Java", b: "30Java", c: "Java1020", d: "Java30" },
            answer: "b"
        },
        {
            question: "Which of these is used for creating multithreaded applications in Java?",
            options: { a: "Process", b: "Thread", c: "Executor", d: "Service" },
            answer: "b"
        },
        {
            question: "What does 'JRE' stand for?",
            options: { a: "Java Runtime Environment", b: "Java Royal Edition", c: "Java Resource Editor", d: "Java Runtime Executor" },
            answer: "a"
        },
        {
            question: "Which Java keyword is used to handle exceptions?",
            options: { a: "catch", b: "throws", c: "try", d: "All of the above" },
            answer: "d"
        },
        {
            question: "What is the purpose of 'static' keyword in a method?",
            options: { a: "It allows the method to be overridden.", b: "It means the method belongs to the class, not an instance.", c: "It makes the method execute only once.", d: "It makes the method private." },
            answer: "b"
        },
        {
            question: "Which collection interface allows duplicate elements and maintains insertion order?",
            options: { a: "Set", b: "Map", c: "List", d: "Queue" },
            answer: "c"
        },
        {
            question: "What is 'autoboxing' in Java?",
            options: { a: "Automatic conversion of primitive types to their corresponding wrapper classes", b: "Automatic conversion of wrapper classes to primitive types", c: "Manual conversion of types", d: "Conversion of objects to strings" },
            answer: "a"
        },
        {
            question: "Which operator performs logical AND?",
            options: { a: "&", b: "&&", c: "|", d: "!" },
            answer: "b"
        }
    ],
    react: [
        {
            question: "What is React.js primarily used for?",
            options: { a: "Backend development", b: "Database management", c: "Building user interfaces", d: "Mobile app development (native)" },
            answer: "c"
        },
        {
            question: "What is JSX?",
            options: { a: "A JavaScript extension for XML-like syntax", b: "A new HTML standard", c: "A CSS preprocessor", d: "A database language" },
            answer: "a"
        },
        {
            question: "How do you pass data from a parent component to a child component in React?",
            options: { a: "Using state", b: "Using props", c: "Using context", d: "Using refs" },
            answer: "b"
        },
        {
            question: "Which hook is used for side effects in functional components?",
            options: { a: "useState", b: "useEffect", c: "useContext", d: "useReducer" },
            answer: "b"
        },
        {
            question: "What is the virtual DOM in React?",
            options: { a: "A direct manipulation of the browser DOM", b: "A lightweight copy of the actual DOM", c: "A server-side rendering technique", d: "A way to store component state" },
            answer: "b"
        },
        {
            question: "Which command is used to create a new React app?",
            options: { a: "npm install create-react-app", b: "create-react-app my-app", c: "npm create-react-app my-app", d: "npx create-react-app my-app" },
            answer: "d"
        },
        {
            question: "What is 'state' in React?",
            options: { a: "A static data that doesn't change", b: "An object that holds mutable data or information about the component", c: "A way to pass data between components", d: "A method for rendering components" },
            answer: "b"
        },
        {
            question: "Which of the following is used to handle events in React?",
            options: { a: "addEventListener", b: "onEventName", c: "camelCase synthetic events", d: "attachEvent" },
            answer: "c"
        },
        {
            question: "What is a 'component' in React?",
            options: { a: "A JavaScript object", b: "An independent, reusable piece of UI", c: "A CSS style sheet", d: "A database record" },
            answer: "b"
        },
        {
            question: "How do you conditionally render a component in React?",
            options: { a: "Using if/else statements", b: "Using ternary operators", c: "Using logical && operator", d: "All of the above" },
            answer: "d"
        },
        {
            question: "What does 'lifting state up' refer to?",
            options: { a: "Moving state to a child component", b: "Moving state to a sibling component", c: "Moving state to a common ancestor component", d: "Making state global" },
            answer: "c"
        },
        {
            question: "Which method is called after a component is rendered for the first time?",
            options: { a: "componentWillMount()", b: "componentDidMount()", c: "render()", d: "getInitialState()" },
            answer: "b"
        },
        {
            question: "What is 'Redux' commonly used for in React applications?",
            options: { a: "Styling components", b: "Managing global state", c: "Routing", d: "Testing" },
            answer: "b"
        },
        {
            question: "Which of the following is NOT a React hook?",
            options: { a: "useState", b: "useClass", c: "useContext", d: "useMemo" },
            answer: "b"
        },
        {
            question: "What is 'reconciliation' in React?",
            options: { a: "The process of updating the actual DOM", b: "The process of comparing the virtual DOM with the previous virtual DOM to find differences", c: "The process of rendering components", d: "The process of handling user input" },
            answer: "b"
        },
        {
            question: "What is a 'Higher-Order Component (HOC)'?",
            options: { a: "A component that takes other components as children", b: "A function that takes a component and returns a new component", c: "A component with higher priority", d: "A component used for debugging" },
            answer: "b"
        },
        {
            question: "What is 'PropTypes' used for?",
            options: { a: "To validate component names", b: "To validate the props received by a component", c: "To define the type of components", d: "To optimize rendering performance" },
            answer: "b"
        },
        {
            question: "How do you prevent a component from re-rendering if its props or state haven't changed?",
            options: { a: "Using shouldComponentUpdate() in class components or React.memo() with functional components", b: "Using forceUpdate()", c: "By not updating state", d: "By using setState(null)" },
            answer: "a"
        },
        {
            question: "Which tool is commonly used for routing in React applications?",
            options: { a: "React Router", b: "Redux Router", c: "Express", d: "Angular Router" },
            answer: "a"
        },
        {
            question: "What is the purpose of 'keys' in React lists?",
            options: { a: "To make list items unique for styling", b: "To help React identify which items have changed, are added, or are removed", c: "To define the order of list items", d: "To connect list items to a database" },
            answer: "b"
        },
        {
            question: "Which of the following defines a functional component?",
            options: { a: "class MyComponent extends React.Component { ... }", b: "function MyComponent() { ... }", c: "const MyComponent = () => { ... }", d: "Both b and c" },
            answer: "d"
        },
        {
            question: "What is the primary way to update the UI in React?",
            options: { a: "Directly manipulate the DOM", b: "Using setState() or the state updater function from useState()", c: "Changing CSS properties", d: "Calling updateUI() function" },
            answer: "b"
        },
        {
            question: "Which method is typically used to fetch data in a React functional component?",
            options: { a: "componentDidMount", b: "fetchData()", c: "useEffect", d: "getInitialProps" },
            answer: "c"
        },
        {
            question: "What is 'Context API' in React used for?",
            options: { a: "To manage local component state", b: "To pass data through the component tree without prop drilling", c: "To handle routing", d: "To perform side effects" },
            answer: "b"
        },
        {
            question: "Which lifecycle method is invoked immediately before a component is unmounted and destroyed?",
            options: { a: "componentDidUnmount()", b: "componentWillUnmount()", c: "useEffect cleanup function", d: "Both b and c" },
            answer: "d"
        }
    ],
    flutter: [
        {
            question: "What programming language is Flutter written in?",
            options: { a: "Java", b: "Kotlin", c: "Dart", d: "Swift" },
            answer: "c"
        },
        {
            question: "Flutter is primarily used for developing applications for which platforms?",
            options: { a: "Web only", b: "Android and iOS", c: "Desktop only", d: "Backend services" },
            answer: "b"
        },
        {
            question: "What are 'widgets' in Flutter?",
            options: { a: "Database tables", b: "The building blocks of Flutter's UI", c: "External libraries", d: "Backend API endpoints" },
            answer: "b"
        },
        {
            question: "Which type of widget maintains mutable state?",
            options: { a: "StatelessWidget", b: "StatefulWidget", c: "ProviderWidget", d: "BuilderWidget" },
            answer: "b"
        },
        {
            question: "What is 'Hot Reload' in Flutter?",
            options: { a: "A way to restart the app completely", b: "A feature that quickly updates the UI without losing state", c: "A compilation process", d: "A method for debugging network requests" },
            answer: "b"
        },
        {
            question: "What is the entry point of a Flutter application?",
            options: { a: "main() function", b: "runApp() function", c: "startApp() function", d: "build() method" },
            answer: "a"
        },
        {
            question: "Which widget is typically used as the root of most Flutter applications?",
            options: { a: "Container", b: "MaterialApp", c: "Scaffold", d: "Text" },
            answer: "b"
        },
        {
            question: "How do you manage state in Flutter?",
            options: { a: "Only using StatefulWidget", b: "Using Provider, Riverpod, BLoC, etc.", c: "Using global variables only", d: "Only through constructor parameters" },
            answer: "b"
        },
        {
            question: "Which of the following is NOT a Flutter widget type?",
            options: { a: "Layout widgets", b: "Painting widgets", c: "Platform widgets", d: "Render widgets" },
            answer: "c"
        },
        {
            question: "What is a 'BuildContext' in Flutter?",
            options: { a: "A reference to the current build process", b: "A handle to the location of a widget in the widget tree", c: "A database context", d: "A build configuration file" },
            answer: "b"
        },
        {
            question: "Which command is used to run a Flutter app?",
            options: { a: "flutter build", b: "flutter run", c: "flutter install", d: "flutter start" },
            answer: "b"
        },
        {
            question: "What is the purpose of the 'pubspec.yaml' file?",
            options: { a: "To define the application's routes", b: "To declare project dependencies and metadata", c: "To store user data", d: "To configure CI/CD pipelines" },
            answer: "b"
        },
        {
            question: "Which of the following best describes 'Declarative UI' in Flutter?",
            options: { a: "You write code that describes how your UI should look given the current state", b: "You manually update UI elements when data changes", c: "UI is defined using XML layouts", d: "UI is generated dynamically by the server" },
            answer: "a"
        },
        {
            question: "What is the 'widget tree' in Flutter?",
            options: { a: "A file system structure", b: "A hierarchical representation of widgets in the UI", c: "A database index", d: "A debugging tool" },
            answer: "b"
        },
        {
            question: "Which widget is used to apply padding around a child widget?",
            options: { a: "Margin", b: "Padding", c: "Space", d: "Container" },
            answer: "b"
        },
        {
            question: "What is 'Dart's sound null safety'?",
            options: { a: "A feature that prevents null pointer exceptions at runtime", b: "A way to handle network errors", c: "A method for encrypting data", d: "A tool for code formatting" },
            answer: "a"
        },
        {
            question: "Which property is used to align widgets within a `Row` or `Column`?",
            options: { a: "align", b: "justifyContent", c: "mainAxisAlignment", d: "crossAxisAlignment" },
            answer: "c"
        },
        {
            question: "What is the 'debugShowCheckedModeBanner' property in `MaterialApp` used for?",
            options: { a: "To display a debug banner in development mode", b: "To enable debugging features", c: "To check for errors in release mode", d: "To show a banner if app is outdated" },
            answer: "a"
        },
        {
            question: "Which widget is used to display a list of scrollable items?",
            options: { a: "GridView", b: "PageView", c: "ListView", d: "Column" },
            answer: "c"
        },
        {
            question: "What is a 'key' in Flutter widgets?",
            options: { a: "A unique identifier for a widget", b: "Used to control widget state when widgets are reordered or updated", c: "A password for the app", d: "A secret for encryption" },
            answer: "b"
        },
        {
            question: "Which package provides basic material design widgets?",
            options: { a: "flutter/cupertino.dart", b: "flutter/material.dart", c: "flutter/widgets.dart", d: "flutter/foundation.dart" },
            answer: "b"
        },
        {
            question: "What is a 'Theme' in Flutter?",
            options: { a: "A set of colors and text styles that define the visual appearance of your app", b: "A background image for the app", c: "A pre-built UI layout", d: "A language translation file" },
            answer: "a"
        },
        {
            question: "Which widget is used to create a button with text and an icon?",
            options: { a: "TextButton", b: "ElevatedButton", c: "IconButton", d: "FilledButton" },
            answer: "c"
        },
        {
            question: "How do you navigate between screens (pages) in Flutter?",
            options: { a: "Using `Navigator`", b: "Using `Router`", c: "Using `GoRouter`", d: "All of the above" },
            answer: "d"
        },
        {
            question: "What is a 'Future' in Dart/Flutter?",
            options: { a: "A value that will be available in the future", b: "A synchronous operation", c: "A type of widget", d: "A database query result" },
            answer: "a"
        }
    ],
    springboot: [
        {
            question: "Which annotation is used to mark a class as a Spring Boot application?",
            options: { a: "@SpringBootApplication", b: "@SpringApplication", c: "@BootApplication", d: "@RunSpring" },
            answer: "a"
        },
        {
            question: "What is the primary goal of Spring Boot?",
            options: { a: "To make Spring development easier and faster", b: "To provide a new programming language", c: "To replace Spring Framework", d: "To build desktop applications" },
            answer: "a"
        },
        {
            question: "Which file is commonly used for configuration in Spring Boot?",
            options: { a: "pom.xml", b: "application.properties", c: "web.xml", d: "context.xml" },
            answer: "b"
        },
        {
            question: "What is an 'embedded server' in Spring Boot?",
            options: { a: "A server running on a separate machine", b: "A server that can be run directly from the JAR file", c: "A virtual server", d: "A cloud-based server" },
            answer: "b"
        },
        {
            question: "Which of the following is NOT a common Spring Boot starter dependency?",
            options: { a: "spring-boot-starter-web", b: "spring-boot-starter-data-jpa", c: "spring-boot-starter-security", d: "spring-boot-starter-ui" },
            answer: "d"
        },
        {
            question: "What is the default port for a Spring Boot application running an embedded Tomcat server?",
            options: { a: "80", b: "8080", c: "443", d: "9090" },
            answer: "b"
        },
        {
            question: "Which annotation is used to define a RESTful controller in Spring Boot?",
            options: { a: "@Controller", b: "@Service", c: "@Repository", d: "@RestController" },
            answer: "d"
        },
        {
            question: "What is the purpose of Spring Boot Actuator?",
            options: { a: "To provide an API for database operations", b: "To monitor and manage Spring Boot applications", c: "To enable security features", d: "To simplify dependency management" },
            answer: "b"
        },
        {
            question: "Which annotation is used for dependency injection in Spring Boot?",
            options: { a: "@Inject", b: "@Autowired", c: "@Resource", d: "All of the above" },
            answer: "d"
        },
        {
            question: "What is 'YAML' used for in Spring Boot?",
            options: { a: "Defining database schemas", b: "Configuring application properties", c: "Writing test cases", d: "Creating web templates" },
            answer: "b"
        },
        {
            question: "Which Spring Boot annotation is used to mark a class as a component that performs business logic?",
            options: { a: "@Repository", b: "@Controller", c: "@Service", d: "@Component" },
            answer: "c"
        },
        {
            question: "What does 'JPA' stand for in the context of Spring Boot Data JPA?",
            options: { a: "Java Persistence API", b: "Java Programming Approach", c: "Joint Project Architecture", d: "JSON Processing API" },
            answer: "a"
        },
        {
            question: "Which of the following is NOT a common Spring Boot CLI command?",
            options: { a: "spring run", b: "spring init", c: "spring test", d: "spring build" },
            answer: "c" // 'spring test' is not a direct CLI command for running tests, 'spring test' is for building testable jars
        },
        {
            question: "What is a 'Bean' in Spring framework?",
            options: { a: "A piece of data", b: "An object that is instantiated, assembled, and managed by a Spring IoC container", c: "A database table", d: "A configuration file" },
            answer: "b"
        },
        {
            question: "Which annotation is used to handle incoming HTTP GET requests?",
            options: { a: "@PostMapping", b: "@PutMapping", c: "@GetMapping", d: "@RequestMapping" },
            answer: "c"
        },
        {
            question: "What is 'Spring Initializr'?",
            options: { a: "A command-line tool for Spring Boot", b: "A web-based tool for generating Spring Boot project structures", c: "An IDE plugin for Spring Boot", d: "A dependency management tool" },
            answer: "b"
        },
        {
            question: "Which of these is a benefit of using Spring Boot?",
            options: { a: "Reduced configuration", b: "Embedded servers", c: "Opinionated defaults", d: "All of the above" },
            answer: "d"
        },
        {
            question: "Which annotation is used to specify a configuration class in Spring Boot?",
            options: { a: "@Config", b: "@Setup", c: "@Configuration", d: "@Settings" },
            answer: "c"
        },
        {
            question: "What is the purpose of 'Profiles' in Spring Boot?",
            options: { a: "To define user profiles", b: "To allow different configurations for different environments (e.g., dev, prod)", c: "To track application performance", d: "To manage security roles" },
            answer: "b"
        },
        {
            question: "Which module of Spring Boot provides health checks and metrics?",
            options: { a: "Spring Boot Web", b: "Spring Boot Data", c: "Spring Boot Actuator", d: "Spring Boot DevTools" },
            answer: "c"
        },
        {
            question: "Which annotation is used to define a property from `application.properties` or `application.yml`?",
            options: { a: "@Value", b: "@Property", c: "@ConfigValue", d: "@Setting" },
            answer: "a"
        },
        {
            question: "What is the primary role of an 'Entity' in Spring Data JPA?",
            options: { a: "To define a REST endpoint", b: "To map to a database table", c: "To handle business logic", d: "To configure security" },
            answer: "b"
        },
        {
            question: "Which annotation is used to enable caching in a Spring Boot application?",
            options: { a: "@CacheEnable", b: "@EnableCaching", c: "@Caching", d: "@UseCache" },
            answer: "b"
        },
        {
            question: "What is 'DevTools' in Spring Boot used for?",
            options: { a: "Debugging and development time utilities like automatic restart", b: "Deployment to production servers", c: "Database migration management", d: "User interface design" },
            answer: "a"
        },
        {
            question: "Which annotation combines @Controller and @ResponseBody?",
            options: { a: "@Service", b: "@Repository", c: "@RestController", d: "@Component" },
            answer: "c"
        }
    ],
    c: [
        {
            question: "Which of the following is a correct way to declare a constant in C?",
            options: { a: "#define PI 3.14", b: "const float PI = 3.14;", c: "Both a and b", d: "constant PI = 3.14;" },
            answer: "c"
        },
        {
            question: "Which operator is used to get the address of a variable in C?",
            options: { a: "&", b: "*", c: "->", d: "." },
            answer: "a"
        },
        {
            question: "What is the output of 'printf(\"%d\", 5 / 2);' in C?",
            options: { a: "2.5", b: "2", c: "3", d: "Error" },
            answer: "b"
        },
        {
            question: "Which header file is essential for input/output operations in C?",
            options: { a: "<stdlib.h>", b: "<string.h>", c: "<math.h>", d: "<stdio.h>" },
            answer: "d"
        },
        {
            question: "Which loop guarantees to execute at least once?",
            options: { a: "for loop", b: "while loop", c: "do-while loop", d: "if-else" },
            answer: "c"
        },
        {
            question: "What is the size of an 'int' data type in C (most common systems)?",
            options: { a: "1 byte", b: "2 bytes", c: "4 bytes", d: "8 bytes" },
            answer: "c"
        },
        {
            question: "Which of the following is a logical OR operator in C?",
            options: { a: "&&", b: "||", c: "!", d: "+" },
            answer: "b"
        },
        {
            question: "What is a 'pointer' in C?",
            options: { a: "A variable that stores a memory address", b: "A variable that stores a character", c: "A variable that stores a floating-point number", d: "A data structure" },
            answer: "a"
        },
        {
            question: "Which keyword is used to return a value from a function?",
            options: { a: "break", b: "continue", c: "return", d: "exit" },
            answer: "c"
        },
        {
            question: "What is the correct way to declare a function in C?",
            options: { a: "function_name() { }", b: "void function_name()", c: "declare function_name;", d: "def function_name():" },
            answer: "b"
        },
        {
            question: "Which storage class specifies that the variable has a global lifetime but is visible only within the file it is declared?",
            options: { a: "auto", b: "static", c: "extern", d: "register" },
            answer: "b"
        },
        {
            question: "What does 'malloc()' do?",
            options: { a: "Frees allocated memory", b: "Allocates memory from the heap", c: "Allocates memory from the stack", d: "Resizes allocated memory" },
            answer: "b"
        },
        {
            question: "Which of these is NOT a valid relational operator in C?",
            options: { a: "==", b: "<>", c: ">=", d: "!=" },
            answer: "b"
        },
        {
            question: "What is the purpose of 'break' statement?",
            options: { a: "To exit the entire program", b: "To terminate the current loop or switch statement", c: "To skip the current iteration of a loop", d: "To restart a loop" },
            answer: "b"
        },
        {
            question: "Which character is used to denote the end of a string in C?",
            options: { a: "\\n", b: "\\t", c: "\\0", d: "\\r" },
            answer: "c"
        },
        {
            question: "What is the output of 'printf(\"Hello\\nWorld\");'?",
            options: { a: "Hello World", b: "HelloWorld", c: "Hello\nWorld", d: "Error" },
            answer: "c"
        },
        {
            question: "Which of the following is a user-defined data type in C?",
            options: { a: "int", b: "float", c: "struct", d: "char" },
            answer: "c"
        },
        {
            question: "The 'scanf()' function is used for:",
            options: { a: "Printing output", b: "Reading input from the console", c: "File handling", d: "Memory allocation" },
            answer: "b"
        },
        {
            question: "What is 'recursion' in C?",
            options: { a: "A function that calls itself", b: "A type of loop", c: "A method for iteration", d: "A way to define constants" },
            answer: "a"
        },
        {
            question: "Which operator has the highest precedence?",
            options: { a: "+", b: "*", c: "==", d: "()" },
            answer: "d"
        },
        {
            question: "What does 'typedef' keyword do?",
            options: { a: "Defines a new data type", b: "Renames an existing data type", c: "Creates an alias for a data type", d: "All of the above" },
            answer: "d"
        },
        {
            question: "Which function is used to concatenate two strings?",
            options: { a: "strjoin()", b: "strcat()", c: "strcpy()", d: "strlen()" },
            answer: "b"
        },
        {
            question: "What is the purpose of 'void' keyword?",
            options: { a: "To indicate that a function does not return a value", b: "To indicate that a function takes no parameters", c: "To declare a generic pointer", d: "All of the above" },
            answer: "d"
        },
        {
            question: "Which of the following is a bitwise AND operator?",
            options: { a: "&&", b: "|", c: "&", d: "!" },
            answer: "c"
        },
        {
            question: "How do you access members of a structure using a pointer?",
            options: { a: "using . operator", b: "using -> operator", c: "using * operator", d: "using [] operator" },
            answer: "b"
        }
    ],
    cpp: [
        {
            question: "Which of the following is the correct syntax to create an object of a class 'MyClass'?",
            options: { a: "MyClass obj;", b: "obj = new MyClass();", c: "MyClass obj = new MyClass;", d: "create MyClass obj;" },
            answer: "a"
        },
        {
            question: "What does 'cout' stand for in C++?",
            options: { a: "Character output", b: "Console output", c: "Count out", d: "Standard output stream" },
            answer: "d"
        },
        {
            question: "Which of the following is an example of polymorphism in C++?",
            options: { a: "Function overloading", b: "Function overriding", c: "Both a and b", d: "Inheritance" },
            answer: "c"
        },
        {
            question: "What is a 'virtual function' in C++?",
            options: { a: "A function that is never called", b: "A function that must be overridden in derived classes", c: "A function whose behavior can be overridden by a derived class", d: "A function that doesn't return a value" },
            answer: "c"
        },
        {
            question: "Which operator is used for dynamic memory allocation in C++?",
            options: { a: "malloc()", b: "calloc()", c: "new", d: "alloc()" },
            answer: "c"
        },
        {
            question: "Which header file is used for input/output operations in C++?",
            options: { a: "<stdlib.h>", b: "<iostream>", c: "<string.h>", d: "<math.h>" },
            answer: "b"
        },
        {
            question: "What is a 'constructor' in C++?",
            options: { a: "A function that destroys objects", b: "A special method called automatically when an object is created", c: "A method to modify object properties", d: "A function to display object data" },
            answer: "b"
        },
        {
            question: "Which keyword is used to inherit a class in C++?",
            options: { a: "implements", b: "extends", c: "inherits", d: "public/protected/private" },
            answer: "d"
        },
        {
            question: "What is 'encapsulation' in C++?",
            options: { a: "Hiding the implementation details and exposing only the functionality", b: "Creating multiple functions with the same name", c: "Allowing objects of different classes to be treated as objects of a common type", d: "Creating a hierarchy of classes" },
            answer: "a"
        },
        {
            question: "Which operator is used to deallocate dynamically allocated memory?",
            options: { a: "free()", b: "delete", c: "remove()", d: "destroy()" },
            answer: "b"
        },
        {
            question: "What is an 'abstract class' in C++?",
            options: { a: "A class that cannot be instantiated and may contain abstract methods", b: "A class with no methods", c: "A class that can only be inherited", d: "A class with only private members" },
            answer: "a"
        },
        {
            question: "Which of the following is NOT a C++ access specifier?",
            options: { a: "public", b: "protected", c: "internal", d: "private" },
            answer: "c"
        },
        {
            question: "What does 'cin' stand for in C++?",
            options: { a: "Character input", b: "Console input", c: "Count in", d: "Standard input stream" },
            answer: "d"
        },
        {
            question: "Which type of inheritance allows a class to inherit from multiple base classes?",
            options: { a: "Single inheritance", b: "Multilevel inheritance", c: "Multiple inheritance", d: "Hierarchical inheritance" },
            answer: "c"
        },
        {
            question: "What is a 'friend function' in C++?",
            options: { a: "A function that can only be called by friends", b: "A non-member function that can access private and protected members of a class", c: "A function that is part of another class", d: "A function that is inherited by all derived classes" },
            answer: "b"
        },
        {
            question: "Which keyword ensures that a function will not modify the object it is called on?",
            options: { a: "static", b: "const", c: "volatile", d: "final" },
            answer: "b"
        },
        {
            question: "What is 'operator overloading'?",
            options: { a: "Defining new operators", b: "Giving existing C++ operators a special meaning for a user-defined data type", c: "Overriding an operator in a derived class", d: "Using operators only with built-in types" },
            answer: "b"
        },
        {
            question: "Which of the following is a storage class specifier in C++?",
            options: { a: "auto", b: "static", c: "extern", d: "All of the above" },
            answer: "d"
        },
        {
            question: "What is a 'pure virtual function'?",
            options: { a: "A virtual function with an empty body", b: "A virtual function that must be implemented by derived classes", c: "A non-virtual function", d: "A static virtual function" },
            answer: "b"
        },
        {
            question: "Which STL container provides dynamic arrays?",
            options: { a: "list", b: "vector", c: "map", d: "set" },
            answer: "b"
        },
        {
            question: "What is the purpose of the 'this' pointer in C++?",
            options: { a: "To point to the next object", b: "To store the address of the current object", c: "To point to the base class object", d: "To point to a global variable" },
            answer: "b"
        },
        {
            question: "Which exception handling keyword is used to rethrow an exception?",
            options: { a: "try", b: "catch", c: "throw", d: "finally" },
            answer: "c"
        },
        {
            question: "What is a 'namespace' in C++?",
            options: { a: "A way to declare variables", b: "A declarative region that provides a scope to the identifiers inside it", c: "A class for organizing code", d: "A type of memory allocation" },
            answer: "b"
        },
        {
            question: "Which of these is a valid declaration for a pointer to a constant integer?",
            options: { a: "int *const ptr;", b: "const int *ptr;", c: "int const *ptr;", d: "Both b and c" },
            answer: "d"
        },
        {
            question: "What is 'move semantics' introduced in C++11?",
            options: { a: "A way to move objects between memory locations", b: "A mechanism to optimize resource transfer by avoiding deep copies", c: "A method for moving files", d: "A technique for animating objects" },
            answer: "b"
        }
    ],
    python: [
        {
            question: "Which of the following is the correct way to comment a single line in Python?",
            options: { a: "// This is a comment", b: "# This is a comment", c: "/* This is a comment */", d: "" },
            answer: "b"
        },
        {
            question: "Which of the following is a mutable data type in Python?",
            options: { a: "Tuple", b: "String", c: "List", d: "Integer" },
            answer: "c"
        },
        {
            question: "What is the output of 'print(type([]))' in Python?",
            options: { a: "<class 'list'>", b: "<class 'array'>", c: "<class 'tuple'>", d: "<class 'set'>" },
            answer: "a"
        },
        {
            question: "Which built-in function is used to get the length of a string, list, or tuple?",
            options: { a: "size()", b: "length()", c: "len()", d: "count()" },
            answer: "c"
        },
        {
            question: "What does 'PIP' stand for in Python?",
            options: { a: "Preferred Installer Program", b: "Python Installation Package", c: "Pre-installed Package", d: "Packet Indexing Program" },
            answer: "a"
        },
        {
            question: "Which keyword is used to define a function in Python?",
            options: { a: "function", b: "def", c: "fun", d: "define" },
            answer: "b"
        },
        {
            question: "How do you assign a value to a variable in Python?",
            options: { a: "x == 5", b: "x = 5", c: "x := 5", d: "let x = 5" },
            answer: "b"
        },
        {
            question: "Which of these data types is ordered and unchangeable?",
            options: { a: "List", b: "Set", c: "Tuple", d: "Dictionary" },
            answer: "c"
        },
        {
            question: "What is the output of 'print(10 // 3)'?",
            options: { a: "3.33", b: "3", c: "4", d: "Error" },
            answer: "b"
        },
        {
            question: "Which module is used for regular expressions in Python?",
            options: { a: "regex", b: "re", c: "regexp", d: "pattern" },
            answer: "b"
        },
        {
            question: "What is a 'dictionary' in Python?",
            options: { a: "An ordered sequence of items", b: "A collection of unique items", c: "A collection of key-value pairs", d: "A fixed-size array" },
            answer: "c"
        },
        {
            question: "Which statement is used to handle exceptions in Python?",
            options: { a: "catch", b: "try-except", c: "handle", d: "error" },
            answer: "b"
        },
        {
            question: "What is the correct way to import a module named 'math'?",
            options: { a: "include math", b: "import math", c: "use math", d: "require math" },
            answer: "b"
        },
        {
            question: "Which method is used to add an item to the end of a list?",
            options: { a: "insert()", b: "add()", c: "append()", d: "extend()" },
            answer: "c"
        },
        {
            question: "What is a 'lambda' function in Python?",
            options: { a: "A recursive function", b: "An anonymous function", c: "A generator function", d: "A built-in function" },
            answer: "b"
        },
        {
            question: "What is the output of 'print(\"hello\" * 3)'?",
            options: { a: "hellohellohello", b: "hello 3", c: "Error", d: "3hello" },
            answer: "a"
        },
        {
            question: "Which operator is used for exponentiation?",
            options: { a: "^", b: "**", c: "pow()", d: "exp()" },
            answer: "b"
        },
        {
            question: "What does 'dir()' function do?",
            options: { a: "Deletes a directory", b: "Lists the attributes and methods of an object", c: "Changes the current directory", d: "Creates a new directory" },
            answer: "b"
        },
        {
            question: "Which of these is NOT a Python numeric type?",
            options: { a: "int", b: "float", c: "decimal", d: "long" },
            answer: "d" // 'long' type was removed in Python 3, int handles arbitrary precision
        },
        {
            question: "How do you read a line from a file in Python?",
            options: { a: "file.read()", b: "file.readLine()", c: "file.readline()", d: "file.getLine()" },
            answer: "c"
        },
        {
            question: "What is a 'generator' in Python?",
            options: { a: "A function that returns a value immediately", b: "A function that produces a sequence of results on demand (iterators)", c: "A class that generates random numbers", d: "A tool for code generation" },
            answer: "b"
        },
        {
            question: "Which of the following is used to install packages in Python?",
            options: { a: "npm", b: "gem", c: "pip", d: "apt" },
            answer: "c"
        },
        {
            question: "What is 'list comprehension'?",
            options: { a: "A method to delete elements from a list", b: "A concise way to create lists", c: "A function to sort lists", d: "A data structure for lists" },
            answer: "b"
        },
        {
            question: "What is 'dunder methods' (e.g., __init__) also known as?",
            options: { a: "Private methods", b: "Magic methods", c: "Static methods", d: "Abstract methods" },
            answer: "b"
        },
        {
            question: "Which of the following will open a file for writing, creating it if it doesn't exist, and truncating it if it does?",
            options: { a: "open('file.txt', 'r')", b: "open('file.txt', 'w')", c: "open('file.txt', 'a')", d: "open('file.txt', 'x')" },
            answer: "b"
        }
    ],
    powerbi: [
        {
            question: "What is the main purpose of Power BI?",
            options: { a: "Word processing", b: "Image editing", c: "Business intelligence and data visualization", d: "Software development" },
            answer: "c"
        },
        {
            question: "What does DAX stand for in Power BI?",
            options: { a: "Data Analysis Expressions", b: "Data Access XAML", c: "Direct Access XML", d: "Database Administration eXchange" },
            answer: "a"
        },
        {
            question: "Which Power BI component is used to connect to various data sources?",
            options: { a: "Power View", b: "Power Query (Get Data)", c: "Power Pivot", d: "Power Map" },
            answer: "b"
        },
        {
            question: "What is a 'Report' in Power BI?",
            options: { a: "A single visualization", b: "A collection of data models", c: "One or more pages of visualizations", d: "A dashboard" },
            answer: "c"
        },
        {
            question: "Which view in Power BI Desktop allows you to see the relationships between tables?",
            options: { a: "Report View", b: "Data View", c: "Model View", d: "Query Editor View" },
            answer: "c"
        },
        {
            question: "What is the primary function of Power Query Editor?",
            options: { a: "To create visualizations", b: "To transform and shape data", c: "To write DAX measures", d: "To publish reports" },
            answer: "b"
        },
        {
            question: "Which of these is NOT a common data source for Power BI?",
            options: { a: "Excel", b: "SQL Server", c: "Facebook API", d: "HTML" },
            answer: "d" // While you can get data from web, direct HTML parsing as a common source is less typical than databases/files.
        },
        {
            question: "What is a 'Measure' in DAX?",
            options: { a: "A calculated column", b: "A dynamic calculation that aggregates data", c: "A type of visual", d: "A data connection" },
            answer: "b"
        },
        {
            question: "Which Power BI service component is used to share and collaborate on reports and dashboards?",
            options: { a: "Power BI Desktop", b: "Power BI Report Server", c: "Power BI Service (App.powerbi.com)", d: "Power BI Mobile" },
            answer: "c"
        },
        {
            question: "What is 'Row-Level Security (RLS)' in Power BI?",
            options: { a: "Securing data at the column level", b: "Restricting data access based on user roles", c: "Encrypting entire datasets", d: "Controlling access to reports" },
            answer: "b"
        },
        {
            question: "What is a 'Dashboard' in Power BI?",
            options: { a: "A single page that tells a story through visualizations from one or more reports", b: "A collection of multiple reports", c: "A detailed data table", d: "A raw data source" },
            answer: "a"
        },
        {
            question: "Which language is used in Power Query Editor for data transformation?",
            options: { a: "DAX", b: "SQL", c: "M language", d: "Python" },
            answer: "c"
        },
        {
            question: "What is 'DirectQuery' in Power BI?",
            options: { a: "Importing all data into Power BI Desktop", b: "Connecting directly to the data source without importing data", c: "A method for writing complex DAX queries", d: "A feature for offline reports" },
            answer: "b"
        },
        {
            question: "What does 'KPI' stand for in Power BI?",
            options: { a: "Key Performance Indicator", b: "Key Process Integration", c: "Knowledge Portal Interface", d: "Keen Performance Index" },
            answer: "a"
        },
        {
            question: "Which visual is best for showing trends over time?",
            options: { a: "Bar Chart", b: "Pie Chart", c: "Line Chart", d: "Scatter Plot" },
            answer: "c"
        },
        {
            question: "What is 'Data Gateway' used for in Power BI?",
            options: { a: "To publish reports to the cloud", b: "To connect Power BI to on-premises data sources securely", c: "To refresh data automatically", d: "To transform data in the cloud" },
            answer: "b"
        },
        {
            question: "What is a 'Calculated Column' in Power BI?",
            options: { a: "A column created at data source level", b: "A column added to an existing table in the data model using DAX formulas", c: "A column that only stores text", d: "A column used for sorting data" },
            answer: "b"
        },
        {
            question: "Which view in Power BI Desktop displays the actual data of your tables?",
            options: { a: "Report View", b: "Data View", c: "Model View", d: "Relationship View" },
            answer: "b"
        },
        {
            question: "What is the purpose of 'Slicers' in Power BI reports?",
            options: { a: "To filter data on the report canvas", b: "To sort data in tables", c: "To create new columns", d: "To change the report theme" },
            answer: "a"
        },
        {
            question: "Which Power BI license type allows users to consume content shared by others?",
            options: { a: "Power BI Free", b: "Power BI Pro", c: "Power BI Premium", d: "All of the above" },
            answer: "d" // Free users can consume, Pro can share/consume, Premium is for large organizations.
        },
        {
            question: "What is 'Star Schema' in data modeling for Power BI?",
            options: { a: "A schema with one fact table and multiple dimension tables", b: "A schema with multiple fact tables and one dimension table", c: "A flat table structure", d: "A schema for unstructured data" },
            answer: "a"
        },
        {
            question: "Which feature allows you to combine multiple tables into a single table in Power Query?",
            options: { a: "Merge Queries", b: "Append Queries", c: "Group By", d: "Pivot Column" },
            answer: "b"
        },
        {
            question: "What is the typical output of Power BI Desktop?",
            options: { a: ".xlsx", b: ".pbix", c: ".pdf", d: ".csv" },
            answer: "b"
        },
        {
            question: "Which of the following is a common visual for comparing categories?",
            options: { a: "Line chart", b: "Pie chart", c: "Bar chart", d: "Scatter plot" },
            answer: "c"
        },
        {
            question: "What is the primary benefit of using a 'Calendar Table' in Power BI?",
            options: { a: "To show actual calendar dates", b: "To enable time intelligence functions in DAX", c: "To set reminders", d: "To format dates" },
            answer: "b"
        }
    ],
    software_engineering: [
        {
            question: "Which phase of SDLC involves defining the scope and goals of the software?",
            options: { a: "Design", b: "Testing", c: "Requirements Gathering", d: "Coding" },
            answer: "c"
        },
        {
            question: "What is 'Agile Methodology' in software development?",
            options: { a: "A linear, sequential approach", b: "An iterative and incremental approach", c: "A single, fixed plan approach", d: "A methodology only for small projects" },
            answer: "b"
        },
        {
            question: "What does 'UML' stand for?",
            options: { a: "Unified Modeling Language", b: "User Management Language", c: "Universal Markup Language", d: "Unit Testing Methodology" },
            answer: "a"
        },
        {
            question: "Which of these is a common software testing type?",
            options: { a: "Recipe Testing", b: "Unit Testing", c: "Book Testing", d: "Table Testing" },
            answer: "b"
        },
        {
            question: "What is 'Version Control' in software engineering?",
            options: { a: "Managing software licenses", b: "Tracking and managing changes to code", c: "Controlling user access", d: "Optimizing software performance" },
            answer: "b"
        },
        {
            question: "What is the main goal of the 'Design Phase' in SDLC?",
            options: { a: "To write the code", b: "To create the architecture and plan for the software", c: "To gather user feedback", d: "To deploy the software" },
            answer: "b"
        },
        {
            question: "Which model follows a strict sequential flow and is often referred to as the 'Waterfall Model'?",
            options: { a: "Agile", b: "Spiral", c: "V-Model", d: "Waterfall" },
            answer: "d"
        },
        {
            question: "What is a 'Use Case Diagram' used for?",
            options: { a: "To show the sequence of interactions", b: "To represent the functional requirements of a system", c: "To define the structure of a class", d: "To model data flow" },
            answer: "b"
        },
        {
            question: "Which type of testing focuses on verifying that software components work together as a group?",
            options: { a: "Unit Testing", b: "Integration Testing", c: "System Testing", d: "Acceptance Testing" },
            answer: "b"
        },
        {
            question: "What is 'Refactoring' in software development?",
            options: { a: "Adding new features to software", b: "Restructuring existing computer code without changing its external behavior", c: "Fixing bugs in the code", d: "Deploying software updates" },
            answer: "b"
        },
        {
            question: "What does 'Scrum' refer to in Agile methodologies?",
            options: { a: "A software development tool", b: "A framework for managing and executing projects", c: "A programming language", d: "A type of database" },
            answer: "b"
        },
        {
            question: "Which principle states that a software component should be open for extension, but closed for modification?",
            options: { a: "Single Responsibility Principle (SRP)", b: "Open/Closed Principle (OCP)", c: "Liskov Substitution Principle (LSP)", d: "Dependency Inversion Principle (DIP)" },
            answer: "b"
        },
        {
            question: "What is 'Requirements Elicitation'?",
            options: { a: "Testing the requirements", b: "The process of gathering information from stakeholders to define requirements", c: "Designing the system based on requirements", d: "Writing documentation for requirements" },
            answer: "b"
        },
        {
            question: "Which artifact provides a detailed description of the software's functionality from a user's perspective?",
            options: { a: "Design Document", b: "Test Plan", c: "User Story", d: "Code Review Report" },
            answer: "c"
        },
        {
            question: "What is 'Continuous Integration (CI)'?",
            options: { a: "A practice of merging all developer working copies to a shared mainline several times a day", b: "A process of continuous deployment", c: "A method for continuous testing", d: "A strategy for continuous feedback" },
            answer: "a"
        },
        {
            question: "What is 'Cohesion' in software design?",
            options: { a: "A measure of how strongly related the internal elements of a module are to each other", b: "A measure of the degree of interdependence between software modules", c: "The complexity of a module", d: "The reusability of a module" },
            answer: "a"
        },
        {
            question: "Which of the following is a key characteristic of 'Extreme Programming (XP)'?",
            options: { a: "Extensive upfront planning", b: "Pair programming", c: "Large development teams", d: "Detailed documentation" },
            answer: "b"
        },
        {
            question: "What is 'Technical Debt'?",
            options: { a: "Money owed for software licenses", b: "The cost of not refactoring or taking shortcuts in development", c: "A type of financial software", d: "Debt incurred from buying new hardware" },
            answer: "b"
        },
        {
            question: "Which security testing aims to identify vulnerabilities by simulating real-world attacks?",
            options: { a: "Unit Testing", b: "Penetration Testing", c: "Regression Testing", d: "Performance Testing" },
            answer: "b"
        },
        {
            question: "What is the purpose of a 'Design Pattern'?",
            options: { a: "To provide a complete solution to a specific problem", b: "To offer reusable solutions to common software design problems", c: "To create visual designs for software", d: "To automate code generation" },
            answer: "b"
        },
        {
            question: "Which of the following is a non-functional requirement?",
            options: { a: "User login", b: "Report generation", c: "System performance (e.g., response time)", d: "Data storage" },
            answer: "c"
        },
        {
            question: "What is 'Code Review'?",
            options: { a: "Automated analysis of code for errors", b: "A systematic examination of computer source code", c: "A method for compiling code", d: "A process for optimizing code" },
            answer: "b"
        },
        {
            question: "What does 'DRY' stand for in software engineering?",
            options: { a: "Don't Repeat Yourself", b: "Develop Rapidly Yearly", c: "Directly Respond Yieldingly", d: "Design Robustly Yet Simply" },
            answer: "a"
        },
        {
            question: "Which of the following is a metric for software complexity?",
            options: { a: "Lines of Code (LOC)", b: "Cyclomatic Complexity", c: "Number of Bugs", d: "Test Coverage" },
            answer: "b"
        },
        {
            question: "What is the primary role of a 'Product Owner' in Scrum?",
            options: { a: "To manage the development team", b: "To represent the interests of the stakeholders and manage the product backlog", c: "To facilitate Scrum events", d: "To write code" },
            answer: "b"
        }
    ],
    theory_of_computation: [
        {
            question: "What is a Turing Machine?",
            options: { a: "A physical computer", b: "A theoretical model of computation", c: "A type of programming language", d: "A data storage device" },
            answer: "b"
        },
        {
            question: "Which of these formalisms describes regular languages?",
            options: { a: "Context-Free Grammars", b: "Turing Machines", c: "Finite Automata", d: "Pushdown Automata" },
            answer: "c"
        },
        {
            question: "What is the Chomsky Hierarchy used for?",
            options: { a: "Classifying programming languages", b: "Classifying formal languages and grammars", c: "Ranking computer scientists", d: "Describing network protocols" },
            answer: "b"
        },
        {
            question: "A problem that cannot be solved by an algorithm is called:",
            options: { a: "Tractable", b: "Intractable", c: "Undecidable", d: "Polynomial" },
            answer: "c"
        },
        {
            question: "Which concept explains why some problems are harder than others to solve computationally?",
            options: { a: "Compilation", b: "Computability", c: "Complexity", d: "Concatenation" },
            answer: "c"
        },
        {
            question: "What does 'DFA' stand for in automata theory?",
            options: { a: "Deterministic Finite Automaton", b: "Dynamic Function Algorithm", c: "Data Flow Analysis", d: "Distributed File Architecture" },
            answer: "a"
        },
        {
            question: "Which of the following can recognize Context-Free Languages?",
            options: { a: "Finite Automata", b: "Pushdown Automata", c: "Turing Machines", d: "Linear Bounded Automata" },
            answer: "b"
        },
        {
            question: "What is the Church-Turing Thesis?",
            options: { a: "A statement that all computable functions can be computed by a Turing Machine", b: "A theory about the origin of computers", c: "A hypothesis about the future of AI", d: "A theorem about algorithm efficiency" },
            answer: "a"
        },
        {
            question: "Which type of grammar corresponds to Type 0 in the Chomsky Hierarchy?",
            options: { a: "Regular Grammars", b: "Context-Free Grammars", c: "Context-Sensitive Grammars", d: "Unrestricted Grammars" },
            answer: "d"
        },
        {
            question: "The Halting Problem is an example of an:",
            options: { a: "Decidable problem", b: "Undecidable problem", c: "NP-complete problem", d: "P-class problem" },
            answer: "b"
        },
        {
            question: "What is a 'Regular Expression' used for?",
            options: { a: "Defining programming language syntax", b: "Describing patterns in text", c: "Modeling complex data structures", d: "Generating random numbers" },
            answer: "b"
        },
        {
            question: "Which of these is equivalent to a Non-deterministic Finite Automaton (NFA)?",
            options: { a: "Pushdown Automaton", b: "Turing Machine", c: "Deterministic Finite Automaton (DFA)", d: "Linear Bounded Automaton" },
            answer: "c"
        },
        {
            question: "What is the primary difference between a DFA and an NFA?",
            options: { a: "DFA has memory, NFA does not", b: "DFA is faster, NFA is slower", c: "DFA has a unique next state for each input, NFA can have multiple or none", d: "DFA processes strings, NFA processes numbers" },
            answer: "c"
        },
        {
            question: "Which model of computation uses a stack for memory?",
            options: { a: "Finite Automata", b: "Turing Machines", c: "Pushdown Automata", d: "Register Machines" },
            answer: "c"
        },
        {
            question: "What is a 'production rule' in the context of grammars?",
            options: { a: "A rule for manufacturing software", b: "A rule that specifies how symbols can be replaced by other symbols", c: "A rule for code optimization", d: "A rule for data validation" },
            answer: "b"
        },
        {
            question: "Pumping Lemma for Regular Languages is used to prove that a language is:",
            options: { a: "Regular", b: "Context-Free", c: "Not Regular", d: "Decidable" },
            answer: "c"
        },
        {
            question: "What does 'NP-complete' mean in complexity theory?",
            options: { a: "A problem that can be solved in polynomial time", b: "A problem that is in NP and is also NP-hard", c: "A problem with no known algorithm", d: "A problem that is easy to solve" },
            answer: "b"
        },
        {
            question: "What is the concept of 'recognizability' (recursively enumerable languages)?",
            options: { a: "A language for which a Turing Machine halts on all inputs", b: "A language for which a Turing Machine halts on all accepted inputs, but may loop on rejected inputs", c: "A language that can be described by a regular expression", d: "A language that can be generated by a Context-Free Grammar" },
            answer: "b"
        },
        {
            question: "Which type of automaton is the most powerful in the Chomsky Hierarchy?",
            options: { a: "Finite Automata", b: "Pushdown Automata", c: "Linear Bounded Automata", d: "Turing Machines" },
            answer: "d"
        },
        {
            question: "The set of all strings that can be derived from the start symbol of a grammar is called its:",
            options: { a: "Alphabet", b: "Lexicon", c: "Language", d: "Grammar Set" },
            answer: "c"
        },
        {
            question: "What is 'computability'?",
            options: { a: "The speed at which a problem can be solved", b: "The ability to solve a problem using an algorithm", c: "The amount of memory required to solve a problem", d: "The process of compiling code" },
            answer: "b"
        },
        {
            question: "Which of these is true about the relationship between regular and context-free languages?",
            options: { a: "All regular languages are context-free", b: "All context-free languages are regular", c: "They are disjoint sets", d: "They are unrelated" },
            answer: "a"
        },
        {
            question: "A 'Deterministic Pushdown Automaton (DPDA)' can recognize:",
            options: { a: "All Context-Free Languages", b: "A subset of Context-Free Languages", c: "Only Regular Languages", d: "Only Recursive Languages" },
            answer: "b"
        },
        {
            question: "What is the 'universal Turing machine'?",
            options: { a: "A Turing machine that can simulate any other Turing machine", b: "A Turing machine that can solve all problems", c: "A Turing machine used for general computation", d: "A physically built Turing machine" },
            answer: "a"
        },
        {
            question: "Which category of problems can be solved by a Turing Machine in polynomial time?",
            options: { a: "NP-hard", b: "P (Polynomial time)", c: "Undecidable", d: "Exponential time" },
            answer: "b"
        }
    ],
    ai: [
        {
            question: "Which of the following is a subfield of AI focused on enabling computers to learn from data?",
            options: { a: "Robotics", b: "Natural Language Processing", c: "Machine Learning", d: "Computer Vision" },
            answer: "c"
        },
        {
            question: "What is 'Supervised Learning'?",
            options: { a: "Learning with unlabeled data", b: "Learning with labeled data", c: "Learning through trial and error", d: "Learning with human oversight only" },
            answer: "b"
        },
        {
            question: "Which algorithm is commonly used for classification tasks in Machine Learning?",
            options: { a: "K-Means", b: "Linear Regression", c: "Decision Trees", d: "PageRank" },
            answer: "c"
        },
        {
            question: "What is a 'Neural Network' inspired by?",
            options: { a: "Human brain structure", b: "Electrical circuits", c: "Database schemas", d: "Flowcharts" },
            answer: "a"
        },
        {
            question: "Which of the following is an example of an AI application?",
            options: { a: "Calculator", b: "Word Processor", c: "Image Recognition", d: "Spreadsheet" },
            answer: "c"
        },
        {
            question: "What is 'Unsupervised Learning'?",
            options: { a: "Learning with labeled data", b: "Learning with unlabeled data to find patterns", c: "Learning with continuous feedback", d: "Learning with expert supervision" },
            answer: "b"
        },
        {
            question: "Which AI technique involves training a model to perform actions in an environment to maximize a reward?",
            options: { a: "Supervised Learning", b: "Unsupervised Learning", c: "Reinforcement Learning", d: "Active Learning" },
            answer: "c"
        },
        {
            question: "What is 'Natural Language Processing (NLP)'?",
            options: { a: "Teaching computers to draw pictures", b: "Enabling computers to understand, interpret, and generate human language", c: "Designing natural user interfaces", d: "Processing natural images" },
            answer: "b"
        },
        {
            question: "Which of the following is a common use case for 'Computer Vision'?",
            options: { a: "Generating text summaries", b: "Facial recognition", c: "Predicting stock prices", d: "Translating languages" },
            answer: "b"
        },
        {
            question: "What is an 'Expert System' in AI?",
            options: { a: "A system that learns from data without human input", b: "A computer program that simulates the knowledge and reasoning ability of a human expert", c: "A system for robotic control", d: "A system for natural language generation" },
            answer: "b"
        },
        {
            question: "Which search algorithm explores all nodes at the present depth level before moving on to nodes at the next depth level?",
            options: { a: "Depth-First Search (DFS)", b: "Breadth-First Search (BFS)", c: "A* Search", d: "Greedy Best-First Search" },
            answer: "b"
        },
        {
            question: "What is 'Overfitting' in Machine Learning?",
            options: { a: "When a model performs poorly on training data but well on new data", b: "When a model learns the training data too well, including its noise, and performs poorly on new data", c: "When a model is too simple to capture the underlying patterns", d: "When a model takes too long to train" },
            answer: "b"
        },
        {
            question: "Which metric is used to evaluate classification models and calculates (True Positives + True Negatives) / Total?",
            options: { a: "Precision", b: "Recall", c: "F1-Score", d: "Accuracy" },
            answer: "d"
        },
        {
            question: "What is a 'Perceptron'?",
            options: { a: "A type of database", b: "The simplest artificial neuron", c: "A statistical method", d: "A type of robot" },
            answer: "b"
        },
        {
            question: "Which programming language is widely used for AI and Machine Learning due to its rich libraries?",
            options: { a: "Java", b: "C++", c: "Python", d: "JavaScript" },
            answer: "c"
        },
        {
            question: "What is 'Clustering' in Unsupervised Learning?",
            options: { a: "Grouping data points into clusters based on similarity", b: "Classifying data into predefined categories", c: "Predicting a continuous output value", d: "Finding associations between items" },
            answer: "a"
        },
        {
            question: "Which of the following is an example of a 'Generative AI' model?",
            options: { a: "Support Vector Machine (SVM)", b: "Linear Regression", c: "Generative Adversarial Network (GAN)", d: "K-Nearest Neighbors (KNN)" },
            answer: "c"
        },
        {
            question: "What is 'Bias-Variance Tradeoff' in Machine Learning?",
            options: { a: "A tradeoff between model complexity and training time", b: "A tradeoff between a model's tendency to consistently learn the wrong things (bias) and its sensitivity to small fluctuations in the training data (variance)", c: "A tradeoff between accuracy and interpretability", d: "A tradeoff between data size and model size" },
            answer: "b"
        },
        {
            question: "Which AI subfield deals with the interaction between computers and human language using logic and grammar rules?",
            options: { a: "Machine Learning", b: "Deep Learning", c: "Symbolic AI", d: "Connectionist AI" },
            answer: "c"
        },
        {
            question: "What is 'Feature Engineering'?",
            options: { a: "Selecting the best features for a model", b: "Creating new features from existing raw data to improve model performance", c: "Removing irrelevant features", d: "Normalizing features" },
            answer: "b"
        },
        {
            question: "Which technique is used to prevent overfitting by randomly setting a fraction of neurons to zero during training?",
            options: { a: "Batch Normalization", b: "Dropout", c: "Regularization", d: "Early Stopping" },
            answer: "b"
        },
        {
            question: "What is 'Transfer Learning'?",
            options: { a: "Training a model from scratch on a new dataset", b: "Using a pre-trained model as a starting point for a new task", c: "Transferring data between different models", d: "Learning from a different programming language" },
            answer: "b"
        },
        {
            question: "Which algorithm is used for dimensionality reduction?",
            options: { a: "K-Means", b: "Principal Component Analysis (PCA)", c: "Logistic Regression", d: "Naive Bayes" },
            answer: "b"
        },
        {
            question: "What is 'Reinforcement Learning' often applied to?",
            options: { a: "Image classification", b: "Predictive text", c: "Game playing and robotics", d: "Customer segmentation" },
            answer: "c"
        },
        {
            question: "What is a 'Turing Test'?",
            options: { a: "A test to measure a computer's processing speed", b: "A test of a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human", c: "A test for software bugs", d: "A test for hardware compatibility" },
            answer: "b"
        }
    ],
    advanced_dbms: [
        {
            question: "What is 'Normalization' in a database?",
            options: { a: "Increasing data redundancy", b: "Organizing data to reduce redundancy and improve data integrity", c: "Speeding up query execution", d: "Encrypting database content" },
            answer: "b"
        },
        {
            question: "Which normal form (NF) eliminates transitive dependencies?",
            options: { a: "1NF", b: "2NF", c: "3NF", d: "BCNF" },
            answer: "c"
        },
        {
            question: "What is a 'Distributed Database System'?",
            options: { a: "A database stored on a single, powerful server", b: "A database that is spread across multiple physical locations", c: "A database accessible only via the internet", d: "A database for distributing software updates" },
            answer: "b"
        },
        {
            question: "What does 'ACID' stand for in the context of database transactions?",
            options: { a: "Atomicity, Consistency, Isolation, Durability", b: "Access, Control, Integrity, Design", c: "Application, Code, Interface, Data", d: "Analytical, Computational, Integrated, Distributed" },
            answer: "a"
        },
        {
            question: "Which of the following is a type of NoSQL database?",
            options: { a: "MySQL", b: "PostgreSQL", c: "MongoDB", d: "Oracle" },
            answer: "c"
        },
        {
            question: "What is a 'Primary Key'?",
            options: { a: "A key that can identify a row uniquely in a table", b: "A key that links two tables", c: "A key that encrypts data", d: "A key used for sorting data" },
            answer: "a"
        },
        {
            question: "What is 'Denormalization'?",
            options: { a: "A process of breaking down tables into smaller tables", b: "A process of adding redundant data to speed up queries", c: "A method for data security", d: "A technique for creating database backups" },
            answer: "b"
        },
        {
            question: "Which command is used to retrieve data from a database?",
            options: { a: "INSERT", b: "UPDATE", c: "DELETE", d: "SELECT" },
            answer: "d"
        },
        {
            question: "What is a 'Stored Procedure'?",
            options: { a: "A table in a database", b: "A prepared SQL code that you can save and reuse", c: "A type of database index", d: "A trigger that executes automatically" },
            answer: "b"
        },
        {
            question: "What does 'CAP Theorem' state in distributed systems?",
            options: { a: "Consistency, Availability, Partition tolerance", b: "Confidentiality, Authenticity, Privacy", c: "Cost, Accuracy, Performance", d: "Concurrency, Atomicity, Performance" },
            answer: "a"
        },
        {
            question: "Which of these is NOT a characteristic of a Relational Database Management System (RDBMS)?",
            options: { a: "Uses tables with rows and columns", b: "Supports SQL", c: "Stores data in a schema-less JSON format", d: "Supports ACID properties" },
            answer: "c"
        },
        {
            question: "What is 'Indexing' in a database?",
            options: { a: "A method to encrypt data", b: "A way to speed up data retrieval operations on a database table", c: "A technique for backing up databases", d: "A process for data replication" },
            answer: "b"
        },
        {
            question: "Which type of join returns only the rows that have matching values in both tables?",
            options: { a: "LEFT JOIN", b: "RIGHT JOIN", c: "INNER JOIN", d: "FULL OUTER JOIN" },
            answer: "c"
        },
        {
            question: "What is a 'Deadlock' in database systems?",
            options: { a: "A situation where a transaction cannot be committed", b: "A situation where two or more transactions are waiting for each other to release resources", c: "A process of recovering data after a crash", d: "A security vulnerability" },
            answer: "b"
        },
        {
            question: "Which of the following is a key-value store NoSQL database?",
            options: { a: "Cassandra", b: "Redis", c: "Neo4j", d: "Couchbase" },
            answer: "b"
        },
        {
            question: "What is a 'Trigger' in a database?",
            options: { a: "A command to start the database server", b: "A special type of stored procedure that automatically executes when an event occurs", c: "A method for manual data entry", d: "A tool for performance monitoring" },
            answer: "b"
        },
        {
            question: "What does 'SQL' stand for?",
            options: { a: "Standard Query Language", b: "Structured Question Language", c: "Sequential Query Logic", d: "Structured Query Language" },
            answer: "d"
        },
        {
            question: "Which Normal Form (NF) requires all non-key attributes to be fully functionally dependent on the primary key?",
            options: { a: "1NF", b: "2NF", c: "3NF", d: "BCNF" },
            answer: "b"
        },
        {
            question: "What is a 'View' in a database?",
            options: { a: "A physical table", b: "A virtual table based on the result-set of a SQL query", c: "A type of index", d: "A stored procedure" },
            answer: "b"
        },
        {
            question: "Which type of database stores data in graph structures?",
            options: { a: "Relational", b: "Document", c: "Column-Family", d: "Graph" },
            answer: "d"
        },
        {
            question: "What is 'Concurrency Control' in DBMS?",
            options: { a: "Managing user permissions", b: "Ensuring correctness of transactions when multiple transactions execute simultaneously", c: "Controlling network traffic", d: "Managing database backups" },
            answer: "b"
        },
        {
            question: "Which of the following is used to remove a table from the database?",
            options: { a: "DELETE TABLE", b: "REMOVE TABLE", c: "DROP TABLE", d: "ERASE TABLE" },
            answer: "c"
        },
        {
            question: "What is a 'Foreign Key'?",
            options: { a: "A key that uniquely identifies a row in a table", b: "A column or a set of columns in one table that refers to the primary key in another table", c: "A key used for encryption", d: "A key that is not indexed" },
            answer: "b"
        },
        {
            question: "Which NoSQL database type is best suited for storing large amounts of unstructured or semi-structured data like JSON documents?",
            options: { a: "Key-Value Store", b: "Column-Family Store", c: "Document Database", d: "Graph Database" },
            answer: "c"
        },
        {
            question: "What is 'Replication' in a database context?",
            options: { a: "Creating multiple copies of data across different servers for availability and fault tolerance", b: "Duplicating entire databases manually", c: "Performing backups at regular intervals", d: "Restoring data from backups" },
            answer: "a"
        }
    ],
    advanced_cn: [
        {
            question: "Which layer of the OSI model is responsible for routing data packets?",
            options: { a: "Data Link Layer", b: "Network Layer", c: "Transport Layer", d: "Application Layer" },
            answer: "b"
        },
        {
            question: "What is the primary function of a 'Firewall'?",
            options: { a: "Boosting Wi-Fi signals", b: "Protecting a network from unauthorized access", c: "Storing network configurations", d: "Compressing data for faster transmission" },
            answer: "b"
        },
        {
            question: "Which protocol is used for secure communication over a computer network, particularly for web Browse?",
            options: { a: "HTTP", b: "FTP", c: "HTTPS", d: "SMTP" },
            answer: "c"
        },
        {
            question: "What is 'latency' in computer networks?",
            options: { a: "The amount of data that can be transmitted per unit time", b: "The delay before a transfer of data begins following an instruction", c: "The rate at which data is successfully delivered", d: "The capacity of a communication channel" },
            answer: "b"
        },
        {
            question: "Which of the following is a peer-to-peer (P2P) network model?",
            options: { a: "Client-Server", b: "Centralized", c: "Decentralized", d: "All of the above" },
            answer: "c"
        },
        {
            question: "What does 'TCP' stand for?",
            options: { a: "Transfer Control Protocol", b: "Transmission Control Protocol", c: "Technical Control Protocol", d: "Total Communication Protocol" },
            answer: "b"
        },
        {
            question: "Which networking device is used to connect multiple network segments and forward data packets between them based on IP addresses?",
            options: { a: "Hub", b: "Switch", c: "Router", d: "Bridge" },
            answer: "c"
        },
        {
            question: "What is 'DHCP' used for in a network?",
            options: { a: "To manage domain names", b: "To dynamically assign IP addresses to devices", c: "To encrypt network traffic", d: "To filter network packets" },
            answer: "b"
        },
        {
            question: "Which layer of the OSI model is responsible for end-to-end communication and error recovery?",
            options: { a: "Network Layer", b: "Transport Layer", c: "Session Layer", d: "Presentation Layer" },
            answer: "b"
        },
        {
            question: "What is 'DNS'?",
            options: { a: "Data Network System", b: "Domain Name System", c: "Dynamic Naming Service", d: "Digital Network Security" },
            answer: "b"
        },
        {
            question: "Which type of network covers a large geographical area, often spanning cities or countries?",
            options: { a: "LAN", b: "MAN", c: "WAN", d: "PAN" },
            answer: "c"
        },
        {
            question: "What is a 'MAC Address'?",
            options: { a: "A logical address used for routing", b: "A physical address unique to each network interface controller (NIC)", c: "An IP address", d: "A port number" },
            answer: "b"
        },
        {
            question: "Which protocol is connection-oriented and ensures reliable data transfer?",
            options: { a: "UDP", b: "IP", c: "TCP", d: "ICMP" },
            answer: "c"
        },
        {
            question: "What is 'Subnetting'?",
            options: { a: "Dividing a single large network into smaller, more manageable sub-networks", b: "Connecting multiple networks together", c: "Encrypting network traffic", d: "Assigning IP addresses manually" },
            answer: "a"
        },
        {
            question: "Which attack floods a system with traffic to prevent legitimate users from accessing services?",
            options: { a: "Man-in-the-Middle", b: "Phishing", c: "Denial of Service (DoS)", d: "SQL Injection" },
            answer: "c"
        },
        {
            question: "What is the purpose of 'NAT' (Network Address Translation)?",
            options: { a: "To assign public IP addresses to internal network devices directly", b: "To translate private IP addresses to public IP addresses", c: "To block all incoming traffic", d: "To route traffic within a local network" },
            answer: "b"
        },
        {
            question: "Which of the following is a common protocol for sending email?",
            options: { a: "HTTP", b: "FTP", c: "SMTP", d: "POP3" },
            answer: "c"
        },
        {
            question: "What is a 'Proxy Server'?",
            options: { a: "A server that handles database queries", b: "A server that acts as an intermediary for requests from clients seeking resources from other servers", c: "A server that hosts websites", d: "A server for file storage" },
            answer: "b"
        },
        {
            question: "What is 'Bandwidth' in networking?",
            options: { a: "The time it takes for a data packet to travel from source to destination", b: "The maximum data transfer rate of a network path", c: "The amount of data lost during transmission", d: "The number of devices connected to a network" },
            answer: "b"
        },
        {
            question: "Which type of cable uses light signals to transmit data?",
            options: { a: "Coaxial cable", b: "Twisted pair cable", c: "Fiber optic cable", d: "Ethernet cable" },
            answer: "c"
        },
        {
            question: "What is 'VPN' (Virtual Private Network)?",
            options: { a: "A public network", b: "A secure tunnel over an insecure network (like the internet)", c: "A local area network", d: "A personal area network" },
            answer: "b"
        },
        {
            question: "Which protocol is used by web browsers to request and display web pages?",
            options: { a: "FTP", b: "SMTP", c: "HTTP", d: "SSH" },
            answer: "c"
        },
        {
            question: "What is an 'IP address'?",
            options: { a: "A physical address of a device", b: "A logical numerical label assigned to each device participating in a computer network", c: "A domain name", d: "A network port" },
            answer: "b"
        },
        {
            question: "Which type of network topology connects all devices to a single central cable?",
            options: { a: "Star", b: "Bus", c: "Ring", d: "Mesh" },
            answer: "b"
        },
        {
            question: "What is 'QoS' (Quality of Service)?",
            options: { a: "A measure of network security", b: "The ability to provide different priority to different applications, users, or data flows", c: "A standard for network cabling", d: "A protocol for data compression" },
            answer: "b"
        }
    ],
    analysis_design_algorithms: [
        {
            question: "Which of the following is a common technique for algorithm analysis?",
            options: { a: "Object-oriented programming", b: "Big O notation", c: "Database normalization", d: "User interface design" },
            answer: "b"
        },
        {
            question: "What does 'Divide and Conquer' refer to in algorithm design?",
            options: { a: "Breaking a problem into smaller subproblems, solving them, and combining the results", b: "Solving a problem by trying all possible solutions", c: "A greedy approach to problem-solving", d: "Solving the largest possible subproblem first" },
            answer: "a"
        },
        {
            question: "Which data structure uses LIFO (Last In, First Out) principle?",
            options: { a: "Queue", b: "Linked List", c: "Stack", d: "Tree" },
            answer: "c"
        },
        {
            question: "What is the time complexity of searching an element in a sorted array using Binary Search?",
            options: { a: "O(n)", b: "O(log n)", c: "O(n^2)", d: "O(1)" },
            answer: "b"
        },
        {
            question: "Which sorting algorithm has the best average-case time complexity?",
            options: { a: "Bubble Sort", b: "Insertion Sort", c: "Merge Sort", d: "Selection Sort" },
            answer: "c"
        },
        {
            question: "What is 'Dynamic Programming'?",
            options: { a: "A technique for solving problems by breaking them down into simpler overlapping subproblems and storing the results", b: "A method for randomizing algorithms", c: "A type of parallel computing", d: "A design for real-time systems" },
            answer: "a"
        },
        {
            question: "Which data structure is suitable for implementing BFS (Breadth-First Search)?",
            options: { a: "Stack", b: "Queue", c: "Hash Table", d: "Tree" },
            answer: "b"
        },
        {
            question: "What is the worst-case time complexity of Quick Sort?",
            options: { a: "O(n log n)", b: "O(n^2)", c: "O(n)", d: "O(log n)" },
            answer: "b"
        },
        {
            question: "What does 'Greedy Algorithm' mean?",
            options: { a: "Always makes the locally optimal choice at each stage with the hope of finding a global optimum", b: "Explores all possible solutions", c: "Breaks problems into subproblems", d: "Uses recursion to solve problems" },
            answer: "a"
        },
        {
            question: "Which algorithm finds the shortest path from a single source vertex to all other vertices in a graph with non-negative edge weights?",
            options: { a: "Floyd-Warshall", b: "Bellman-Ford", c: "Dijkstra's Algorithm", d: "Prim's Algorithm" },
            answer: "c"
        },
        {
            question: "What is the time complexity of inserting an element at the beginning of a singly linked list?",
            options: { a: "O(n)", b: "O(log n)", c: "O(1)", d: "O(n log n)" },
            answer: "c"
        },
        {
            question: "Which of these sorting algorithms is comparison-based and has a worst-case time complexity of O(n log n)?",
            options: { a: "Bubble Sort", b: "Selection Sort", c: "Heap Sort", d: "Insertion Sort" },
            answer: "c"
        },
        {
            question: "What is a 'Hash Table' primarily used for?",
            options: { a: "Storing elements in sorted order", b: "Efficiently storing and retrieving data based on a key", c: "Representing hierarchical data", d: "Implementing queues" },
            answer: "b"
        },
        {
            question: "Which algorithm is used to find a minimum spanning tree in a graph?",
            options: { a: "BFS", b: "DFS", c: "Kruskal's Algorithm", d: "Binary Search" },
            answer: "c"
        },
        {
            question: "What is 'Space Complexity' in algorithm analysis?",
            options: { a: "The time an algorithm takes to run", b: "The amount of memory space required by an algorithm to run to completion", c: "The complexity of the problem itself", d: "The number of lines of code" },
            answer: "b"
        },
        {
            question: "Which data structure organizes data in a hierarchical manner and allows efficient searching, insertion, and deletion?",
            options: { a: "Array", b: "Linked List", c: "Tree", d: "Graph" },
            answer: "c"
        },
        {
            question: "What is the principle behind 'Backtracking' algorithms?",
            options: { a: "Exploring all possible paths simultaneously", b: "Building a solution step-by-step, and if a path proves invalid, backtrack and try another", c: "Solving problems by dividing them into independent subproblems", d: "Always making the best local choice" },
            answer: "b"
        },
        {
            question: "Which search algorithm is best suited for an unsorted list?",
            options: { a: "Binary Search", b: "Linear Search", c: "Jump Search", d: "Interpolation Search" },
            answer: "b"
        },
        {
            question: "What is a 'Graph' data structure?",
            options: { a: "A linear data structure", b: "A collection of nodes (vertices) and edges that connect them", c: "A hierarchical data structure", d: "A table with rows and columns" },
            answer: "b"
        },
        {
            question: "Which of the following is a 'Stable' sorting algorithm?",
            options: { a: "Quick Sort", b: "Heap Sort", c: "Merge Sort", d: "Selection Sort" },
            answer: "c"
        },
        {
            question: "What is the time complexity of accessing an element in an array by its index?",
            options: { a: "O(n)", b: "O(log n)", c: "O(1)", d: "O(n^2)" },
            answer: "c"
        },
        {
            question: "Which algorithm is typically used to solve the 'Knapsack Problem'?",
            options: { a: "Greedy Algorithm", b: "Divide and Conquer", c: "Dynamic Programming", d: "Backtracking" },
            answer: "c"
        },
        {
            question: "What is the purpose of 'Amortized Analysis'?",
            options: { a: "To analyze the worst-case performance of an algorithm over a sequence of operations", b: "To find the average-case performance of an algorithm", c: "To analyze the best-case performance of an algorithm", d: "To analyze the performance of randomized algorithms" },
            answer: "a"
        },
        {
            question: "Which data structure is efficient for searching and maintaining ordered data, but can be complex to balance?",
            options: { a: "Array", b: "Hash Table", c: "Binary Search Tree", d: "Linked List" },
            answer: "c"
        },
        {
            question: "What is 'Memoization' in Dynamic Programming?",
            options: { a: "Storing only the final result", b: "Storing the results of expensive function calls and returning the cached result when the same inputs occur again", c: "A method for encrypting data", d: "A technique for creating new data structures" },
            answer: "b"
        }
    ]
};

// --- DOM Elements ---
const subjectSelectionSection = document.getElementById('subject-selection');
const quizSection = document.getElementById('quiz');
const quizResultsSection = document.getElementById('quiz-results');

const subjectButtons = document.querySelectorAll('.subject-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizInfoParagraph = document.querySelector('.quiz-info p');
const quizQuestionTitle = document.getElementById('quiz-question-title');
const quizQuestionSubtitle = document.getElementById('quiz-question-subtitle');

const questionElement = document.getElementById('question');
const optionsGrid = document.querySelector('.options-grid');
const optionLabels = document.querySelectorAll('.option label .option-text');
const optionRadios = document.querySelectorAll('.option input[type="radio"]');
const optionLetters = document.querySelectorAll('.option label .option-letter');

const currentQuestionNumberSpan = document.getElementById('currentQuestionNumber');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const scoreDisplay = document.querySelector('#scoreDisplay span');
const timerDisplay = document.querySelector('#timer span');

const nextQuestionBtn = document.getElementById('next-question-btn');
const quitQuizBtn = document.getElementById('quit-quiz-btn');

const finalScoreSpan = document.getElementById('finalScore');
const totalQuestionsResultSpan = document.getElementById('totalQuestionsResult');
const resultMessage = document.getElementById('result-message');
const correctAnswersSpan = document.getElementById('correctAnswers');
const wrongAnswersSpan = document.getElementById('wrongAnswers');
const timeTakenSpan = document.getElementById('timeTaken');
const resultProgressBar = document.getElementById('resultProgressBar');
const resultProgressPercent = document.getElementById('resultProgressPercent');
const playAgainBtn = document.getElementById('play-again-btn');
const reviewAnswersBtn = document.getElementById('review-answers-btn');

// --- Quiz State Variables ---
let selectedSubject = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 0; // Initialize for subject selection screen
let quizStartTime;
let totalTimeTaken = 0;

// --- Event Listeners ---

// Subject selection - MODIFIED
subjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'selected' class from all buttons
        subjectButtons.forEach(btn => btn.classList.remove('selected'));
        // Add 'selected' class to the clicked button
        button.classList.add('selected');
        selectedSubject = button.dataset.subject;
        
        // Directly start the quiz when a subject is clicked
        startQuiz(); 
    });
});

// The startQuizBtn is now functionally redundant for starting the quiz directly,
// but it remains in the HTML for visual consistency and could be repurposed
// or removed if preferred. For now, we'll keep its display functionality.
// We can modify its 'click' listener to do nothing or simply call startQuiz
// if a subject is already selected, or remove it entirely if it's purely visual.
// For this update, its click listener is removed as clicking the subject button itself starts the quiz.
// startQuizBtn.addEventListener('click', () => {
//     if (selectedSubject) {
//         startQuiz();
//     }
// });


// Next Question button
nextQuestionBtn.addEventListener('click', () => {
    // Only allow next if an option is selected
    if (document.querySelector('input[name="option"]:checked')) {
        checkAnswer();
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }
});

// Quit Quiz button
quitQuizBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to quit the current quiz? Your progress will be lost.')) {
        clearInterval(timer);
        resetQuiz();
        showSection(subjectSelectionSection);
    }
});

// Play Again button
playAgainBtn.addEventListener('click', () => {
    resetQuiz();
    showSection(subjectSelectionSection);
});

// --- Functions ---

function showSection(sectionToShow) {
    subjectSelectionSection.style.display = 'none';
    quizSection.style.display = 'none';
    quizResultsSection.style.display = 'none';

    sectionToShow.style.display = 'flex'; // Use flex to maintain vertical centering/layout
}

function startQuiz() {
    currentQuestions = quizData[selectedSubject];
    if (!currentQuestions || currentQuestions.length === 0) {
        alert('Quiz data for this subject is not available or is empty. Please choose another subject.');
        resetQuiz();
        showSection(subjectSelectionSection);
        return;
    }

    // Shuffle questions for variety
    currentQuestions = shuffleArray(currentQuestions);

    currentQuestionIndex = 0;
    score = 0;
    totalTimeTaken = 0;
    quizStartTime = new Date().getTime(); // Record start time

    totalQuestionsSpan.textContent = currentQuestions.length;
    // Format subject name for quiz screen title
    const displaySubjectName = selectedSubject.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    quizQuestionSubtitle.textContent = `Subject: ${displaySubjectName}`;
    scoreDisplay.textContent = score;

    showSection(quizSection);
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const questionData = currentQuestions[currentQuestionIndex];

    // Reset UI for new question
    questionElement.style.animation = 'none'; // Reset animation
    void questionElement.offsetWidth; // Trigger reflow
    questionElement.style.animation = null; // Re-enable animation

    questionElement.textContent = questionData.question;
    currentQuestionNumberSpan.textContent = currentQuestionIndex + 1;

    // Update options
    Object.keys(questionData.options).forEach((key, index) => {
        const optionText = questionData.options[key];
        const radio = optionRadios[index];
        const labelText = optionLabels[index];
        const letterSpan = optionLetters[index];

        radio.value = key;
        radio.checked = false; // Uncheck previous selection
        radio.classList.remove('correct', 'wrong'); // Remove feedback classes

        labelText.textContent = optionText;
        letterSpan.textContent = key.toUpperCase(); // Display A, B, C, D

        // Reset label background and border
        const label = radio.nextElementSibling;
        label.classList.remove('correct', 'wrong'); // Ensure label classes are reset too
        label.style.backgroundColor = '';
        label.style.borderColor = '';
        label.style.color = '';
        letterSpan.style.backgroundColor = '';
        label.style.boxShadow = '';
        label.style.transform = '';
    });

    nextQuestionBtn.disabled = true; // Disable next button until an option is selected

    // Enable option selection
    optionsGrid.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = false;
        radio.removeEventListener('change', enableNextButtonOnce); // Remove old listener
        radio.addEventListener('change', enableNextButtonOnce, { once: true }); // Add new listener
    });

    updateProgressBar();
}

function enableNextButtonOnce() {
    nextQuestionBtn.disabled = false;
}

function checkAnswer() {
    const selectedOptionRadio = document.querySelector('input[name="option"]:checked');
    if (!selectedOptionRadio) {
        return; // Should not happen if next button is disabled until selection
    }

    const userAnswer = selectedOptionRadio.value;
    const correctAnswer = currentQuestions[currentQuestionIndex].answer;

    // Disable all options after user selects one
    optionsGrid.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true;
    });

    if (userAnswer === correctAnswer) {
        score++;
        selectedOptionRadio.classList.add('correct');
        scoreDisplay.textContent = score;
    } else {
        selectedOptionRadio.classList.add('wrong');
        // Visually highlight the correct answer
        const correctRadio = document.querySelector(`input[value="${correctAnswer}"]`);
        if (correctRadio) { // Ensure correct radio exists
            const correctLabel = correctRadio.nextElementSibling;
            correctLabel.classList.add('correct'); // Add 'correct' class to label for consistent styling
        }
    }
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestionIndex + 1}/${currentQuestions.length}`;
}

function startTimer() {
    clearInterval(timer); // Clear any existing timer
    // Calculate total time: 30 seconds per question, but max 5 minutes for a short quiz
    const maxTime = 5 * 60; // 5 minutes in seconds
    const timePerQuestion = 30; // seconds
    timeLeft = Math.min(currentQuestions.length * timePerQuestion, maxTime);

    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz(true); // Quiz ends due to time out
        }
        timeLeft--;
    }, 1000);
}

function endQuiz(timedOut = false) {
    clearInterval(timer); // Stop the timer

    const quizEndTime = new Date().getTime();
    totalTimeTaken = Math.floor((quizEndTime - quizStartTime) / 1000); // Time in seconds

    // Calculate score, correct, wrong
    const correctCount = score;
    const wrongCount = currentQuestions.length - score;
    const percentage = (currentQuestions.length > 0) ? (score / currentQuestions.length) * 100 : 0;

    // Update results display
    finalScoreSpan.textContent = correctCount;
    totalQuestionsResultSpan.textContent = currentQuestions.length;
    correctAnswersSpan.textContent = correctCount;
    wrongAnswersSpan.textContent = wrongCount;

    const minutesTaken = Math.floor(totalTimeTaken / 60);
    const secondsTaken = totalTimeTaken % 60;
    timeTakenSpan.textContent = `${minutesTaken}m ${secondsTaken}s`;

    resultProgressBar.style.width = `${percentage}%`;
    resultProgressPercent.textContent = `${percentage.toFixed(0)}%`;
    if (percentage >= 70) {
        resultMessage.textContent = "Excellent job! You aced it!";
        resultMessage.style.color = 'var(--accent-green)'; // Use CSS variable
        resultProgressBar.style.backgroundColor = 'var(--accent-green)'; // Use CSS variable
    } else if (percentage >= 50) {
        resultMessage.textContent = "Good effort! Keep learning and try again.";
        resultMessage.style.color = 'var(--accent-yellow)'; // Use CSS variable
        resultProgressBar.style.backgroundColor = 'var(--accent-yellow)'; // Use CSS variable
    } else {
        resultMessage.textContent = "You'll get there! Review and try again.";
        resultMessage.style.color = 'var(--accent-red)'; // Use CSS variable
        resultProgressBar.style.backgroundColor = 'var(--accent-red)'; // Use CSS variable
    }

    // Hide the start quiz button after the quiz starts, only useful in the subject selection screen.
    startQuizBtn.style.display = 'none'; 
    quizInfoParagraph.style.display = 'none';

    showSection(quizResultsSection);
}

function resetQuiz() {
    selectedSubject = null;
    currentQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    clearInterval(timer);
    timeLeft = 0;
    timerDisplay.textContent = '00:00'; // Reset timer display
    scoreDisplay.textContent = '0'; // Reset score display
    // Restore initial visibility and state for the subject selection screen
    startQuizBtn.style.display = 'flex'; // Show and enable start button
    startQuizBtn.disabled = true; 
    quizInfoParagraph.style.display = 'flex'; // Show quiz info
    quizInfoParagraph.innerHTML = '<i class="fas fa-hand-pointer"></i> Select a subject to start the quiz!';
    subjectButtons.forEach(btn => btn.classList.remove('selected'));
}

// Utility function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Initialize the first view
document.addEventListener('DOMContentLoaded', () => {
    resetQuiz(); // Ensure initial state is clean
    showSection(subjectSelectionSection);
});