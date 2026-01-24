export const reactQuesionData = [
  {
    id: 1,
    topic: "reactJs",
    question: "What is React & it's some key fetures ?",
    answer:
      "React is a popular open-source JavaScript library used for building user interfaces, particularly for <mark>single-page applications</mark> where data changes over time.  React allows developers to create large web applications that can update and render efficiently in response to data changes.\n\n <b>⭐Key Features of React :-</b>\nComponent-Based Architecture:\n\nReact encourages building UI components that manage their own state and can be composed to create complex user interfaces. This modular approach makes the code more reusable and easier to manage.\n JavaScript XML:\n\n is a syntax extension that allows developers to write <mark>HTML-like code directly within JavaScript</mark>. This makes it easier to visualize the structure of the UI components and understand their behavior.\nVirtual DOM:\n\nReact uses a virtual DOM to improve performance. The virtual DOM is a lightweight copy of the actual DOM that React uses to determine the most efficient way to update the browser’s DOM. This minimizes direct manipulation of the DOM and enhances performance.\nOne-Way Data Binding:\n\nReact follows a <b>unidirectional data flow</b>, meaning data flows in one direction — from parent to child components. This makes it easier to understand and debug the application as it grows in complexity.\nState and Lifecycle Management:\n\nReact components can manage their own state. Lifecycle methods (like componentDidMount and componentWillUnmount) allow developers to run code at specific times in a component's lifecycle, making it easier to control behavior and manage resources.\nCommon Uses of React\nWeb Development:\n\nBuilding interactive user interfaces for web applications.\nDeveloping single-page applications (SPAs) that provide a more fluid user experience.\nMobile App Development:\n\nReact Native, a framework based on React, is used for building native mobile applications for iOS and Android.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [
      "Single-Page-Application ",
      " Response to data change ",
      " state management ",
      " unidirectional data flow ",
      " component based approach ",
      " ",
    ],
    codeExample: "",
  },
  {
    id: 2,
    topic: "reactJs",
    question: "Why React JS is introduced ? what problems it resolves ? ",
    answer:
      'React was introduced by Facebook in 2013 to address several challenges in building and maintaining modern web applications. It is a declarative, efficient, and flexible JavaScript library for building user interfaces (UI). Here’s an explanation of the problems React solves and why it was introduced:\n\n\n\n  <b>Key Problems Solved by React :</b>  \n\n 1. Complex UI Updates and State Management:  \n- Problem  : Traditional methods required developers to manually manipulate the DOM using libraries like jQuery. This approach becomes error-prone and hard to maintain as applications grow in complexity.\n- Solution  : React introduces a component-based architecture and a declarative UI model. \n  - Developers describe "what" the UI should look like for a given state.\n  - React takes care of efficiently updating the DOM when the state changes.\n\n\n\n 2. Inefficient DOM Manipulations:  \n- Problem  : Direct DOM manipulations are computationally expensive and can lead to performance issues, especially for dynamic applications with frequent updates.\n- Solution  : React uses a virtual DOM  , which is a lightweight representation of the real DOM.\n  - Changes are first applied to the virtual DOM.\n  - React calculates the minimal set of updates required and applies them to the real DOM.\n\n\n\n 3. Lack of Reusable Components:  \n- Problem  : Traditional approaches often led to duplicated code and a lack of modularity, making it hard to maintain and scale.\n- Solution  : React introduced component-based development  , allowing developers to:\n  - Break UIs into smaller, reusable components.\n  - Compose these components to build complex interfaces.\n\n\n\n 4. Scalability Challenges:  \n- Problem  : As applications grew, managing state, logic, and UI interactions across the app became cumbersome and prone to bugs.\n- Solution  : React provides:\n  - State management within components for local UI logic.\n  - Integration with state management libraries (e.g., Redux, Context API) for global application state.\n\n\n\n 5. Declarative Programming for Simplicity:  \n- Problem  : Imperative programming (how the UI should change) made code harder to understand and debug.\n- Solution  : React uses a declarative model where developers specify "what" the UI should look like, and React handles the "how."\n\n\n\n 6. Cross-Platform Development:  \n- Problem  : Building separate codebases for web and mobile applications increased development time and maintenance overhead.\n- Solution  : React powers frameworks like React Native  , allowing developers to build native mobile apps using the same React principles and codebase.\n\n\n\n 7. Better Developer Experience:  \n- Problem  : Traditional development lacked modern tooling, hot reloading, and debugging tools.\n- Solution  : React introduced:\n  -JSX: A syntax extension for writing UI components in a familiar, HTML-like syntax.\n  - React Developer Tools  : Debugging tools to inspect and optimize React components.\n  - Hot Module Replacement (HMR)  : Instant updates without a full page reload during development.\n\n\n\n  Why React Became Popular:  \n1. Ease of Use  : Simplifies UI development with its declarative and component-driven approach.\n2. Performance  : Optimized updates using the virtual DOM.\n3. Flexibility  : Can be used with any backend and other libraries or frameworks.\n4. Ecosystem  : Rich ecosystem of libraries, tools, and community support.\n5. Learn Once, Write Anywhere  : React principles apply to both web (React) and mobile (React Native) applications.\n\n\n\n  Conclusion  \nReact was introduced to solve problems of complexity, inefficiency, and scalability in building UIs for modern, dynamic web applications. It made UI development simpler, more modular, and performant, revolutionizing how developers build applications.',
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [
      "Complex UI Updates and State Management ",
      "\nInefficient DOM Manipulations ",
      " Lack of Reusable Components ",
      "Scalability Challenges ",
    ],
    codeExample: "",
  },
  {
    id: 3,
    topic: "reactJs",
    question: "There were different framework like angular , then why react ?",
    answer:
      "React's rise to popularity, despite the availability of frameworks like Angular, is because of its distinctive design philosophy, technical advantages, and developer experience. Here's a contrast and an account of how and why React became the go-to choice among developers:\n\nKey Reasons Why React Emerged as the Top Choice\n1. Component-Based Architecture (Pioneering Simplicity):\nReact's Approach\nIntroduced a very modular component-based architecture, allowing developers to combine reusable UI pieces.\nEach component holds its logic, styling, and behavior.\nUnlike Angular (before Angular 2+), which used a template-based method, React adopted, unifying UI and logic in a single file for easier maintenance.\n2. Declarative Programming:\nReact's Approach\nReact simplified UI development by introducing declarative programming: developers define what the UI should look like in terms of the current state, and React updates it.\nAngular, especially pre-Angular 2, used more imperative programming, where developers needed to define step-by-step instructions to update the DOM.\n3. Virtual DOM for Performance:\nReact's Edge\nReact introduced the virtual DOM to enhance performance by minimizing expensive DOM manipulations.\nAngularJS (pre-2) used two-way data binding, which had the risk of creating performance bottlenecks in large apps because of \"digest cycles.\"\n4. Learning Curve and Developer Experience:\nReact's Simplicity\nReact's API was light and focused on the \"View\" layer, with developers being able to choose other libraries for routing, state management, etc.\nAngularJS had a steeper learning curve because of its rich, opinionated setup (e.g., directives, modules, services).\nReact introduced, an easy-to-grasp syntax that felt natural to web developers familiar with HTML and JavaScript.\n5. Ecosystem Flexibility:\nReact's Modular Nature\nReact allows developers to combine and recombine tools and libraries. For instance, developers can use React with Redux for state management, React Router for navigation, etc.\nAngular, being a full-featured framework, is more structured and has intrinsic solutions for routing, forms, and HTTP handling. While powerful, it sometimes created unnecessary overhead for small apps.\n6. Backward Compatibility:\nReact's Stability\nReact prioritized backward compatibility, so updates did not break existing code.\nAngularJS's transition to Angular (2+) was a ground-up rewrite, and developers had to rewrite their codebases.\n7. Ecosystem and Community:\nReact's community expanded quickly with Facebook's support and open-source contributions. Its ecosystem grew up with many tools, libraries, and developer resources.\nAngular, while supported by Google, lost some steam during the AngularJS-to-Angular transition.\n8. React's \"Learn Once, Write Anywhere\":\nReact's core philosophy spread beyond the web. React Native introduced the capability to create mobile apps using the same concepts, with a single development experience.\nAngular's mobile development equivalent, Ionic, used web technologies instead of native-like development.\n9. Market Demand and Adoption:\nReact's lightness and flexibility made it attractive for startups, where rapid development is a requirement.\nLarge corporations also embraced React for its scalability and performance, further fueling its popularity.\nWhy React Over Angular?\n\nConclusion:\nWhile Angular has its strengths, React's simplicity, performance, and flexibility made it more attractive to developers seeking a light and powerful tool for constructing modern web applications. Its declarative programming paradigm, component reusability, and ever-expanding ecosystem solidified its position as a leading technology in the frontend ecosystem.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["Component-Based Architecture", "Declarative Programming", "Virtual DOM for Performance", " Learning Curve and Developer Experience", "Market Demand and Adoption"],
    codeExample: "",
  },
  {
    id: 4,
    topic: "reactJs",
    question: 'What do you undestand by "Single Page Application" ?',
    answer:
      "A Single Page Application (SPA) is a type of web application that <mark>interacts with the user by dynamically rewriting the current page rather than loading entire new pages from the server</mark> . This approach provides a more fluid and responsive user experience, similar to a desktop application. ",
    tags: ["SPA"],
    keyFeatures: [],
    actionWords: [
      "dynamic rewriting of current page.",
      "provides fluid and responsive user experience",
    ],
    codeExample: "",
  },
  {
    id: 5,
    topic: "reactJs",
    question: "What are the major features of React?",
    answer:
      "1.Uses JSX  syntax, a syntax extension of JS that allows developers to write HTML in their JS code.\n2.It uses Virtual DOM instead of Real DOM considering that Real DOM manipulations are expensive.\n3.Supports server-side rendering which is useful for Search Engine Optimizations(SEO).\n4.Follows Unidirectional or one-way data flow or data binding.\n5.Uses reusable/composable UI components to develop the view.",
    tags: ["features"],
    keyFeatures: [],
    actionWords: [
      "JSX syntax",
      "Virtual DOM",
      "data binding",
      "reusable componenets",
    ],
    codeExample: "",
  },
  {
    id: 6,
    topic: "reactJs",
    question: "Does React supports only client side rendering (CSR)?",
    answer:
      "React is primarily used for building client-side applications, but it is not limited to client-side rendering. There are several ways React can be used beyond the client side:\n\n Client-Side Rendering (CSR):\n\n-In typical usage, React runs in the browser and dynamically updates the user interface as users interact with the application. This is the most common way React is used, where components are rendered directly in the browser and any interactions or state changes are managed client-side.\n\n Server-Side Rendering (SSR):\n\n-React can also be used for server-side rendering, where the initial HTML of the React components is generated on the server and sent to the client. This can improve performance and SEO for web applications. Tools like Next. provide an easy way to implement server-side rendering with React.\n\n Static Site Generation (SSG):\n\n-Static Site Generation is another approach where the HTML is generated at build time, resulting in a set of static HTML files. This can offer the benefits of fast load times and better SEO. Next. also supports static site generation, allowing developers to create static websites using React.\n\n Hybrid Rendering:\n\n-Some frameworks, like Next.  , allow for hybrid rendering where different pages of an application can be rendered using different methods (CSR, SSR, SSG) based on specific needs. This provides flexibility in optimizing different parts of an application.\n\n React Native\n\nReact Native extends React's capabilities to mobile development, allowing developers to build native mobile applications for iOS and Android using React. While React Native uses native components rather than web components, it follows the same principles as React, making it possible to share code between web and mobile apps.\n\n\n\nWhile React is predominantly used for client-side rendering, it has versatile rendering capabilities that include server-side rendering, static site generation, and mobile app development with React Native. This flexibility allows developers to choose the best rendering method based on their application's requirements.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 7,
    topic: "reactJs",
    question: "What is the difference between Element and Component?",
    answer:
      'In React, the terms "element" and "component" have distinct meanings, and understanding the difference between them is fundamental to mastering React development.\n\n React Elements:\n\n  1.React elements are the <mark> smallest building blocks of a React application</mark>.\n3. They are plain objects that describe what you want to see on the screen. \n2.Elements contain type information (like a tag name or a component), properties (or props), and children.\n\n <b>Characteristics of React Elements:-</b>\n- Immutable  : Once you create an element, you cannot change its children or attributes.\n- Plain Objects  : React elements are simple objects that represent what you want to see on the screen.\n- Lightweight  : They are light and easy to create.\n\n \n\n React Components:\n\n  React components are the<mark> core units of a React application that return elements</mark>. Components can be either functional or class-based and they allow you to split the UI into independent, reusable pieces.\n\n <b>Characteristics of React Components:-</b>\n- Reusable  : Components can be used multiple times across your application.\n- Stateful or Stateless  : Components can manage their own state and lifecycle.\n- Complexity  : They can contain logic and manage their own behavior and state.\n\n Types of Components:\n1. Functional Components  : These are JavaScript functions that return React elements. They are simple and do not have their own state or lifecycle methods (though they can use hooks like  "useState " and  "useEffect ").\n2. Class Components  : These are ES6 classes that extend  "React.Component " and can have state and lifecycle methods.\n\n\n Key ⚖️Differences:\n\n1. Definition and Purpose  :\n - Element  : A plain object representing a DOM node or another component, describing what should be rendered.\n - Component  : A function or class that returns elements, encapsulating logic, and behavior.\n\n2. Immutability vs. State  :\n - Element  : Immutable once created.\n - Component  : Can manage its own state and lifecycle, making it dynamic.\n\n3. Usage  :\n - Element  : Used directly in the  to represent HTML tags or components.\n - Component  : Defines new elements and can be reused and nested within other components.\n\n4. Complexity  :\n - Element  : Simple and lightweight.\n - Component  : More complex, capable of managing state and side effects.\n\n\n',
    tags: ["components"],
    keyFeatures: [],
    actionWords: [
      "smallest building blocks-plain object",
      "core units-returns elements",
      "",
    ],
    codeExample:
      '  Example:\n\nconst element = <div className="greeting">Hello, world!</div>;\n\nIn this example,  "element " is a React element representing a  "div " with a class name of "greeting" and the text "Hello, world!".',
  },
  {
    id: 8,
    topic: "reactJs",
    question: "What is higher-order component in React?",
    answer:
      'A higher-order component (HOC) in React is a <mark>function that takes a component and returns a new component with additional props or behaviors</mark>. \n-HOCs are useful for reusing logic, enhancing components, and maintaining a clean separation of concerns. \n-They are a powerful pattern in React for creating flexible and maintainable code.\n - HOCs do not modify the original component. Instead, they wrap it in a container component that adds the desired functionality.\n\n Common Use Cases for HOCs:\n\n1. Code Reuse and Logic Abstraction  :\n - Extract common logic to be shared across multiple components, such as authentication, data fetching, or form handling.\n\n2. Manipulating Props  :\n - Modify or add props to the wrapped component.\n\n3. Conditional Rendering  :\n - Render components conditionally based on certain conditions.\n\n\n\n  <u> ⭐Benefits of HOCs</u>:\n\n1. Reusability  :\n - HOCs promote code reuse by allowing common functionality to be abstracted and reused across multiple components.\n\n2. Separation of Concerns  :\n - They help separate business logic from UI logic, making components simpler and more focused on rendering.\n\n3. Flexibility  :\n - HOCs can be combined and layered to apply multiple behaviors or enhancements to a single component.\n\n <u>❄️Caveats</u>:\n\n1. Props Collisions  :\n - Be cautious of props collisions. Ensure that the HOC does not accidentally overwrite props passed to the wrapped component.\n\n2. Ref Forwarding  :\n - Standard HOCs do not automatically handle  "ref " forwarding. Use  "React.forwardRef " if the HOC needs to pass refs to the wrapped component.\n\n3. Debugging Complexity  :\n - Debugging can become more complex due to the additional layers introduced by HOCs.\n\n\n\n',
    tags: ["HOC"],
    keyFeatures: [],
    actionWords: [
      "takes & returns a new component",
      " logic reusability",
      " component enhancement",
      "separation of concerns",
      "creates flexible and maintainable code",
    ],
    codeExample:
      'Example of a Higher-Order Component:\r\n\r\n-Let\'s create a simple HOC that logs props.\r\n\r\n-Step-by-Step Example:\r\n\r\n1.Create the HOC Function  :\r\n\r\n\r\nimport React from \'react\';\r\n\r\n// This HOC logs the props of the wrapped component\r\nconst withLogger = (WrappedComponent) => {\r\n  return (props) => {\r\n  console.log(\'Props:\', props);\r\n  return <WrappedComponent {...props} />;\r\n  };\r\n};\r\n\r\nexport default withLogger;\r\n\r\n\r\n2.Use the HOC to Enhance a Component  :\r\n\r\n\r\nimport React from \'react\';\r\nimport withLogger from \'./withLogger\'; // Import the HOC\r\n\r\n// A simple component that displays a message\r\nconst DisplayMessage = ({ message }) => {\r\n  return <div>{message}</div>;\r\n};\r\n\r\n// Enhance the DisplayMessage component using the withLogger HOC\r\nconst EnhancedDisplayMessage = withLogger(DisplayMessage);\r\n\r\nconst App = () => {\r\n  return (\r\n  <div>\r\n  <EnhancedDisplayMessage message="Hello, world!" />\r\n  </div>\r\n  );\r\n};\r\n\r\nexport default App;\r\n\r\n\r\n Explanation:\r\n\r\n1. HOC Function  :\r\n -  "withLogger " is a function that takes a component ( "WrappedComponent ") and returns a new functional component.\r\n - The new component logs the props it receives and then renders the  "WrappedComponent " with those props.\r\n\r\n2. Wrapped Component  :\r\n -  "DisplayMessage " is a simple functional component that displays a message passed via props.\r\n\r\n3. Enhanced Component  :\r\n -  "EnhancedDisplayMessage " is the result of passing  "DisplayMessage " to the  "withLogger " HOC, creating a new component that logs its props.\r\n\r\n4. Using Enhanced Component  :\r\n - In the  "App " component,  "EnhancedDisplayMessage " is used like any other React component. When rendered, it logs the props and displays the message.',
  },
  {
    "id": ":r0:018",
    "topic": "reactJs",
    "question": "What is Prop Collision in React ? ",
    "answer": "Props collisions in React <mark>occur when a component receives multiple props with the same key, leading to one value unintentionally overriding another</mark>. This often happens when you combine explicit props with those spread from an object.\n\n\n\n\n Why Is This a Problem?\n\n- Unpredictability: The final prop value might not be what you intended, leading to unexpected behavior.\n- Maintainability: Debugging can become harder when props are being unintentionally overwritten.\n- Component Integrity: The component might rely on specific props to render correctly, and collisions can break these assumptions.\n\n\n\n\n\n 📝 Summary :\n\nProps collisions are a common pitfall when passing multiple sources of props to a component. By being mindful of how you spread and assign props, and understanding that later definitions override earlier ones, you can prevent unintended behavior in your React applications",
    "tags": [
      "props"
    ],
    "keyFeatures": [],
    "actionWords": ["when a component receives multiple props with the same key"],
    "codeExample": "⭐How Do Props Collisions Happen?\n\nImagine a component that accepts several props, and a parent component passes props both explicitly and via the spread operator.\nIf both methods provide a value for the same prop key, the order of assignment determines which one “wins.” For instance, in JSX:\n\n\nconst Button = (props) => <button {...props}>Click Me</button>;\n\nconst App = () => (\n  // Here, the second 'className' overrides the first.\n  <Button className=\"primary-btn\" {...{ className: \"secondary-btn\", type: \"button\" }} />\n);\n\n\nIn this example:\n- The Button component receives two className props.\n- Due to the order of properties, the spread prop (className: \"secondary-btn\") will override the explicitly set className=\"primary-btn\" or vice versa depending on how they're merged.\n\n\n ⭐How to Prevent Props Collisions\n\n1. Be Intentional with Spreading:\n - Instead of blindly spreading an object, deconstruct the props and explicitly assign values. This way, you can control which props take precedence.\n \n \n const Button = ({ className, type, ...rest }) => (\n <button type={type || \"button\"} className={default-btn ${className}} {...rest}>\n Click Me\n </button>\n );\n\n const App = () => (\n <Button className=\"primary-btn\" {...{ type: \"submit\" }} />\n );\n \n \n2. Order Matters:\n - When using the spread operator, the position of the spread in your JSX determines its precedence. Props defined later in the element’s declaration will override earlier ones.\n \n \n // Here, the explicit 'className' will override the one from the spread.\n <Button {...{ className: \"secondary-btn\" }} className=\"primary-btn\" />\n \n\n3. Avoid Duplicate Keys:\n - If possible, design your components and data structures to minimize the chance of having duplicate keys in your props.\n\n"
  },
  {
    id: 9,
    topic: "reactJs",
    question: "What is `Render Hijacking` in react?",
    answer:
      "Render hijacking in React <mark>refers to the ability of a higher-order component (HOC) to control or modify the rendering of a wrapped component</mark>. \nThis technique allows the HOC to <mark>intercept and potentially alter the output of the wrapped component before it is rendered.</mark> \nRender hijacking can be <mark>useful for adding additional functionality, modifying props, or applying conditional rendering logic</mark> to the wrapped component.\nUse Cases:\n\n1.Enhancing Props: An HOC can add or modify props before passing them to the wrapped component.\n2.Conditional Rendering: The HOC can decide whether to render the wrapped component or render something else (e.g., a loading spinner or error message).\n3.Applying Styles or Themes: The HOC can inject styling or theming information into the wrapped component.",
    tags: ["HOC"],
    keyFeatures: [],
    actionWords: [
      "control / modify rendering of wrapped components",
      "usefull for adding additional functionality",
    ],
    codeExample:
      'import React, { useState } from \'react\';\r\n\r\nfunction DataFetcher({ url, children }) {\r\n  const [data, setData] = useState(null);\r\n  const [loading, setLoading] = useState(true);\r\n\r\n  React.useEffect(() => {\r\n  fetch(url)\r\n  .then((res) => res.json())\r\n  .then((data) => {\r\n  setData(data);\r\n  setLoading(false);\r\n  });\r\n  }, [url]);\r\n\r\n  // "Hijack" the rendering by delegating it to the children function\r\n  return children({ data, loading });\r\n}\r\n\r\nfunction App() {\r\n  return (\r\n  <DataFetcher url="https://dummyjson.com/products">\r\n  {({ data, loading }) => {\r\n  if (loading) {\r\n  return <div>Loading...</div>;\r\n  }\r\n  return <div>Data: {JSON.stringify(data)}</div>;\r\n  }}\r\n  </DataFetcher>\r\n  );\r\n}\r\n\r\nexport default App;\r\n\nIn this example:\n\nDataFetcher Component: Handles fetching data and maintains its own state.\nRender Hijacking: Instead of rendering its own UI, it calls the children function, passing the fetched data and loading status. This lets the parent decide exactly how to render the UI based on that state.\n\n\n',
  },
  {
    id: 10,
    topic: "reactJs",
    question: "What are Pure Components?",
    answer:
      'In React, a PureComponent is a special type of component that <mark>implements a shallow comparison of props and state to decide whether the component should re-render</mark>. This can improve performance by preventing unnecessary renders when the component\'s output has not changed.\n\n <b>🎯Key Features of Pure Components</b>\n\n1. Shallow Comparison  :\n -  "React.PureComponent " performs a shallow comparison of the current and previous props and state. If neither have changed, the component will not re-render.\n - Shallow comparison means that it only compares the references of objects and arrays, not their nested content.\n\n2. Performance Optimization  :\n - Pure components can optimize performance by reducing the number of renders, especially in components that receive frequently changing props or state that don\'t necessarily alter the output.\n\n3. Class Component Only  :\n -  "React.PureComponent " is available only for class components. Functional components can achieve similar optimization using the  "React.memo " higher-order component.\n\n  \n <b>🎯Shallow Comparison Explained:</b>\n\n-The shallow comparison checks if the references of props and state are the same.(refer example)\n- Primitive values (like numbers and strings) are compared by value.\n- Objects and arrays are compared by reference, not by value. If you create a new object or array with the same content, it will be considered different.\n\n  <b>🎯PureComponent vs Component:</b>\n\n1. PureComponent  :\n - Performs shallow comparison of props and state.\n - Prevents unnecessary re-renders, improving performance.\n\n2. Component  :\n - Does not implement  "shouldComponentUpdate " by default.\n - Re-renders every time props or state change unless  "shouldComponentUpdate " is manually implemented.\n\n  <b>🎯Conclusion:  </b>\n\nPure components in React provide a way to optimize performance by avoiding unnecessary re-renders through shallow comparison of props and state. This feature is particularly useful for improving the efficiency of applications with complex UI structures or frequently changing data. For class components, use  "React.PureComponent ", and for functional components, use  "React.memo ".',
    tags: ["components"],
    keyFeatures: [],
    actionWords: [
      "shallow -comparision of props & state",
      " prevent unnecessary rendering",
      " perfromance optimization",
      "Class Component Only",
      "React.memo (HOC)-prevents re-rendering",
    ],
    codeExample:
      'For functional components, you can use  "React.memo " to achieve similar behavior to  "PureComponent"\n\nimport React from \'react\';\n\nconst Greeting = React.memo(function Greeting(props) {\n  console.log(\'Greeting rendered\');\n  return <div>Hello, {props.name}!</div>;\n});\n\nclass App extends React.Component {\n  state = {\n  name: \'Alice\'\n  };\n\n  render() {\n  return (\n  <div>\n  <Greeting name={this.state.name} />\n  <button onClick={() => this.setState({ name: \'Alice\' })}>\n  Update Name to Alice\n  </button>\n  </div>\n  );\n  }\n}\n\nexport default App;\n\n\nIn this example:\n-  "Greeting " is a functional component wrapped with  "React.memo ".\n-  "React.memo " performs a shallow comparison of the  "props " to determine if the component should re-render.',
  },
  {
    id: 11,
    topic: "reactJs",
    question: "What are components and their type in React?",
    answer:
      "A Component is one of the core building blocks of React. In other words, we can say that every application you will develop in React will be made up of pieces called components. Components make the task of building UIs much easier. \n\n  🎯In React, we mainly have two types of components: \n\n1.Functional Components: Functional components are simply  functions. We can create a functional component in React by writing a  function. \n2.Class Components: The class components are a little more complex than the functional components. The functional components are not aware of the other components in your program whereas the class components can work with each other. We can pass data from one class component to another class component.",
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["functional ", "stateless", " class", "stateful"],
    codeExample: "",
  },
  {
    id: 12,
    topic: "reactJs",
    question: 'Explain the "lifecycle methods" of components?',
    answer:
      "A React Component can go through four stages of its life as follows. \r\n\r\n1.<i>Initialization</i>: This is the stage where the component is constructed with the given Props and default state. This is done in the constructor of a Component Class.\r\n2.<i>Mounting</i>: Mounting is the stage of rendering the  returned by the render method itself.\r\n3.<i>Updating</i>: Updating is the stage when the state of a component is updated and the application is repainted.\r\n4.<i>Unmounting</i>: As the name suggests Unmounting is the final step of the component lifecycle where the component is removed from the page.",
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["initialization ", " mounting", " updating", " unmounting."],
    codeExample: "",
  },
  {
    id: 13,
    topic: "reactJs",
    question: "What is State in React ?",
    answer:
      '- State in React is a way to store and manage dynamic data within a component.\n- When the state changes, React automatically re-renders the component to reflect the updated data.\n\n🔍 Key Concepts:\n- Dynamic Data Storage:\nState holds data that can change over time—like user input, form values, or responses from an API.\n- Triggers Re Renders :\n\n When state updates, React re-renders the affected components, ensuring that the UI stays in sync with the current data.\n\n- Local to Components:\nEach component can have its own state, making it easy to manage localized data without affecting other parts of your app.',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: ["way to manage dynamic data within components"],
    codeExample: "",
  },
  {
    id: 14,
    topic: "reactJs",
    question: "Why should we not update the state directly?",
    answer:
      "If you try to update the state directly then it won't re-render the component.",
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 15,
    topic: "reactJs",
    question: "What are props in React?",
    answer:
      '-In React, "props" is a short form of "properties," which are <mark>used to pass data from a parent component to a child component</mark>. \n-Props are immutable, meaning <mark>they cannot be modified by the child component</mark>.\n-Props <mark>provide a way for parent components to communicate with their children</mark>, allowing for dynamic and reusable components.\n\n ⭐Key Points about Props:\n\n1.  <i>Passing Data</i>  : Props allow parent components to pass data (as attributes) to child components when rendering them.\n\n2.  <i> Read-Only </i> : Props are read-only for the child component. They cannot be modified directly within the child component.\n\n3. <i>Customization</i>  : Props enable customization and configuration of child components based on the needs of the parent component.\n\n4.  <i> Dynamic Rendering</i>  : Props can be used to dynamically render child components with different data or configurations.\n\n5. <i>  Default Values </i> : Props can have default values specified by the parent component, which are used if no value is provided.\n\n6. Event Handling  : Props can also be used to pass callback functions from parent components to child components, allowing child components to communicate with their parent components.\n\n ⭐Benefits of Props:\n\n- Reusability  : Props enable the creation of reusable components that can be customized and configured based on the needs of different parent components.\n- Component Composition  : Props facilitate component composition, allowing complex UIs to be built by combining smaller, reusable components.\n- Data Flow  : <mark>Props enforce a unidirectional data flow in React applications</mark>, making it easier to reason about data changes and component interactions.',
    tags: ["props"],
    keyFeatures: [],
    actionWords: [
      "parent to child data transmission",
      "immutable",
      "enforce a unidirectional data flow",
    ],
    codeExample: "",
  },
  {
    id: 16,
    topic: "reactJs",
    question: "What are the Major differences between Props & State",
    answer:
      'In React, both "props" and "state" are used to <mark>manage data and control the behavior of components</mark>, but they have different purposes and characteristics.\n\n🎯 Props :\n\n1. Purpose  :\n - Props (short for properties) are used to pass data from a parent component to a child component.\n - <mark>They allow components to be configurable and reusable by providing external data and configurations.</mark>\n\n2. Immutability  :\n - Props are <mark>immutable and read-only for the component receiving them</mark>. \n-They cannot be modified directly by the receiving component.\n\n3. Usage  :\n - Props are passed as attributes when rendering components in . They are accessed within the component via the  "props " object.\n\n4. Source  :\n - Props originate from the parent component and are passed down the component hierarchy to child components.\n\n5. Examples  :\n - Passing data (e.g., strings, numbers, objects) from a parent component to a child component.\n - Configuring child components with different properties based on the needs of the parent component.\n\n 🎯 State : \n\n1. Purpose  :\n - State is <mark>used to manage internal data and control the behavior of a component</mark>.\n - It <mark>represents the current state of the component</mark>, which can change over time in response to user actions, events, or other triggers.\n\n2. Mutability  :\n - State is <mark> mutable and can be modified</mark> using the  "setState() " method provided by React. However, it should be treated as immutable, and state updates should be performed in an immutable manner to ensure predictable behavior.\n\n3. Usage  :\n - State is declared and initialized using the  "useState() " hook (in functional components) or as a property in the component\'s constructor (in class components).\n - It is accessed and updated via the  "state " object or  "setState() " method.\n\n4. Source  :\n - State is <mark>internal to the component and is managed and controlled by the component itself</mark>.\n - Changes to the state are triggered by events, user interactions, or other side effects within the component.\n\n5. Examples  :\n - Managing form input values and controlling their changes.\n - Toggling visibility, enabling/disabling functionality, or updating component data based on user interactions.\n\n ⚖️Differences:\n\n1. Source of Data  :\n - Props are external data passed from parent components, while state is internal data managed by the component itself.\n\n2. Mutability  :\n - Props are immutable and read-only, whereas state is mutable and can be updated using the  "setState() " method.\n\n3. Control  :\n - Props are controlled by parent components and cannot be modified by child components, while state is controlled and managed internally by the component.\n\n4. Initialization  :\n - Props are passed to components when they are rendered, while state is initialized and managed within the component\'s lifecycle.\n\nUnderstanding the differences between props and state is essential for designing and building React components effectively. Props are used for passing data and configuration from parent to child components, while state is used for managing component-specific data and controlling behavior within the component itself.',
    tags: ["comparison"],
    keyFeatures: [],
    actionWords: ["data transmission vs data management", " unmutable/mutable"],
    codeExample: "",
  },
  {
    id: 17,
    topic: "reactJs",
    question: "Explain the building blocks of React?",
    answer:
      "The five main building blocks of React are:\n\n 1.<i>Components:</i> \n-These are reusable blocks of code that return HTML.\n2.<i>JSX:</i> \n-It stands for JavaScript and XML and allows you to write HTML in React.\n3.<i>Props and State:</i> \n-props are like function parameters and State is similar to variables.\n4.<i>Context:</i> \n-This allows data to be passed through components as props in a hierarchy.\n5.<i>Virtual DOM:</i> \n-It is a lightweight copy of the actual DOM which makes DOM manipulation easier.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["components", " JSX", " props and states", "context", "vDom"],
    codeExample: "",
  },
  {
    id: 18,
    topic: "reactJs",
    question: "What is virtual DOM in React?",
    answer:
      "In React, the Virtual DOM is a <mark>lightweight, in-memory representation of the actual DOM</mark>. \nIt is a key concept that helps <mark>optimize the performance of React applications by minimizing the number of updates and re-renders needed</mark> when the application's state changes.\n\n  <b> ⭐Key Points about the Virtual DOM:</b>\n\n1. Representation of the DOM  :\n - The Virtual DOM is a JavaScript representation of the actual DOM structure of a web page.\n - It mirrors the structure of the real DOM but is implemented as a lightweight, tree-like data structure in memory.\n\n2. Efficient Updates  :\n - When the state of a React component changes, React generates a new Virtual DOM tree representing the updated state.\n - React then compares this new Virtual DOM tree with the previous one to identify the differences or changes (known as \"diffing\").\n - By comparing the Virtual DOM trees, React determines the minimal set of changes needed to update the actual DOM and applies only those changes, instead of re-rendering the entire DOM.\n\n3. Batched Updates  :\n - React optimizes the process of updating the DOM by batching multiple updates together.\n - Instead of immediately applying each state change to the DOM, React batches updates and performs them asynchronously, which helps improve performance and reduce unnecessary re-renders.\n\n4. Platform Independence  :\n - The Virtual DOM allows React to be platform-independent, meaning it can render components not only in web browsers but also on other platforms such as mobile devices and server-side environments.\n\n5. Developer-Friendly  :\n - The Virtual DOM abstracts away the complexities of manual DOM manipulation and optimization, making it easier for developers to build and maintain complex UIs without worrying about performance optimizations.\n\n ⭐Benefits of the Virtual DOM:\n\n1. Improved Performance  : By minimizing DOM updates and re-renders, React ensures better performance and responsiveness of applications, especially for complex UIs.\n\n2. Simplified Development  : The Virtual DOM abstracts away low-level DOM manipulation, making it easier for developers to focus on building UI components and application logic.\n\n3. Cross-Platform Compatibility  : React's Virtual DOM enables developers to write components that can be rendered on various platforms, including web browsers, mobile devices, and server environments.\n\n4. Optimization Opportunities  : React's diffing algorithm provides optimization opportunities for identifying and applying only the necessary changes to the DOM, resulting in faster rendering and smoother user experiences.\n\nThe Virtual DOM is a core concept in React that plays a crucial role in optimizing the performance and efficiency of React applications, allowing developers to build complex UIs with ease and confidence.",
    tags: ["dom"],
    keyFeatures: [],
    actionWords: [
      "copy of actual dom",
      " optimization",
      " reconcilliation",
      " diffing algorithms",
    ],
    codeExample: "",
  },
  {
    id: 19,
    topic: "reactJs",
    question:
      "Explain the working of Virtual Dom in react,  How it works  & Why react chose Virtual dom ?",
    answer:
      "  What is the Virtual DOM in React?\n\nThe Virtual DOM (VDOM) is a <mark>lightweight JavaScript representation of the real DOM</mark>. It acts as a middle layer between the actual DOM and React’s rendering logic, enabling efficient updates and re-renders.\n\n  How Does the Virtual DOM Work?\n\n1. Rendering:  \n - When you write React components, they return  (JavaScript XML).\n - React compiles this  into objects representing the Virtual DOM.\n\n2. Reconciliation Process:  \n - When a change occurs in the application (e.g., user interaction or state update), React updates the Virtual DOM instead of the real DOM.\n - React then compares the updated Virtual DOM with the previous Virtual DOM using a process called  <mark> \"diffing\"</mark>  .\n - During diffing, React determines the minimum set of changes required to synchronize the real DOM with the updated Virtual DOM.\n\n3. Patch Updates:  \n - Once React calculates the changes, it applies these updates to the real DOM in a batched and efficient manner.\n - This ensures only the modified parts of the DOM are updated, minimizing performance costs.\n\n  Why Does React Use the Virtual DOM?\n\n1. Performance Optimization:  \n - Directly manipulating the real DOM is slow because each change triggers reflows and repaints in the browser.\n - By batching updates and only making minimal changes to the real DOM, the Virtual DOM ensures that updates are more efficient.\n\n2. Simplifies Programming Model:  \n - React’s declarative nature allows developers to describe how the UI should look in a specific state without worrying about the underlying DOM updates.\n - React takes care of syncing the actual DOM with the desired UI state.\n\n3. Cross-Browser Compatibility:  \n - The Virtual DOM abstracts away differences in how browsers implement DOM APIs, providing a consistent programming interface.\n\n4. Predictability and Debugging:  \n - Using a Virtual DOM ensures a predictable and manageable rendering process. This improves debugging since developers don't directly manipulate the real DOM.\n\n <i>👉Analogy to Understand the Virtual DOM:</i>\nThink of the Virtual DOM as a draft copy of a document:\n- You make all the edits on the draft (Virtual DOM) first.\n- Once you're satisfied, you update the final version (real DOM) with only the necessary changes, saving time and effort.\n\n  📝 Summary : of Benefits:\n- Improved Performance: Minimized real DOM operations.\n- Abstraction: Developers work with a clean, declarative model.\n- Better User Experience: Faster updates lead to smoother applications.\n\nBy using the Virtual DOM, React achieves an optimal balance between flexibility and performance, making it one of the fastest and most developer-friendly libraries for building modern UIs.",
    tags: ["dom"],
    keyFeatures: [],
    actionWords: [
      "efficient way to update the UI ",
      " performance optimization",
      "diffing",
      "Reconciliation",
    ],
    codeExample:
      '\r\n\r\n Example Component\r\n\r\n\r\nimport React, { useState } from \'react\';\r\n\r\nfunction Counter() {\r\n  const [count, setCount] = useState(0);\r\n\r\n  return (\r\n  <div>\r\n  <h1>Counter: {count}</h1>\r\n  <button onClick={() => setCount(count + 1)}>Increment</button>\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default Counter;\r\n\r\n\r\n What\'s Happening Under the Hood\r\n\r\n1. Initial Render:  \r\n When the Counter component mounts, React creates a Virtual DOM representation of the component tree:\r\n - A <div> element.\r\n - An <h1> element showing "Counter: 0".\r\n - A <button> element with the text "Increment".\r\n\r\n2. State Update:  \r\n When you click the button, the setCount function updates the state, causing the component to re-render.\r\n\r\n3. Virtual DOM Update:  \r\n React creates a new Virtual DOM tree based on the updated state. In this case, the new Virtual DOM only has a changed <h1> (e.g., "Counter: 1" instead of "Counter: 0").\r\n\r\n4. Diffing Process:  \r\n React compares the new Virtual DOM with the previous Virtual DOM tree. It finds that only the text inside the <h1> has changed.\r\n\r\n5. Efficient DOM Update:  \r\n Based on this diff, React updates only the part of the real DOM that has changed (i.e., the text inside the <h1>). This minimizes direct manipulation of the DOM and improves performance.\r\n\r\n Why This Matters\r\n\r\n- Performance:  \r\n  Updating the real DOM is relatively slow. By only changing what is necessary, React minimizes costly DOM operations.\r\n\r\n- Declarative UI:  \r\n  You describe what your UI should look like for a given state, and React handles the efficient update process behind the scenes.\r\n\r\nThis simple example demonstrates how React leverages the Virtual DOM to update the UI efficiently without re-rendering the entire page.',
  },
  {
    id: 20,
    topic: "reactJs",
    question:
      "Why not compare virtual DOM with real DOM instead of comparing vDom with another vDom?",
    answer:
      "Comparing two Virtual DOM trees is much faster and more efficient than comparing a Virtual DOM tree directly with the Real DOM. Here's why:\r\n\r\n1. Performance:  \r\n The Virtual DOM is a lightweight, in-memory representation of the UI (a plain JavaScript object). Diffing two JS objects is much faster than reading and comparing actual DOM nodes, which are heavier and involve browser APIs.\r\n\r\n2. Avoiding Expensive Operations:  \r\n Directly comparing with the Real DOM would force frequent and expensive DOM queries, leading to performance bottlenecks. By working only in memory, React avoids these costly operations.\r\n\r\n3. Predictability and Simplicity:  \r\n React’s rendering process is declarative. When state or props change, React builds a new Virtual DOM, then compares it with the previous Virtual DOM. This diffing process (also called reconciliation) calculates the minimal set of changes needed to update the UI. Applying these minimal changes to the Real DOM is much simpler and more predictable.\r\n\r\n4. Consistency Across Environments:  \r\n The Virtual DOM approach works consistently regardless of the actual rendering environment (browser, mobile via React Native, etc.). It decouples the component logic from the underlying platform-specific DOM implementation.\r\n\r\nIn summary, by comparing two Virtual DOM trees instead of the Virtual DOM with the Real DOM, React keeps the process fast, efficient, and platform-agnostic, ensuring that only the necessary updates are made to the Real DOM.",
    tags: ["dom"],
    keyFeatures: [],
    actionWords: [
      "faster and more efficient",
      "Performance",
      "Avoiding Expensive Operations",
      "Predictability and Simplicity",
      "Consistency Across Environments",
    ],
    codeExample: "",
  },
  {
    id: 21,
    topic: "reactJs",
    question: "What is SourceMap does in react  ?",
    answer:
      "  A Source Map is a file that <mark>maps the minified or transpiled code (e.g., bundled JavaScript files) back to its original source code</mark>. \nIt helps developers debug their applications by allowing them to see and interact with the original source files (e.g., , TypeScript) in the browser's developer tools, even if the actual code running in the browser is minified or bundled.\n\n  Why is a Source Map Useful?\n\nWhen a React application is built for production:\n1. The code is transpiled (e.g., from  or TypeScript to JavaScript).\n2. It is minified (removing whitespace, shortening variable names, etc.) for performance.\n\nThis transformation makes the code unreadable and difficult to debug. Source maps link the original source code to the transformed code so that:\n- Developers can debug the application as if they were working with the original source files.\n- The browser’s developer tools display the original code when you set breakpoints or inspect errors.\n\n  How Source Maps Work\n\n1. Creation  :\n - When you build your React app (e.g., using Webpack or Vite), a source map file is generated.\n - This file contains a mapping between the minified code and the original code.\n\n2. Integration  :\n - The source map is referenced in the minified file with a comment like:\n //  sourceMappingURL=main..map\n   \n - The browser uses this reference to load the source map and provide debugging information.\n\n3. Usage  :\n - When you open the browser’s developer tools, the tools fetch the source map file, decode it, and display the original code for debugging.\n\n-When creating a React app using tools like Create React App  , source maps are enabled by default for development. For production builds, they are optional.\n\n  Disabling Source Maps for Production\nSometimes, source maps are excluded from production builds to protect source code or reduce file size. For CRA:\n1. Add the following to .env  :\n \n GENERATE_SOURCEMAP=false\n\n  Conclusion\n\nSource maps bridge the gap between the optimized production code and the original source code, making debugging much easier for developers. They are especially valuable in React applications where , TypeScript, or modern JavaScript features are transpiled and bundled into formats browsers can understand.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["maps minified or transpiled code back to its original"],
    codeExample:
      "Example\n\n Without Source Map:\nThe browser only has access to minified code like this:\n  \nfunction n(o){return o+1}console.log(n(2));\n  \nIf there's an error, the stack trace will point to this code, which is unreadable.\n\n With Source Map:\nThe source map links the minified code to the original code:\n \nfunction addOne(number) {\n  return number + 1;\n}\nconsole.log(addOne(2));\nIn the developer tools, you can see and debug the readable code, set breakpoints, and trace errors as if you were working directly with the original file.\n\n",
  },
  {
    id: 22,
    topic: "reactJs",
    question: "Does react directly interacts with browser ?",
    answer:
      "No, React does not directly interact with the browser's DOM or APIs in most cases. Instead, it uses an abstraction layer, primarily the Virtual DOM  , to manage interactions with the browser. Here’s a detailed explanation of how React operates and interacts with the browser:\n\n\n\n  How React Works with the Browser:\n\n1. Virtual DOM as an Intermediary:  \n - React maintains a Virtual DOM, which is a lightweight, in-memory representation of the real DOM.\n - Changes in the application (like user interactions or state updates) are first applied to the Virtual DOM.\n - React then compares the updated Virtual DOM with the previous version (a process called reconciliation  ) to determine the minimal set of changes needed.\n\n2. React and the Real DOM:  \n - After reconciliation, React applies these minimal changes to the real DOM using efficient operations.\n - This ensures that React avoids unnecessary direct interactions with the browser’s DOM, which can be slow and error-prone.\n\n3. Browser Interaction via ReactDOM:  \n - The ReactDOM library bridges React with the browser:\n - ReactDOM.render() (or createRoot in modern React) mounts React components onto specific DOM elements in the browser.\n - ReactDOM handles the actual updates to the browser’s DOM.\n\n4. Events in React:  \n - React uses a centralized synthetic event system  :\n - When an event (like onClick  ) occurs, React does not attach individual listeners to every DOM node.\n - Instead, React attaches a single event listener to the root of the application and delegates events to it.\n - This approach improves performance and consistency across browsers.\n\n\n\n  How React Abstracts Browser APIs:\n\nReact provides a higher-level API to interact with the DOM and browser, making it easier to write declarative and cross-browser-compatible code. For instance:\n\n1. Declarative Rendering:  \n - React abstracts DOM manipulations by allowing developers to define the UI declaratively using .\n - Instead of writing:\n   \n const div = document.createElement('div');\n div.innerHTML = 'Hello';\n document.body.appendChild(div);\n   \n You can write:\n  \n const App = () => <div>Hello</div>;\n ReactDOM.render(<App />, document.getElementById('root'));\n   \n\n2. Cross-Browser Compatibility:  \n - React ensures consistent behavior across browsers by managing browser quirks internally.\n - Developers interact with React’s APIs rather than browser-specific APIs.\n\n\n\n  When Does React Use the Browser:\n\n1. Mounting:  \n - React uses the browser’s DOM API to mount its Virtual DOM tree into a real DOM element.\n\n2. Real DOM Updates:  \n - After reconciliation, React uses browser APIs like document.createElement  , setAttribute  , and appendChild to update the DOM.\n\n3. User Input/Events:  \n - React listens to events (e.g., click  , change  ) using browser event APIs but wraps them in its SyntheticEvent system for consistency.\n\n4. Browser APIs:  \n - Developers can still use browser APIs directly when needed (e.g., localStorage  , navigator  , window  , document  ), but React itself doesn’t handle these unless explicitly programmed.\n\n\n  Why React Doesn't Directly Interact With the Browser:\n\n1. Efficiency  : The Virtual DOM minimizes expensive direct DOM operations.\n2. Consistency  : React abstracts browser-specific quirks and ensures cross-browser compatibility.\n3. Declarative Programming  : Developers focus on  what  the UI should look like rather than  how  to manipulate the DOM.\n4. Performance  : React batches updates and optimizes real DOM changes.\n\n\n\n  Conclusion:\n\nReact abstracts most browser interactions to provide developers with a more efficient and declarative programming model. While React itself doesn’t directly interact with the browser often, it uses tools like the Virtual DOM and ReactDOM to handle browser communication efficiently and consistently. For special cases, developers can still interact with the browser APIs directly when needed.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["uses vdom to interact"],
    codeExample:
      "Example of React Interacting with the Browser\n\nHere’s an example where React interacts indirectly and directly with the browser:\n\n \nimport React, { useEffect, useRef } from 'react';\n\nconst App = () => {\n  const divRef = useRef(null);\n\n  useEffect(() => {\n  // React indirectly updates the DOM\n  divRef.current.style.backgroundColor = 'lightblue';\n  \n  // Direct interaction with the DOM (not recommended but sometimes necessary)\n  document.title = 'React App'; // Updates the browser's title bar\n  }, []);\n\n  return <div ref={divRef}>Hello, World!</div>;\n};\n\nexport default App;\n  \n\nIn this example:\n- React updates the DOM via ref indirectly.\n- A direct interaction with the browser occurs via document.title  .",
  },
  {
    id: 23,
    topic: "reactJs",
    question:
      "If React doesn't interact with browser than how we can see error or console alongside with exact line number?",
    answer:
      " Even though React itself doesn’t interact with the browser directly in terms of managing the DOM (thanks to the Virtual DOM abstraction), it does work closely with the browser’s environment. This includes features like developer tools  , source maps  , and error handling  , which are tightly integrated with the browser’s capabilities.\n\nHere’s how you can see errors or logs with exact line numbers while using React:\n\n  1. Source Maps Provide Debugging Information : \n  When a React application is built and runs in a browser:\n- The source maps bridge the gap between the minified/compiled code and the original source code.\n- The browser uses the source map to map errors, stack traces, and logs back to the original file and line number.\n\n  2. React Developer Tools:  \nThe React Developer Tools browser extension provides a rich debugging experience:\n- Allows you to inspect component trees.\n- Shows the props, state, and hooks associated with components.\n\n  3. Browser Developer Tools and React Integration  \nReact integrates with the browser's developer tools to help trace issues:\n- console.log  :\n  When you use console.log in your React code, the browser logs the output with the correct file and line number, thanks to the source map.\n- Error Stack Traces  :\n  When an error occurs, the browser displays the exact file, line number, and component in the error stack trace, mapped back to the original code.\n\n  4. Error Boundaries in React  :\nReact provides Error Boundaries for catching and logging errors in components. These work alongside browser tools for debugging.\n\n  5. Development vs. Production Mode :\n- Development Mode  :\n  - Errors are logged with detailed stack traces.\n  - Source maps ensure you can see the original file and line numbers.\n  - Warnings and other useful debug information are shown in the console.\n\n- Production Mode  :\n  - Errors may appear with less detail (to reduce overhead and protect the source code).\n  - You can enable source maps for production builds to assist debugging, though this is often avoided for security and performance reasons.\n\n\n\n  How Exact Line Numbers Are Shown:\nReact leverages the browser’s built-in debugging tools and source maps to show you the exact line numbers:\n1. Source maps are generated when you build or bundle your application (via tools like Webpack or Vite).\n2. The browser fetches these source maps to map runtime errors back to the original code.\n3. React logs errors, stack traces, and warnings using the browser’s console APIs.\n\n\n\n  Conclusion:\nReact doesn’t directly interact with the browser DOM for rendering and updates, but it uses the browser’s environment for debugging, error handling, and developer tools integration  . The ability to see exact line numbers for errors and logs is made possible through:\n1. Source maps.\n2. Integration with browser developer tools.\n3. React's own debugging mechanisms (like React Developer Tools and error boundaries).",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["source map", " developer tools", " error stack traces"],
    codeExample: "",
  },
  {
    id: 24,
    topic: "reactJs",
    question:
      "Why vite's compile time is less than React  ? What issues it address?",
    answer:
      "Vite is significantly faster than traditional React build setups (e.g., Create React App with Webpack) because it introduces a modern approach to building and bundling web applications.\n Here's a detailed explanation of why Vite's compile time is less and the issues it addresses:\n  Why Vite is Faster:\n1. Native ES Modules for Development :\n - Vite leverages the browser's support for <mark> native ES modules</mark> during development, allowing it to serve files directly to the browser without bundling.\n - Traditional tools like <mark>Webpack bundle the entire application</mark>, which takes time, even for small changes.\n - 👉With Vite:\n - Each module is compiled on demand.\n - Changes are reflected instantly because only the affected module is reloaded.\n\n2. Pre-Bundling of Dependencies : \n - <mark>Vite pre-bundles dependencies using esbuild </mark> , a highly optimized bundler written in Go.\n - Pre-bundling resolves and optimizes common dependencies (like react  , react-dom  ) into a single file during startup.\n - This speeds up the initial load by reducing module resolution time.\n\n3. Hot Module Replacement (HMR) Efficiency:  \n - Vite implements an ultra-fast HMR mechanism that updates <mark>only the affected modules</mark>, not the entire bundle.\n - This drastically reduces the feedback loop compared to traditional bundlers, which often need to rebuild and reload the app.\n\n4. Lazy Compilation :\n - Vite only processes and serves the code being used in the current view.\n - In contrast, traditional bundlers process the entire application, regardless of what's currently needed.\n\n5. Optimized Production Build with esbuild and Rollup : \n - For production, Vite uses Rollup  , which is already optimized for tree-shaking and efficient bundling.\n - Esbuild is used for pre-bundling, making the build process faster.\n\n Issues Vite Addresses :\n\n1. Slow Startup Times:  \n - Problem: Traditional React setups (like Webpack in Create React App) bundle the entire application on startup, leading to slow initial builds.\n - Solution: Vite's dependency pre-bundling and native ES module serving drastically reduce startup time.\n\n2. Long Rebuild Times :\n - Problem: In traditional bundlers, every code change triggers a full or partial rebundle, which grows slower as the application size increases.\n - Solution: Vite's on-demand compilation and module-based HMR keep rebuild times constant, even for large apps.\n\n3. Complex Configuration:  \n - Problem: Webpack and similar tools often require significant configuration for optimized performance.\n - Solution: Vite comes with sensible defaults, making it easier to start and configure without sacrificing performance.\n\n4. Inefficient HMR : \n - Problem: Traditional HMR systems reload larger parts of the application, sometimes the entire page, disrupting the developer's workflow.\n - Solution: Vite's fine-grained HMR updates only the specific module, maintaining state and context in the app.\n\n5. Performance Bottlenecks in Build Tools  :\n - Problem: Tools like Babel are slower compared to modern alternatives, especially for large projects.\n - Solution: Vite uses esbuild for pre-bundling, which is 10–100x faster than traditional JavaScript tools because it’s written in Go.\n\n6. Difficulty with Modern JS Features :\n - Problem: Older bundlers sometimes struggle to handle modern JavaScript and TypeScript features without additional configuration.\n - Solution: Vite supports modern JavaScript, TypeScript, , and CSS out of the box.\n\n  Real-Life Impacts of Vite : \n1. Improved Developer Experience :\n - Faster feedback cycles lead to quicker iterations.\n - Real-time HMR updates allow developers to maintain focus.\n\n2. Scalability : \n - Large applications benefit from consistent and predictable development performance.\n - No significant slowdown as the codebase grows.\n\n3. Ease of Adoption :\n - Vite works seamlessly with popular libraries like React, Vue, and Svelte.\n - It has built-in support for TypeScript, , CSS preprocessors, and more.\n\n Example  :\n Traditional Setup:\n- Changing a single line of CSS or JavaScript might take several seconds for Webpack to rebuild and reload the page.\n\n Vite Setup:\n- The same change is reflected in the browser almost instantly, as only the modified file is recompiled and sent to the browser.\n\n\n\n  Conclusion  \n <b>Vite's speed comes from its modern design philosophy</b>:\n- Relying on the browser's native capabilities during development.\n- Using cutting-edge tools like esbuild and Rollup.\n- Addressing common pain points of traditional bundlers like Webpack.\n\nIt’s a game-changer for modern web development, especially for frameworks like React, Vue, and Svelte.",
    tags: ["comparison"],
    keyFeatures: [],
    actionWords: [
      "pre-bundling ",
      " on demand compilation",
      " native ES module",
      "Webpack bundles the entire application",
    ],
    codeExample: "",
  },
  {
    id: 25,
    topic: "reactJs",
    question:
      "Why React don't uses the optimisation tecqnique used in vite to lower the compile time ?",
    answer:
      "React itself is a  JavaScript library  and not a complete build or development toolchain. The tools and processes used for optimizing compile time are outside the scope of React’s core responsibilities:\n\n1. React's Focus: UI Development  \n-  React is primarily focused on providing a declarative, component-based approach to building user interfaces. \n  - Its core functionality revolves around managing the Virtual DOM, hooks, and rendering updates efficiently.\n  - Build-time optimizations, like reducing compile time, are better handled by tools built specifically for that purpose, such as bundlers and development servers  .\n- Why React Delegates Build Concerns: Optimizing compile times would require React to manage tooling like Babel, Webpack, or esbuild, which is outside its library's scope.\n  2. React’s Build Agnosticism :\n- React is intentionally agnostic about its build tools to ensure flexibility and compatibility with a wide range of ecosystems.\n  - Developers can choose their preferred setup (Webpack, Vite, Parcel, etc.).\n  - React provides essential utilities (like  transpilation) but doesn't mandate how developers should set up their toolchain.\n- For example:\n  - With Create React App (CRA)  , Webpack is used as the bundler by default.\n  - With Vite  , esbuild is used for faster builds.\n  - Next. (a popular React framework) uses Webpack or Rust-based SWC for build optimization.\n\n 3. Vite vs. React: Different Roles  :\n- Vite's Role: Vite is a development server and build tool optimized for fast compile times and efficient bundling.\n- React's Role: React is a library that sits within the application code to handle rendering and updates efficiently. \n  - It does not manage bundling or serving files, which is why tools like Vite, Webpack, or Rollup are necessary for React applications.\n\n4. Historical Context  :\n- React predates modern build tools like Vite. When React was introduced (2013), the JavaScript ecosystem heavily relied on tools like Browserify and later Webpack.\n- The focus was on providing a better way to build UIs, leaving bundling and compilation to external tools. Over time, tools like Vite and esbuild emerged, addressing performance issues with older bundlers.\n\n5. Tooling Evolution in React:  \nWhile React itself does not optimize compile time directly, the React team has made improvements in tooling and frameworks that use React:\n\n1. React Fast Refresh\n - React introduced Fast Refresh to speed up development by preserving state during Hot Module Replacement (HMR).\n - This integrates with modern tools like Vite to provide near-instant updates during development.\n\n2. React Frameworks\n - Frameworks like Next. optimize React applications for server-side rendering (SSR) and static site generation (SSG) while improving build and runtime performance.\n - Next. has adopted faster tools like SWC for build optimizations.\n\n6. Why React Relies on External Tools  :\nOptimizing compile time requires a specialized build process  . Modern tools like Vite or esbuild are optimized for this purpose because they:\n- Leverage language-level optimizations (e.g., esbuild is written in Go, making it inherently faster than Babel, which is written in JavaScript).\n- Use modern dependency graph resolution to speed up module loading and bundling.\n\nBy offloading the responsibility of build-time optimization to tools like Vite, React remains lightweight, modular, and flexible for use in a variety of environments.\n\nHow React ⭐Benefits from Vite  :\nReact indirectly benefits from Vite and similar tools because they improve the developer experience of React projects:\n- Faster compile times.\n- Instant Hot Module Replacement (HMR).\n- Smaller and more optimized production bundles.\n\nVite and React complement each other:\n- React: Focuses on rendering and UI logic.\n- Vite: Focuses on efficient development and build workflows.\n\nConclusion : \nReact doesn’t directly optimize compile time because it’s not a development server or build tool. Instead, it relies on the ecosystem to handle these concerns. By keeping React lightweight and focused on rendering, it allows developers to use tools like Vite for optimal performance without being tied to a specific build process. This separation of concerns ensures that React remains flexible and adaptable as new tools and technologies emerge.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["separation of concerns", " not a complete build tool", " "],
    codeExample: "",
  },
  {
    id: 26,
    topic: "reactJs",
    question: "What is  JSX?",
    answer:
      ' JSX is a <mark>syntax extension for JavaScript that enables you to write HTML-like code within your JavaScript files</mark>, specifically for building React components.\n It enhances readability, integrates seamlessly with JavaScript, and aligns with React\'s component-based architecture, making it a powerful tool for developing modern web applications.\n\n  ⭐Key Features of JSX :-\n\n1. HTML-Like Syntax  :\n -  allows you to write HTML-like tags directly within JavaScript. These tags are then transformed into React elements.\n ```- For example: "<div>Hello, world!</div> " in  corresponds to  "React.createElement(\'div\', null, \'Hello, world!\') " in vanilla JavaScript.```\n\n2. Embedding Expressions  :\n - You can embed JavaScript expressions within  by using curly braces  "{} ". This allows you to dynamically render content based on JavaScript variables or expressions.\n ```- For example,  "<h1>{name}</h1> " renders the value of the  "name " variable within the  "h1 " tag.```\n\n3. Attributes and Children  :\n -  allows you to pass attributes to elements, similar to HTML attributes, and nest child elements within parent elements.\n``` - For example,  "<button className="btn">Click me</button> " includes a  "className " attribute and text child.```\n\n4. Components  :\n -  makes it easy to include and nest React components. Custom components can be rendered using self-closing tags or opening/closing tags.\n ```- For example,  "<MyComponent /> " or  "<MyComponent><ChildComponent /></MyComponent> ".```\n\n5. Type Safety  :\n -  can help catch errors at compile time since it integrates well with type checking tools like TypeScript, providing more robust code.\n\n\n\n ⭐Benefits of Using :\n\n1. Improved Readability  :  provides a clear and concise way to define the structure of your UI, making the code easier to read and understand.\n2. Enhanced Developer Experience  : The HTML-like syntax of  is intuitive for developers familiar with web development, reducing the learning curve.\n3. Integration with JavaScript  :  seamlessly integrates with JavaScript, allowing you to use all the features of JavaScript within your UI definitions.\n4. Component-Based Architecture  :  aligns well with React\'s component-based architecture, making it straightforward to build and compose UI components.\n\n\n\n',
    tags: ["JSX"],
    keyFeatures: [],
    actionWords: ["syntax extension", " type safety"],
    codeExample: "",
  },
  {
    id: 27,
    topic: "reactJs",
    question: "How do browsers read JSX?",
    answer:
      "In general, browsers are not capable of reading  JSX and only can read pure JavaScript. The web browsers read  JSX with the help of a transpiler. \nTranspilers are used to convert  into JavaScript. The transpiler used is called Babel",
    tags: ["JSX"],
    keyFeatures: [],
    actionWords: ["transpiler", " babel"],
    codeExample: "",
  },
  {
    id: 28,
    topic: "reactJs",
    question: "How  JSX prevents Injection Attacks?",
    answer:
      'JSX, which stands for JavaScript XML, is a syntax extension for JavaScript that is used in React to describe what the UI should look like. One important aspect of JSX is that it helps prevent injection attacks, such as Cross-Site Scripting (XSS), by design.\n\n How  Prevents Injection Attacks\n\n1. Automatic Escaping  :\n -  JSX automatically escapes any values embedded within it. This means that when you embed dynamic content in JSX , React converts it to a string and escapes any special characters that could be interpreted as HTML or JavaScript. This escaping helps prevent malicious code from being executed.\n \n\n\n2. Sanitization of Content  :\n - React\'s rendering process ensures that content is sanitized by default. This means that potentially harmful content is neutralized before being rendered to the DOM. This sanitization applies to all dynamic content in JSX , including variables, expressions, and props.\n\n3. Use of Safe Functions for HTML Rendering  :\n - While  JSX itself is secure, developers need to be cautious when using functions that render raw HTML directly to the DOM. For example,  "dangerouslySetInnerHTML " can be used to set HTML content, but it bypasses React\'s escaping mechanisms. It\'s named "dangerously" to remind developers that they should only use it with trusted content.\n\n \n \n\n 📝 Summary :\n\n- Automatic Escaping  : By default,  JSX escapes any embedded dynamic content, turning it into a safe string that can\'t execute scripts.\n- Sanitization of Content  : React ensures that all dynamic content is sanitized before rendering it to the DOM.\n- Caution with  "dangerouslySetInnerHTML "  : While this method allows you to set raw HTML, it bypasses the default protections, and developers should use it with caution and only with trusted content.\n\nBy providing these built-in security measures,  helps developers avoid common pitfalls associated with injection attacks, making React applications more secure by default.',
    tags: ["JSX"],
    keyFeatures: [],
    actionWords: ["auto-escaping", " sanitization of content"],
    codeExample:
      'For example:\n  \n const userInput = "<img src=x onerror=alert(\'XSS\') />";\n const element = <div>{userInput}</div>;\n\n In this case, the  "userInput " string will be safely rendered as plain text, and any potentially harmful HTML tags or scripts will be displayed as they are without being executed.\n\n  const rawHTML = { __ : "<strong>This is bold text</strong>" };\n const element = <div dangerouslySetInnerHTML={rawHTML} />;\n \n\n When using  "dangerouslySetInnerHTML ", you should ensure that the HTML content is sanitized and comes from a trusted source to avoid injection attacks.',
  },
  {
    id: 29,
    topic: "reactJs",
    question: "Explain the creation of a List in react?",
    answer:
      "Creating a list in React involves rendering multiple components dynamically based on an array of data. This is typically done <mark>using the JavaScript map() function</mark>, which iterates over the array and returns a new array of React elements.\n\nSteps to Create a List in React:\n1.Prepare the Data: Start with an array of data that you want to display in the list.\n2.Use map() Function: Use the map() function to iterate over the array and create a React element for each item.\n3.Assign Keys: Each React element created within a list should have a unique key prop. This helps React identify which items have changed, are added, or are removed, which is crucial for efficient updates.\n4.Render the List: Return the list of elements in the component’s render method or function.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["using the JavaScript map() function"],
    codeExample: "",
  },
  {
    id: 30,
    topic: "reactJs",
    question: "What is a key in React?",
    answer:
      "\nThey <mark>help React identify which elements have changed</mark>, ensuring that the minimal number of DOM updates is performed. \nDeveloper should Always use unique and stable keys to avoid issues and ensure optimal performance in their React applications.\n\n Purpose of Keys:\n\n1. Identification  : Keys give each element in a list a unique identity. This helps React distinguish between different elements in the list, even if they have the same content.\n2. Efficiency  : By having unique keys, React can more efficiently update the rendered output by only changing the elements that need to be changed. This minimizes the number of DOM manipulations, leading to better performance.\n3. Predictability  : Using keys makes the behavior of dynamic lists more predictable and helps avoid potential bugs related to element ordering and state management.\n\n When to Use Keys:\n\n- Keys should be provided when rendering lists of elements.\n- <mark>Keys must be unique among siblings</mark>, meaning that each element in a list should have a unique key.\n\n Best Practices for Keys:\n\n1. Unique and Stable  : Keys should be unique and stable. Using an index as a key is acceptable for static lists but not recommended for dynamic lists where items can be reordered, added, or removed. In such cases, use a unique identifier from your data, such as an ID.\n\n2. Consistency  : Ensure that the key remains consistent between renders. If the key changes between renders, it can lead to unexpected behavior and loss of component state.\n\n3. Avoid Using Random Values  : Do not use random values for keys because they will change on every render, negating the benefits of using keys.\n\n\n\n",
    tags: ["key"],
    keyFeatures: [],
    actionWords: [
      "identification",
      "ensures minimal number of DOM updates performed",
      "Keys must be unique among siblings",
    ],
    codeExample: "",
  },
  {
    id: 31,
    topic: "reactJs",
    question: "Should keys be globally unique?",
    answer:
      "The keys used within arrays should be unique among their siblings but they don’t need to be globally unique. i.e, You can use the same keys with two different arrays.",
    tags: ["key"],
    keyFeatures: [],
    actionWords: ["unique among siblings"],
    codeExample: "",
  },
  {
    id: 32,
    topic: "reactJs",
    question: "Explain One-way data binding in React?",
    answer:
      "\nIt <mark>ensures a unidirectional flow of data from parent to child components</mark>. \nThis approach helps <i> maintain predictable state management, simplifies debugging, and promotes modular and reusable components.</i>  \n⭐Key Characteristics of One-Way Data Binding:\n\n1 Unidirectional Data Flow  :\n - Data flows in one direction, from parent to child components, through props.\n -⬇️ Changes to the state or props in a parent component propagate down to its children.\n\n2. Immutable Props  :\n - Props are read-only. A child component cannot modify the props it receives from its parent.\n - Any changes in the data need to be managed by the component that owns the state and passed down again.\n\n3. Controlled Components  :\n - <i>Components that render <u>form elements</u> and control their behavior through React state are known as controlled components</i>.\n - Input elements get their value from state and notify changes via event handlers, maintaining the one-way data flow.\n\n ⭐Benefits of One-Way Data Binding:\n\n1. Predictable Data Flow  :\n - The flow of data is easy to understand and trace, as it moves in a single direction.\n - Makes the application's data flow predictable and easier to debug.\n\n2. Component Isolation  :\n - Child components are isolated from the parent components' state, leading to better modularity and reusability.\n - Each component is responsible for rendering its UI based on the props it receives.\n\n3. Simplified State Management  :\n - Centralizes state management in specific components, reducing the complexity of managing state across the application.\n - Encourages a clear structure for state updates and data passing.\n\n <b>🎯Comparison with Two-Way Data Binding:</b>\n\n- One-Way Data Binding  :\n  - Data flows from parent to child.\n  - Props are immutable and managed by the parent.\n  - More predictable and easier to debug.\n\n- Two-Way Data Binding  :\n  - Data can flow both ways, from parent to child and child to parent.\n  - Typically seen in frameworks like Angular.\n  - Can lead to more complex state management and debugging challenges.\n\n\n\n",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [
      "unidirectional data flow",
      " predictable state management",
      " simplifies debugging",
      " ",
    ],
    codeExample:
      'Example of One-Way Data Binding:==>\n\nParent Component Managing State:\nimport React, { useState } from \'react\';\n\nconst ParentComponent = () => {\n  const [message, setMessage] = useState(\'Hello, world!\');\n\n  const updateMessage = (newMessage) => {\n  setMessage(newMessage);\n  };\n\n  return (\n  <div>\n  <ChildComponent message={message} updateMessage={updateMessage} />\n  </div>\n  );\n};\n\nChild Component Receiving Props:\n\nimport React from \'react\';\n\nconst ChildComponent = ({ message, updateMessage }) => {\n  const handleChange = (event) => {\n  updateMessage(event.target.value);\n  };\n\n  return (\n  <div>\n  <p>{message}</p>\n  <input type="text" value={message} onChange={handleChange} />\n  </div>\n  );\n};\n\nexport default ParentComponent;\n\n Explanation:\n\n1. State Management in Parent Component  :\n - The  "ParentComponent " maintains the state  "message " using the  "useState " hook.\n - It provides the  "message " state and an  "updateMessage " function to the  "ChildComponent " via props.\n\n2. Props in Child Component  :\n - The  "ChildComponent " receives  "message " and  "updateMessage " as props.\n - It renders the  "message " and provides an input field to update the message.\n\n3. Event Handling and State Update  :\n - When the user types in the input field, the  "handleChange " function is called.\n -  "handleChange " calls  "updateMessage ", which updates the state in the parent component.\n - The updated state is passed down to the child component through props, reflecting the change in the UI.\n\n',
  },
  {
    id: 33,
    topic: "reactJs",
    question: 'What is the use of "ref" in React?',
    answer:
      '\nIn React,  "ref " is a special attribute that you can attach to elements and components to <mark>directly access their underlying DOM nodes or React elements</mark>.\n It provides <mark>a way to interact with DOM elements or React components directly</mark>, bypassing the usual data flow, which can be useful in various scenarios.\n\n 👉Key Uses of  "ref " in React:\n\n1. Accessing DOM Elements  :\n -  "ref " can be used to get direct access to a DOM element for reading values, manipulating styles, or setting focus.\n 2. Managing Focus and Text Selection  :\n -  "ref " is useful for managing focus, especially in form elements.\n - You can also use it to select text within an input or textarea.\n\n3. Triggering Animations  :\n -  "ref " can be used to interact with elements that need animations, like triggering CSS transitions or using libraries like GSAP.\n\n4. Integrating with Third-Party Libraries  :\n - When you need to integrate a third-party DOM library that manipulates the DOM directly,  "ref " provides the necessary access to the DOM nodes.\n\n5. Maintaining Scroll Position  :\n - You can use  "ref " to get the scroll position or scroll to a specific position within an element.\n\n6. Accessing Child Components  :\n - In addition to DOM elements,  "ref " can also be used to access React component instances, allowing you to call methods on the child component.\n\n👉Creating and Using Refs:\n\n1. Using  "useRef " Hook (Functional Components)  :\n - The  "useRef " hook creates a  "ref " object that persists across renders.\n\n 📝Summary:\n\n-  "ref " Attribute  : Used to get references to DOM elements or React components.\n-  "useRef " Hook  : Creates a  "ref " in functional components, persisting across renders.\n-  "React.createRef() "  : Creates a  "ref " in class components.\n- Direct Access  : Allows you to interact directly with DOM elements or component instances, useful for managing focus, triggering animations, integrating with third-party libraries, and more.\n\nUsing  "ref " effectively helps manage imperative tasks in React applications while maintaining the declarative nature of the component-based architecture.',
    tags: ["refs"],
    keyFeatures: [],
    actionWords: [
      "access or interact directly with a DOM element",
      "bypasses usual data flow",
      "reading values, manipulating styles, or setting focus",
      "helps manage imperative tasks",
    ],
    codeExample:
      "Example: Using a Ref with a DOM Element\n\nimport React, { useRef, useEffect } from 'react';\n\nfunction InputFocus() {\n  const inputRef = useRef(null);\n\n  useEffect(() => {\n  // Focus the input element when the component mounts\n  inputRef.current.focus();\n  }, []);\n\n  return <input ref={inputRef} type=\"text\" />;\n}\n\nexport default InputFocus;\n\nExample: Storing Mutable Values\n\nimport React, { useRef } from 'react';\r\n\r\nfunction Timer() {\r\n  // Ref to store the timer ID\r\n  const timerRef = useRef();\r\n\r\n  const startTimer = () => {\r\n  timerRef.current = setInterval(() => {\r\n  console.log('Timer tick');\r\n  }, 1000);\r\n  };\r\n\r\n  const stopTimer = () => {\r\n  clearInterval(timerRef.current);\r\n  };\r\n\r\n  return (\r\n  <div>\r\n  <button onClick={startTimer}>Start Timer</button>\r\n  <button onClick={stopTimer}>Stop Timer</button>\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default Timer;\r\n",
  },
  {
    id: 34,
    topic: "reactJs",
    question: "What are hooks in React?",
    answer:
      '\nHooks are functions that let you “hook into” React state and lifecycle features from function components\nThey were introduced in React version 16.8 to provide a simpler and more <mark>efficient way to manage state and side effects in functional components</mark>, without needing to use class components.\n\n👉Key Points about React Hooks:\n\n1. useState in Functional Components  : Hooks like  "useState " allow functional components to have local state.\n2. Reusable Logic  : Hooks enable the extraction and reuse of stateful logic across multiple components without changing their hierarchy.\n3. Built-In Hooks  : React provides several built-in hooks, including  "useState ",  "useEffect ",  "useContext ",  "useReducer ", and more, to cover different use cases.\n4. Custom Hooks  : You can create your own custom hooks to encapsulate reusable stateful logic.\n5. Rules of Hooks  : Hooks have rules that must be followed, such as being called at the top level of a functional component and in the same order within the component.\n6. No Need for Classes  : With hooks, functional components can handle complex state and side effects without needing to use class components.',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: ["hooks-into", "efficient way to manage state and side effects in functional components"],
    codeExample: "",
  },
  {
    id: 35,
    topic: "reactJs",
    question: "Explain the useState hook in React?",
    answer:
      '\nThe  "useState " hook in React is a function that <mark>allows functional components to have local state</mark>. It enables you to declare state variables within functional components and provides a way to update them. \n\n👉Key Points about  "useState ":\n\n1. State Declaration  : You declare a state variable using the  "useState " hook by providing an initial value. React returns an array containing the current state value and a function to update that value.\n\n2. Updating State  : The function returned by  "useState " ( "setState ") is used to update the state variable. When you call  "setState " with a new value, React re-renders the component with the updated state.\n\n3. Immutable Updates  : State updates are immutable. This means you should not directly modify the state variable, but rather use the function returned by  "useState " to update it.\n\n4. Multiple State Variables  : You can use  "useState " multiple times within a single component to manage multiple independent state variables.\n\n',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: ["allows functional components to have local state"],
    codeExample: "",
  },
  {
    id: 36,
    topic: "reactJs",
    question: "Explain the useReducer hook in React?",
    answer:
      "The useReducer hook is a powerful tool for <mark>managing complex state logic in React functional components</mark>. It provides a more structured approach to state management, making it easier to handle state transitions and maintain predictable state changes.",
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [
      "manages complex state logics ",
      " structured approach to state management",
    ],
    codeExample:
      "import React, { useReducer } from 'react';\r\n\r\n// Define the reducer function\r\nfunction counterReducer(state, action) {\r\n  switch (action.type) {\r\n  case 'increment':\r\n  return { count: state.count + 1 };\r\n  case 'decrement':\r\n  return { count: state.count - 1 };\r\n  case 'reset':\r\n  return { count: 0 };\r\n  default:\r\n  throw new Error(Unsupported action type: ${action.type});\r\n  }\r\n}\r\n\r\nfunction Counter() {\r\n  // Initialize state with a reducer\r\n  const [state, dispatch] = useReducer(counterReducer, { count: 0 });\r\n\r\n  return (\r\n  <div>\r\n  <h2>Count: {state.count}</h2>\r\n  <button onClick={() => dispatch({ type: 'increment' })}>\r\n  Increment\r\n  </button>\r\n  <button onClick={() => dispatch({ type: 'decrement' })}>\r\n  Decrement\r\n  </button>\r\n  <button onClick={() => dispatch({ type: 'reset' })}>\r\n  Reset\r\n  </button>\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default Counter;\r",
  },
  {
    id: 37,
    topic: "reactJs",
    question: "Explain the useContext hook in React?",
    answer:
      " Context <mark>provides a way to pass data through the component tree without having to pass props down manually at every level</mark>. This is particularly useful for globally accessible data, such as theme settings, user authentication, and application settings.",
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [" a way to pass data through the component tree ", "useful for globally accessible data"],
    codeExample:
      "Creating the Context:\n// ThemeContext.\r\nimport React from 'react';\r\n\r\nconst ThemeContext = React.createContext('light'); // 'light' is the default value\r\n\r\nexport default ThemeContext;\n\r\nProviding the Context Value:\n// App.\r\nimport React, { useState } from 'react';\r\nimport ThemeContext from './ThemeContext';\r\nimport ThemedComponent from './ThemedComponent';\r\n\r\nfunction App() {\r\n  const [theme, setTheme] = useState('light');\r\n\r\n  return (\r\n  <ThemeContext.Provider value={theme}>\r\n  <div>\r\n  <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>\r\n  Toggle Theme\r\n  </button>\r\n  <ThemedComponent />\r\n  </div>\r\n  </ThemeContext.Provider>\r\n  );\r\n}\r\n\r\nexport default App;\r\n\nConsuming the Context Value:\n\n// ThemedComponent.\r\nimport React, { useContext } from 'react';\r\nimport ThemeContext from './ThemeContext';\r\n\r\nfunction ThemedComponent() {\r\n  // useContext accesses the current context value for ThemeContext\r\n  const theme = useContext(ThemeContext);\r\n\r\n  const style = {\r\n  padding: '20px',\r\n  background: theme === 'light' ? 'f0f0f0' : '333',\r\n  color: theme === 'light' ? '333' : 'f0f0f0',\r\n  textAlign: 'center'\r\n  };\r\n\r\n  return <div style={style}>The current theme is {theme}</div>;\r\n}\r\n\r\nexport default ThemedComponent;\r\n\n",
  },
  {
    id: 38,
    topic: "reactJs",
    question: "Explain the useRef hook in React?",
    answer:
      "The useRef hook is a React hook that provides a way to access and interact with DOM elements directly, as well as to persist values between renders without causing a re-render. It is similar to useState, but it does not trigger a re-render when the value it holds changes.",
    tags: ["hooks", "refs"],
    keyFeatures: [],
    actionWords: ["a way to access and interact with DOM elements directly"],
    codeExample: "",
  },
  {
    id: 39,
    topic: "reactJs",
    question: "Explain the useImperativeHandle hook in React?",
    answer:
      "The useImperativeHandle hook in React allows a child component to customize the instance value that is exposed to parent components when using refs. It’s typically used with forwardRef to let parent components call specific methods on a child component instead of exposing the entire DOM node or component instance.\n\n\n\n Why Use useImperativeHandle?\n\n- Encapsulation:  \n  It lets you expose only a controlled subset of functionality from a child component to its parent. This helps maintain encapsulation, hiding internal implementation details.\n\n- Custom Methods:  \n  Instead of giving the parent full access to the child’s DOM node or instance, you can expose custom methods (like focus, reset, etc.) that the parent can call.\n\n- Enhanced Reusability:  \n  By controlling what’s exposed, components remain flexible and reusable without giving up internal control.\n\n\n\n How It Works\n\n1. Wrap the Child with forwardRef:  \n This allows the child to receive a ref from the parent.\n\n2. Use useImperativeHandle Inside the Child:  \n Within the child component, call useImperativeHandle(ref, createHandle, deps) to specify what values or methods should be available on the ref.\n\n\n\n\n When to Use useImperativeHandle\n\n- When you need to expose a limited API:  \n  For example, when building reusable input components that need to support methods like focus, clear, or validation.\n- To maintain encapsulation:  \n  Preventing the parent from directly interacting with the child’s internals, and instead only allowing specific actions.\n- In conjunction with forwardRef:  \n  Since refs by themselves only expose the underlying DOM node, useImperativeHandle lets you customize what’s actually available.\n\nBy using useImperativeHandle, you provide a clean, controlled interface for parent components to interact with child components, improving encapsulation and reusability in your React applications.",
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      " Example\n\nBelow is an example of a custom input component that exposes two imperative methods: focus and clear. The parent component can then call these methods via the ref.\n\n Child Component (Forwarding Ref and Using useImperativeHandle)\n\nx\nimport React, { useRef, forwardRef, useImperativeHandle } from 'react';\n\nconst CustomInput = forwardRef((props, ref) => {\n  const inputRef = useRef();\n\n  // Expose specific methods to the parent via the ref.\n  useImperativeHandle(ref, () => ({\n  focus: () => {\n  inputRef.current.focus();\n  },\n  clear: () => {\n  inputRef.current.value = '';\n  }\n  }));\n\n  return <input ref={inputRef} type=\"text\" placeholder=\"Type something...\" />;\n});\n\nexport default CustomInput;\n\n\n Parent Component\n\nx\nimport React, { useRef } from 'react';\nimport CustomInput from './CustomInput';\n\nfunction ParentComponent() {\n  const inputRef = useRef();\n\n  const handleFocus = () => {\n  // Call the exposed focus method from the child component.\n  inputRef.current.focus();\n  };\n\n  const handleClear = () => {\n  // Call the exposed clear method from the child component.\n  inputRef.current.clear();\n  };\n\n  return (\n  <div>\n  <CustomInput ref={inputRef} />\n  <button onClick={handleFocus}>Focus Input</button>\n  <button onClick={handleClear}>Clear Input</button>\n  </div>\n  );\n}\n\nexport default ParentComponent;\n\n\n\n\n Explanation\n\n- Forwarding the Ref:  \n  The CustomInput component is wrapped with forwardRef, allowing it to receive a ref from its parent.\n\n- Using useImperativeHandle:  \n  Inside CustomInput, useImperativeHandle is used to specify an object that contains only the focus and clear methods. This object becomes the instance value accessible to the parent via the ref.\n\n- Accessing the Methods:  \n  In the ParentComponent, the ref (inputRef) is attached to CustomInput. When the buttons are clicked, the parent calls inputRef.current.focus() or inputRef.current.clear(), which trigger the respective methods defined in the child component.\n\n",
  },
  {
    id: 40,
    topic: "reactJs",
    question: "Explain the useEffect hook in react?",
    answer:
      'The  "useEffect " hook in React is used to perform side effects in functional components.\n Side effects can include data fetching, subscriptions, or manually changing the DOM. \n\n ⭐Key Points about  "useEffect ":\n\n1. Side Effects  :  "useEffect " is designed to handle side effects in functional components. Side effects are actions that occur outside the scope of the component\'s render cycle, such as data fetching, DOM manipulation, or setting up subscriptions.\n\n2. Runs After Render  : The function passed to  "useEffect " is called after every render, including the initial render. This means it runs both after the first render and after every update.\n\n3. Cleanup Function  : The function returned by  "useEffect " can be used to perform cleanup tasks. This cleanup function runs before the component is removed from the UI or before the effect is re-run due to changes in dependencies.\n\n4. Dependency Array  : You can specify dependencies as the second argument to  "useEffect ". If provided, the effect will only re-run if any of the dependencies change. Omitting the dependency array causes the effect to run after every render.\n\n',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 41,
    topic: "reactJs",
    question: "Explain the useLayoutEffect hook in React?",
    answer:
      "The  useLayoutEffect  hook in React is similar to  useEffect , but it differs in when it runs relative to the rendering process.\n\n\n\n ⭐Key Points about  useLayoutEffect :\n1. Execution Timing:\n -  useLayoutEffect  runs synchronously after all DOM mutations (changes to the DOM) have been made but before the browser paints the screen.\n - This makes it useful for operations that need to occur before the user sees the updated UI.\n\n2. Use Case:\n - It is often used when you need to:\n - Measure the DOM.\n - Perform layout adjustments.\n - Synchronize side effects directly related to the DOM (like applying styles based on measurements).\n\n3. Comparison with  useEffect :\n -  useEffect  runs asynchronously after the DOM updates and the browser has painted.\n - Use  useEffect  when your operations don’t need to block the painting of the browser.\n - Use  useLayoutEffect  if your operations must happen before the screen updates, to avoid flickers or incorrect visuals.\n\n4. Warning:\n - Overusing  useLayoutEffect  can block the browser’s rendering process, leading to performance issues. Use it only when necessary.\n\n When to Use  useLayoutEffect :\n- When you need to measure or manipulate the DOM before the user sees the changes.\n- For animations, measuring dimensions, or syncing visual elements.\n\n\n\n Avoid Overusing:\n- If the side effects don’t need to block the browser’s painting, prefer  useEffect  to ensure better performance.",
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: ["runs before the browser paints the screen"],
    codeExample: "",
  },
  {
    id: 42,
    topic: "reactJs",
    question: "Explain the useInsertionEffect hook in React?",
    answer:
      "The useInsertionEffect hook is a relatively new addition to React (introduced around React 18) and is designed specifically for CSS-in-JS libraries or similar scenarios where you need to inject styles into the DOM at a very early stage of the render process.\r\n\r\n\r\n\r\n What It Does\r\n\r\n- Early Style Insertion:  \r\n  useInsertionEffect runs synchronously before any DOM mutations occur, even before useLayoutEffect. This timing is crucial for libraries that need to inject or update CSS styles so that the browser uses the correct styles during the initial paint.\r\n\r\n- Avoiding FOUC (Flash of Unstyled Content):  \r\n  By inserting styles early, you can help prevent issues like a flash of unstyled content (FOUC) that might occur if styles are injected too late.\r\n\r\n- Specific Use Case:  \r\n  This hook is intended to be used by CSS-in-JS libraries that generate styles dynamically. It ensures that the generated styles are in place before the browser performs layout and paint, thereby ensuring consistency between the server and client renders.\r\n\r\n\r\n\r\n How It Works\r\n\r\nuseInsertionEffect works similarly to other effect hooks but with a very specific execution timing:\r\n- It runs after the render phase but before the DOM is mutated.\r\n- It is meant to be used only for side effects related to style insertion.\r\n\r\nBecause of its early timing, you should avoid putting any code here that has side effects unrelated to style injection.\r\n\r\n\r\n\r\n When to Use It\r\n\r\n- CSS-in-JS Libraries:  \r\n  Libraries like Emotion or styled-components (in certain scenarios) might use useInsertionEffect internally to inject critical CSS as early as possible.\r\n\r\n- Avoid General Side Effects:  \r\n  For most other side effects, you should use useEffect or useLayoutEffect. Reserve useInsertionEffect for cases strictly related to style insertion.\r\n\r\n\r\n\r\n 📝 Summary :\r\n\r\n- Purpose:  \r\n  Ensures dynamically generated styles are injected before the browser performs layout and paint.\r\n\r\n- Timing:  \r\n  Synchronously runs before DOM mutations, making it ideal for preventing flashes of unstyled content.\r\n\r\n- Usage:  \r\n  Primarily intended for CSS-in-JS libraries, not for general side effects.\r\n\r\nThis hook helps improve the visual stability of your application when working with dynamic styles, ensuring that the user sees the correct styling immediately upon render.",
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: ["inject styles into the DOM", ""],
    codeExample:
      " Example\r\n\r\nBelow is a simplified example of how one might use useInsertionEffect to insert a style tag dynamically:\r\n\r\nx\r\nimport React, { useInsertionEffect } from 'react';\r\n\r\nfunction MyComponent() {\r\n  useInsertionEffect(() => {\r\n  // Create a new style element\r\n  const style = document.createElement('style');\r\n  style.textContent = \r\n  .dynamic-style {\r\n  color: purple;\r\n  font-weight: bold;\r\n  }\r\n  ;\r\n  // Append the style element to the document head\r\n  document.head.appendChild(style);\r\n\r\n  // Cleanup function to remove the style when component unmounts or dependencies change\r\n  return () => {\r\n  document.head.removeChild(style);\r\n  };\r\n  }, []); // No dependencies: run once on mount\r\n\r\n  return (\r\n  <div className=\"dynamic-style\">\r\n  This text will be styled with dynamically inserted CSS.\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default MyComponent;\r\n\r\n\r\nExplanation:\r\n\r\n- Insertion Phase:  \r\n  The hook runs before the browser applies any layout changes. The style element is created and appended to the document head, ensuring that when the component renders, the styles are already in place.\r\n\r\n- Cleanup:  \r\n  The cleanup function removes the style tag when the component unmounts or when dependencies change (if any).\r\n\r\n\r\n\r",
  },
  {
    id: 43,
    topic: "reactJs",
    question: "Explain the useMemo hook in React?",
    answer:
      "The  useMemo  hook in React is used to optimize performance by memoizing the result of a computation, ensuring that a function's result is only recomputed when its dependencies change  . \n\n\n\n  Why Use  useMemo ?\nIn React, re-renders can be triggered by changes in state or props. If a component performs expensive calculations or has functions that could potentially slow down the application,  useMemo  can be used to cache the computed result and avoid unnecessary recomputations.\n\n\n\n  ⭐Key Points:\n1. Caches Computed Value  : \n - It memoizes (caches) the return value of a function.\n - Only recalculates when one of the dependencies in the dependency array changes.\n\n2. Dependencies  :\n - Similar to  useEffect , it takes a dependency array.\n - If the dependencies do not change,  useMemo  returns the cached value.\n\n3. Not for Side Effects  :\n - Unlike  useEffect ,  useMemo  should not be used to perform side effects (e.g., API calls). It’s strictly for memoizing values  .\n\n4. Performance Optimization  :\n - Especially useful for components that:\n - Render frequently.\n - Have expensive calculations (e.g., filtering, sorting, or computations).\n\n\n\n  How It Works:\n1. Without  useMemo :\n - Every re-render (even when toggling unrelated state) would run  expensiveCalculation  unnecessarily.\n - This would slow down the UI due to repeated expensive computations.\n\n2. With  useMemo :\n -  expensiveCalculation  is only recomputed when  count  changes  .\n - It avoids running the function when the unrelated state ( toggle ) changes.\n\n  When to Use  useMemo :\n- When an operation is computationally expensive.\n- When filtering, sorting, or transforming large datasets.\n- To prevent unnecessary recalculations for derived data in a component.\n  When Not to Use:\n- Avoid using  useMemo  for simple values or light computations. Overusing it can lead to more complex and less maintainable code without noticeable performance benefits. Use it only when you observe performance issues  .",
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [
      "memoize expensive computations",
      "optimizes performance by caching the result ",
    ],
    codeExample:
      "const memoizedValue = useMemo(() => {\n  // Expensive computation or calculation\n  return computeSomething();\n}, [dependencies]);\n\n\nimport React, { useState, useMemo } from 'react';\r\n\r\nfunction ExpensiveComputation({ numbers }) {\r\n  // useMemo to cache the computed sum\r\n  const sum = useMemo(() => {\r\n  console.log('Calculating sum...');\r\n  return numbers.reduce((acc, num) => acc + num, 0);\r\n  }, [numbers]);\r\n\r\n  return (\r\n  <div>\r\n  <h2>Sum: {sum}</h2>\r\n  </div>\r\n  );\r\n}\r\n\r\nfunction App() {\r\n  const [count, setCount] = useState(0);\r\n  const numbers = [1, 2, 3, 4, 5];\r\n\r\n  return (\r\n  <div>\r\n  <button onClick={() => setCount(count + 1)}>\r\n  Increment Count ({count})\r\n  </button>\r\n  <ExpensiveComputation numbers={numbers} />\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default App;\r\n\nThe message \"Calculating sum...\" only appears when the numbers array is different from the previous render. Otherwise, the memoized result is used, improving performance.",
  },
  {
    id: 44,
    topic: "reactJs",
    question: "Explain the useCallback hook in React?",
    answer:
      "The useCallback hook in React is used to memoize functions. It returns a memoized version of the callback function that only changes if one of the dependencies has changed. This can be useful for optimizing performance, especially when passing callbacks to child components that rely on referential equality to prevent unnecessary renders.",
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [
      "Preventing Unnecessary Re-renders",
      "Stabilizing Function References",
      "Performance Optimization",
      " memoize functions",
    ],
    codeExample:
      "import React, { useState, useCallback } from 'react';\r\n\r\nfunction Child({ onClick, label }) {\r\n  console.log('Child rendered:', label);\r\n  return <button onClick={onClick}>{label}</button>;\r\n}\r\n\r\nconst MemoizedChild = React.memo(Child);\r\n\r\nfunction Parent() {\r\n  const [count, setCount] = useState(0);\r\n\r\n  // Using useCallback to memoize the function\r\n  const handleClick = useCallback(() => {\r\n  console.log('Button clicked!');\r\n  }, []); // No dependencies, so handleClick will never change\r\n\r\n  return (\r\n  <div>\r\n  <p>Count: {count}</p>\r\n  <button onClick={() => setCount(count + 1)}>Increment Count</button>\r\n  <MemoizedChild onClick={handleClick} label=\"Click Me\" />\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default Parent;\r",
  },
  {
    id: 45,
    topic: "reactJs",
    question: "What is prop drilling and its disadvantages?",
    answer:
      'Prop drilling, also known as  "component drilling," refers to the process of passing down props from a parent component to deeply nested child components through intermediary components that do not directly use those props.\n\n Disadvantages of Prop Drilling:\n\n1. Prop drilling can lead to increased complexity and boilerplate code, especially in large applications with deeply nested component hierarchies. Each intermediary component needs to pass down props to its child components, leading to verbose code and decreased readability.\n\n2. Prop drilling can create tight coupling between components, as changes to the structure of the component hierarchy or the props passed down may require modifications to multiple components. This can make the codebase more difficult to maintain and refactor.\n\n3.  Passing props through multiple intermediary components can introduce performance overhead, as each component needs to receive and pass along the props, even if they are not directly used by those components. This can impact the rendering performance of the application, especially if the component tree is large or the props are frequently updated.\n\n4. Prop drilling can make testing more challenging, as it may require mocking or stubbing props passed down through intermediary components in order to isolate the behavior of individual components during testing.\n\n Mitigation Strategies:\n\n1. Context API  : Use React Context API to provide a way to share data between components without explicitly passing props through intermediary components. Context allows you to create a global state that can be accessed by any component in the component tree, reducing the need for prop drilling.\n\n2. State Management Libraries  : Consider using state management libraries like Redux or MobX to manage application state in a centralized store. These libraries provide a way to access and update state from any component in the component tree without the need for prop drilling.\n\n3. Higher-Order Components (HOCs)  : Use higher-order components to abstract away prop drilling logic and provide a cleaner interface for passing props down to deeply nested components. HOCs allow you to enhance components with additional functionality without modifying their underlying implementation.\n\n4. Render Props  : Utilize the render props pattern to pass down functions as props to child components, allowing them to access and manipulate data without directly relying on props passed down from parent components.\n\nBy considering these strategies and adopting best practices for managing component state and data flow, you can mitigate the disadvantages of prop drilling and maintain a more scalable and maintainable codebase in your React applications.',
    tags: ["props"],
    keyFeatures: [],
    actionWords: [
      "passing down props to deeply nested child",
      " increased complexity",
      " tight coupling",
      "performance overhead",
      " challenge to testing",
    ],
    codeExample: "",
  },
  {
    id: 46,
    topic: "reactJs",
    question: "What is custom hooks in React?",
    answer:
      'Custom hooks in React are JavaScript functions that follow a specific naming convention ( "use... ") and allow you to extract and reuse stateful logic from functional components. \nThey enable you to share logic between components without the need for higher-order components, render props, or prop drilling.\n\n ⭐Key Points about Custom Hooks:\n\n1. Naming Convention  : Custom hooks must be named with the prefix  "use " to indicate that they are hooks. This naming convention is important for linting tools and to ensure that React recognizes them as hooks.\n\n2. Stateful Logic  : Custom hooks can encapsulate stateful logic, such as managing state with  "useState ", performing side effects with  "useEffect ", or accessing context with  "useContext ".\n\n3. Reusability  : Custom hooks allow you to reuse stateful logic across multiple components without duplicating code. This promotes code reusability and helps keep components focused on their specific concerns.\n\n4. Composable  : Custom hooks can be composed together to create more complex behavior. They can call other hooks, including other custom hooks, allowing you to build on top of existing hooks to create custom behavior tailored to your application\'s needs.\n\n5. No Side Effects  : Custom hooks should not have side effects like rendering components, modifying the DOM, or performing network requests. They are meant to encapsulate reusable logic and should be pure functions.\n\nBy creating and using custom hooks, you can modularize and share stateful logic across your React components, leading to cleaner, more maintainable code.',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [
      "Encapsulate common logic",
      "indepdent testing",
      " reuse stateful logic",
    ],
    codeExample:
      "import { useState, useEffect } from 'react';\r\n\r\nfunction useFetch(url) {\r\n  const [data, setData] = useState(null);\r\n  const [loading, setLoading] = useState(true);\r\n  const [error, setError] = useState(null);\r\n\r\n  useEffect(() => {\r\n  // Define an async function to fetch data\r\n  async function fetchData() {\r\n  try {\r\n  const response = await fetch(url);\r\n  if (!response.ok) {\r\n  throw new Error('Network response was not ok');\r\n  }\r\n  const on = await response.on();\r\n  setData(on);\r\n  } catch (err) {\r\n  setError(err);\r\n  } finally {\r\n  setLoading(false);\r\n  }\r\n  }\r\n\r\n  // Call the async function\r\n  fetchData();\r\n  }, [url]);\r\n\r\n  return { data, loading, error };\r\n}\r\n\r\nexport default useFetch;\r",
  },
  {
    id: 47,
    topic: "reactJs",
    question: "What are forward refs?",
    answer:
      'Forward refs are a feature in React that allows components to pass a ref down to a child component. This enables the parent component to access the DOM node or React component instance created by the child component.\n\n ⭐Key Points about Forward Refs:\n\n1. Usage  :\n - Forward refs are commonly used when you need to access or manipulate the DOM node or React component instance of a child component from its parent component.\n\n2. Ref Forwarding  :\n - To forward a ref from a parent component to a child component, the child component needs to accept a ref as a prop and then pass that ref to the underlying DOM node or React component instance using the  "React.forwardRef " function.\n\n3. Function Component Support  :\n - Forward refs work with both function components and class components. Function components use the  "React.forwardRef " higher-order component to forward the ref, while class components use the  "React.forwardRef " API as a static method.\n\n5. Use Cases  :\n - Forward refs are useful for scenarios such as managing focus, measuring elements, or triggering imperative animations in child components from their parent components.\n\n When to Use Forward Refs:\n\n- Use forward refs when you need to access or manipulate the DOM node or React component instance of a child component from its parent component.\n- Use them sparingly and only when necessary, as they introduce an imperative and less declarative approach to component communication.\n\nIn summary, forward refs in React provide a mechanism for components to pass refs through to their child components, enabling parent components to interact with child components\' underlying DOM nodes or React component instances. They are useful for certain use cases but should be used judiciously to maintain a clean and maintainable codebase.',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: ["passing ref to child", ""],
    codeExample:
      'import React, { forwardRef, useRef } from \'react\';\r\n\r\n// Child component that forwards its ref to the underlying <input>\r\nconst FancyInput = forwardRef((props, ref) => {\r\n  return (\r\n  <div>\r\n  <input ref={ref} type="text" placeholder="Enter text here" />\r\n  </div>\r\n  );\r\n});\r\n\r\nfunction ParentComponent() {\r\n  const inputRef = useRef(null);\r\n\r\n  const handleFocus = () => {\r\n  // Using the forwarded ref to focus the input inside FancyInput\r\n  inputRef.current.focus();\r\n  };\r\n\r\n  return (\r\n  <div>\r\n  <FancyInput ref={inputRef} />\r\n  <button onClick={handleFocus}>Focus the input</button>\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default ParentComponent;\r',
  },
  {
    id: 48,
    topic: "reactJs",
    question: "What is the difference between useState and useRef hook",
    answer:
      "1.useState causes components to re-render after state updates whereas useRef doesn’t cause a component to re-render when the value or state changes. Essentially, useRef is like a “box” that can hold a mutable value in its (.current) property.\r\n2.useState allows us to update the state inside components. While useRef allows referencing DOM element",
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 49,
    topic: "reactJs",
    question:
      "What are the differences between useEffect and useLayoutEffect hooks?",
    answer:
      'The  "useEffect " and  "useLayoutEffect " hooks in React are used to perform side effects in function components. While they are similar in many ways, there are key differences between them, particularly in terms of when they are executed and how they affect the rendering process.\n\n Differences between  "useEffect " and  "useLayoutEffect ":\n\n1. Timing of Execution  :\n -  "useEffect ": The effects specified inside  "useEffect " are scheduled to run after the browser has painted the screen, meaning they are deferred until after the browser has rendered the component and its children.\n -  "useLayoutEffect ": The effects specified inside  "useLayoutEffect " are scheduled to run synchronously after all DOM mutations, but before the browser has painted the screen. This means they run before the browser has painted the changes to the UI, potentially blocking the browser from updating the screen.\n\n2. Performance Implications  :\n -  "useEffect ": Since effects in  "useEffect " are deferred until after the browser has painted, they don\'t block the browser from updating the screen. This makes  "useEffect " more suitable for effects that don\'t need to be synchronous with the rendering process and can be deferred.\n -  "useLayoutEffect ": Effects in  "useLayoutEffect " are executed synchronously before the browser updates the screen. While this ensures that the effects run before the user sees the changes, it can potentially block the rendering process and cause jank if the effects are computationally expensive.\n\n3. Use Cases  :\n -  "useEffect ": Use  "useEffect " for most side effects that don\'t need to be synchronous with the rendering process, such as data fetching, setting up event listeners, or updating document titles.\n -  "useLayoutEffect ": Use  "useLayoutEffect " when you need to perform side effects that rely on the DOM being updated synchronously, such as measuring DOM elements or performing imperative layout calculations.\n\n\n\nIn summary,  "useEffect " is typically used for most side effects, while  "useLayoutEffect " is used when you need to perform side effects that need to be synchronized with the rendering process.',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [
      "useEffect runs after the browser has painted the DOM",
      "\nuseLayoutEffect  Runs synchronously after DOM mutations and before the browser repaints",
    ],
    codeExample:
      "import React, { useLayoutEffect, useRef, useState } from 'react';\r\n\r\nfunction LayoutEffectExample() {\r\n  const [width, setWidth] = useState(0);\r\n  const boxRef = useRef(null);\r\n\r\n  useLayoutEffect(() => {\r\n  // Measure the width of the box before the browser repaints\r\n  if (boxRef.current) {\r\n  setWidth(boxRef.current.getBoundingClientRect().width);\r\n  }\r\n  }, []);\r\n\r\n  return (\r\n  <div>\r\n  <div \r\n  ref={boxRef} \r\n  style={{ width: '50%', padding: '20px', background: 'lightblue' }}\r\n  >\r\n  Resize the window to see width change.\r\n  </div>\r\n  <p>The box width is: {width}px</p>\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default LayoutEffectExample;\r",
  },
  {
    id: 50,
    topic: "reactJs",
    question: "What is the difference between useContext & useReducer hook ?",
    answer:
      'The  "useContext " and  "useReducer " hooks in React serve different purposes but can be complementary in certain scenarios. Here’s a breakdown of each hook and their differences:\n\n  "useContext "\n\n  Purpose  : \n-  "useContext " hook allows functional components to consume a context (data that can be accessed throughout the component tree without passing props down manually).\n\n  Usage  :\n- It is used to access the value of a context object that has been created using  "React.createContext ".\n\n\n\n  "useReducer "\n\n  Purpose  :\n-  "useReducer " hook is a more powerful alternative to  "useState " when dealing with complex state logic that involves multiple sub-values or when the next state depends on the previous one.\n\n  Usage  :\n- It is used to manage state transitions in a more predictable and testable way. It accepts a reducer function with the current state and an action, and returns the new state.\n\n Differences\n\n1. Purpose  :\n -  "useContext ": For accessing context values that are provided higher up in the component tree.\n -  "useReducer ": For managing state that involves complex logic or when state transitions depend on previous states.\n\n2. Usage  :\n -  "useContext " is straightforward for accessing context values.\n -  "useReducer " requires defining a reducer function and handling state transitions based on dispatched actions.\n\n3. State Management  :\n -  "useContext " does not manage state; it only provides access to context values.\n -  "useReducer " manages state transitions based on actions dispatched to the reducer function.\n\n4. Complexity  :\n -  "useReducer " is more suitable for complex state management scenarios compared to  "useContext ".\n\n',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [
      "Retrieve and consume context data",
      "\nManage complex state logic within a component",
    ],
    codeExample:
      "import React, { createContext, useContext } from 'react';\r\n\r\n// Create a Context with a default value\r\nconst ThemeContext = createContext('light');\r\n\r\nfunction ThemedComponent() {\r\n  // Access the current theme value from context\r\n  const theme = useContext(ThemeContext);\r\n  return <div>The current theme is {theme}</div>;\r\n}\r\n\r\nfunction App() {\r\n  return (\r\n  // Provide a value for the context\r\n  <ThemeContext.Provider value=\"dark\">\r\n  <ThemedComponent />\r\n  </ThemeContext.Provider>\r\n  );\r\n}\r\n\r\nexport default App;\r",
  },
  {
    id: 51,
    topic: "reactJs",
    question: "How do you compare useState and useReducer?",
    answer:
      ' "useState " and  "useReducer " are both React hooks used for managing state in functional components, but they serve slightly different purposes and have different use cases. \n When to Use Each:\n\n- useState is preferred for managing simple, independent state values or when the state transitions are straightforward and don\'t involve complex logic.\n- useReducer is more suitable for managing complex state logic, state that involves multiple sub-values, or when the next state depends on the previous one, such as in forms, animations, or data fetching.\n\n useState:\n\n1. Simple State Management  :\n -  "useState " is suitable for managing simple state values or independent pieces of state within a component.\n\n2. Individual State Values  :\n - Each call to  "useState " manages a single piece of state, so you typically use multiple  "useState " calls to manage multiple state values in a component.\n\n3. Update Function  :\n -  "useState " returns a state value and a function to update that value directly. It\'s straightforward and intuitive for managing state in components.\n useReducer:\n\n1. Complex State Logic  :\n -  "useReducer " is more suitable for managing complex state logic or state that involves multiple sub-values or dependencies.\n\n2. Single State Object  :\n - With  "useReducer ", you manage state using a single state object and a reducer function, allowing you to encapsulate complex state transitions and logic in one place.\n\n3. Action-Based Updates  :\n - State updates in  "useReducer " are based on actions dispatched to the reducer function. This allows for more controlled and predictable state updates, especially when the next state depends on the previous one.\n\n\n \n\n\n\nIn summary, while both  "useState " and  "useReducer " serve the purpose of managing state in React components,  "useState " is simpler and more straightforward for managing simple state values, while  "useReducer " provides a more structured approach for managing complex state logic and transitions. The choice between them depends on the specific requirements and complexity of the state management in your component.',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: ["simple vs complex state management"],
    codeExample:
      "useState Example : \nimport React, { useState } from 'react';\r\n\r\nfunction Counter() {\r\n  const [count, setCount] = useState(0);\r\n\r\n  return (\r\n  <div>\r\n  <p>Count: {count}</p>\r\n  <button onClick={() => setCount(count + 1)}>Increment</button>\r\n  <button onClick={() => setCount(count - 1)}>Decrement</button>\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default Counter;\n\nuseReducer Example : \n\nimport React, { useReducer } from 'react';\r\n\r\n// Define the reducer function\r\nfunction counterReducer(state, action) {\r\n  switch (action.type) {\r\n  case 'increment':\r\n  return { count: state.count + 1 };\r\n  case 'decrement':\r\n  return { count: state.count - 1 };\r\n  default:\r\n  return state;\r\n  }\r\n}\r\n\r\nfunction Counter() {\r\n  const [state, dispatch] = useReducer(counterReducer, { count: 0 });\r\n\r\n  return (\r\n  <div>\r\n  <p>Count: {state.count}</p>\r\n  <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>\r\n  <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default Counter;\r\n\n\r\n",
  },
  {
    id: 52,
    topic: "reactJs",
    question: "What rules need to be followed for hooks?",
    answer:
      "1.Call Hooks only at the top level of your react functions: You should always use hooks at the top level of react function before any early returns. i.e, You shouldn’t call Hooks inside loops, conditions, or nested functions. This will ensure that Hooks are called in the same order each time a component renders and it preserves the state of Hooks between multiple re-renders due to useState and useEffect calls.\r\n2.Call Hooks from React Functions only: You shouldn’t call Hooks from regular JavaScript functions or class components. Instead, you should call them from either function components or custom hooks.",
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: ["top level", " only use in react function"],
    codeExample: "",
  },
  {
    id: 53,
    topic: "reactJs",
    question: "What is the difference between useref and createRef in React ?",
    answer:
      'The main difference between  "useRef " and  "createRef " in React lies in their usage and purpose:\n\n1.  "createRef "  :\n -  "createRef " is a method provided by React for creating a ref object.\n - It is typically used in class components to create a ref that can be attached to a DOM element or a React component instance.\n - When using  "createRef ", you create a ref in the constructor of a class component and then attach it to a DOM element or React component instance using the  "ref " attribute.\n\n2.  "useRef "  :\n -  "useRef " is a hook provided by React for creating a mutable ref object.\n - It is used in functional components to create a ref that persists across re-renders.\n - Unlike  "createRef ", which is used in class components,  "useRef " is used in functional components and can be called directly within the function body.\n - The ref object created with  "useRef " can hold a mutable value that persists between renders, making it useful for storing references to DOM elements, previous values, or any mutable value that needs to persist between renders.\n -  "useRef " does not automatically attach the ref to a DOM element or React component instance. Instead, you can assign the ref to a DOM element or React component manually using the  "ref " attribute or by accessing the  ".current " property of the ref object.\n\nIn summary,  "createRef " is used in class components to create a ref object, while  "useRef " is used in functional components to create a mutable ref object that persists across re-renders. Additionally,  "useRef " is more versatile and can hold any mutable value, not just references to DOM elements or React component instances.',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: ["method vs hook", " class vs functional component"],
    codeExample:
      'Using useRef in a Functional Component\nimport React, { useRef } from \'react\';\n\nfunction UseRefExample() {\n  const inputRef = useRef(null);\n\n  const focusInput = () => {\n  // The ref remains the same across renders\n  inputRef.current.focus();\n  };\n\n  return (\n  <div>\n  <input ref={inputRef} type="text" placeholder="Focus me" />\n  <button onClick={focusInput}>Focus Input</button>\n  </div>\n  );\n}\n\nexport default UseRefExample;\n\nUsing createRef in a Class Component\n\n\nimport React, { Component } from \'react\';\r\n\r\nclass CreateRefExample extends Component {\r\n  constructor(props) {\r\n  super(props);\r\n  // createRef creates a new ref that persists for the component instance\r\n  this.inputRef = React.createRef();\r\n  }\r\n\r\n  focusInput = () => {\r\n  // We access the current value of the ref to focus the input\r\n  this.inputRef.current.focus();\r\n  };\r\n\r\n  render() {\r\n  return (\r\n  <div>\r\n  <input ref={this.inputRef} type="text" placeholder="Focus me" />\r\n  <button onClick={this.focusInput}>Focus Input</button>\r\n  </div>\r\n  );\r\n  }\r\n}\r\n\r\nexport default CreateRefExample;\r\n',
  },
  {
    id: 54,
    topic: "reactJs",
    question: "What is context API?",
    answer:
      'The Context API is a feature in React that provides a way to share data between components without having to pass props through every level of the component tree explicitly. \nIt allows you to create a global state that can be accessed by any component in the component tree, regardless of their position in the hierarchy.\n\n ⭐Key Points about Context API:\n\n1. Global State  : Context API allows you to create a global state that can be accessed by any component in the component tree. This eliminates the need to pass props down through intermediary components to share data between deeply nested components.\n\n2. Provider-Consumer Model  : Context API follows a provider-consumer model, where a provider component wraps the part of the component tree that needs access to the shared data, and consumer components can access that data anywhere within the provider\'s subtree.\n\n3. Context Object  : A context object is created using the  "React.createContext() " function. This context object consists of two components: the Provider and the Consumer.\n\n4. Provider Component  : The Provider component is responsible for providing the shared data to its descendants. It accepts a  "value " prop, which contains the data to be shared.\n\n5. Consumer Component  : The Consumer component is used to access the shared data provided by the nearest Provider ancestor in the component tree. It uses a render prop or the useContext hook to access the value provided by the context.\n\n6. Dynamic Context  : Context values can be dynamic and updated over time. When the value of the context changes, all components that consume that context will re-render to reflect the updated value.\n\n',
    tags: ["context"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 55,
    topic: "reactJs",
    question: "Explain provider and consumer in ContextAPI?",
    answer:
      "A provider is used to provide context to the whole application whereas a consumer consume the context provided by nearest provider. In other words The Provider acts as a parent it passes the state to its children whereas the Consumer uses the state that has been passed. ",
    tags: ["context"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      'import React, { createContext, useState } from \'react\';\r\n\r\n// 1. Create a Context\r\nconst MyContext = createContext();\r\n\r\n// 2. Create a Provider Component\r\nfunction MyProvider({ children }) {\r\n  const [value, setValue] = useState("Hello from Context");\r\n\r\n  return (\r\n  <MyContext.Provider value={{ value, setValue }}>\r\n  {children}\r\n  </MyContext.Provider>\r\n  );\r\n}\r\n\r\n// 3. Create a Consumer Component\r\nfunction MyConsumer() {\r\n  return (\r\n  <MyContext.Consumer>\r\n  {({ value, setValue }) => (\r\n  <div>\r\n  <p>{value}</p>\r\n  <button onClick={() => setValue("Updated Value!")}>Update Value</button>\r\n  </div>\r\n  )}\r\n  </MyContext.Consumer>\r\n  );\r\n}\r\n\r\n// 4. Use the Provider to Wrap Your Component Tree\r\nfunction App() {\r\n  return (\r\n  <MyProvider>\r\n  <MyConsumer />\r\n  </MyProvider>\r\n  );\r\n}\r\n\r\nexport default App;\r',
  },
  {
    id: 56,
    topic: "reactJs",
    question: "What is Imperative API in React JS ?",
    answer:
      "In React, the imperative API typically refers to the ability to interact directly with the underlying DOM elements, such as accessing DOM properties, calling DOM methods, or attaching event listeners imperatively. \nWhile React primarily encourages a declarative programming style where you describe what your UI should look like based on state and props, there are situations where imperative interactions with the DOM are necessary.\n\nWhen to use Imperative API:\n\nWhen you need direct control over DOM elements\nFor integrating with non-React code\nWhen performing complex DOM manipulations\nWhen dealing with browser APIs directly\nFor optimizing specific performance scenarios",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["interaction ability to dom element"],
    codeExample:
      'Example 1: Using Refs to Imperatively Control a DOM Element\nimport React, { useRef } from \'react\';\n\nfunction FocusableInput() {\n  const inputRef = useRef(null);\n\n  const focusInput = () => {\n  // Directly access the DOM node and focus it\n  inputRef.current.focus();\n  };\n\n  return (\n  <div>\n  <input ref={inputRef} type="text" placeholder="Click the button to focus me" />\n  <button onClick={focusInput}>Focus Input</button>\n  </div>\n  );\n}\n\nexport default FocusableInput;\n\nExample 2: Using useImperativeHandle to Expose Component Methods\nimport React, { useRef, useImperativeHandle, forwardRef } from \'react\';\n\n// Child component exposing an imperative API\nconst FancyInput = forwardRef((props, ref) => {\n  const inputRef = useRef();\n\n  useImperativeHandle(ref, () => ({\n  // Exposing the focus method to parent components\n  focus: () => {\n  inputRef.current.focus();\n  },\n  // You can expose more methods if needed\n  clear: () => {\n  inputRef.current.value = \'\';\n  },\n  }));\n\n  return <input ref={inputRef} type="text" placeholder="Type something..." />;\n});\n\n// Parent component using the imperative API of FancyInput\nfunction ParentComponent() {\n  const fancyInputRef = useRef();\n\n  const handleFocus = () => {\n  fancyInputRef.current.focus();\n  };\n\n  const handleClear = () => {\n  fancyInputRef.current.clear();\n  };\n\n  return (\n  <div>\n  <FancyInput ref={fancyInputRef} />\n  <button onClick={handleFocus}>Focus Fancy Input</button>\n  <button onClick={handleClear}>Clear Fancy Input</button>\n  </div>\n  );\n}\n\nexport default ParentComponent;\nExplanation:\n\nChild Component (FancyInput):\nUses forwardRef to allow its parent to pass a ref.\nUses useImperativeHandle to expose custom methods (focus and clear) instead of exposing the whole DOM node.\nParent Component (ParentComponent):\nObtains a ref to the child component and calls the exposed methods imperatively.\n',
  },
  {
    id: 57,
    topic: "reactJs",
    question: "What is React Fragments?",
    answer:
      '\nReact Fragments provide a way to group multiple React elements without adding extra nodes to the DOM. \nThey are a lightweight syntax for creating a parent wrapper around multiple elements in a React component.\n\n ⭐Key Points about React Fragments:\n\n1. Grouping Elements  : Fragments allow you to group multiple elements together without needing to add an extra DOM element like a  "<div> ".\n\n2. No Extra DOM Nodes  : When rendered, fragments don\'t create any extra DOM nodes. They are purely a syntax feature of React and do not affect the structure of the rendered HTML.\n\n3. Short Syntax  : Fragments can be written using a shorthand syntax  "<></> " or with the  "<React.Fragment> " syntax.\n\n4. Support for Keys and Attributes  : Fragments can also accept keys and other attributes, similar to regular React elements.\n\n ⭐Benefits of React Fragments:\n\n- Cleaner HTML  : Fragments help keep the rendered HTML clean and free from unnecessary wrapper elements.\n- Reduced DOM Nodes  : By avoiding unnecessary wrapper elements, fragments can help reduce the number of DOM nodes in the rendered output, improving performance.\n- Improved Semantics  : Fragments allow you to group elements logically without adding extra semantic meaning to the structure of the HTML.\n\nOverall, React Fragments provide a convenient and lightweight way to group multiple elements together in a React component without introducing unnecessary wrapper elements to the DOM. They help keep the rendered HTML clean and improve the performance of React applications.',
    tags: ["fragment"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 58,
    topic: "reactJs",
    question:
      "How to return multiple element in react component without using fragment or a wrapper div ",
    answer:
      "In React, you can return multiple elements from a component without using a <Fragment> or a wrapper <div> by returning an array of elements. To do this, ensure that each element in the array has a unique key prop to maintain React's reconciliation process.\n\n\n\n \n\n  Use Case Scenarios\nThis approach is particularly useful when:\n- You want to avoid extra DOM nodes for styling or structural reasons.\n- You want to return multiple sibling elements as part of a component's output.\n\n\n\n  Caveats\n- Ensure that every element in the array has a unique key to prevent React warnings.\n- Avoid using non-unique keys like indices unless the order of elements will never change.",
    tags: ["fragment"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      ' Example: Returning Multiple Elements with an Array\n  \nconst MyComponent = () => {\n  return [\n  <h1 key="header">Welcome to My Page</h1>,\n  <p key="description">This is a paragraph without a wrapper.</p>,\n  <button key="button">Click Me</button>,\n  ];\n};\n\nexport default MyComponent;\n  \n\n\n\n  Explanation:\n- Array of  Elements  : Multiple elements are wrapped in an array (  []  ).\n- Key Prop  : Each element in the array has a unique key attribute to help React track changes efficiently.\n',
  },
  {
    id: 59,
    topic: "reactJs",
    question:
      "What problem does returning an array instead of fragment or div solves ? ",
    answer:
      "Returning multiple elements as an array in React without a <Fragment> or wrapper <div> solves several practical issues:\n\n\n\n  1. Avoiding Unnecessary DOM Nodes  \n- Problem  : When you wrap elements in a <div> (or any other container), you add an extra node to the DOM that might interfere with styling, layout, or semantic HTML. \n- Solution  : Using an array avoids introducing any additional wrapper elements, keeping the DOM cleaner.\n\n\n\n  2. Maintaining Semantic HTML  \n- Problem  : A wrapper element like <div> may disrupt the semantic structure of your HTML.\n  - Example: Wrapping <li> elements inside a <div> breaks the <ul> or <ol> structure.\n- Solution  : Returning an array ensures elements like <li> can remain direct children of their parent without unnecessary wrappers.\n\n\n\n  3. Improving Performance  \n- Problem  : Extra DOM nodes can marginally increase the memory footprint and rendering time.\n- Solution  : By avoiding wrappers, you reduce the DOM complexity and improve rendering performance, especially in large, dynamic lists.\n\n\n\n  4. Avoiding CSS Styling Issues  \n- Problem  : Wrapper elements might interfere with CSS selectors, leading to unintentional styling or layout issues.\n  - Example: A flexbox container might be disrupted by an unnecessary wrapper.\n- Solution  : Returning elements as an array avoids such interference, as no extra wrapper exists to style or manage.\n\n\n\n  5. Better Integration with Parent Components  \n- Problem  : Some parent components expect direct children without intervening wrapper elements.\n  - Example: <Table> expects only <tr> elements as children.\n- Solution  : Using an array ensures that children are directly inserted without unwanted parent wrappers.\n\n\n\n  \n\n\n\n  When to Use This Approach\n- List rendering (e.g., <li> in <ul>  ).\n- Nested components requiring direct children (e.g., <Table> rows).\n- Performance-sensitive applications where DOM size matters.\n- Simplifying layout without unnecessary wrappers.\n\nThis approach aligns with React's philosophy of keeping the DOM minimal and semantically meaningful.",
    tags: ["fragment"],
    keyFeatures: [],
    actionWords: [
      "No Unwanted Wrapper Elements",
      "Greater Flexibility for Sibling Elements",
      "Control Over Markup",
    ],
    codeExample:
      'Example: Semantic and Structural Fix  \n  \nconst ListItems = () => {\n  return [\n  <li key="1">Item 1</li>,\n  <li key="2">Item 2</li>,\n  <li key="3">Item 3</li>,\n  ];\n};\n\n// Usage in parent\nconst MyList = () => (\n  <ul>\n  <ListItems />\n  </ul>\n);\n  \n- Without an Array  : A wrapper <div> would break the semantic <ul> structure.\n- With an Array  : <li> items integrate seamlessly into the parent <ul>  .',
  },
  {
    id: 60,
    topic: "reactJs",
    question:
      "But Fragment does not render any additional DOM elements then why use array ?",
    answer:
      "You are absolutely correct: <Fragment> does not render any additional DOM elements, and it is one of the preferred ways to return multiple elements in React without introducing unnecessary wrappers. However, the array approach can still be relevant and beneficial in specific scenarios. Let me clarify when each approach shines and why the array approach can be useful despite the availability of <Fragment>  .\n\n  Why Use <Fragment>  ?  \n1. No Added DOM Nodes  : Like an array, <Fragment> does not create extra DOM elements.\n2. Readability and Simplicity  : <Fragment> is more explicit and readable compared to arrays, especially for  syntax.\n\n3. No Need for Keys  : Unlike arrays, you don’t need to specify key attributes unless working with dynamically rendered children.\n Why Use Arrays Then?  \nThe array approach solves some unique cases where <Fragment> may not be applicable:\n  1. Dynamically Generated Elements  \n- Problem  : When rendering elements dynamically, an array is often the natural choice.\n- Example  :\n  2. Rendering Multiple Children to a Specific Parent  \n- Problem  : Some parent components, like <ul> or <tr>  , strictly enforce their children's structure.\n- Solution  : Returning an array ensures direct insertion of child elements.\n\n  3. Adding Custom Logic Before Returning  \nArrays can integrate additional logic or manipulations before being returned:\n  \n\n  \n Conclusion :  \nYou're right: <Fragment> is generally more readable and preferable when you don't want to render extra DOM nodes. However, arrays offer flexibility in specific scenarios, especially with dynamic content or when working with parent components that enforce structural rules.\n\nFor most use cases:\n- Use <Fragment> for cleaner, static .\n- Use arrays for dynamic rendering or when direct structural control is required.",
    tags: ["fragment"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      'Example1: \nconst MyComponent = () => (\n <>\n <h1>Header</h1>\n <p>Paragraph</p>\n </>\n );\n \n - Produces:\n  \n <h1>Header</h1>\n <p>Paragraph</p>\n\nExample2:\n\n  const MyTableRow = () => [\n  <td key="1">Column 1</td>,\n  <td key="2">Column 2</td>,\n  <td key="3">Column 3</td>,\n  ];\n\n  const MyTable = () => (\n  <table>\n  <tbody>\n  <tr>{MyTableRow()}</tr>\n  </tbody>\n  </table>\n  );\n  \n\n  - Using <Fragment> here would not work because <tr> expects only <td> as its children, and <Fragment> is not rendered directly.\n\nExample3:\nconst items = [\'One\', \'Two\', \'Three\'];\n  const ListItems = () => items.map((item, index) => <li key={index}>{item}</li>);\nUsing an array allows you to easily handle dynamic rendering without requiring extra transformations.\n\nExample4:\nconst MyComponent = () => {\n  const elements = [<p key="1">Hello</p>, <p key="2">World</p>];\n  return elements.filter((el) => el.props.children !== \'World\'); // Dynamically modify children\n};',
  },
  {
    id: 61,
    topic: "reactJs",
    question: "What are Keyed Fragments?",
    answer:
      "Keyed Fragments in React are a way to group multiple elements without adding extra nodes to the DOM, and they help React identify which items have changed, been added, or removed. This is particularly useful when rendering lists of elements where React needs to track each element's identity.",
    tags: ["fragment"],
    keyFeatures: [],
    actionWords: ["efficient re-rendering"],
    codeExample:
      "import React from 'react';\n\nconst Glossary = ({ items }) => {\n  return (\n  <dl>\n  {items.map(item => (\n  <React.Fragment key={item.id}>\n  <dt>{item.term}</dt>\n  <dd>{item.definition}</dd>\n  </React.Fragment>\n  ))}\n  </dl>\n  );\n};\n\n// Example usage:\nconst glossaryItems = [\n  { id: 1, term: 'React', definition: 'A JavaScript library for building user interfaces.' },\n  { id: 2, term: 'Virtual DOM', definition: 'A lightweight copy of the real DOM used for efficient updates.' },\n];\n\nexport default function App() {\n  return (\n  <div>\n  <h1>Glossary</h1>\n  <Glossary items={glossaryItems} />\n  </div>\n  );\n}\nWe use <React.Fragment key={item.id}> inside the map function. This groups the <dt> and <dd> together for each item without adding an extra element to the DOM.",
  },
  {
    id: 62,
    topic: "reactJs",
    question: "Why fragments are better than container divs?",
    answer:
      "Fragments in React are often preferred over container divs for several reasons:\r\n\r\n1. Avoiding Unnecessary DOM Elements  : Fragments allow you to group multiple children without adding extra DOM elements to the rendered output. Unlike container divs, which add additional  \"<div> \" elements to the DOM, fragments don't introduce any extra elements, resulting in a cleaner and more semantic DOM structure.\r\n\r\n2. Reduced Memory Usage  : Since fragments don't create additional DOM nodes, they consume less memory compared to container divs. This can be particularly beneficial in large or complex React applications where memory optimization is important.\r\n\r\n3. Improved Performance  : With fewer DOM elements to render and manage, fragments can lead to better rendering performance, especially in scenarios involving large lists or deeply nested component hierarchies. This can result in faster initial render times and smoother user interactions.\r\n\r\n4. Flexibility and Maintainability  : Fragments provide greater flexibility in component composition by allowing you to group children in a more granular and meaningful way. This can improve the readability and maintainability of your code by keeping related elements together without the need for extraneous container elements.\r\n\r\n5. Avoiding CSS Conflicts  : Container divs may introduce unintended CSS conflicts or styling issues, especially when using global CSS frameworks or third-party libraries. Fragments help avoid these conflicts by not adding any additional styling hooks to the DOM.\r\n\r\nOverall, fragments offer a lightweight and efficient way to group elements in React without introducing unnecessary DOM elements, leading to cleaner code, improved performance, and better maintainability. However, it's essential to consider the specific requirements and constraints of your application when deciding whether to use fragments or container divs.",
    tags: ["fragment"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 63,
    topic: "reactJs",
    question:
      "Explain why and how to update state of components using callback?",
    answer:
      'Updating state using a callback function in React is a technique used to ensure that you are working with the most up-to-date state when updating it asynchronously. This approach is particularly useful when you need to update state based on its previous value, as it guarantees that the state is updated correctly even if multiple state updates are queued.\n\n Why Use Callbacks to Update State:\n\n1. Asynchronous State Updates  : In React, state updates are asynchronous, meaning that multiple state updates scheduled in the same cycle may be batched together. Using a callback ensures that the state is updated based on the most recent value, regardless of when the update occurs.\n\n2. Avoid Stale State  : When updating state based on its previous value, directly referencing  "this.state " may result in stale state if multiple updates are scheduled in quick succession. Using a callback function ensures that you are working with the latest state.\n\n How to Update State Using Callbacks:\n\n1. Functional Form of  "setState "  : When using the functional form of  "setState ", you provide a function that receives the previous state as an argument and returns the new state based on the previous state.\n\n2. Arrow Function in  "setState "  : When using an arrow function in  "setState ", you can explicitly pass a callback function to  "setState " as the second argument. This callback function will be invoked after the state has been updated and the component has re-rendered.\n\nBy using callbacks to update state in React, you ensure that state updates are based on the most recent state and avoid issues related to stale state or asynchronous updates.',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 64,
    topic: "reactJs",
    question: "What is stale state ?",
    answer:
      "Stale state occurs in React when a component holds or uses an outdated version of a state value because it hasn't been updated to reflect the latest changes. This can lead to unexpected behaviors and bugs, especially in asynchronous scenarios or when relying on closures.",
    tags: ["state"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 65,
    topic: "reactJs",
    question: "How to optimize a React code?",
    answer:
      'Optimizing React code involves improving performance, reducing unnecessary re-renders, minimizing bundle size, and enhancing the user experience. Here are several strategies to optimize React code:\n\n1. Memoization  : Use the  "React.memo " higher-order component or the  "useMemo " hook to memoize components or values that are expensive to compute.\n\n2. Component Splitting  : Split large components into smaller, more manageable ones to improve maintainability and reduce the amount of code that needs to be processed during each render.\n\n3. Code Splitting  : Use dynamic import or React.lazy to split your code into smaller chunks that can be loaded asynchronously, improving initial loading times and reducing bundle size.\n\n4. Virtualization  : Implement virtualized lists or grids using libraries like react-virtualized or react-window to efficiently render large datasets without sacrificing performance.\n\n5. Avoiding Unnecessary Renders  :\n - Use PureComponent or shouldComponentUpdate to prevent unnecessary renders in class components.\n - Use React.memo or custom shouldComponentUpdate logic in functional components to prevent re-renders when props or state haven\'t changed.\n\n6. Optimizing Rendering  :\n - Use key props to help React identify which items have changed, added, or removed in lists or loops, reducing the amount of DOM manipulation required.\n - Use the useCallback hook to memoize event handlers and prevent unnecessary re-renders of child components.\n\n7. Use Webpack or Parcel Optimizations  : Optimize build configurations with techniques like tree-shaking, code splitting, and minification to reduce bundle size and improve loading times.\n\n8. Server-Side Rendering (SSR)  : Implement server-side rendering to improve initial page load performance and SEO by rendering React components on the server before sending them to the client.\n\n9. Use DevTools for Profiling  : Use React DevTools or browser developer tools to profile your application\'s performance, identify performance bottlenecks, and optimize rendering performance.\n\n10. Optimize Images and Assets  : Compress and optimize images and other assets to reduce file sizes and improve loading times. Consider lazy loading images to defer loading until they are needed.\n\n11. State Management  : Choose the appropriate state management solution (e.g., React Context, Redux) based on the complexity and scalability requirements of your application to optimize data flow and state management.\n\n12. Bundle Analysis  : Use tools like webpack-bundle-analyzer to analyze your bundle size and identify dependencies that contribute the most to the overall bundle size, allowing you to optimize and prioritize optimizations.\n\n13. Network Optimization  : Minimize network requests by bundling or caching resources, using CDNs, and optimizing API calls to reduce latency and improve performance.\n\nBy implementing these optimization techniques, you can improve the performance, efficiency, and user experience of your React applications. It\'s important to profile and measure the impact of optimizations to ensure they provide the desired improvements without sacrificing maintainability or code quality.',
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 66,
    topic: "reactJs",
    question: "What is the difference between Shadow DOM and Virtual DOM?",
    answer:
      "The Shadow DOM and Virtual DOM are two different tools used in web development, and they solve different problems.\n\n- The Shadow DOM is like a private area for your web components. It keeps the styles and content inside a component separate from the rest of the page, so nothing outside can mess with it, and it doesn’t mess with anything outside. Think of it like a self-contained bubble. For example, you can use it to create a button with custom styles that won’t get affected by the website’s main styles:\n\n\n  const shadow = element.attachShadow({ mode: 'open' });\n  shadow.innerHTML = <style>p { color: red; }</style><p>Shadow DOM content</p>;\n  \n\n- The Virtual DOM, on the other hand, is all about speed. It’s a lightweight copy of the actual DOM that libraries like React use to figure out what’s changed in your app. Instead of updating the real DOM all the time (which is slow), the Virtual DOM calculates the smallest changes needed and applies them in one go. It’s like having a shopping list for updates instead of making a trip to the store for every single item.\n\n \n  const App = () => <h1>Hello Virtual DOM!</h1>;\n  ReactDOM.render(<App />, document.getElementById('root'));\n  \n\nIn Simple Terms: The Shadow DOM is for keeping things tidy and separate, while the Virtual DOM is for making updates faster and smoother. Shadow DOM = isolation; Virtual DOM = performance.",
    tags: ["dom"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 67,
    topic: "reactJs",
    question: "What is the difference between Real DOM and Virtual DOM?",
    answer:
      "The Real DOM and Virtual DOM are core concepts in web development, particularly in the context of frameworks like React., which uses the Virtual DOM to optimize rendering performance. Here's a breakdown of the key differences between the Real DOM and Virtual DOM:\n\n Real DOM\n\n1. Definition  :\n - The Real DOM (Document Object Model) is the actual browser representation of the HTML elements that have been rendered on the web page.\n - It is a tree-like structure of nodes where each node represents an HTML element.\n\n2. Manipulation  :\n - Directly manipulating the Real DOM is costly in terms of performance because any change to it typically involves re-rendering the entire tree.\n - Changes to the Real DOM can cause reflows and repaints, which are expensive operations.\n\n3. Operations  :\n - Updating elements in the Real DOM is synchronous and blocking, meaning changes are immediately applied and can potentially interrupt user interactions if they are extensive.\n\n Virtual DOM\n\n1. Definition  :\n - The Virtual DOM is a lightweight copy of the Real DOM maintained by frameworks like React..\n - It is a JavaScript representation of the Real DOM elements, their properties, and relationships.\n\n2. Manipulation  :\n - Manipulating the Virtual DOM is faster compared to the Real DOM because JavaScript operations are generally faster than direct DOM manipulations.\n - Changes made to the Virtual DOM are batched and optimized for efficiency.\n\n3. Operations  :\n - When changes are made to the application's state in React (e.g., due to user interactions), React first updates the Virtual DOM.\n - React then compares the updated Virtual DOM with the previous version (diffing process) to determine the minimal set of changes needed to update the Real DOM.\n\n4. Rendering  :\n - After computing the difference (diff), React updates only the necessary parts of the Real DOM, minimizing reflows and repaints.\n - This process is called reconciliation, and it ensures that the UI updates are efficient and performant.\n\n Key Differences\n\n- Performance  : Virtual DOM operations are generally faster than Real DOM operations due to JavaScript's efficiency and the batched nature of Virtual DOM updates.\n- Rendering Efficiency  : Virtual DOM allows frameworks like React to optimize updates by selectively rendering only what has changed, reducing unnecessary re-renders.\n- Direct Manipulation  : Real DOM updates are immediate and synchronous, potentially leading to performance bottlenecks, while Virtual DOM updates are batched and optimized.\n\n 📝 Summary :\n\nThe Virtual DOM serves as an intermediary between React's components and the browser's Real DOM, optimizing the process of updating the UI by minimizing unnecessary operations and improving overall performance. It's a key innovation in modern web development frameworks that significantly enhances the user experience by making UI updates faster and more efficient.",
    tags: ["dom"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 68,
    topic: "reactJs",
    question: "What is reconciliation?",
    answer:
      'Reconciliation is a process in React that determines how the Virtual DOM should update the Real DOM to reflect changes in the application state. It\'s a key part of React\'s rendering performance optimization, ensuring that updates to the user interface are efficient and minimal.\n\n How Reconciliation Works\n\n1. Virtual DOM Update  : When the state or props of a React component change, React first updates the Virtual DOM, which is an in-memory representation of the Real DOM.\n\n2. Diffing Algorithm  : React uses a diffing algorithm to compare the updated Virtual DOM with the previous version. This algorithm identifies what has changed by comparing each element from the old Virtual DOM to the new one.\n\n3. Compute Minimal Changes  : The diffing process results in a set of minimal changes needed to update the Real DOM. Instead of re-rendering the entire DOM, React only applies these specific changes.\n\n4. Apply Changes to Real DOM  : React updates the Real DOM with the changes computed during the diffing process. This ensures that the Real DOM is always in sync with the Virtual DOM.\n\n Key Concepts in Reconciliation\n\n- Key Attribute  : When rendering lists of elements, React uses the  "key " attribute to optimize the diffing process. Keys help React identify which items have changed, been added, or been removed, allowing for efficient updates.\n\n- Element Type  : React considers elements of different types as fundamentally different. For example, changing a  "<div> " to a  "<span> " will cause the  "<div> " to be destroyed and a new  "<span> " to be created, even if they have similar attributes.\n\n- Component Updates  : For class components and functional components with hooks, React compares the props and state. If the component should update (based on  "shouldComponentUpdate " or  "React.memo "), it re-renders; otherwise, it skips the update.\n\n\n ⭐Benefits of Reconciliation\n\n- Performance  : By minimizing direct DOM manipulations and optimizing updates, React ensures high performance, especially in large applications with frequent state changes.\n- Consistency  : Ensures the UI stays consistent with the underlying state, reducing the risk of inconsistencies or bugs.\n\n Conclusion\n\nReconciliation is a fundamental part of how React efficiently updates the user interface. By using a Virtual DOM and an optimized diffing algorithm, React ensures that only the necessary parts of the Real DOM are updated, leading to faster and more efficient rendering. Understanding reconciliation helps in writing optimized and performant React components.',
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 69,
    topic: "reactJs",
    question: "What is React App Tree Shaking ? ",
    answer:
      "React app tree shaking refers to the process of eliminating dead code or unused modules from the final bundled JavaScript file during the build process. Tree shaking is a common optimization technique used by modern JavaScript bundlers like Webpack or Rollup to reduce the size of the final bundle, thus improving loading times and runtime performance.",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 70,
    topic: "reactJs",
    question: "What is Isomorphic React ? ",
    answer:
      'Isomorphic React, also known as Universal React, refers to a React application that can be rendered both on the server and the client. The main idea behind isomorphic React is to improve performance and SEO by allowing the server to pre-render the initial state of the application, which is then sent to the client as HTML. When the client receives this pre-rendered HTML, it "hydrates" it, enabling React\'s client-side functionality. This approach provides the benefits of server-side rendering (SSR) combined with client-side rendering (CSR).\nFrameworks like Next. provide built-in support for isomorphic React, handling SSR, routing, and rehydration automatically:',
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [
      "rendered both on the server and the client",
      "Improved SEO",
      "Faster Time-to-ContentBetter Performance",
      "Better Performance",
    ],
    codeExample: "",
  },
  {
    id: 71,
    topic: "reactJs",
    question: "What are synthetic events in React?",
    answer:
      'Synthetic events in React are wrapper objects around the browser\'s native events. They provide a cross-browser consistent interface for handling events in React components, abstracting away the differences between browser implementations.\n\n ⭐Key Points about Synthetic Events:\n\n1. Cross-Browser Compatibility  : Synthetic events ensure that event handling code behaves consistently across different browsers by normalizing browser-specific event implementations.\n\n2. Performance Optimization  : React\'s event system uses event delegation and pooling to improve performance. Event delegation means that event handlers are attached to a common ancestor element rather than individual elements, reducing the number of event listeners. Event pooling involves reusing synthetic event objects to avoid unnecessary memory allocation.\n\n3. Event Propagation  : Synthetic events in React mimic the behavior of native events, including bubbling and capturing phases. Event propagation allows events to traverse the component hierarchy from the target element to its ancestors (bubbling) or from the root to the target element (capturing).\n\n4. Event Properties  : Synthetic event objects have properties and methods similar to native event objects, such as  "type ",  "target ",  "currentTarget ",  "preventDefault() ",  "stopPropagation() ", etc. These properties and methods can be used to access information about the event and control its behavior.\n\n5. Note  : While synthetic events closely resemble native browser events, there may be some differences in behavior or properties. However, these differences are usually minor and should not significantly affect event handling in React components.\n\n',
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["wraper objects around browser's native events"],
    codeExample: "",
  },
  {
    id: 72,
    topic: "reactJs",
    question: "What is a wrapper component?",
    answer:
      "A wrapper in React is a component that wraps or surrounds another component or group of components. It can be used for a variety of purposes such as adding additional functionality, styling, or layout to the wrapped components.",
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["wraps another components"],
    codeExample:
      "import React from 'react';\r\n\r\n// A simple wrapper component that applies common styling\r\nfunction Card({ children }) {\r\n  return (\r\n  <div style={{\r\n  border: '1px solid ddd',\r\n  borderRadius: '8px',\r\n  padding: '16px',\r\n  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',\r\n  margin: '16px'\r\n  }}>\r\n  {children}\r\n  </div>\r\n  );\r\n}\r\n\r\n// Using the wrapper component\r\nfunction App() {\r\n  return (\r\n  <div>\r\n  <Card>\r\n  <h2>Card Title</h2>\r\n  <p>This is some content inside the card.</p>\r\n  </Card>\r\n  <Card>\r\n  <p>This is another card with different content.</p>\r\n  </Card>\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default App;\r",
  },
  {
    id: 73,
    topic: "reactJs",
    question: "What are controlled components?",
    answer:
      "Controlled components in React are form elements whose values are controlled by React state. \nInstead of relying on the browser to manage the state of form elements, the values of controlled components are controlled by React and updated via state and event handlers.\n\n ⭐Key Points about Controlled Components:\n\n1. Stateful Value  : The value of a controlled component is stored in React state. This means that changes to the component's value are reflected in the component's state, and vice versa.\n\n2. Event Handlers  : Controlled components use event handlers (e.g., onChange) to update the state when the value of the component changes. These event handlers are provided by React and are attached to the form elements.\n\n3. Single Source of Truth  : By controlling the value of form elements with React state, controlled components maintain a single source of truth for the component's value. This makes it easier to manage and synchronize the state of form elements across multiple components.\n\n4. Immutable State  : React state should be treated as immutable. Instead of directly modifying the state, controlled components update the state by calling the setState method provided by React.\n\n5. ⭐Benefits  : Controlled components provide finer-grained control over form elements and enable more complex interactions, such as validation, conditional rendering, and synchronization with other components.\n\n\n",
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["values controlled by react state"],
    codeExample:
      "import React, { useState } from 'react';\r\n\r\nfunction ControlledForm() {\r\n  // State to hold the input's value\r\n  const [name, setName] = useState('');\r\n\r\n  // Handle changes in the input\r\n  const handleChange = (event) => {\r\n  setName(event.target.value);\r\n  };\r\n\r\n  const handleSubmit = (event) => {\r\n  event.preventDefault();\r\n  alert(Submitted name: ${name});\r\n  };\r\n\r\n  return (\r\n  <form onSubmit={handleSubmit}>\r\n  <label>\r\n  Name:\r\n  {/ The value of the input is controlled by React state /}\r\n  <input\r\n  type=\"text\"\r\n  value={name}\r\n  onChange={handleChange}\r\n  />\r\n  </label>\r\n  <button type=\"submit\">Submit</button>\r\n  </form>\r\n  );\r\n}\r\n\r\nexport default ControlledForm;\r",
  },
  {
    id: 74,
    topic: "reactJs",
    question: "What are uncontrolled components?",
    answer:
      "Uncontrolled components in React are form elements whose state is managed by the browser rather than by React. Unlike controlled components, which have their values controlled by React state, uncontrolled components rely on the browser's default behavior to manage their state.\n\n ⭐Key Points about Uncontrolled Components:\n\n1. Native State Management  : Uncontrolled components rely on the browser's native form handling behavior to manage their state. This means that the value of an uncontrolled component is stored internally by the browser, and changes to the component's value are managed by the browser.\n\n2. Ref-Based Approach  : Instead of using React state to control the value of form elements, uncontrolled components can be accessed and manipulated directly using the ref API provided by React. This allows you to interact with the underlying DOM elements of the form elements.\n\n3. No Single Source of Truth  : Unlike controlled components, which maintain a single source of truth for the component's value in React state, uncontrolled components do not have a single source of truth. The value of an uncontrolled component is managed internally by the browser and may not be synchronized with React state.\n\n4. Less Control  : Uncontrolled components provide less control and flexibility compared to controlled components. While they may be simpler to use for basic form interactions, they can be more challenging to work with for complex interactions or when synchronization with React state is required.\n\n5. Usage Scenarios  : Uncontrolled components are commonly used in situations where you need to integrate with existing form libraries or when you want to delegate form handling entirely to the browser. They may also be used in performance-critical scenarios where minimizing the overhead of managing form state in React is important.\n\n",
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["state managed by browser"],
    codeExample:
      'import React, { useRef } from \'react\';\r\n\r\nfunction UncontrolledForm() {\r\n  // Create a ref to access the input element\r\n  const inputRef = useRef(null);\r\n\r\n  const handleSubmit = (e) => {\r\n  e.preventDefault();\r\n  // Access the current value from the DOM using the ref\r\n  alert(Submitted value: ${inputRef.current.value});\r\n  };\r\n\r\n  return (\r\n  <form onSubmit={handleSubmit}>\r\n  <label>\r\n  Name:\r\n  {/ The input value is managed by the DOM /}\r\n  <input type="text" ref={inputRef} />\r\n  </label>\r\n  <button type="submit">Submit</button>\r\n  </form>\r\n  );\r\n}\r\n\r\nexport default UncontrolledForm;\r\n\nExplanation:\n\nThe <input> element is an uncontrolled component because its value is not stored in React state.\nA ref (inputRef) is used to directly access the current value of the input when the form is submitted.\nThis approach can be useful for simple forms or when integrating with non-React libraries that expect DOM elements to manage their own state.\n',
  },
  {
    id: 75,
    topic: "reactJs",
    question: "What is a switching component?",
    answer:
      'In React, a switching component is used to conditionally render different components or elements based on certain criteria, such as the current route or application state. This pattern is commonly used in routing, where different pages or views are rendered depending on the URL path.\n\n ⭐Key Points about Switching Components:\n\n1. Conditional Rendering  : Switching components enable conditional rendering of components based on specific conditions or criteria.\n  \n2. Routing  : They are often used in routing libraries like  "react-router " to switch between different route components depending on the current URL.\n\n3. Maintainability  : Using a switching component helps keep your codebase organized and maintainable by clearly defining which components should be rendered under specific conditions.\n\n ⭐Benefits of Using Switching Components:\n\n- Clear Structure  : Clearly defines which components should be rendered based on the application\'s state or URL.\n- Enhanced Maintainability  : Makes it easier to manage and update routes or conditional logic in a centralized location.\n- Improved Readability  : Provides a more readable and intuitive way to manage complex conditional rendering scenarios.\n\nSwitching components, especially in the context of routing, are essential for building organized, maintainable, and user-friendly single-page applications in React.',
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["conditional rendering"],
    codeExample:
      "import React, { useState } from 'react';\r\n\r\nfunction EditableText({ text }) {\r\n  const [isEditing, setIsEditing] = useState(false);\r\n  const [value, setValue] = useState(text);\r\n\r\n  return (\r\n  <div>\r\n  {isEditing ? (\r\n  <input\r\n  value={value}\r\n  onChange={(e) => setValue(e.target.value)}\r\n  onBlur={() => setIsEditing(false)}\r\n  />\r\n  ) : (\r\n  <span onClick={() => setIsEditing(true)}>{value}</span>\r\n  )}\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default EditableText;\r\n\r\n",
  },
  {
    id: 76,
    topic: "reactJs",
    question: "Why should component names start with capital letter?",
    answer:
      "If you are rendering your component using JSX , the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.",
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["error-unrecognized tag"],
    codeExample: "",
  },
  {
    id: 77,
    topic: "reactJs",
    question: "What are stateless components?\r",
    answer:
      'Stateless components in React, also known as functional components, are components that do not manage their own state. They are primarily concerned with rendering UI and receiving data through props. Stateless components are simple functions that take props as an argument and return .\r\n\r\n ⭐Key Points about Stateless Components:\r\n\r\n1. Functional Components  : Stateless components are typically written as JavaScript functions. They do not have lifecycle methods or state management capabilities unless enhanced by hooks (e.g.,  "useState ",  "useEffect ").\r\n\r\n2. Props-Driven  : These components receive data and callbacks through props. They rely entirely on the props passed to them for rendering and behavior, making them predictable and easy to test.\r\n\r\n3. Simplicity  : Stateless components are simpler and more concise than class components. They focus solely on rendering UI based on the provided props, without managing state or lifecycle events.\r\n\r\n4. Performance  : Functional components generally perform better than class components because they have less overhead. Since they don\'t manage state or lifecycle methods, they are easier for React to optimize.\r\n\r\n5. Hooks  : With the introduction of hooks in React 16.8, functional components can now manage state and side effects, allowing them to have capabilities previously limited to class components. However, when not using hooks, functional components remain stateless.\r\n\r\n ⭐Benefits of Stateless Components:\r\n\r\n- Readability and Maintainability  : They are easy to read and maintain due to their simplicity and lack of internal state.\r\n- Reusability  : Stateless components are highly reusable as they are not tied to any specific state or lifecycle.\r\n- Testability  : They are straightforward to test because they produce the same output for the same props without side effects.\r\n\r\n When to Use Stateless Components:\r\n\r\n- Pure Presentation  : Use stateless components for purely presentational purposes, where the component\'s role is to render UI based on props.\r\n- Component Composition  : Use them to build small, reusable components that can be composed together to create more complex UIs.\r\n- Performance Optimization  : Use them to take advantage of React\'s optimizations for functional components, especially in performance-critical applications.',
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["do not manage their own state"],
    codeExample: "",
  },
  {
    id: 78,
    topic: "reactJs",
    question: "What are stateful components?",
    answer:
      'Stateful components in React are components that manage their own state. Unlike stateless components, stateful components can store and manage data that can change over time, which affects how the component renders and behaves.\n\n ⭐Key Points about Stateful Components:\n\n1. State Management  : Stateful components maintain an internal state. The state is an object that holds data or information about the component. This state can change based on user interactions, events, or other factors.\n\n2. Class Components and Hooks  : Traditionally, stateful components were implemented as class components. However, with the introduction of hooks in React 16.8, functional components can also be stateful by using the  "useState " hook and other related hooks.\n\n3. Lifecycle Methods  : In class components, lifecycle methods are used to manage component behavior at different stages of its existence (e.g., mounting, updating, unmounting). Functional components use hooks like  "useEffect " to achieve similar behavior.\n\n4. Complex Logic  : Stateful components are often used when a component needs to handle complex logic, manage user input, perform side effects, or interact with external systems (e.g., APIs).\n\n ⭐Benefits of Stateful Components:\n\n- Dynamic Behavior  : They allow components to have dynamic behavior based on internal state changes.\n- Complex Interactions  : Useful for managing complex interactions and user input.\n- Lifecycle Management  : Class components provide lifecycle methods to hook into different phases of the component\'s lifecycle.\n\n When to Use Stateful Components:\n\n- User Input Handling  : When you need to handle and manage user input.\n- Component-specific Data  : When a component needs to manage its own data independently of other components.\n- Complex UI Logic  : When implementing components that require complex logic, state management, and side effects.\n\nStateful components are essential for creating interactive and dynamic React applications, enabling components to respond to user actions and changes in data over time.',
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["own state management"],
    codeExample: "",
  },
  {
    id: 79,
    topic: "reactJs",
    question: "Do Hooks replace render props and higher order components?",
    answer:
      "Hooks in React provide a more flexible and concise way to share stateful logic and behavior between components compared to render props and higher-order components (HOCs). While hooks can replace some use cases of render props and HOCs, they do not entirely replace them, as each approach has its own strengths and use cases.",
    tags: ["components"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 80,
    topic: "reactJs",
    question: "Explain styled components in React?",
    answer:
      "Styled-component is a Module which allows us to write CSS within JavaScript in a very modular and reusable way in React. Instead of having one global CSS file for a React project, we can use styled-component for enhancing the developer experience. It also removes the mapping between components and styles – using components as a low-level styling construct",
    tags: ["components"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 81,
    topic: "reactJs",
    question: "What are loadable components?",
    answer:
      "Loadable components are a pattern and a set of libraries that enable dynamic code splitting and lazy loading of components in React applications. This technique allows you to split your application into smaller chunks and load them asynchronously only when they are needed, improving performance by reducing the initial bundle size.\nWith Loadable Components, you can load React components asynchronously, meaning the component code won't be loaded until it's actually needed. This is particularly useful for large React apps where you don't need all the components immediately when the app starts.",
    tags: ["components"],
    keyFeatures: [],
    actionWords: [
      "dynamic code splitting & lazy loading",
      "components that are loaded asynchronously",
    ],
    codeExample:
      "Example Using @loadable/component\n\nimport React from 'react';\r\nimport loadable from '@loadable/component';\r\n\r\n// Create a loadable component with a fallback UI\r\nconst LoadableHeavyComponent = loadable(() => import('./HeavyComponent'), {\r\n  fallback: <div>Loading component...</div>,\r\n});\r\n\r\nfunction App() {\r\n  return (\r\n  <div>\r\n  <h1>My App</h1>\r\n  {/ HeavyComponent will be loaded only when rendered /}\r\n  <LoadableHeavyComponent />\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default App;\r\n",
  },
  {
    id: 82,
    topic: "reactJs",
    question: "What is suspense component?",
    answer:
      "In React, the Suspense component is a built-in feature designed to handle asynchronous rendering and enable components to \"wait\" for something (like data or code) before rendering. It's typically used in conjunction with code splitting or data fetching to make sure the user sees a fallback (like a loading spinner) until the required resources are loaded.\n\n  ⭐Key Points:\n- Suspense allows you to delay the rendering of a component until some asynchronous operation (like data fetching or dynamic imports) completes.\n- You can specify a fallback UI (usually a loading spinner, loading message, or skeleton screen) that is shown until the content is ready.\n- Suspense is particularly useful for handling lazy-loaded components or data fetching that needs to be completed before rendering the UI.\n\n  \n\n ⭐Key Features:\n1. Lazy Loading: Suspense enables components to be loaded only when required, helping reduce the initial bundle size.\n2. Asynchronous Rendering: It improves the user experience by showing a fallback UI while waiting for an asynchronous operation (like data fetching or code loading).\n3. Declarative: It's a declarative way to handle asynchronous behavior in the component tree.\n\n  When to Use Suspense:\n- Lazy loading components with React.lazy().\n- Handling asynchronous data fetching in a declarative way (though data fetching support in Suspense is still experimental in React).\n- Code splitting: Allowing parts of your application to load only when needed.\n\n  📝Summary:\nSuspense is a powerful React feature that makes handling asynchronous tasks like dynamic imports and data fetching more seamless. By wrapping components with Suspense, you can show fallback content while waiting for resources to load, improving the performance and user experience of your React application.",
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["hadles async rendering"],
    codeExample:
      "Syntax:\n\n\n<Suspense fallback={<div>Loading...</div>}>\n  {/ Child components that might take time to load /}\n</Suspense>\n\n\n  Example 1: Using Suspense for Lazy Loading a Component\n\n\nimport React, { Suspense, lazy } from 'react';\n\n// Dynamically import the component\nconst LazyComponent = lazy(() => import('./LazyComponent'));\n\nconst App = () => {\n  return (\n  <div>\n  <h1>React Suspense Example</h1>\n  <Suspense fallback={<div>Loading the component...</div>}>\n  <LazyComponent />\n  </Suspense>\n  </div>\n  );\n};\n\nexport default App;\n\n\n- Here, the LazyComponent is loaded only when needed, and until it's loaded, the fallback UI (Loading the component...) is displayed.",
  },
  {
    id: 83,
    topic: "reactJs",
    question: "What are React Server components?",
    answer:
      "React Server Components (RSC) are an experimental feature introduced in React that allow some components to be rendered entirely on the server rather than on the client. This can help improve performance, reduce bundle sizes, and enable new patterns for building applications by offloading work from the browser.\r\n\r\n\r\n\r\n Key Concepts\r\n\r\n- Server-Only Execution:  \r\n  Server Components run exclusively on the server. They generate HTML and data that are sent to the client without shipping their JavaScript logic. This means the client receives pre-rendered markup and doesn't need to execute the code for these components.\r\n\r\n- Reduced Bundle Size:  \r\n  Since RSCs don’t include client-side JavaScript, they help reduce the amount of code that needs to be loaded and parsed on the client, leading to faster load times.\r\n\r\n- Seamless Integration:  \r\n  React Server Components can be combined with traditional client components. You can decide which parts of your UI are rendered on the server and which are interactive on the client.\r\n\r\n- Data Fetching:  \r\n  Because they run on the server, RSCs can fetch data directly (e.g., from a database or API) without having to expose API keys or perform additional data-fetching logic on the client.\r\n\r\n\r\n\r\n How They Work\r\n\r\n1. File Convention & Separation:  \r\n Typically, server components are identified by a special file extension (e.g., .server.x) or some other convention. This informs the bundler and runtime that the component should run on the server.\r\n\r\n2. No Browser APIs:  \r\n Since they run on the server, RSCs don’t have access to browser-specific APIs like window or document. They’re meant purely for generating markup and data.\r\n\r\n3. Streaming & Incremental Rendering:  \r\n React can stream the output of server components to the client, which means parts of the UI can be rendered progressively. This improves perceived performance.\r\n\r\n\r\n\r\n\r\n\r\n Benefits\r\n\r\n- Performance:  \r\n  By offloading heavy data fetching and rendering to the server, the client-side bundle is lighter, leading to faster load times and better performance.\r\n\r\n- Improved Security:  \r\n  Sensitive operations (like data fetching with private credentials) remain on the server, reducing exposure on the client.\r\n\r\n- Simplified Data Flow:  \r\n  Since server components can fetch data directly, there’s less need for complex client-side state management or additional data-fetching libraries.\r\n\r\n\r\n\r\n Current Status\r\n\r\nReact Server Components are still experimental and not yet part of the stable React release. They are being actively developed, and tools like Next. are experimenting with integrating this concept into production-ready frameworks.\r\n\r\n\r\n\r\nIn summary, React Server Components allow you to build parts of your UI that render on the server, optimizing performance and reducing client-side bundle sizes. They open up new patterns for data fetching and rendering by allowing a seamless mix of server-rendered and client-rendered components.",
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["rendered entirely on the server"],
    codeExample:
      " Example Concept\r\n\r\nImagine you have a page that shows a list of products. With React Server Components, you might structure it like this:\r\n\r\nx\r\n// ProductList.server.x (Server Component)\r\nimport React from 'react';\r\n\r\nasync function fetchProducts() {\r\n  // Fetch data from a database or API\r\n  const res = await fetch('https://api.example.com/products');\r\n  return res.on();\r\n}\r\n\r\nexport default async function ProductList() {\r\n  const products = await fetchProducts();\r\n  return (\r\n  <ul>\r\n  {products.map(product => (\r\n  <li key={product.id}>{product.name}</li>\r\n  ))}\r\n  </ul>\r\n  );\r\n}\r\n\r\n\r\nx\r\n// Page.x (Client Component)\r\nimport React from 'react';\r\nimport ProductList from './ProductList.server';\r\n\r\nexport default function Page() {\r\n  return (\r\n  <div>\r\n  <h1>Our Products</h1>\r\n  {/ ProductList is rendered on the server /}\r\n  <ProductList />\r\n  </div>\r\n  );\r\n}\r\n\r\n\r\nExplanation:\r\n\r\n- ProductList.server.x:  \r\n  This server component fetches product data directly from an API and renders an unordered list. It never ships its JavaScript to the client.\r\n  \r\n- Page.x:  \r\n  A regular client component that imports and uses the server component. When the page is requested, the server renders ProductList, and the resulting HTML is sent to the client along with any client-side JavaScript needed for interactive parts of the page.\r\n\r\n",
  },
  {
    id: 84,
    topic: "reactJs",
    question: "What is Lifting State Up in React?",
    answer:
      "Lifting state up in React is a pattern used to manage shared state between multiple components by <mark>moving the state to a common ancestor component</mark>. \nInstead of storing the state separately in each component that needs access to it, you <mark>lift the state up to a higher-level component and pass it down to the components that need it as props</mark>.\n\n👉Key Points about Lifting State Up:\n\n1. Single Source of Truth  : Lifting state up ensures that there is a <mark>single source of truth for the shared state</mark>. By moving the state to a common ancestor component, you <mark>avoid duplicating the state across multiple components</mark> and maintain consistency.\n\n2. Prop Drilling  : When lifting state up, you pass the state down to the child components as props. This can lead to prop drilling, where intermediate components have to pass props down to deeper components, even if they don't directly use the props themselves.\n\n3. Data Flow  : Lifting state up <mark>promotes a top-down data flow</mark> in React, <mark>where changes to the state in the parent component propagate down to the child components through props</mark>. This makes it easier to understand how data flows through the component tree.\n\n4. Composition  : Lifting state up encourages component composition, where smaller, reusable components are composed together to create more complex UIs. Each component is responsible for a specific part of the UI and receives the necessary state and behavior as props.\n\n5. Separation of Concerns  : Lifting state up <mark>helps separate concerns by moving the management of state out of presentational components and into container components</mark>. Presentational components focus on rendering UI based on props, while container components manage state and behavior.\n",
    tags: ["state", "state-lifting"],
    keyFeatures: [],
    actionWords: ["shared data", " common ancestor component", "avoid duplicating the state across", "promotes a top-down data flow", "Separation of Concerns"],
    codeExample:
      "import React, { useState } from 'react';\r\n\r\nfunction InputComponent({ value, onChange }) {\r\n  return <input value={value} onChange={onChange} />;\r\n}\r\n\r\nfunction DisplayComponent({ value }) {\r\n  return <div>Display: {value}</div>;\r\n}\r\n\r\nfunction App() {\r\n  // The state is lifted up here in the parent component\r\n  const [value, setValue] = useState('');\r\n\r\n  return (\r\n  <div>\r\n  <InputComponent \r\n  value={value} \r\n  onChange={e => setValue(e.target.value)} \r\n  />\r\n  <DisplayComponent value={value} />\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default App;\r",
  },
  {
    id: 85,
    topic: "reactJs",
    question: "What is children prop?",
    answer:
      "\nIn React, the children prop is a special prop that can be used to pass components or elements as children to another component. It allows you to nest components within each other, creating a hierarchical structure in your React application.\nThe children prop in React allows components to accept and render nested elements or components dynamically. It facilitates component composition, customization, and the creation of flexible and reusable UI structures in React applications. Understanding how to effectively use and manipulate children is essential for building scalable and maintainable React components.\n\n\n",
    tags: ["props"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      "import React from 'react';\r\n\r\n// A simple wrapper component that applies common styling\r\nfunction Card({ children }) {\r\n  return (\r\n  <div style={{\r\n  border: '1px solid ddd',\r\n  borderRadius: '8px',\r\n  padding: '16px',\r\n  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',\r\n  margin: '16px'\r\n  }}>\r\n  {children}\r\n  </div>\r\n  );\r\n}\r\n\r\n// Using the wrapper component\r\nfunction App() {\r\n  return (\r\n  <div>\r\n  <Card>\r\n  <h2>Card Title</h2>\r\n  <p>This is some content inside the card.</p>\r\n  </Card>\r\n  <Card>\r\n  <p>This is another card with different content.</p>\r\n  </Card>\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default App;\r",
  },
  {
    id: 86,
    topic: "reactJs",
    question: "What are default props?",
    answer:
      "Default props in React are values that you assign to a component's props when no value is provided by the parent component. They help ensure that a component has a fallback value for its props in case the parent component doesn't pass any value for a specific prop.\n\nIn simpler terms, default props are like a \"backup\" for your component's props, ensuring it has a meaningful value even if nothing is provided.\n\n\n",
    tags: ["props"],
    keyFeatures: [],
    actionWords: ["value assigned to props when no vlaue is provided"],
    codeExample:
      "import React from 'react';\r\n\r\nfunction Greeting({ name = 'Guest' }) {\r\n  return <h1>Hello, {name}!</h1>;\r\n}\r\n\r\nexport default Greeting;\r\n",
  },
  {
    id: 87,
    topic: "reactJs",
    question: "What is React lazy function?",
    answer:
      "The React.lazy function is a utility in React that allows you to dynamically import components, enabling code-splitting in your application. Code-splitting helps to improve the performance of your React app by loading components only when they are needed, rather than loading all components upfront.\nBenefits:\n1.Performance Improvement:\nBy loading components only when they are needed, you reduce the initial load time of your application, which can improve the performance, especially for large applications with many components.\n2.Reduced Bundle Size:\nCode-splitting with React.lazy helps to keep the initial bundle size small, as only the necessary code for the initial render is loaded.\n3.Enhanced User Experience:\nUsers will experience faster load times and smoother interactions, as components are loaded on-demand.\n",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: ["allows to render a dynamic import as a regular component"],
    codeExample:
      "import React, { Suspense } from 'react';\n\n// Lazy load the HeavyComponent\nconst HeavyComponent = React.lazy(() => import('./HeavyComponent'));\n\nfunction App() {\n  return (\n  <div>\n  <h1>My App</h1>\n  {/ Wrap the lazy component with Suspense and provide a fallback UI /}\n  <Suspense fallback={<div>Loading...</div>}>\n  <HeavyComponent />\n  </Suspense>\n  </div>\n  );\n}\n\nexport default App;\n\nExplanation:\n\nDynamic Import:\nThe line const HeavyComponent = React.lazy(() => import('./HeavyComponent')); dynamically imports the HeavyComponent module. The component code is only loaded when HeavyComponent is rendered.\n\nSuspense Fallback:\nThe <Suspense> component wraps the lazy-loaded component and displays a fallback UI (e.g., a loading spinner or message) while the component is being loaded.\n\nUsage Benefits:\nThis approach improves performance by reducing the initial bundle size and loading heavy or rarely used components only when they're needed.",
  },
  {
    id: 88,
    topic: "reactJs",
    question: "What is code-splitting?",
    answer:
      "Code-splitting is a performance optimization technique in web development where the application's code is split into smaller, manageable chunks that are loaded on demand rather than loading the entire application code at once. This approach can significantly reduce the initial load time and improve the performance of your web application, especially for large applications with many features",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 89,
    topic: "reactJs",
    question: "What is route based code splitting?",
    answer:
      "Route-based code splitting is a technique used in React applications to dynamically load JavaScript code specific to each route or page of the application. Instead of loading all JavaScript code upfront when the application is initially loaded, route-based code splitting allows you to split the code into smaller bundles and load them asynchronously only when navigating to a particular route.",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 90,
    topic: "reactJs",
    question: "What are the differences between Throttling  & Debouncing ?",
    answer:
      "- Throttling and debouncing are techniques used in JavaScript to control the rate at which a function is executed.\n- They are especially useful in scenarios where frequent execution of a function can lead to performance issues, such as handling events like scroll, resize, or keystrokes.\r\n\r\n- Throttling:\r\n\r\n  Purpose  :\r\n- Throttling limits the maximum number of times a function can be called over a specified period. It ensures that the function is not executed more than once within that period.\r\n\r\n  Behavior  :\r\n- When an event triggers a throttled function, it will execute at most once per specified interval, even if the triggering event happens multiple times during that interval.\r\n\r\n  Example  :\r\n- Imagine a scenario where a user is scrolling a webpage. You might use throttling to limit the number of times a scroll event handler is executed to improve performance.\r\n\r\n- Debouncing:\r\n\r\n  Purpose  :\r\n- Debouncing ensures that a function will not be executed until after a certain amount of time has passed since the last time the function was invoked. It delays invoking the function until after a pause in the event triggering.\r\n\r\n  Behavior  :\r\n- If an event triggers a debounced function multiple times within the specified delay period, the function will only execute once, after the delay period has passed since the last invocation.\r\n\r\n  Example  :\r\n- Consider a search input field where you want to fetch search results from a server as the user types. Debouncing can be used to delay the execution of the search function until the user has stopped typing for a specified time, reducing the number of server requests.\r\n\r\n Differences\r\n\r\n1. Execution Control  :\r\n - Throttling  : Limits the rate of execution of a function to a specified interval, allowing the function to execute at most once per interval.\r\n - Debouncing  : Delays the execution of a function until after a specified time period has passed since the last invocation, ensuring that the function is not executed repeatedly in a short time span.\r\n\r\n2. Use Cases  :\r\n - Throttling  : Useful for scenarios where you want to limit the frequency of execution of a function, such as handling rapid events like mouse move or scroll.\r\n - Debouncing  : Useful when you want to ensure that a function is only executed after a pause in the triggering event, such as handling input events like typing or resizing a window.\r\n\r\n3. Behavior with Multiple Events  :\r\n - Throttling  : Guarantees that the function will execute at a regular interval, even if the event continues to trigger during that interval.\r\n - Debouncing  : Ensures that the function will only execute once, after a pause in the event triggering, regardless of how many times the event is triggered within the delay period.\r\n\r\nIn summary, while both throttling and debouncing are techniques used to manage how frequently a function is executed, they differ in how they control the timing of function execution in response to repeated events. Throttling ensures a function is executed at a regular interval, while debouncing delays function execution until a pause in event triggering occurs.",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: ["control the rate at which a function is executed"],
    codeExample: "",
  },
  {
    id: 91,
    topic: "reactJs",
    question: "Explain the use of render() method in React?",
    answer:
      "In React, the render() method is used to define what should be rendered to the DOM. It is a core method in class components, responsible for returning the JSX (or React elements) that will be displayed on the screen. The render() method must return a single React element, which can be a JSX element, a component, or null.",
    tags: ["rendering"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 92,
    topic: "reactJs",
    question: "What is Concurrent Rendering?",
    answer:
      "Concurrent Rendering is a feature in React that allows React to work on multiple tasks simultaneously, without blocking the main thread, to improve performance and responsiveness. It’s particularly helpful for large, complex applications where updates might take a long time to process, or when you have many components that need to be re-rendered at once.",
    tags: ["rendering"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 93,
    topic: "reactJs",
    question: "What is conditional rendering in React?",
    answer:
      "Conditional rendering in React is a technique for rendering different components or elements based on certain conditions. \nThis allows developers to dynamically control the output of the component based on the application's state or props.",
    tags: ["rendering"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 94,
    topic: "reactJs",
    question: "Does the lazy function support named exports?",
    answer:
      "No, currently React.lazy function supports default exports only. If you would like to import modules which are named exports, you can create an intermediate module that reexports it as the default. It also ensures that tree shaking keeps working and don’t pull unused components. Let's take a component file which exports multiple named components,",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 95,
    topic: "reactJs",
    question: "What is React hydration?",
    answer:
      "React hydration is the process by which React attaches event handlers and updates the DOM created on the server side with the client-side JavaScript. It's a crucial step in server-side rendering (SSR) with React, where the initial HTML content is generated on the server and sent to the client, and then React takes over client-side rendering and interaction.\n\n ⭐Key Points about React Hydration:\n\n1. Server-Side Rendering (SSR)  :\n - In SSR, the initial HTML content of the React components is generated on the server and sent to the client as static HTML markup.\n \n2. Client-Side Rehydration  :\n - After the static HTML content is loaded on the client side, React takes over the rendering process and \"hydrates\" the HTML by attaching event listeners and restoring the component tree's state using client-side JavaScript.\n \n3. Matching Server and Client Markup  :\n - React ensures that the server-rendered HTML and the client-side React components match. It reconciles the server-generated HTML with the client-side component tree to ensure consistency between the initial static markup and the interactive, dynamic UI rendered by React.\n\n4. Event Delegation  :\n - During hydration, React attaches event listeners to the existing DOM elements to handle user interactions, such as clicks, changes, or submissions. This allows React to take over the interactivity of the UI seamlessly.\n\n5. Performance Optimization  :\n - Hydration helps improve the performance of client-side rendering by reusing the server-generated HTML content instead of re-rendering the entire UI from scratch. This reduces the time required for the initial render and improves the perceived loading speed of the application.\n",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 96,
    topic: "reactJs",
    question: "Why React uses className over class attribute?",
    answer:
      " This is because class is a reserved keyword in JavaScript, used to define classes in object-oriented programming. Since React components are written in JavaScript, using class as an attribute name would conflict with the JavaScript keyword.\n",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 97,
    topic: "reactJs",
    question: "What are portals in React?",
    answer:
      'Portals in React provide a way to render children into a DOM node that exists outside of the parent component\'s DOM hierarchy. This allows you to render content at a different location in the DOM tree, such as outside of a modal, tooltip, or any other overlay.\n\n ⭐Key Points about Portals:\n\n1. Render Content Outside Parent DOM  : Portals enable you to render child components into a DOM node that is outside of the parent component\'s DOM hierarchy. This allows you to render content in a different part of the DOM tree, such as at the top level or within a specific container.\n\n2. Use Cases  : Portals are commonly used for rendering overlays, modals, tooltips, popovers, or any other content that needs to be positioned or styled independently of the parent component\'s layout.\n\n3. Separation of Concerns  : Portals help maintain separation of concerns by allowing you to keep modal or overlay logic separate from the components that trigger them. This improves code organization and makes it easier to manage complex UI interactions.\n\n4. Event Bubbling  : Events emitted by portal-rendered components still bubble up through the React component tree as if they were rendered within the parent component. This means that event handlers defined in parent components can still capture and handle events from portal-rendered components.\n\n5. Accessibility  : When using portals, it\'s essential to consider accessibility requirements, such as ensuring that portal-rendered content is keyboard navigable and screen reader friendly.\n\n \n\n\nIn this example, the  "Modal " component renders its children using  "ReactDOM.createPortal ". The children are rendered into a DOM node with the id  "modal-root ", which exists outside the main content\'s DOM hierarchy. This allows the modal content to be rendered independently of the main content, providing flexibility and separation of concerns.',
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      "Example:\n\nimport React from 'react';\nimport ReactDOM from 'react-dom';\n\nconst Modal = ({ children }) => {\n  return ReactDOM.createPortal(\n  children,\n  document.getElementById('modal-root')\n  );\n};\n\nconst App = () => {\n  return (\n  <div>\n  <h1>Main Content</h1>\n  <Modal>\n  <div>\n  <h2>Modal Content</h2>\n  <p>This content is rendered using a portal.</p>\n  </div>\n  </Modal>\n  </div>\n  );\n};\n\nReactDOM.render(<App />, document.getElementById('root'));",
  },
  {
    id: 98,
    topic: "reactJs",
    question: "What are the recommended ways for static type checking?",
    answer:
      "Normally we use PropTypes library (React.PropTypes moved to a prop-types package since React v15.5) for type checking in the React applications. For large code bases, it is recommended to use static type checkers such as Flow or TypeScript, that perform type checking at compile time and provide auto-completion features.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 99,
    topic: "reactJs",
    question: "What is the use of react-dom package?",
    answer:
      "The react-dom package provides DOM-specific methods that can be used at the top level of your app. Most of the components are not required to use this module",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 100,
    topic: "reactJs",
    question: "How to use innerHTML in React?",
    answer:
      "The dangerouslySetInnerHTML attribute is React's replacement for using innerHTML in the browser DOM. Just like innerHTML, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a __  object as key and HTML text as value.\n\n",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      'function createMarkup() {\n  return { __ : "First &middot; Second" };\n}\n\nfunction MyComponent() {\n  return <div dangerouslySetInnerHTML={createMarkup()} />;\n}',
  },
  {
    id: 101,
    topic: "reactJs",
    question: "How events are different in React?",
    answer:
      "Handling events in React elements has some syntactic differences:\n\n1.React event handlers are named using camelCase, rather than lowercase.\n2.With JSX  you pass a function as the event handler, rather than a string.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 102,
    topic: "reactJs",
    question: "Why we need to be careful when spreading props on DOM elements?",
    answer:
      "When spreading props on DOM elements in React, it's essential to be cautious because not all props are valid HTML attributes, and passing unrecognized props to DOM elements can result in unexpected behavior or errors. Additionally, spreading props indiscriminately can potentially expose your application to security vulnerabilities.",
    tags: ["dom"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 103,
    topic: "reactJs",
    question: "What is the difference between React and ReactDOM?",
    answer:
      "The react package contains React.createElement(), React.Component, React.Children, and other helpers related to elements and component classes. You can think of these as the isomorphic or universal helpers that you need to build components. The react-dom package contains ReactDOM.render(), and in react-dom/server we have server-side rendering support with ReactDOMServer.renderToString() and ReactDOMServer.renderToStaticMarkup().",
    tags: ["dom"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 104,
    topic: "reactJs",
    question: "What is ReactDom ?",
    answer:
      "ReactDOM is a package in React that provides methods to interact with the DOM (Document Object Model) in a web application. It serves as the glue between React components and the actual DOM elements on the page.\r\n\r\nHere are the key functions provided by ReactDOM:\r\n\r\n1.  \"ReactDOM.render() \"  : This method is used to render a React component into a specific DOM element. For example, if you want to render a component inside a  \"div \" with an ID of  \"root \", you'd use  \"ReactDOM.render() \" to do that.\r\n\r\n \r\n import React from 'react';\r\n import ReactDOM from 'react-dom';\r\n import App from './App';\r\n\r\n ReactDOM.render(<App />, document.getElementById('root'));\r\n \r\n\r\n2.  \"ReactDOM.createPortal() \"  : This method allows you to render a component outside the main DOM hierarchy, which is useful for things like modals or tooltips that need to break out of the usual parent-child relationship.\r\n\r\n \r\n import React from 'react';\r\n import ReactDOM from 'react-dom';\r\n\r\n function Modal({ children }) {\r\n return ReactDOM.createPortal(\r\n <div className=\"modal\">{children}</div>,\r\n document.getElementById('modal-root')\r\n );\r\n }\r\n\r\n\r\n3.  \"ReactDOM.hydrate() \"  : This method is used in server-side rendering (SSR) to hydrate the server-rendered HTML into a React application. It attaches event listeners to the existing markup.\r\n\r\n\r\n import React from 'react';\r\n import ReactDOM from 'react-dom';\r\n import App from './App';\r\n\r\n ReactDOM.hydrate(<App />, document.getElementById('root'));\r\n \r\n\r\n4.  \"ReactDOM.unmountComponentAtNode() \"  : This method removes a mounted React component from the DOM and cleans up any associated resources.\r\n\r\n  \r\n import ReactDOM from 'react-dom';\r\n\r\n const rootElement = document.getElementById('root');\r\n ReactDOM.unmountComponentAtNode(rootElement);\r\n \r\n\r\nIn React 18, some of these functionalities have been updated or replaced by  \"ReactDOM.createRoot() \" for improved concurrent rendering, but the basic idea remains the same. ReactDOM is essential for rendering React components into the actual browser DOM.",
    tags: ["dom"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 105,
    topic: "reactJs",
    question: "How to re-render the view when the browser is resized?",
    answer:
      "You can use the useState hook to manage the width and height state variables, and the useEffect hook to add and remove the resize event listener. The [] dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render.",
    tags: ["rendering"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 106,
    topic: "reactJs",
    question: "Why you can't update props in React?",
    answer:
      "The React philosophy is that props should be immutable(read only) and top-down. This means that a parent can send any prop values to a child, but the child can't modify received props.",
    tags: ["props"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 107,
    topic: "reactJs",
    question: "How to prevent unnecessary updates using setState?",
    answer:
      "You can compare the current value of the state with an existing state value and decide whether to rerender the page or not. If the values are the same then you need to return null to stop re-rendering otherwise return the latest state value.\n",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      "getUserProfile = (user) => {\n  const latestAddress = user.address;\n  this.setState((state) => {\n  if (state.address === latestAddress) {\n  return null;\n  } else {\n  return { title: latestAddress };\n  }\n  });\n};",
  },
  {
    id: 108,
    topic: "reactJs",
    question: "How to prevent a function from being called multiple times?",
    answer:
      "If you use an event handler such as onClick or onScroll and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed. This can be achieved in the below possible ways,\r\n\r\n1.Throttling: Changes based on a time based frequency. For example, it can be used using _.throttle lodash function\r\n2.Debouncing: Publish changes after a period of inactivity. For example, it can be used using _.debounce lodash function\r\n3.RequestAnimationFrame throttling: Changes based on requestAnimationFrame. For example, it can be used using raf-schd lodash function",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 109,
    topic: "reactJs",
    question: "What is strict mode in React?",
    answer:
      "Strict Mode in React is a tool for highlighting potential problems in an application. It helps developers identify issues with their code by enabling additional checks and warnings during development. Strict Mode does not affect the production build of the application; it only works in development mode to ensure better code quality and maintainability.\n\n⭐Key Features of React Strict Mode:\n\n1. Identifies Unsafe Lifecycles:\n - React checks if your components use any lifecycle methods that are considered unsafe for future versions (e.g., componentWillMount, componentWillReceiveProps, and componentWillUpdate). These lifecycle methods will eventually be removed, so React warns when they are used.\n\n2. Warns About Legacy String Refs:\n - Strict Mode helps identify components that use the older string ref API, which is less reliable and is being phased out in favor of the newer callback or React.createRef() API.\n\n3. Detects Unexpected Side Effects:\n - Strict Mode helps detect side effects that occur in the render method, which may lead to issues like unnecessary re-renders, inconsistent UI behavior, and memory leaks.\n\n4. Helps Detect Potentially Broken Code:\n - React’s Strict Mode checks for certain patterns that can cause bugs or unexpected behavior, like improper use of React hooks, usage of deprecated APIs, or improper key usage in lists.\n\n5. Enables Double Rendering:\n - In Strict Mode, React intentionally double-renders components to detect side effects and ensure that the component is idempotent (i.e., producing the same result every time it renders). This helps surface hidden bugs that could affect performance or stability.\n\n6. Legacy Context API:\n - Strict Mode helps identify components that are still using the old context API, which has since been replaced with a new, more efficient version.\n\n \n\n What Happens with Strict Mode?\n\n- Warnings and Errors: It will output additional warnings in the browser’s developer console about possible issues in your code.\n- Improved Development Process: By detecting issues early, it ensures your components behave as expected and align with best practices, reducing the chances of bugs in production.\n\n What Strict Mode Does NOT Do:\n- It does not affect the production build: It only runs in development mode to help during the development process. It won’t affect the behavior of your app when it’s deployed to production.\n- It doesn't enforce code changes: Strict Mode doesn't change your code, it simply provides more feedback on potential issues.\n\n 📝Summary:\nStrict Mode in React is a development tool designed to help you identify problems early in the development process. It helps highlight unsafe lifecycle methods, deprecated APIs, potential side effects, and other issues that could lead to bugs or performance problems. It's a valuable tool for ensuring your code is robust, maintainable, and ready for future React versions.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      "Example of Using Strict Mode:\n\nYou can enable Strict Mode by wrapping your entire component tree (or part of it) with <React.StrictMode>.\n\nfunction App() {\n  return <h1>Hello, World!</h1>;\n}\n\nReactDOM.render(\n  <React.StrictMode>\n  <App />\n  </React.StrictMode>,\n  document.getElementById('root')\n);",
  },
  {
    id: 110,
    topic: "reactJs",
    question: "Why does strict mode render twice in React?",
    answer:
      "React's Strict Mode intentionally renders components twice in development mode to help identify potential problems with side effects and other issues in your code. This double rendering is done in order to make sure that your components are pure and idempotent (producing the same result each time they're rendered) and do not cause unexpected behavior during re-renders.\n\n Why does React Strict Mode render twice?\n\n1. Detecting Side Effects in Render:\n React wants to make sure that your components do not have any side effects in their render method. Side effects could lead to unpredictable behavior, like unnecessary state changes, re-renders, or incorrect UI updates.\n \n To ensure that components render correctly, React will intentionally run a component twice in development mode. If your component relies on any side effects during render (e.g., changing state or triggering side effects), it will cause React to issue a warning, as these behaviors are considered problematic in the render cycle.\n\n2. Helping with \"Pure\" Components:\n Components should ideally be pure, meaning that the output of the component should always be predictable based on its inputs (props, state). React ensures this by rendering the component twice. If the component behaves differently on the second render, it might indicate that it's relying on some external state or causing side effects, which is a red flag.\n\n3. Lifecycle Methods and Hooks:\n In React class components, unsafe lifecycle methods (such as componentWillMount, componentWillReceiveProps, and componentWillUpdate) could cause issues with re-renders and lead to side effects. In function components, this can be seen with the use of React Hooks that might cause unexpected behavior if not properly implemented.\n \n Strict Mode runs lifecycle methods and hooks twice to ensure that any issues related to these methods are caught early. This also helps check if your components are resilient to multiple renders and do not cause issues like memory leaks or improper updates.\n\n4. Detecting Legacy Context API Usage:\n React used to have an older, more error-prone Context API. Strict Mode helps identify if your app is using the legacy Context API, and to do so, it renders the components twice to ensure that it catches any inconsistencies.\n\n What Happens During the Second Render?\n\n- During the second render, React checks if the component's behavior changes, which might indicate an issue.\n- If the component produces different outputs or triggers unexpected behavior (such as updating state or causing a side effect), React will warn you in the console, so you can address the issue before it makes it to production.\n  \n Example of What Could Trigger a Warning:\n\nIf you are using a useEffect hook that updates state without the appropriate dependencies, it could cause unintended side effects during the second render.\n\n\n\n Key Takeaways:\n\n- Double rendering in Strict Mode helps ensure your components are pure and free of side effects.\n- It helps identify issues like using unsafe lifecycle methods, improper React Hooks usage, or side effects that could cause problems in production.\n- The double render only happens in development mode and does not affect production behavior, so it's a tool for improving the quality of your code before deployment.",
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["to identify potential problems"],
    codeExample:
      '\nimport React, { useState, useEffect } from "react";\n\nconst MyComponent = () => {\n  const [count, setCount] = useState(0);\n\n  // This will cause a problem in Strict Mode because it causes a side effect in the render\n  useEffect(() => {\n  setCount(count + 1); // This is problematic: causes re-render in render\n  });\n\n  return <div>{count}</div>;\n};\n\n\nHere, React will render the component twice, and during the second render, it will catch that the state update in the useEffect is causing an issue (since state should not be updated during render).',
  },
  {
    id: 111,
    topic: "reactJs",
    question: "What is windowing technique?",
    answer:
      "Windowing technique, also known as virtual scrolling or windowed rendering, is a performance optimization technique used in web applications, particularly in scenarios where large lists or grids of items need to be displayed. Instead of rendering all items in the list/grid at once, which can lead to performance issues due to excessive DOM elements, windowing techniques only render a subset of the items that are currently visible within the viewport.",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: ["renders a subset of visible items"],
    codeExample:
      "import React from 'react';\r\nimport { FixedSizeList as List } from 'react-window';\r\n\r\nconst Row = ({ index, style }) => (\r\n  <div style={style}>\r\n  Row {index}\r\n  </div>\r\n);\r\n\r\nfunction VirtualizedList() {\r\n  return (\r\n  <List\r\n  height={400}  // The height of the window (viewport)\r\n  itemCount={10000} // Total number of items\r\n  itemSize={35} // Height of each item\r\n  width=\"100%\"  // Full width\r\n  >\r\n  {Row}\r\n  </List>\r\n  );\r\n}\r\n\r\nexport default VirtualizedList;\r",
  },
  {
    id: 112,
    topic: "reactJs",
    question: "What are capture phase events?",
    answer:
      'Capture phase events are a part of the event propagation model in the Document Object Model (DOM) of web browsers. In this model, when an event occurs on an element, such as a click or a keypress, it doesn\'t just affect that element; it also affects its parent elements in the DOM hierarchy. Event propagation allows events to "bubble" up from the target element to its ancestors in the DOM tree or "capture" down from the top of the tree to the target element.\nThe onClickCapture React event is helpful to catch all the events of child elements irrespective of event propagation logic or even if the events propagation stopped. This is useful if you need to log every click events for analytics purpose.',
    tags: ["fundamental"],
    keyFeatures: [],
    actionWords: ["part of event propagation model", " captures event"],
    codeExample: "",
  },
  {
    id: 113,
    topic: "reactJs",
    question: "How does React batch updates multiple state ?",
    answer:
      'React batches multiple state updates using a mechanism called "batching" or "batched updates." Batching allows React to group multiple consecutive state updates into a single update, reducing the number of renders and improving performance. This batching behavior applies to both class components with  "setState " and functional components with  "useState ".\n\n ⭐Key Points about React\'s State Batching:\n\n1. Asynchronous State Updates  :\n - By default, React processes state updates asynchronously. When you call  "setState " (for class components) or update state using the function returned by  "useState " (for functional components), React doesn\'t immediately apply the update. Instead, it schedules the update to be processed later.\n\n2. Batching Mechanism  :\n - React batches consecutive state updates that occur within the same event loop iteration. When multiple state updates are triggered within the same event handler, lifecycle method, or useEffect callback during the same event cycle, React combines them into a single update.\n\n3. Optimized Rendering  :\n - Batching reduces unnecessary re-renders by ensuring that React only updates the component once with the latest state values, even if multiple state updates occur in quick succession. This optimization helps improve performance and avoid unnecessary rendering overhead.\n\n4. Updates Outside React Events  :\n - React\'s batching mechanism applies primarily to updates triggered within React event handlers, lifecycle methods, and effects. Updates triggered outside of these contexts, such as asynchronous callbacks (e.g., setTimeout, fetch), are not batched by default and may trigger separate render cycles.\n\n5. Force Update and Synchronous Updates  :\n - React provides the  "forceUpdate " method in class components to force a synchronous update bypassing batching. Additionally, React\'s Concurrent Mode introduces a way to explicitly opt into synchronous updates using the  "unstable_batchedUpdates " function, although it\'s considered unstable and subject to change.\n\n',
    tags: ["conceptual"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 114,
    topic: "reactJs",
    question: "Is it possible to prevent automatic batching?",
    answer:
      "Yes, it is possible to prevent automatic batching default behavior. There might be cases where you need to re-render your component after each state update or updating one state depends on another state variable. Considering this situation, React introduced flushSync method from react-dom API for the usecases where you need to flush state updates to DOM immediately.",
    tags: ["conceptual"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 115,
    topic: "reactJs",
    question:
      "How do you make sure that user remains authenticated on page refresh while using Context API State Management?",
    answer:
      "When a user logs in and reload, to persist the state generally we add the load user action in the useEffect hooks in the main App.. While using Redux, loadUser action can be easily accessed.\nBut while using Context API, to access context in App., wrap the AuthState in index. so that App. can access the auth context. Now whenever the page reloads, no matter what route you are on, the user will be authenticated as loadUser action will be triggered on each re-render.\r\n",
    tags: ["context"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 116,
    topic: "reactJs",
    question: "How state updates in React Function component ?",
    answer:
      'In React functional components, state updates are handled using the  "useState " hook. Here\'s how it works:\n\n1. Declare State with  "useState "  :\n The  "useState " hook is used to declare state variables. It takes an initial state as an argument and returns an array with two elements:\n - The current state value.\n - A function to update the state.\n\n Example:\n  \n const [count, setCount] = useState(0);\n \n\n2. Update State with the State Setter Function  :\n To update the state, you call the setter function ( "setCount " in this example) with the new state value. React will then re-render the component with the updated state.\n\n Example:\n  \n setCount(count + 1);\n  \n\n3. State Updates are Asynchronous  :\n State updates in React are asynchronous. React batches multiple state updates and applies them in the most efficient way possible.\n\n4. Functional Updates  :\n If the new state depends on the previous state, it’s recommended to use a function inside the setter function. This function receives the previous state and returns the new state.\n\n Example:\n \n setCount(prevCount => prevCount + 1);\n  \n\n5. Re-renders on State Change  :\n When the state changes, React re-renders the component to reflect the updated state in the UI. Only components that depend on the updated state will re-render.\n\n6. Multiple State Variables  :\n You can declare multiple state variables in a single component.\n\n Example:\n \n const [name, setName] = useState(\'\');\n const [age, setAge] = useState(0);\n \n\n7. Initial State  :\n The initial state can also be computed lazily, meaning you can pass a function to  "useState " to calculate the initial state only once during the component\'s first render.\n\n Example:\n  \n const [expensiveValue, setExpensiveValue] = useState(() => computeExpensiveValue());\n  \n\nEach time you call the state setter function, React schedules a re-render with the new state. This is how state is updated in functional components.',
    tags: ["hooks"],
    keyFeatures: [],
    actionWords: [],
    codeExample: "",
  },
  {
    id: 117,
    topic: "reactJs",
    question:
      'In JS variable declared with "const" cannot be updated , then how the state is updating with const declaration ? ',
    answer:
      'In JavaScript, when a variable is declared with  "const ", it cannot be re-assigned  . However, it can be mutated if it\'s an object or array. \n\nNow, in the context of React and the  "useState " hook, the confusion arises because  "const " is used to declare state variables like this:\n\n\nconst [count, setCount] = useState(0);\n \n\nHere’s what’s really happening:\n\n1.  "const " doesn’t mean the value is immutable  :\n In this case,  "count " is the current state value at a specific point in time. When you call  "setCount() ", you’re not modifying the  "count " variable itself, but rather requesting React to update the state  . React then re-renders the component, and during the re-render, a new value of  "count " is provided by React, replacing the old value.\n\n Since  "count " is re-declared each time the component re-renders, it gets updated with the latest value.\n\n2.  "useState " is a hook that gives access to state  :\n The  "useState " hook returns an array where:\n - The first element ( "count ") is a snapshot of the current state.\n - The second element ( "setCount ") is a function that informs React to update the state and trigger a re-render.\n\n3. State persists across renders  :\n Even though you are using  "const ", React internally manages the state across renders. Every time  "setCount " is called, React stores the new state value and provides that value the next time the component renders.\n\n So, when the component re-renders, the  "const " declaration doesn’t violate JavaScript rules because it’s being re-declared with a new value during each render.\n\n  ',
    tags: ["conceptual"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      ' Example:\n \nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  const increment = () => {\n  setCount(count + 1);\n  };\n\n  return (\n  <div>\n  <p>Current count: {count}</p>\n  <button onClick={increment}>Increment</button>\n  </div>\n  );\n}\n\n\n- When  "setCount " is called, React re-renders the component.\n- On the next render,  "count " is updated to the new value (e.g., 1 if incremented).\n- The  "const [count, setCount] " declaration runs again, but with the updated value of  "count ".\n\nSo, in summary,  "const " is re-declaring the  "count " variable on every re-render, and React ensures that it always holds the current state value. It’s not violating the rule of  "const ", because the variable itself is being re-assigned during each new render, not mutated.',
  },
  {
    id: 118,
    topic: "reactJs",
    question:
      "Since count is re-declared each time the component re-renders, it gets updated with the latest value.  if so , then why react works with previous snapshot until unless functional state update is done",
    answer:
      ' The key difference lies in how React batches and schedules state updates. Let’s break it down step-by-step to clarify how React works with previous snapshots and why using a functional state update can help avoid issues in certain scenarios.\n\n 1. Why React Uses the Previous Snapshot of State  :\n When you update state in React, the component is re-rendered, and React passes the current state to the component. However, React does not update the state immediately but schedules an update. This is why, within the same render cycle, you may still have access to the previous snapshot of the state before the state update happens.\n\n .\n\n 2. Functional Updates to Avoid Working with Stale State  :\n To avoid this issue of working with stale or previous state values in the same render cycle, React allows you to use functional state updates  . When you pass a function to  "setState ", React will make sure that the function receives the most up-to-date state (i.e., the state after all previous updates have been processed).\n\n \n  \n\n\n\n 3. Why This Matters  :\n In scenarios where you update the state based on its current value  , you risk using an outdated snapshot of the state. This typically happens when the state update happens synchronously in the same render cycle  , but React hasn’t yet re-rendered the component. That’s why the functional state update form ( "setState(prevState => ...) ") is crucial, especially when the new state depends on the previous one.\n\n ⭐Key Points:\n- Normal state updates  : \n When you update state with a direct value (e.g.,  "setCount(count + 1) "), React schedules the update, but any subsequent updates in the same render cycle may still refer to the old state, leading to unexpected results.\n\n- Functional state updates  : \n This ensures that you’re always working with the latest state, even if multiple state updates happen in a single render cycle. It avoids issues with stale or outdated state snapshots.\n\nSummary:\nReact uses the previous snapshot of state within the same render cycle unless you explicitly use a functional state update  . This is because React batches updates and doesn’t immediately re-render the component after each  "setState " call. The functional state update is a way to make sure you’re working with the most up-to-date state.',
    tags: ["conceptual"],
    keyFeatures: [],
    actionWords: [],
    codeExample:
      'For example:\n  \n const [count, setCount] = useState(0);\n\n const increment = () => {\n setCount(count + 1); // This will use the current  "count " value\n setCount(count + 1); // This will also use the current  "count " value\n };\n  \n\n In this code:\n - Both  "setCount(count + 1) " statements are referring to the same value of  "count " because React has not yet re-rendered the component or updated  "count ".\n - React batches these updates, so both updates see  "count " as  "0 " in the same render cycle, which is why  "count " is only incremented by  "1 " instead of  "2 "\n\nExample with functional updates:\n \n const [count, setCount] = useState(0);\n\n const increment = () => {\n setCount(prevCount => prevCount + 1); //  "prevCount " is guaranteed to be the latest value\n setCount(prevCount => prevCount + 1); // Works correctly;  "prevCount " will reflect the updated state\n };\n Here’s what’s happening:\n - When you use  "setCount(prevCount => prevCount + 1) ", React ensures that  "prevCount " reflects the latest state value.\n - Even if you call  "setCount " multiple times in a row, each call will see the most up-to-date version of the state, so the state will correctly increment by  "2 " as expected.',
  },
  {
    id: 119,
    topic: "reactJs",
    question: 'Explain the working of  "useEffect" hook in detail. ',
    answer:
      'The "useEffect" hook in React is a <mark>powerful tool for managing side effects in functional components</mark>. It allows you to perform operations like data fetching, subscriptions, or directly interacting with the DOM, which are typically considered side effects in React. Let’s explore it in detail:\n\n What is "useEffect"?  \n"useEffect" is a React hook that lets you perform side effects in function components. <mark>A side effect is any operation that affects something outside of the component</mark>, such as:\n- Fetching data from an API.\n- Interacting with browser APIs (like "localStorage" or "document").\n- Setting up and cleaning up event listeners.\n- Performing DOM manipulations.\n\n⚙️ How does "useEffect" work?  \n\n"useEffect" takes two arguments:\n1. A callback function (effect function) that contains the code you want to run.\n2. An optional dependency array that controls when the effect should run.\n\n \n```useEffect(() => {\n  // Code to run when the component renders or updates\n}, [dependencies]);```\n\n\n- Callback function  : This is the side effect logic you want to perform. It can return a cleanup function, which will be executed before the component is re-rendered or unmounted.\n- Dependency array  : This tells React when to run the effect. React will re-run the effect whenever any of the dependencies change. If you omit this array, the effect will run on every render  .\n\n⚙️ Why "useEffect" is needed?  \nReact components should remain pure functions of props and state, meaning they should render UI based solely on the inputs (props/state) without side effects. However, many real-world apps require side effects like:\n- Fetching data after a component mounts.\n- Updating the DOM manually or interacting with APIs.\n- Managing timers or subscriptions.\n\nIn class components, side effects were managed in lifecycle methods like "componentDidMount", "componentDidUpdate", and "componentWillUnmount". In functional components, "useEffect" consolidates these into a single hook, giving you more control and simplicity.\n\n⚙️ When to use "useEffect"?  \nUse "useEffect" when you need to:\n- Run code on component mount (like fetching data when the component loads).\n- Run code on updates (like updating the document title based on a changing state or prop).\n- Set up and clean up resources (like setting up event listeners or timers).\n\n Types of "useEffect" usage  :\n\n  1. Component Mounting (like "componentDidMount")  :\nTo run an effect only once when the component mounts (e.g., fetching data from an API), you can pass an empty dependency array  .\n\n \n```useEffect(() => {\n  console.log(\'Component mounted\');\n\n  // API call or other side effects here\n}, []);```\n\n- The callback runs after the initial render and never again unless unmounted.\n\n 2. Component Updates (like "componentDidUpdate")  :\nIf you want to run an effect whenever some state or props change  , you can provide them as dependencies in the array.\n\n \n```useEffect(() => {\n  console.log(\'Effect runs when "count" changes\');\n}, [count]);```\n\n- This will only run when the "count" variable changes. It will not run on every render.\n\n  3. Cleanup (like "componentWillUnmount")  :\nIf your effect involves resources that need to be cleaned up (e.g., subscriptions, event listeners, timers), you return a cleanup function from your effect. This function runs before the component is removed from the DOM or before the effect is re-executed due to dependency changes.\n\n \n```useEffect(() => {\n  const timer = setInterval(() => {\n  console.log(\'Interval running\');\n  }, 1000);\n\n  // Cleanup function to clear the interval when component unmounts\n  return () => {\n  clearInterval(timer);\n  console.log(\'Interval cleared\');\n  };\n}, []);```\n\n\n 4. Effect with Dependencies  :\nYou can specify one or more dependencies in the array, and the effect will only run when any of these dependencies change. This is helpful for optimizing performance and avoiding unnecessary re-renders.\n\n \n```useEffect(() => {\n  console.log(\'Effect runs when either "count" or "data" changes\');\n}, [count, data]);```\n\n\n How "useEffect" works in depth  :\n\n- After Rendering  : The callback function inside "useEffect" is called after the DOM has been painted  . This means your effect does not block rendering and happens asynchronously after the browser updates the UI.\n\n- Clean-up Phase  : If your effect has a cleanup function (e.g., to cancel subscriptions or timers), React will call it before the component is removed from the DOM or before running the effect again in response to dependency changes.\n\n  \n \n\n  When to Avoid "useEffect"  :\n- Avoid using "useEffect" for things that could be handled synchronously inside the render (like formatting data or deriving values from props or state).\n- Don’t overuse "useEffect" for every state change — use it only when an actual side effect is needed, such as updating external systems, APIs, or the DOM.\n\n Conclusion  :\n"useEffect" is essential for managing side effects in React functional components. It consolidates the behavior of class lifecycle methods ("componentDidMount", "componentDidUpdate", and "componentWillUnmount") and makes it easier to handle effects declaratively.',
    tags: ["hooks", "useEffect"],
    keyFeatures: [],
    actionWords: ["side effects"],
    codeExample:
      " Common Usage Patterns  :\n\n1. Fetching Data from APIs  :\n  \n useEffect(() => {\n async function fetchData() {\n const response = await fetch('https://api.example.com/data');\n const data = await response.on();\n console.log(data);\n }\n fetchData();\n }, []); // Empty array means this effect runs once when the component mounts\n  \n\n2. Subscribing and Unsubscribing  :\n  \n useEffect(() => {\n const handleResize = () => {\n console.log('Window resized');\n };\n window.addEventListener('resize', handleResize);\n\n return () => {\n window.removeEventListener('resize', handleResize);\n };\n }, []); // Effect runs once on mount, cleanup on unmount\n \n\n3. Updating the Document Title  :\n  \n useEffect(() => {\n document.title = \"Count: ${count}\";\n }, [count]); // Runs every time the \"count\" variable changes",
  },
  {
    id: 120,
    topic: "reactJs",
    question: "What is abortController in react ? ",
    answer:
      "The AbortController is a built-in JavaScript API that <mark>allows you to cancel fetch requests or any other asynchronous tasks</mark>. In a React application, it is commonly used to cancel API requests when a component unmounts or a new request is triggered, preventing potential memory leaks or race conditions.\n\nWhy Use AbortController in React?\nPrevent Memory Leaks: Ensure fetch requests don’t continue after a component unmounts.\nCancel Previous Requests: In scenarios like search input, where new requests override old ones, you can cancel the old requests.",
    tags: ["conceptual"],
    keyFeatures: [],
    actionWords: [
      "built-in Web API (not specific to React)",
      "cancel (abort) asynchronous operations like fetch requests.",
    ],
    codeExample:
      "import React, { useState, useEffect } from 'react';\r\n\r\nfunction DataFetcher() {\r\n  const [data, setData] = useState(null);\r\n  const [error, setError] = useState(null);\r\n\r\n  useEffect(() => {\r\n  // Create an instance of AbortController\r\n  const controller = new AbortController();\r\n  const signal = controller.signal;\r\n\r\n  // Fetch data with the signal passed to fetch\r\n  fetch('https://api.example.com/data', { signal })\r\n  .then(response => {\r\n  if (!response.ok) {\r\n  throw new Error('Network response was not ok');\r\n  }\r\n  return response.on();\r\n  })\r\n  .then(data => setData(data))\r\n  .catch(err => {\r\n  // If the request was aborted, err.name will be 'AbortError'\r\n  if (err.name !== 'AbortError') {\r\n  setError(err);\r\n  }\r\n  });\r\n\r\n  // Cleanup function to abort fetch if component unmounts or re-renders\r\n  return () => {\r\n  controller.abort();\r\n  };\r\n  }, []); // Dependency array ensures the effect runs once\r\n\r\n  if (error) return <p>Error: {error.message}</p>;\r\n  if (!data) return <p>Loading...</p>;\r\n\r\n  return (\r\n  <div>\r\n  <h2>Fetched Data:</h2>\r\n  <pre>{JSON.stringify(data, null, 2)}</pre>\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default DataFetcher;\r\n\n\nExplanation:\n\nCreating the Controller:\nAn instance of AbortController is created at the start of the effect.\n\nPassing the Signal:\nThe signal property of the controller is passed to the fetch call so that the fetch operation can listen for abort events.\n\nCleanup Function:\nThe effect returns a cleanup function that calls controller.abort(), canceling the fetch if the component unmounts or if the effect re-runs before the request completes.",
  },
  {
    id: 121,
    topic: "reactJs",
    question: "New Features of Introduced in React 19 ?",
    answer:
      "\n\n 📝 Summary : of React 19\n\nReact 19 marks a significant upgrade from React 18, focusing on reducing complexity for developers while enhancing performance. This new version introduces features like a compiler that streamlines code optimization, simplifies ref handling, and replaces multiple hooks with the versatile  use()  hook. Overall, React 19 aims to make coding faster and more intuitive for developers.\n\n ⭐Key Points\n2. New Features  :\n - 🎯React Compiler  : \n - Optimizes React code into plain JavaScript.\n - Eliminates the need for manual performance optimizations.\n - 🎯Removal of Memoization Hooks  :\n - No longer need for  useMemo ,  useCallback , and  memo .\n - Optimizations are handled automatically by the compiler.\n - 🎯Simplified Ref Handling  :\n - No need for  forwardRef ; refs can be passed as standard props.\n - 🎯New  use()  Hook  :\n - Replaces  useEffect ,  useContext , and  useState  for data fetching and handling state.\n - Allows for smoother and cleaner component code.\n\n3. Data Fetching  :\n - The  use()  hook enables efficient data fetching and eliminates the boilerplate associated with  useEffect .\n\n4. Form Management Enhancements  :\n - Actions  : Connect form submissions to either server or client side, simplifying form handling.\n - useFormStatus()  : Manage the state of form submissions easily, such as disabling buttons during submission.\n - useOptimistic()  : Enables optimistic UI updates for a more dynamic user experience.\n\n5. Directives  :\n - Introduces  use client  and  use server  directives for component configuration, making it easier to define component behavior.\n\n6. Error and Loading Management  :\n - Global error and loading state management is simplified, allowing developers to focus more on application logic rather than state management.\n\n7. Performance Improvements  :\n - Automatic handling of memoization and component optimizations leads to cleaner, more efficient code without sacrificing performance.\n",
    tags: ["fundamental", "React 19"],
    keyFeatures: [],
    actionWords: ["Removal of Memoization Hooks", "Form Management Enhancements", "New  use()  Hook", "Simplified Ref Handling"],
    codeExample: "",
  },
  {
    id: 122,
    topic: "reactJs",
    question: "How to scale large application in react ?",
    answer:
      "Scaling a large React application means making sure it remains fast  , organized  , and easy to maintain as it grows. Here's how you can scale your React app in simpler terms:\n\n  1. Component Structure & Reusability  \n - Break your UI into smaller, reusable components  . Each component should do one thing well  .\n - Instead of writing huge files, create smaller, manageable components that are easy to understand and maintain.\n - For example, instead of having one large  App.  file, split it into smaller files like  Header. ,  Sidebar. ,  Footer. , etc.\n\n  2. State Management  \n - State management becomes crucial as your app grows. Instead of passing state around through many layers of components, use a state management solution like Redux  , Context API  , or Recoil to store global data.\n - For example, instead of passing a  user  object down through every component, you can store it in Redux and access it directly from anywhere in the app.\n\n  3. Code Splitting  \n - As your app grows, the bundle size (the size of the app that gets loaded into the browser) also increases. To speed up loading times  , use code splitting  .\n - This means that not all code is loaded at once. React's built-in feature,  React.lazy() , can help load parts of your app only when they're needed.\n\n\n  \n\n This way, React only loads  SomeComponent  when it’s needed, not on the initial load.\n\n  4. Performance Optimization  \n - Use memoization to prevent unnecessary re-renders. This helps in improving performance.\n - Use React.memo for functional components and PureComponent for class components to prevent re-rendering when the props haven’t changed.\n\n  \n  \n\n  5. Lazy Loading Images and Other Resources  \n - Lazy loading means loading images or other resources only when they're needed. For example, images should only load when they’re visible on the screen (i.e., when they scroll into view).\n - This reduces the load time and improves performance.\n\n  6. Error Boundaries  \n - As your app grows, there will be more chances for errors. Use Error Boundaries to catch JavaScript errors in parts of the UI and show a fallback instead of crashing the whole app.\n \n \n\n\n  7. Server-Side Rendering (SSR)  \n - If you have a large app with many pages, consider Server-Side Rendering (SSR) with Next.  . This pre-renders pages on the server, so the browser gets fully rendered HTML instead of a blank page, improving SEO and performance  .\n\n  8. Routing  \n - Use React Router for handling different pages and views. For large apps, it helps manage navigation without full page reloads, which keeps the app fast.\n - For even larger apps, consider using nested routing to break down complex pages into simpler components.\n\n  9. Testing  \n - Test your components using tools like Jest and React Testing Library  . This ensures your app remains bug-free as it grows.\n - Unit tests and integration tests help in identifying problems before they affect users.\n\n  10. Monitoring & Analytics  \n - Use tools like Google Analytics  , Sentry  , or LogRocket to monitor your app's performance and catch issues in production.\n - This helps you keep track of errors and slow parts of your app.\n\n\n\n  📝Summary:  \nTo scale a large React app:\n- Break your UI into smaller components  .\n- Use state management (like Redux or Context API).\n- Use code splitting to load parts of the app as needed.\n- Optimize performance with React.memo  , lazy loading  , and error boundaries  .\n- Consider SSR for better performance and SEO.\n- Implement testing and monitoring to ensure quality.\n\nThis way, your app can handle more complexity without becoming slow or hard to maintain. Let me know if you'd like more details on any part!",
    tags: ["optimization"],
    keyFeatures: [],
    actionWords: [
      "Component Structure & Reusability",
      "State Management",
      "code splitting",
      " performance optimization",
    ],
    codeExample:
      " Example:\n  \n const SomeComponent = React.lazy(() => import('./SomeComponent'));\n\n Example:\n  \n const MyComponent = React.memo(function MyComponent(props) {\n // Only re-renders if props change\n return <div>{props.name}</div>;\n });",
  },
  {
    id: 123,
    topic: "reactJs",
    question: "what is difference between react.memo() & useMemo() ?",
    answer:
      "  1.  React.memo() :\n React.memo()  is used to optimize functional components by <mark>preventing unnecessary re-renders</mark>  .\n\n- How it works  : It wraps a functional component and memoizes it. This means React will skip re-rendering the component if its props haven't changed since the last render.\n- When to use  : Use  React.memo()  when you have a child component that receives props and doesn’t need to re-render unless its props change.\n\n \n \n\n  2.  useMemo() :\n useMemo()  is used to <mark>memoize values and optimize expensive calculations inside a component</mark>.\n\n- How it works  : <mark>It returns a memoized value </mark> . You pass a function that performs a calculation, and  useMemo()  will only recompute the value when the dependencies change (e.g., props or state).\n- When to use  : Use  useMemo()  when you have expensive calculations inside a component and you want to avoid repeating those calculations unless the input values change.\n\n \n \n\n- In this example, the result is only recomputed if the  num  prop changes. If the  counter  changes, the expensive calculation does not need to be recalculated  .\n\n  Key ⚖️Differences:\n-  React.memo() :\n  - Used on components  .\n  - Prevents unnecessary re-renders of a component if its props haven't changed.\n  - Works for whole components  .\n\n-  useMemo() :\n  - Used inside components  .\n  - Optimizes expensive calculations or operations inside a component.\n  - Works for memoizing values like calculations or objects.\n\n\n\n  📝 Summary :  :\n-  React.memo()  is for preventing unnecessary re-renders of components based on props.\n-  useMemo()  is for memoizing values to avoid redoing expensive operations inside components.\n",
    tags: ["comparison", "react.memo() vs useMemo()"],
    keyFeatures: [],
    actionWords: ["used inside components ", "wraps a functional component and memoizes it", "Used on components ", "memoize values and optimize expensive calculations inside a component."],
    codeExample:
      " Example  :\n\nimport React from 'react';\n\nconst Greeting = React.memo(({ name }) => {\n  console.log('Rendering Greeting...');\n  return <h1>Hello, {name}!</h1>;\n});\n\nexport default Greeting;\n\n- If the  name  prop hasn’t changed, React will not re-render  Greeting  even if the parent component re-renders.\n\n Example  :\n\n \nimport React, { useMemo, useState } from 'react';\n\nfunction ExpensiveCalculation({ num }) {\n  const [counter, setCounter] = useState(0);\n\n  // Memoize the expensive calculation\n  const result = useMemo(() => {\n  console.log('Calculating...');\n  return num 1000;  // An expensive calculation\n  }, [num]);  // Recompute only when 'num' changes\n\n  return (\n  <div>\n  <h2>Result: {result}</h2>\n  <button onClick={() => setCounter(counter + 1)}>Counter: {counter}</button>\n  </div>\n  );\n}\n\nexport default ExpensiveCalculation;",
  },
  {
    id: 124,
    topic: "reactJs",
    question: "How you plan design architecture in frontend? ",
    answer:
      "Designing an architecture for the frontend involves structuring the application to be scalable, maintainable, and efficient. \n 1. Understand Application Requirements  \n - Size of the Application: Small, medium, or enterprise-level.\n - Features: Authentication, real-time updates, APIs, complex state management, etc.\n - Tech Stack: React, Angular, Vue., or others.\n - Team Size: Larger teams may need stricter conventions and modular structures.\n\n\n\n 2. Choose an Architecture Pattern  \nCommon frontend architectural patterns:\n1. Component-Based Architecture  :\n - Focuses on reusable components.\n - Best for frameworks like React, Angular, and Vue.\n2. Layered Architecture  :\n - Layers like presentation, logic, and data are separated.\n3. Micro-Frontend Architecture  :\n - Breaks the app into independent micro-frontends for scalability.\n\n\n\n 3. Directory Structure  \nA well-structured directory makes your application organized and scalable. Example for a React-based project:\n\n plaintext\nsrc/\n├── assets/   ➡️Images, fonts, static files\n├── components/  ➡️Reusable UI components\n│ ├── Button/\n│ │ ├── Button.\n│ │ └── Button.css\n│ ├── Header/\n│ └── Footer/\n├── contexts/  ➡️React Context for global state\n├── hooks/  ➡️Custom hooks (e.g., useFetch, useAuth)\n├── pages/   ➡️Pages or views (e.g., Home, About)\n│ ├── Home.\n│ ├── About.\n│ └── styles.css\n├── services/  ➡️API calls, service functions\n│ ├── api.\n│ ├── auth.\n│ └── products.\n├── store/   ➡️State management (Redux, Zustand, etc.)\n│ ├── slices/  ➡️Redux slices or context logic\n│ └── store.\n├── utils/   Utility functions\n│ ├── validation.\n│ └── helpers.\n├── App.   ➡️Root component\n├── index.   ➡️Entry point\n└── styles/  ➡️Global styles, CSS variables\n \n\n\n\n 4. State Management  \n - Local State: Manage small, isolated states using hooks like  useState  or  useReducer .\n - Global State: Use Context API, Redux, Zustand, or Recoil for shared state.\n - Server State: Manage API responses using libraries like React Query, SWR, or Apollo Client.\n\n\n\n 5. Component Design  \n - Follow Atomic Design Principles  :\n 1. Atoms: Small, basic elements (e.g., buttons, inputs).\n 2. Molecules: Groups of atoms (e.g., form fields).\n 3. Organisms: Sections of the UI (e.g., a navbar with links).\n 4. Templates/Pages: Entire views or screens.\n\n\n\n 6. Styling Approach  \n - CSS-in-JS: Libraries like styled-components or Emotion.\n - CSS Modules: Scoped CSS for components.\n - Frameworks: Tailwind CSS, Bootstrap, or Material-UI for faster development.\n\n\n\n 7. API Communication  \n - Use  axios  or  fetch  to communicate with APIs.\n - Centralize API logic in the  services/  directory.\n - Handle errors and loading states consistently.\n\n 8. Routing  \n - Use  react-router-dom  or your framework's router for navigation.\n - Define routes and lazy-load components for better performance.\n \n\n \n\n\n\n 9. Testing  \n - Write tests to ensure code quality.\n - Unit Tests: Test individual functions or components.\n - Integration Tests: Test combined functionality.\n - End-to-End (E2E) Tests: Simulate user interactions.\n - Tools:\n - Jest for unit testing.\n - React Testing Library for component testing.\n - Cypress for E2E testing.\n\n\n\n 10. Performance Optimization  \n - Lazy Loading: Load components or images only when needed.\n - Code Splitting: Use dynamic imports to split bundles.\n - Memoization: Optimize re-renders using  React.memo ,  useMemo , or  useCallback .\n - Static Assets: Use a CDN to serve images and other static files.\n - Web Vitals: Monitor performance metrics using tools like Lighthouse.\n\n\n\n 11. Continuous Integration/Deployment (CI/CD)  \n - Automate builds and deployments using CI/CD tools like GitHub Actions, Jenkins, or CircleCI.\n - Use Netlify, Vercel, or AWS for hosting.\n\n\n\n 12. Documentation  \n - Use tools like Storybook for documenting components.\n - Maintain a README for onboarding new developers.\n\n\n\n Example Scenarios:\n1. Small Applications: Simple component-based architecture with Context API.\n2. Enterprise Applications: Micro-frontend architecture with Redux and React Query for state and API management.\n\nThis approach ensures the frontend is clean, maintainable, and scalable over time.",
    tags: ["conceptual", "design architecture"],
    keyFeatures: [],
    actionWords: ["Follow Atomic Design Principles ", "API Communication", "Performance Optimization", "State Management"],
    codeExample:
      'Example API service:\n \n// services/api.\nimport axios from "axios";\n\nconst api = axios.create({\n  baseURL: "https://api.example.com",\n  timeout: 5000,\n});\n\nexport const getUsers = () => api.get("/users");\nexport const login = (credentials) => api.post("/login", credentials);\n\nexport default api;\n\nRouting : \n\nimport { BrowserRouter as Router, Routes, Route } from "react-router-dom";\nimport Home from "./pages/Home";\nimport About from "./pages/About";\n\nfunction App() {\n  return (\n  <Router>\n  <Routes>\n  <Route path="/" element={<Home />} />\n  <Route path="/about" element={<About />} />\n  </Routes>\n  </Router>\n  );\n}',
  },
  {
    id: 125,
    topic: "reactJs",
    question: "What is useId hook in react ?",
    answer:
      "The useId hook in React is used to generate a unique, stable ID that can be used for elements that require a unique identifier, such as form controls, accessibility features, or linking labels to form inputs. It is particularly useful for handling accessibility concerns, like associating form input labels with their corresponding inputs.\n\n⭐Key Features:\n- Unique IDs: It ensures that IDs generated within a component are unique, avoiding collisions even if the component is used multiple times.\n- Server-side rendering (SSR) compatibility: React's useId hook helps prevent mismatches between client-side and server-side rendering by generating unique IDs consistently across renders.\n\n\n\n When to use useId:\n- When you need to generate a unique identifier for form elements like <input>, <select>, etc.\n- When creating reusable components that need to ensure unique IDs for accessibility or styling purposes.\n  \nThis hook is particularly beneficial in large applications where many form elements or components might be dynamically rendered. It ensures uniqueness without needing to manually handle the creation of IDs.",
    tags: ["hooks", "useId"],
    keyFeatures: [],
    actionWords: ["to generate a unique,stable ID"],
    codeExample:
      "import React, { useId } from 'react';\r\n\r\nfunction AccessibleInput() {\r\n  // Generate a unique ID\r\n  const id = useId();\r\n\r\n  return (\r\n  <div>\r\n  <label htmlFor={id}>Enter your name:</label>\r\n  <input id={id} type=\"text\" />\r\n  </div>\r\n  );\r\n}\r\n\r\nexport default AccessibleInput;\r",
  },
  {
    id: 126,
    topic: "reactJs",
    question: "What is useDefferedValue hook ?",
    answer:
      "The useDeferredValue hook in React is <mark>used to defer the computation or rendering of a value to improve performance in situations where immediate updates are not necessary</mark>. \n <mark>It delays updating the value until the UI has finished rendering other higher-priority tasks</mark>, helping to keep the UI responsive.\n\n⭐Key Features:\n1. Defer Non-Urgent Updates: useDeferredValue delays the update of the provided value to a lower priority, allowing urgent UI updates (like user interactions) to happen first.\n2. Improves Performance: Particularly useful when rendering large or complex components that don't need immediate updates.\n\n How It Works:\n- useDeferredValue takes a value and returns a deferred version of it.\n- If the value changes, the deferred value will lag behind the original value until the browser has time to process it.\n\n\n\n \n\n\n 👉When to Use useDeferredValue:\n- Heavy Computations: When rendering or updating involves expensive computations (e.g., filtering a large list).\n- Search Results: To delay updating search results as the user types, reducing unnecessary renders.\n- Animations or Transitions: When animations or transitions should not be interrupted by expensive rendering updates.\n\n\n\n \n\n Key Takeaway:\nuseDeferredValue helps optimize rendering by deferring non-urgent updates, ensuring smoother user experiences without compromising on performance.",
    tags: ["hooks", "useDefferedValue"],
    keyFeatures: [],
    actionWords: ["delays updating the value until the UI has finished rendering other higher-priority tasks"],
    codeExample:
      'Example Usage:\n\n\nimport React, { useState, useDeferredValue } from "react";\n\nfunction App() {\n  const [search, setSearch] = useState("");\n  const deferredSearch = useDeferredValue(search);\n\n  const handleInputChange = (e) => {\n  setSearch(e.target.value);\n  };\n\n  return (\n  <div>\n  <input\n  type="text"\n  placeholder="Search"\n  value={search}\n  onChange={handleInputChange}\n  />\n  <p>Immediate Search Value: {search}</p>\n  <p>Deferred Search Value: {deferredSearch}</p>\n  </div>\n  );\n}\n\nexport default App;\n\n\n\n\n Explanation:\n1. Immediate Updates:\n - The search state is updated immediately as the user types in the input box.\n2. Deferred Updates:\n - The deferredSearch value will update with a slight delay, giving the browser time to render higher-priority tasks first.\n\nPractical Example with Expensive Computations:\n\nimport React, { useState, useDeferredValue, useMemo } from "react";\n\nfunction ExpensiveList({ search }) {\n  // Simulate expensive computation\n  const list = useMemo(() => {\n  return Array(10000)\n  .fill(0)\n  .map((_, index) => Item ${index} ${search});\n  }, [search]);\n\n  return (\n  <ul>\n  {list.map((item, index) => (\n  <li key={index}>{item}</li>\n  ))}\n  </ul>\n  );\n}\n\nfunction App() {\n  const [search, setSearch] = useState("");\n  const deferredSearch = useDeferredValue(search);\n\n  return (\n  <div>\n  <input\n  type="text"\n  placeholder="Search"\n  value={search}\n  onChange={(e) => setSearch(e.target.value)}\n  />\n  <ExpensiveList search={deferredSearch} />\n  </div>\n  );\n}\n\nexport default App;\n',
  },
  {
    id: 127,
    topic: "reactJs",
    question: "what is useTransition hook in React ?",
    answer:
      "The useTransition hook in React <mark>helps manage UI updates that can take some time to complete</mark>. It makes these updates feel smoother by showing a loading state or letting the user continue interacting with the app while the update happens in the background.\n\n\n\n Imagine This Scenario:\nYou're switching tabs in an app:\n- If the tab takes time to load, the app might freeze, making it feel slow.\n- With useTransition, React can prioritize keeping the app responsive while the new tab's content loads in the background.\n\n\n\n⭐Key Features of useTransition:\n1. Delays non-urgent updates: Lets React prioritize more critical tasks, like user interactions.\n2. Shows a pending state: Helps you show a loading spinner or some visual feedback during the transition.\n\n\nWhy Use It:\n- Improves Performance: Keeps the app responsive during complex or slow updates.\n- Better User Experience: The app doesn't freeze; instead, users see a loading state.\n\n\n\n 👉When to Use:\n- For heavy operations like rendering large lists or switching views.\n- When you want to prioritize responsiveness and let background tasks complete without blocking the UI.\n\n\n\nIn simple terms:  \nuseTransition helps React handle slow tasks in the background while keeping the app smooth and interactive. It ensures users don’t feel like the app is stuck.",
    tags: ["hooks", "useTransition"],
    keyFeatures: [],
    actionWords: ["ui-updates", "shows loading state to feel UI changes smoother", "Delays non-urgent updates"],
    codeExample:
      'Example of useTransition in Action:\n\n\nimport React, { useState, useTransition } from "react";\n\nfunction App() {\n  const [isPending, startTransition] = useTransition();\n  const [list, setList] = useState([]);\n\n  const handleClick = () => {\n  // Start a transition for a slow update\n  startTransition(() => {\n  const newList = Array(20000)\n  .fill(0)\n  .map((_, i) => Item ${i + 1});\n  setList(newList);\n  });\n  };\n\n  return (\n  <div>\n  <button onClick={handleClick}>Load Large List</button>\n  {isPending && <p>Loading...</p>} {/ Shows a loading state /}\n  <ul>\n  {list.map((item, index) => (\n  <li key={index}>{item}</li>\n  ))}\n  </ul>\n  </div>\n  );\n}\n\nexport default App;\n\n\n\n\n How It Works:\n1. startTransition: Wraps updates that aren\'t urgent (e.g., updating a huge list).\n2. isPending: Lets you show a loading indicator while the update happens.',
  },
  {
    id: 128,
    topic: "reactJs",
    question: "What is useSyncExternalStore hook in React ? ",
    answer:
      "The useSyncExternalStore hook in React is designed to <mark>subscribe to external data sources (stores) and ensure the React UI stays in sync with those external changes</mark>. It was <mark>introduced in React 18 to handle concurrent rendering</mark> better and provide a reliable way to subscribe to data updates.\n\n\n\n Why Use useSyncExternalStore?\nReact's state management (useState, useReducer) works well for local component state, but external state (like state in Redux, Zustand, or other libraries) might change outside React's control. This hook ensures React always reads the latest value and updates the UI accurately, especially in concurrent rendering scenarios.\n\n\n\n Syntax:\n\nconst value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);\n\n\n Parameters:\n1. subscribe: A function to subscribe to the store or external data source. It takes a callback that gets called whenever the store updates.\n2. getSnapshot: A function to get the current value from the store.\n3. getServerSnapshot (optional): Used in server-side rendering to provide the snapshot during rendering.\n\n\n\n \n\n\n Benefits:\n1. Concurrency-Safe: Works seamlessly with React's concurrent rendering features.\n2. Syncs with External Stores: Handles scenarios where state changes happen outside React (e.g., Redux, Zustand).\n3. Server-Side Rendering Support: Provides consistent snapshots for SSR.\n\n\n\n 💡Use Cases:\n- Synchronizing React components with external state managers (e.g., Redux, Zustand, or custom stores).\n- Managing data that changes frequently and needs to stay in sync across the app.\n\n\n\nIn simple terms:  \nuseSyncExternalStore lets React safely and efficiently listen to changes in external data sources, ensuring your UI always stays up-to-date.",
    tags: ["hooks", "useSyncExternalStore"],
    keyFeatures: [],
    actionWords: ["subscribes to external data source", "concurrent rendering"],
    codeExample:
      'Example: Using useSyncExternalStore with a Simple Store\n\n Create a Store:\n\nconst store = {\n  value: 0,\n  listeners: new Set(),\n\n  // Method to get the current value\n  getSnapshot() {\n  return this.value;\n  },\n\n  // Method to update the value\n  setValue(newValue) {\n  this.value = newValue;\n  this.listeners.forEach((listener) => listener());\n  },\n\n  // Method to subscribe to updates\n  subscribe(listener) {\n  this.listeners.add(listener);\n  return () => this.listeners.delete(listener); // Unsubscribe\n  }\n};\n\n\n Use the Hook:\n\nimport React from "react";\nimport { useSyncExternalStore } from "react";\n\nfunction Counter() {\n  // Subscribe to the store and get the current value\n  const count = useSyncExternalStore(\n  store.subscribe,  // Subscribes to changes\n  store.getSnapshot // Gets the latest value\n  );\n\n  return (\n  <div>\n  <h1>Count: {count}</h1>\n  <button onClick={() => store.setValue(count + 1)}>Increment</button>\n  </div>\n  );\n}\n\nexport default Counter;\n\n\n\n\n How It Works:\n1. store.subscribe: React is notified whenever the store value changes.\n2. store.getSnapshot: React fetches the latest value from the store.\n3. UI Updates: React ensures the component is re-rendered with the new value, even during concurrent rendering.',
  },
  {
    id: 129,
    topic: "reactJs",
    question: "How react functional component handles shouldComponentUpdate ?",
    answer:
      "In React function components, shouldComponentUpdate is not used directly because it is a lifecycle method specifically designed for class components  . However, React function components can achieve similar behavior using React.memo and useMemo  .\n\n Here's how each works:\n\n 1. React.memo  :\n- React.memo is a higher-order component (HOC) that can be used to optimize function components by preventing unnecessary re-renders.\n- It works by shallowly comparing the previous and next props of a function component. If the props haven’t changed, React will skip rendering the component.\n  \n  How it works  :\n  - By default, React will re-render a function component whenever its parent re-renders. React.memo allows you to prevent this re-rendering if the props haven’t changed.\n  - It’s similar to shouldComponentUpdate in class components but for function components.\n\n \n\n 2. useMemo  :\n- useMemo is a hook that helps to memoize expensive calculations or values to prevent recalculating them unnecessarily on every render.\n- While not exactly the same as shouldComponentUpdate, useMemo can be used to memoize values that depend on certain props or state, thus preventing unnecessary recalculations of those values.\n\n \n ⭐Key Points:\n- React.memo is the closest thing to shouldComponentUpdate in function components. It allows you to prevent unnecessary re-renders based on shallow comparison of props.\n- useMemo is useful for memoizing values or computations that depend on specific props or state to avoid redundant calculations.\n\nSo, while function components don’t have shouldComponentUpdate, React.memo and useMemo provide similar functionality and help optimize performance by preventing unnecessary re-renders and recalculations.",
    tags: ["conceptual"],
    keyFeatures: [],
    actionWords: ["shouldComponentUpdate is not used directly", "functional components can achiev similar behaviour using React.memo and useMemo"],
    codeExample:
      " Example  :\n  \n  const MyComponent = React.memo((props) => {\n  return <div>{props.value}</div>;\n  });\n \n  In this example, MyComponent will only re-render if props.value changes. If the value remains the same, React will skip the re-render.\n\n  Custom Comparison  :\n  You can also provide a custom comparison function to React.memo for more fine-grained control over when the component should re-render.\n\n\n  const MyComponent = React.memo(\n  (props) => {\n  return <div>{props.value}</div>;\n  },\n  (prevProps, nextProps) => {\n  // Custom comparison logic\n  return prevProps.value === nextProps.value;\n  }\n  );\n \n\n Example  :\n  \n  const MyComponent = ({ value }) => {\n  const computedValue = useMemo(() => {\n  return value 2; // Expensive calculation\n  }, [value]);\n\n  return <div>{computedValue}</div>;\n  };\n\n  In this example, computedValue will only be recalculated if value changes.\n",
  },
  {
    "id": ":r0:0147",
    "topic": "reactJs",
    "question": "Explain lifecycle methods in class components of React JS in detail & How functional component handles each lifecycle method of class component ?",
    "answer": "React JS provides lifecycle methods in class components to allow developers to execute code at specific points during a component's existence. These methods are grouped into three main phases: Mounting, Updating, and Unmounting. With the introduction of Hooks in React 16.8, functional components can now handle similar scenarios using a different approach. \r\n\r\n\r\n\r\n Lifecycle Methods in Class Components:\r\n\r\n  1. Mounting Phase\r\nThe mounting phase occurs when a component is being created and inserted into the DOM.\r\n\r\n a.<i> constructor()</i>:  \r\n  This is the first method called when a component instance is created. It’s used to:\r\n  - Initialize the component’s state.\r\n  - Bind event handlers to the instance (e.g., this.handleClick = this.handleClick.bind(this)).  \r\n  Example:\r\n\r\n```javascript\r\nclass MyComponent extends React.Component {\r\n  constructor(props) {\r\n    super(props);\r\n    this.state = { count: 0 };\r\n  }\r\n}\r\n```\r\n\r\n\n\n b. <i>static getDerivedStateFromProps(props, state)</i> :  \r\n  A static lifecycle method invoked after the constructor and before render(). It:\r\n  - Updates the state based on initial props.\r\n  - Returns an object to update the state or null if no update is needed.\r\n  - Is rarely used due to its static nature (no access to this).  \r\n  Example:\r\n\r\n```javascript\r\nstatic getDerivedStateFromProps(props, state) {\r\n  if (props.initialCount !== state.count) {\r\n    return { count: props.initialCount };\r\n  }\r\n  return null;\r\n}\r\n```\r\n\r\n\n\n c. <i>render()</i>  \r\n  A required method that:\r\n  - Returns the JSX to be rendered to the DOM.\r\n  - Must be pure (no state changes or DOM interactions).  \r\n  Example:\r\n\r\n```javascript\r\nrender() {\r\n  return <div>{this.state.count}</div>;\r\n}\r\n```\r\n\r\n\n\n d. <i>componentDidMount()</i>  \r\n  Called once after the component is rendered to the DOM. It’s ideal for:\r\n  - Fetching data from an API.\r\n  - Setting up subscriptions (e.g., timers or WebSocket listeners).\r\n  - Direct DOM manipulation.  \r\n  Example:\r\n\r\n```javascript\r\ncomponentDidMount() {\r\n  fetch('/api/data').then(response => this.setState({ data: response }));\r\n}\r\n```\r\n\r\n  2. Updating Phase\r\nThe updating phase occurs when a component’s state or props change, triggering a re-render.\r\n\r\n a. <i>static getDerivedStateFromProps(props, state)</i>  \r\n  Called again before render() during updates. It:\r\n  - Syncs state with prop changes.\r\n  - Works the same way as in the mounting phase.\r\n\r\n b. <i>shouldComponentUpdate(nextProps, nextState)</i>  \r\n  Invoked before re-rendering when new props or state are received. It:\r\n  - Returns true (default) to allow re-rendering or false to prevent it.\r\n  - Is useful for performance optimization.  \r\n  Example:\r\n\r\n```javascript\r\nshouldComponentUpdate(nextProps, nextState) {\r\n  return nextState.count !== this.state.count;\r\n}\r\n```\r\n\r\n\n\n c. <i>render()</i>  \r\n  Re-runs to reflect the updated state or props in the DOM.\r\n\r\n- getSnapshotBeforeUpdate(prevProps, prevState)  \r\n  Called right before the DOM is updated. It:\r\n  - Captures information from the DOM (e.g., scroll position) before changes apply.\r\n  - Returns a value that is passed to componentDidUpdate.  \r\n  Example:\r\n\r\n```javascript\r\ngetSnapshotBeforeUpdate(prevProps, prevState) {\r\n  return this.ref.current.scrollTop;\r\n}\r\n```\r\n\r\n\n\n  <b>d. componentDidUpdate(prevProps, prevState, snapshot)</b>  \r\n  Called after the DOM is updated. It’s used for:\r\n  - Side effects based on prop/state changes (e.g., additional API calls).\r\n  - Receives the snapshot value from getSnapshotBeforeUpdate.  \r\n  Example:\r\n\r\n```javascript\r\ncomponentDidUpdate(prevProps, prevState, snapshot) {\r\n  if (prevState.count !== this.state.count) {\r\n    console.log('Updated scroll position:', snapshot);\r\n  }\r\n}\r\n```\r\n\r\n  3. Unmounting Phase\r\nThe unmounting phase occurs when a component is being removed from the DOM.\r\n\r\n <b>a. componentWillUnmount()</b>  \r\n  Called just before the component is unmounted. It’s used to:\r\n  - Clean up resources (e.g., cancel timers, subscriptions, or network requests).\r\n  - Prevent memory leaks.  \r\n  Example:\r\n\r\n```javascript\r\ncomponentWillUnmount() {\r\n  clearInterval(this.timerId);\r\n}\r\n```\r\n\r\n\r\n\r\n⏩ How Functional Components Work in React\r\n\r\nIn React, functional components were initially simple, stateless functions that only rendered UI based on props. However, with the introduction of hooks in React 16.8, functional components gained the ability to manage state, handle side effects, and mimic the lifecycle methods traditionally associated with class components. \r\n\r\n 🟡 What Are Functional Components?\r\n\r\nA functional component is a JavaScript function that <mark>returns JSX to describe the UI</mark>. Unlike class components, they don’t rely on \`this\` or lifecycle methods like componentDidMount. Instead, hooks provide a declarative way to add state and side-effect logic.\r\n\r\nExample of a Basic Functional Component:\r\n\r\n```javascript\r\nfunction MyComponent(props) {\r\n  return <div>Hello, {props.name}!</div>;\r\n}\r\n```\r\n\r\nWith hooks, this simplicity extends to complex scenarios.\r\n\r\n  🟡Managing State in Functional Components\r\n\r\nThe useState hook allows functional components to manage local state, replacing the constructor and setState from class components.\r\n\r\nExample:\r\n\r\n```javascript\r\nimport { useState } from 'react';\r\n\r\nfunction Counter() {\r\n  const [count, setCount] = useState(0); // Initial state is 0\r\n  return (\r\n    <div>\r\n      <p>Count: {count}</p>\r\n      <button onClick={() => setCount(count + 1)}>Increment</button>\r\n    </div>\r\n  );\r\n}\r\n```\r\n\r\n- How It Works: useState returns a state variable (count) and a setter function (setCount). The initial value (e.g., 0) is set when the component mounts and persists across renders.\r\n\r\n 🟡 Handling Side Effects with Hooks\r\n\r\nSide effects (e.g., data fetching, subscriptions, DOM manipulation) are managed with the useEffect hook, which replicates the behavior of lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount.\r\n\r\n Mounting: Equivalent to componentDidMount\r\nWhen a component is first added to the DOM, useEffect with an empty dependency array runs once after the render.\r\n\r\nExample:\r\n\r\n```javascript\r\nimport { useEffect } from 'react';\r\n\r\nfunction DataFetcher() {\r\n  useEffect(() => {\r\n    console.log('Component mounted');\r\n    // Example: Fetch data\r\n    fetch('https://api.example.com/data')\r\n      .then(response => response.json())\r\n      .then(data => console.log(data));\r\n  }, []); // Empty array = runs once on mount\r\n  return <div>Loading...</div>;\r\n}\r\n```\r\n\r\n Updating: Equivalent to componentDidUpdate\r\nWhen props or state change, useEffect runs after every render if its dependencies change.\r\n\r\nExample:\r\n\r\n```javascript\r\nimport { useEffect, useState } from 'react';\r\n\r\nfunction CounterDisplay({ value }) {\r\n  const [count, setCount] = useState(value);\r\n\r\n  useEffect(() => {\r\n    console.log('Component updated with value:', value);\r\n    setCount(value); // Sync state with prop changes\r\n  }, [value]); // Runs when value changes\r\n\r\n  return <div>Count: {count}</div>;\r\n}\r\n```\r\n\r\n- Note: Dependencies (e.g., [value]) determine when the effect re-runs. Omitting dependencies runs it after every render, which mimics componentDidUpdate without conditions.\r\n\r\n🟡 Unmounting: Equivalent to componentWillUnmount\r\nTo clean up resources (e.g., timers, subscriptions), useEffect can return a cleanup function that runs before the component unmounts.\r\n\r\nExample:\r\n\r\n```javascript\r\nimport { useEffect } from 'react';\r\n\r\nfunction Timer() {\r\n  useEffect(() => {\r\n    const timerId = setInterval(() => console.log('Tick'), 1000);\r\n    return () => {\r\n      clearInterval(timerId); // Cleanup on unmount\r\n      console.log('Component unmounted');\r\n    };\r\n  }, []); // Empty array = cleanup on unmount\r\n  return <div>Timer running</div>;\r\n}\r\n```\r\n\r\n🟡  Replacing Other Lifecycle Methods\r\n\r\nFunctional components use hooks creatively to replicate less common lifecycle methods from class components.\r\n\r\n Syncing State with Props: getDerivedStateFromProps\r\nIn class components, getDerivedStateFromProps updates state based on prop changes before rendering. In functional components, useEffect and useState handle this.\r\n\r\nExample:\r\n\r\n```javascript\r\nimport { useState, useEffect } from 'react';\r\n\r\nfunction Profile({ userId }) {\r\n  const [userData, setUserData] = useState(null);\r\n\r\n  useEffect(() => {\r\n    setUserData({ id: userId, name: `User ${userId}` });\r\n  }, [userId]); // Updates state when userId changes\r\n\r\n  return <div>{userData ? userData.name : 'Loading...'}</div>;\r\n}\r\n```\r\n\r\n- Caution: Avoid infinite loops by ensuring the effect only updates state when necessary.\r\n\r\n Controlling Re-renders: shouldComponentUpdate\r\nClass components use shouldComponentUpdate to optimize rendering. In functional components, React.memo prevents unnecessary re-renders based on props.\r\n\r\nExample:\r\n\r\n```javascript\r\nimport { memo } from 'react';\r\n\r\nconst Display = memo(function Display({ count }) {\r\n  console.log('Rendering Display');\r\n  return <div>Count: {count}</div>;\r\n}, (prevProps, nextProps) => prevProps.count === nextProps.count);\r\n\r\n\r\n// Only re-renders if count changes```\r\n\r\n🟡 Capturing DOM State Before Updates: getSnapshotBeforeUpdate\r\nThis is trickier in functional components but can be approximated with useRef and useEffect.\r\n\r\nExample:\r\n\r\n```javascript\r\nimport { useRef, useEffect } from 'react';\r\n\r\nfunction ScrollTracker({ content }) {\r\n  const ref = useRef();\r\n\r\n  useEffect(() => {\r\n    const scrollTop = ref.current.scrollTop; // Capture scroll position\r\n    console.log('Scroll before update:', scrollTop);\r\n  }, [content]); // Runs when content changes\r\n\r\n  return <div ref={ref} style={{ height: '100px', overflow: 'auto' }}>{content}</div>;\r\n}\r\n```\r\n\r\n  🟡Advanced Hooks for Special Cases\r\n\r\n ▶️useLayoutEffect\r\nRuns synchronously after DOM updates, ideal for measurements (similar to componentDidMount/componentDidUpdate for DOM tasks).\r\n\r\nExample:\r\n\r\n```javascript\r\nimport { useLayoutEffect, useRef } from 'react';\r\n\r\nfunction MeasureBox() {\r\n  const ref = useRef();\r\n\r\n  useLayoutEffect(() => {\r\n    const { height } = ref.current.getBoundingClientRect();\r\n    console.log('Box height:', height);\r\n  }, []);\r\n\r\n  return <div ref={ref} style={{ height: '200px' }}>Measure me</div>;\r\n}\r\n```\r\n\r\n▶️ useMemo and useCallback\r\nOptimize performance by memoizing values and functions, reducing unnecessary computations or re-renders.\r\n\r\nExample:\r\n\r\n```javascript\r\nimport { useMemo, useCallback } from 'react';\r\n\r\nfunction ExpensiveComponent({ numbers }) {\r\n  const sum = useMemo(() => numbers.reduce((a, b) => a + b, 0), [numbers]);\r\n  const handleClick = useCallback(() => console.log('Clicked'), []);\r\n\r\n  return (\r\n    <div>\r\n      <p>Sum: {sum}</p>\r\n      <button onClick={handleClick}>Log</button>\r\n    </div>\r\n  );\r\n}\r\n```\r\n\r\n\n  Key Benefits of Functional Components with Hooks\r\n\r\n1. Simplicity: No this binding or lifecycle method boilerplate.\r\n2. Reusability: Hooks enable custom hooks for shared logic.\r\n3. Declarative: Effects are tied to dependencies, not imperative lifecycle events.\r\n4. Future-Proof: React’s development focuses on hooks and functional components.\r\n\r\n  Summary\r\n\r\nFunctional components, empowered by hooks like useState, useEffect, useRef, useMemo, and useCallback, provide a complete replacement for class components. They handle state, side effects, and lifecycle-like behaviors in a more flexible and composable way. Whether it’s mounting, updating, unmounting, or optimizing performance, hooks cover all scenarios with clear, declarative syntax. This approach ensures functional components are not only sufficient but often superior for modern React development.\r\n\r\nLet me know if you’d like deeper clarification on any specific part!",
    "tags": [
      "lifecycle methods"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    id: 130,
    topic: "reactJs",
    question: "Give some example of HOC in React ?",
    answer:
      "In React, built-in Higher-Order Components (HOCs) are provided by the React library or external libraries to enhance the functionality of components. Some of the commonly used built-in HOCs are\n\n 1. React.memo:  \n - Purpose  : React.memo is a built-in HOC that helps <mark>optimize performance by memoizing functional components</mark>.\n- It <mark>prevents unnecessary re-rendering of a component when its props have not changed</mark>.\n - Usage  : It wraps a component and ensures that it only re-renders when its props change.\n\n \n\n```\n \n const MyComponent = React.memo(({ name }) => {\n console.log(\"Rendering MyComponent\");\n return <div>{name}</div>;\n });\n\n export default MyComponent;\n \n\n - Explanation  : In this example, MyComponent will only re-render if the name prop changes. If the prop remains the same, React will skip the re-render.\n\n\n``` 2. withRouter (from react-router-dom) : \n - Purpose  : The withRouter HOC <mark>injects router-related props </mark>(like history, location, and match) into a component, even if the component is deeply nested in the component tree.\n - Usage  : It is mainly <mark>used for components that need access to the router without having to be directly rendered inside a Route</mark>.```\n \n import { withRouter } from 'react-router-dom';\n\n const MyComponent = ({ history, location, match }) => {\n return <div>Current path: {location.pathname}</div>;\n };\n\n export default withRouter(MyComponent);\n \n```\n\n \n 3. forwardRef:  \n - Purpose  : forwardRef is a built-in HOC that <mark>allows you to forward refs to child components</mark>.\n- This is useful when you need to pass a ref from a parent component to a child component.\n - Usage  : It wraps a functional component and allows it to receive a ref from its parent.```\n  \n const MyComponent = React.forwardRef((props, ref) => {\n return <input ref={ref} />;\n });\n\n export default MyComponent;\n \n\n - Explanation  : In this example, the MyComponent component can now accept a ref from its parent and forward it to the <input> element.\n\n```\n\n \n\n 4. useContext (not exactly a HOC, but used for context consumption) : \n - Purpose  : useContext is a hook that allows you to consume context values directly in function components.\n- While not an HOC itself, it's commonly used for managing and passing down state and logic across the component tree without the need for prop drilling.\n - Usage  : It’s often used with React's context API.```\n \n const ThemeContext = React.createContext();\n\n const ThemedComponent = () => {\n const theme = useContext(ThemeContext);\n return <div style={{ background: theme.background }}>Hello</div>;\n };\n\n const App = () => {\n return (\n <ThemeContext.Provider value={{ background: 'lightblue' }}>\n <ThemedComponent />\n </ThemeContext.Provider>\n );\n };\n\n```\n\n\n  \n\n 5. Suspense and ErrorBoundary (Built-in error handling and async rendering):  \n - Purpose  : Although Suspense and ErrorBoundary are not technically HOCs, they are commonly used patterns in React for handling asynchronous operations and error boundaries.\n- Suspense is used for lazy-loading components, while ErrorBoundary is used for catching JavaScript errors anywhere in a component tree.\n \n  \n\n ```\n \n const MyComponent = React.lazy(() => import('./MyComponent'));\n\n const App = () => (\n <React.Suspense fallback={<div>Loading...</div>}>\n <MyComponent />\n </React.Suspense>\n );\n  \n\n - Explanation  : React.Suspense is used to show a loading state while waiting for the MyComponent to be loaded asynchronously.\n\n``` Conclusion:\n- React provides several built-in HOCs like React.memo, withRouter, forwardRef, and others to enhance functionality without modifying the component's core logic.\n- These HOCs help in optimizing performance, managing routing, handling refs, and consuming context, making it easier to write maintainable and efficient React code.",
    tags: ["components"],
    keyFeatures: [],
    actionWords: ["React.memo-memoizes functional component", "withRouter-injects router-related props into a component", "forwardRef-forward refs to child components",],
    codeExample:
      "",
  },
  {
    id: 131,
    topic: "reactJs",
    question: "What kind of storage browser can provide?",
    answer:
      "Browser storage refers to various mechanisms provided by web browsers for storing data on the client side. These storage solutions allow web applications to persist information between page loads, sessions, or even offline, each with different characteristics, capacities, and lifetimes. \nHere are the main types:\n\n\n\n 1. Cookies\n\n- Description:  \n  Small pieces of data (typically less than 4KB) that the browser stores and sends with every HTTP request to the server for the same domain.\n\n- Characteristics:\n  - Persistence: Can have an expiration date set, making them persistent across sessions, or be session-only.\n  - Scope: Sent with every HTTP request to the originating domain, which can impact performance.\n  - Security: Often used for authentication and session management, but are subject to security concerns like CSRF if not handled properly.\n 2. localStorage\n\n- Description:  \n  A key-value storage mechanism available on the browser that stores data with no expiration date, meaning it persists even after the browser is closed.\n\n- Characteristics:\n  - Capacity: Typically around 5-10 MB per domain.\n  - Scope: Data is specific to a protocol and domain; accessible from any page of the same origin.\n  - 💡Use Cases: Storing user preferences, caching non-sensitive data, etc.\n  \n\n\n\n 3. sessionStorage\n\n- Description:  \n  Similar to localStorage, sessionStorage is a key-value storage mechanism, but data is only persisted for the duration of the page session (i.e., until the browser tab is closed).\n\n- Characteristics:\n  - Persistence: Data is cleared when the browser tab is closed.\n  - Scope: Limited to a single window or tab.\n  - 💡Use Cases: Storing temporary state like user input on a multi-step form.\n  \n  \n\n\n\n 4. IndexedDB\n\n- Description:  \n  A low-level API for client-side storage of significant amounts of structured data, including files/blobs. It provides a transactional database system that allows for more complex queries and data structures.\n\n- Characteristics:\n  - Capacity: Much larger storage limits compared to localStorage (hundreds of MBs or more).\n  - 💡Use Cases: Caching data for offline applications, storing large datasets, complex queries.\n  - API Complexity: Asynchronous API using events or promises; libraries like [Dexie.](https://dexie.org/) can simplify usage.\n  \n\n\n\n 5. Cache API\n\n- Description:  \n  Part of the Service Worker API, the Cache API allows you to store and retrieve network requests and responses. It's primarily used for caching assets and API responses to support offline capabilities.\n\n- Characteristics:\n  - 💡Use Cases: Offline-first applications, progressive web apps (PWAs).\n  - Scope: Managed by service workers, not directly accessible from the main thread in the same way as localStorage.\n  \n\n\n\n 📝Summary:\n\n- Cookies: Best for small amounts of data that need to be sent to the server with each request, often for session management.\n- localStorage: Suitable for storing persistent, non-sensitive data on the client with simple key-value pairs.\n- sessionStorage: Ideal for temporary data that only needs to persist within a single session (browser tab).\n- IndexedDB: A powerful, asynchronous storage option for large amounts of structured data and complex queries.\n- Cache API: Used in conjunction with service workers to cache network requests and assets for offline use.\n\nEach of these storage mechanisms has its own strengths and ideal use cases, and often, modern web applications use a combination of these to meet different data persistence needs.",
    tags: ["storage"],
    keyFeatures: [],
    actionWords: ["Cookies-expiration date", "localStorage-No expiration—data remains until explicitly removed", "Session Storage-Expires when the tab or browser is closed."],
    codeExample:
      " // Setting a cookie\n  document.cookie = \"username=JohnDoe; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/\";\n  \n- API Example:\n  \n  // Storing data\n  localStorage.setItem('theme', 'dark');\n  // Retrieving data\n  const theme = localStorage.getItem('theme');\n  // Removing data\n  localStorage.removeItem('theme');\n  \n- API Example:\n  \n  // Storing data\n  sessionStorage.setItem('token', 'abc123');\n  // Retrieving data\n  const token = sessionStorage.getItem('token');\n  // Removing data\n  sessionStorage.removeItem('token');\n- Example:  \n  \n  // Opening an IndexedDB database\n  const request = indexedDB.open('myDatabase', 1);\n  request.onupgradeneeded = event => {\n  const db = event.target.result;\n  // Create an object store\n  db.createObjectStore('users', { keyPath: 'id' });\n  };\n  \n- Example:\n  \n  // Caching a fetch response\n  caches.open('my-cache').then(cache => {\n  cache.add('/styles.css');\n  });\n  ",
  },
  {
    "id": 132,
    "topic": "react",
    "question": "Explain the useCallback hook in React?  How it works under the hood ?",
    "answer": "The useCallback hook in React is essentially a tool for memoizing functions so that they only get recreated when their dependencies change. Under the hood, it's closely related to the useMemo hook—it’s almost like a specialized version of useMemo for functions. \r\n\r\n\r\n\r\n 1. What useCallback Does\r\n\r\nWhen you wrap a function with useCallback, React will save (or “memoize”) that function and return the same function instance on every render—unless one of the specified dependencies has changed. This means the function reference remains stable across renders, which is especially useful when passing callbacks to child components or optimizing performance in complex component trees.\r\n\r\n Example:\r\n\r\n```const memoizedCallback = useCallback(() => {\r\n  // function logic\r\n}, [dependency1, dependency2]);\r\n\r\n\r\n- On the initial render: The function is created and stored along with the list of dependencies.\r\n- On subsequent renders: React compares the current dependencies with the previous ones. If they are the same (using a shallow comparison), React returns the previously memoized function instead of creating a new one.```\r\n\r\n\r\n\r\n 2. Under the Hood: How React Implements useCallback\r\n\r\n a. Similarity to useMemo\r\n\r\nuseCallback(fn, deps) is effectively implemented as:\r\n\r\n```useMemo(() => fn, deps)\r\n\r\nThis means React uses the memoization algorithm from useMemo to determine whether the function needs to be recreated.```\r\n\r\n b. The Hook Mechanism\r\n\r\n- Hook Registration: When a component renders, React processes hooks in the order they are declared. Each hook call (whether useState, useEffect, or useCallback) gets its own slot in React’s internal hook list for that component.\r\n  \r\n- Dependency Array Check: For useCallback, React stores both the function and the dependency array. On each render, React performs a shallow comparison of the dependency array :=\r\n  A. If the dependencies haven’t changed: It retrieves and returns the previously stored function.\r\n  B. If any dependency has changed: It calls the function you provided again to get a new function instance, updates the stored function, and returns this new version.\r\n\r\n c. Memory and Performance\r\n\r\n- Caching: The caching mechanism is lightweight. React maintains a list of hooks per component, and each hook’s state (including the cached function and its dependencies) is stored as part of the component’s fiber.\r\n- Optimization Trade-offs: Although there’s a small cost associated with checking dependencies and maintaining the hook’s state, this cost is generally negligible compared to the benefit of avoiding unnecessary re-renders or re-executions in child components.\r\n\r\n\r\n\r\n 3. Practical Impact\r\n\r\n Stable Function References\r\n\r\n- Avoiding Unnecessary Renders: When you pass a callback to a child component, if that child relies on reference equality (like with React.memo or shouldComponentUpdate), using useCallback ensures that the callback’s reference doesn’t change unless it needs to. This prevents the child from re-rendering unnecessarily.\r\n- Event Handlers and Effects: If a function is used as a dependency in another hook (e.g., useEffect), a stable reference prevents the effect from running every render.\r\n\r\n\r\n\r\n 4. Summing It Up\r\n\r\n- Memoization: <mark>useCallback memoizes a function, ensuring that the same function reference is used between renders unless its dependencies change</mark>.\r\n- Under the Hood: It works by storing the function and its dependency array in React’s hook state (similar to useMemo), performing a shallow comparison of dependencies on every render.\r\n- Benefits: This stability can prevent unnecessary re-renders in child components and avoid redundant computations in effects or other hooks that depend on the callback.\r\n\r\nIn essence, useCallback is a simple yet powerful optimization tool that leverages React’s hook mechanism to ensure function references remain consistent unless they need to change.",
    "tags": [
      "useCallback",
      "hooks"
    ],
    "keyFeatures": [],
    "actionWords": ["a tool for memoizing functions", "shallow comparison", "prevent unnecessary re-renders in child components"],
    "codeExample": " Example in Context:\n\nimport React, { useState, useCallback } from \"react\";\n\nconst MyComponent = () => {\n  const [count, setCount] = useState(0);\n\n  // This function is memoized; its reference will remain the same across renders\n  // as long as no dependencies change.\n  const increment = useCallback(() => {\n  setCount((prevCount) => prevCount + 1);\n  }, []);\n\n  return (\n  <div>\n  <p>Count: {count}</p>\n  <button onClick={increment}>Increment</button>\n  </div>\n  );\n};\n\nexport default MyComponent;\n\n- Here, the increment function remains stable even if MyComponent re-renders for other reasons, such as a different state change.\n\n"
  },
  {
    "id": 133,
    "topic": "react",
    "question": "How referencing works in useCallback hook ?",
    "answer": "When you use the useCallback hook, you’re essentially telling React to “remember” the function you provide and only create a new function reference when one of its dependencies changes. \r\n\r\n1. Initial Render:  \r\n - When the component renders for the first time, the function you pass to useCallback is created.  \r\n - React stores this function along with the dependency array in the component’s internal hook state (which is part of its fiber data structure).\r\n\r\n2. Subsequent Renders:  \r\n - On later renders, React checks the dependency array provided to useCallback using a shallow comparison.  \r\n - If none of the dependencies have changed:  \r\n - React retrieves the stored function from the previous render and returns the same function reference.  \r\n - This means the pointer (or reference) to that function remains stable.\r\n - If any dependency has changed:  \r\n - React will create a new function, update the stored value, and return this new reference.\r\n\r\n3. Why Stable References Matter:  \r\n - Optimizing Child Component Renders:  \r\n If you pass this callback to a child component (especially one that checks for prop changes using shallow comparison), the child won’t re-render if the function reference remains unchanged.\r\n - Avoiding Unnecessary Effects:  \r\n When a memoized function is used as a dependency in other hooks (like useEffect), a stable reference prevents the effect from running on every render.\r\n\r\n📝In Summary:\r\n\r\n- <i>Stable Reference</i>: useCallback returns the same function reference on every render if its dependency array stays the same.\r\n- <i> Re-creation on Change</i>: Only when one or more dependencies change does React create a new function reference.\r\n- <i>Shallow Equality Check</i> : React compares the dependency array elements using shallow equality to decide whether to return the old reference or create a new one.\r\n\r\nThis mechanism helps ensure that your functions are only re-created when necessary, thereby contributing to improved performance and more predictable rendering behavior.",
    "tags": [
      "useCallback",
      "hooks"
    ],
    "keyFeatures": [],
    "actionWords": ["will only create a new function reference when one of its dependencies changes", " shallow comparison."],
    "codeExample": ""
  },
  {
    "id": 134,
    "topic": "react",
    "question": "What is React.memo ? explain the working of memo under the hood ?",
    "answer": "- React.memo is a higher-order component (HOC) provided by React that <mark>enables memoization for functional components</mark>.\n- It <mark> prevents unnecessary re-renders by performing a shallow comparison of the component's props</mark>, similar to how PureComponent works for class-based components.\n\n\n\n How React.memo Works\n\n 1. Basic Concept\n- Memoization:  \n  React.memo wraps a component and remembers (\"memoizes\") its previous props. When the component's parent re-renders, React.memo checks if the props have changed. If they haven't, React skips re-rendering that component, reusing the previous rendered output.\n  \n- Shallow Comparison:  \n  By default, React.memo performs a shallow equality check on the props. This means it compares primitive values directly and compares object references for non-primitive values. If the props are the same, the component is not re-rendered.\n\n\n 3. Custom Comparison Function\nSometimes a shallow comparison isn’t enough. You can provide a custom comparison function as the second argument to React.memo to control when the component should re-render.\n\n\n\n\n\n\n Under the Hood: How Memoization Works in React.memo\n\n a. Component Rendering Process\n\n1. Initial Render:\n - When a component wrapped in React.memo is rendered for the first time, it renders normally.\n - The rendered output, along with its props, is stored internally (as part of React's reconciliation process).\n\n2. Subsequent Renders:\n - On re-renders, React compares the new props with the previous ones.\n - This comparison is done using a shallow equality check (or a custom comparison function if provided).\n - If the props are determined to be equal, React will bail out of re-rendering that component. Essentially, it reuses the previously rendered output.\n\n b. Reconciliation and Fiber\n- Fiber Architecture:  \n  React’s Fiber architecture maintains a \"work-in-progress\" tree that represents the UI. When a component re-renders, React compares the new Fiber node with the previous one.\n  \n- Skipping Updates:  \n  For components wrapped in React.memo, if the memoization check passes (i.e., props are equal), React marks the Fiber node as having no updates. This prevents further work on that subtree, saving CPU cycles.\n\n c. Trade-offs\n- Shallow vs. Deep Comparison:  \n  Since React.memo uses a shallow comparison by default, it is most effective when props are primitives or immutable objects. If props are complex objects that change reference even when their values remain the same, memoization might not prevent re-renders.\n  \n- Overhead:  \n  Although the cost of comparing props is generally low, using React.memo for very simple components might add unnecessary overhead. It is best used when components are expensive to render or deeply nested in the component tree.\n\n\n\n 📝 Summary :\n- React.memo is a tool to memoize functional components, preventing unnecessary re-renders when props haven't changed.\n- It relies on shallow equality checks (or a custom comparison function) to determine if re-rendering is needed.\n- Under the hood, it leverages React's reconciliation process and Fiber architecture to efficiently decide whether a component needs updating.\n\nThis optimization is particularly beneficial in scenarios with complex UI structures or expensive rendering operations, ensuring smoother and more performant applications.",
    "tags": [
      "memo",
      "hooks"
    ],
    "keyFeatures": [],
    "actionWords": ["HOC", "enables memoization for functional components"],
    "codeExample": "\n 2. Usage Example\n\n\nimport React from \"react\";\n\n// A simple functional component\nconst MyComponent = ({ name, age }) => {\n  console.log(\"MyComponent rendered\");\n  return (\n  <div>\n  <h2>{name}</h2>\n  <p>{age} years old</p>\n  </div>\n  );\n};\n\n// Wrap the component with React.memo\nexport default React.memo(MyComponent);\n\n\n- Behavior:  \n  When MyComponent is wrapped with React.memo, if its name and age props remain unchanged between renders, React will skip re-rendering it.\n\n-Sometimes a shallow comparison isn’t enough. You can provide a custom comparison function as the second argument to React.memo to control when the component should re-render.\n\n\nfunction areEqual(prevProps, nextProps) {\n  // Custom logic to compare props\n  return prevProps.id === nextProps.id;\n}\n\nexport default React.memo(MyComponent, areEqual);\n- Custom Comparison:  \n  In this example, MyComponent will only re-render if the id prop changes, regardless of any other prop differences.\n"
  },
  {
    "id": 135,
    "topic": "react",
    "question": "Is it necessary to use useCallback or useMemo when using React.memo() ?",
    "answer": "- While it's not strictly required to use useCallback or useMemo with React.memo, doing so can be very helpful in preventing unnecessary re-renders.\n- This is especially true when you're passing functions or computed values as props. Without memoization, even components wrapped in React.memo may re-render if they receive <mark> new prop references</mark>.\n\nrefere example that illustrates both scenarios:\n\n\n\n\n\n 📝Summary:\n\n- Not Necessary, But Beneficial:  \n  You don't have to use useCallback or useMemo with React.memo, but they help maintain stable references for functions or computed values. This prevents unnecessary re-renders in child components.\n  \n- When to Use:  \n  Use these hooks when you notice that your memoized components are still re-rendering because they receive new function or object references on every render.\n\nUsing these tools together helps optimize your component tree by ensuring that only meaningful changes trigger a re-render.",
    "tags": [
      "memo",
      "hooks"
    ],
    "keyFeatures": [],
    "actionWords": ["helps maintain stable references"],
    "codeExample": "Example Without useCallback:\r\n\r\n\r\nimport React, { useState } from \"react\";\r\n\r\n// Child component wrapped with React.memo\r\nconst Child = React.memo(({ onClick, label }) => {\r\n  console.log(Child rendered: ${label});\r\n  return <button onClick={onClick}>{label}</button>;\r\n});\r\n\r\nconst ParentWithoutCallback = () => {\r\n  const [count, setCount] = useState(0);\r\n\r\n  // Function recreated on every render\r\n  const handleClick = () => {\r\n  console.log(\"Button clicked (without useCallback)\");\r\n  };\r\n\r\n  return (\r\n  <div>\r\n  <h1>Parent Count: {count}</h1>\r\n  <button onClick={() => setCount(count + 1)}>Increment Count</button>\r\n  <Child onClick={handleClick} label=\"Without useCallback\" />\r\n  </div>\r\n  );\r\n};\r\n\r\nexport default ParentWithoutCallback;\r\n\r\n\r\nWhat Happens Here:  \r\n- Every time the parent re-renders (e.g., when you click \"Increment Count\"), a new function reference for handleClick is created.\r\n- Although Child is wrapped in React.memo, it still re-renders because the shallow comparison sees that the onClick prop is a new function.\r\n\r\n\r\n\r\n Example With useCallback:\r\n\r\n\r\nimport React, { useState, useCallback } from \"react\";\r\n\r\n// Child component wrapped with React.memo\r\nconst Child = React.memo(({ onClick, label }) => {\r\n  console.log(Child rendered: ${label});\r\n  return <button onClick={onClick}>{label}</button>;\r\n});\r\n\r\nconst ParentWithCallback = () => {\r\n  const [count, setCount] = useState(0);\r\n\r\n  // Memoized function; its reference remains stable across re-renders\r\n  const handleClick = useCallback(() => {\r\n  console.log(\"Button clicked (with useCallback)\");\r\n  }, []);\r\n\r\n  return (\r\n  <div>\r\n  <h1>Parent Count: {count}</h1>\r\n  <button onClick={() => setCount(count + 1)}>Increment Count</button>\r\n  <Child onClick={handleClick} label=\"With useCallback\" />\r\n  </div>\r\n  );\r\n};\r\n\r\nexport default ParentWithCallback;\r\n\r\n\r\nWhat Happens Here:  \r\n- The handleClick function is memoized using useCallback. Its reference stays the same as long as its dependencies (none in this example) don't change.\r\n- Now, when the parent re-renders (e.g., when you increment the count), Child does not re-render because its props are shallowly equal (the function reference hasn't changed).\r\n\r"
  },
  {
    id: 136,
    "topic": "react",
    "question": "Suppose I have to call an API using useEffect hook , in which rendering phase it will be updated ?",
    "answer": "If you're using an <mark>empty dependency array, the API call will not run during the updating phase—it only runs after the initial mounting</mark>. However, if you provide dependencies, the effect can run after updates when those dependencies change",
    "tags": ["useEffect",
      "hooks"
    ],
    "keyFeatures": [],
    "actionWords": ["initial mounting"],
    "codeExample": "",
  },
  {
    "id": 137,
    "topic": "reactJs",
    "question": "How could you resolve cors issue from forntend ?",
    "answer": "CORS (Cross-Origin Resource Sharing) is enforced by browsers and is primarily a server-side configuration issue. However, from the frontend, you can work around CORS restrictions during development or in situations where you can’t modify the server. Here are some approaches:\n\n\n\n\n\n\n Important Note\n\nWhile these workarounds can help during development or in specific scenarios, the ideal solution is to configure the server to include the correct Access-Control-Allow-Origin header (and other necessary CORS headers). This server-side change ensures that browsers allow cross-origin requests without relying on frontend workarounds.\n\nIn summary, while you can use proxies, CORS proxy services, or browser extensions on the frontend to work around CORS issues, the best long-term solution is to configure your backend to handle CORS properly.",
    "tags": [
      "cors"
    ],
    "keyFeatures": [],
    "actionWords": [

    ],
    "codeExample": "\n\n 1. Use a Proxy\n- Development Proxy:  \n  If you're using a tool like Create React App, you can add a proxy configuration in your package.json to forward API requests to your backend. This way, the browser treats the request as coming from the same origin.\n  \n  \n  // package.json\n  {\n  \"name\": \"my-app\",\n  \"version\": \"0.1.0\",\n  \"private\": true,\n  \"proxy\": \"http://localhost:5000\"\n  }\n  \n  \n- Custom Proxy Middleware:  \n  If you need more control, configure a proxy in your development server (e.g., using Webpack Dev Server or a tool like http-proxy-middleware in your Express server).\n\n 2. CORS Browser Extensions (Not for Production)\n- Temporary Workaround:  \n  You can use browser extensions to disable CORS in development environments. This is strictly for testing purposes and not recommended for production as it bypasses essential security checks.\n\n 3. Server-Side Changes (Preferred)\n- Backend Configuration:  \n  Ultimately, the best solution is to update your server’s CORS policy. For example, in an Express.js server, you can use the [cors](https://www.npmjs.com/package/cors) middleware:\n  \n  \n  const express = require('express');\n  const cors = require('cors');\n  const app = express();\n\n  // Allow all origins (use with caution) or specify your frontend origin\n  app.use(cors({\n  origin: 'http://your-frontend-domain.com'\n  }));\n\n  // Your routes here\n  app.get('/api/data', (req, res) => {\n  res.json({ data: 'example' });\n  });\n\n  app.listen(5000, () => console.log('Server running on port 5000'));\n  \n\n Conclusion\nWhile you can use proxies or temporary browser workarounds to mitigate CORS issues during development, the best practice is to resolve the issue at the server level by configuring the correct CORS headers. This ensures that your application remains secure and functional across all environments."
  },
  {
    "id": 138,
    "topic": "reactJs",
    "question": "Your react app is facing SEO related issue how will you resolve it?",
    "answer": "React apps typically face SEO challenges because they rely heavily on client-side rendering, which can make it harder for search engines to crawl and index content effectively. Here’s how you can resolve these issues:\r\n\r\n 1. Implement Server-Side Rendering (SSR) or Static Site Generation (SSG)\r\n- SSR with Next.:  \r\n  Next. is a popular framework that supports server-side rendering out of the box. By rendering pages on the server, you provide pre-built HTML to search engine crawlers, which improves indexing and overall SEO.\r\n- SSG with Gatsby or Next.:  \r\n  Static site generation builds your pages at build time. This approach is great for content that doesn’t change frequently, ensuring fast load times and SEO-friendly pre-rendered pages.\r\n\r\n 2. Use React Helmet for Meta Tags Management\r\n- Dynamic Meta Tags:  \r\n  Incorporate [React Helmet](https://github.com/nfl/react-helmet) to manage your document head. This allows you to dynamically set meta tags, titles, and descriptions based on your route or page content, which is crucial for SEO.\r\n  \r\n 3. Optimize Routing and URLs\r\n- Clean URLs:  \r\n  Ensure that your routing setup creates clean, descriptive URLs rather than hash-based or overly dynamic ones. Tools like Next. or React Router can help maintain proper URL structures.\r\n- Canonical Tags:  \r\n  Use canonical tags to avoid duplicate content issues if your content can be accessed via multiple URLs.\r\n\r\n 4. Enhance Content and Structure\r\n- Structured Data:  \r\n  Implement structured data (e.g., JSON-LD) to help search engines understand the content on your pages.\r\n- Lazy Loading:  \r\n  While lazy loading images and components can enhance performance, make sure it doesn’t hide important content from crawlers.\r\n\r\n 5. Use a Prerendering Service (if SSR/SSG isn’t an option)\r\n- Prerendering Services:  \r\n  Tools like [Prerender.io](https://prerender.io/) can be integrated into your deployment pipeline. They generate static HTML snapshots of your pages for search engine crawlers while still serving a client-side rendered experience for users.\r\n\r\n 6. Monitor and Test SEO Performance\r\n- SEO Auditing Tools:  \r\n  Regularly use tools like Google Search Console, Lighthouse, or other SEO auditing tools to identify and fix any issues that might affect your site’s search engine performance.\r\n- Progressive Enhancement:  \r\n  Ensure that even if JavaScript fails, the basic content and navigation remain accessible to users and crawlers.\r\n\r\nBy integrating one or a combination of these approaches, you can significantly improve the SEO of your React app, ensuring that search engines can easily crawl, index, and rank your pages effectively.",
    "tags": [
      "interviewed"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": ":r0:",
    "topic": "reactJs",
    "question": "You have to render large list of of data , how will implement it while insuring it is optimized ",
    "answer": "When dealing with large lists, the key is to avoid rendering every single item at once. Here are some strategies:\n\n 1. Virtualization (Windowing)\n- What It Is:  \n  Only render the items visible in the viewport. As the user scrolls, new items are rendered while off-screen items are unmounted.\n- How to Implement:  \n  Use libraries like [react-window](https://github.com/bvaughn/react-window) or [react-virtualized](https://github.com/bvaughn/react-virtualized). For example, with react-window, you can create a fixed-size list:\n  \n \n\n 2. Memoization\n- React.memo:  \n  Wrap list items with React.memo so they only re-render when their props change.\n- useMemo & useCallback:  \n  Use these hooks to memoize expensive computations or functions passed to child components.\n\n 3. Pagination or Infinite Scrolling\n- Pagination:  \n  Load and render a limited number of items per page.\n- Infinite Scrolling:  \n  Dynamically load more items as the user scrolls down. Combine this with virtualization for best results.\n\n 4. Optimize Event Handling\n- Throttling/Debouncing:  \n  If you handle scroll or resize events, use throttling or debouncing to reduce the number of function calls.\n\n 5. Efficient Data Structures and Rendering Patterns\n- Keys:  \n  Ensure each list item has a unique key prop. This helps React efficiently update the DOM.\n- Component Splitting:  \n  Break down complex components into smaller, focused ones that can be individually optimized.\n\nBy combining virtualization with memoization and possibly pagination/infinite scroll, you can efficiently render large lists without sacrificing performance.",
    "tags": [
      "interviewed"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": " \n  import { FixedSizeList as List } from 'react-window';\n\n  const Row = ({ index, style, data }) => (\n  <div style={style}>\n  {data[index].text}\n  </div>\n  );\n\n  function VirtualizedList({ items }) {\n  return (\n  <List\n  height={600} // viewport height\n  itemCount={items.length}\n  itemSize={35}  // height of each item\n  width={300}\n  itemData={items}\n  >\n  {Row}\n  </List>\n  );\n  }\n  "
  },
  {
    "id": 139,
    "topic": "reactJs",
    "question": "One of your junior developer has created a functional component & pushed it to git , your the reviewer of the code  , what key points will you check",
    "answer": "When reviewing a junior developer’s functional component, here are some key points to check:\r\n\r\n 1. Code Readability & Organization\r\n- Component Naming:  \r\n  Ensure the component is named descriptively and follows naming conventions.\r\n- File Structure & Organization:  \r\n  Verify the file is structured logically with imports, component code, and exports in a clear order.\r\n- Comments & Documentation:  \r\n  Look for necessary comments and clear documentation, especially if the component contains complex logic.\r\n\r\n 2. Code Quality & Best Practices\r\n- Hooks Usage:  \r\n  Check that hooks (like useState, useEffect, etc.) are used correctly, following the Rules of Hooks.\r\n- Avoiding Unnecessary Renders:  \r\n  Confirm the component uses memoization (React.memo, useMemo, useCallback) where needed to optimize performance.\r\n- Clean & Readable Syntax:  \r\n  Ensure the code adheres to the project’s style guidelines, and there’s consistency in syntax and formatting.\r\n\r\n 3. Functionality & Business Logic\r\n- Correct Data Flow:  \r\n  Review props and state management to confirm data is flowing as expected.\r\n- Error Handling:  \r\n  Look for proper error handling and edge-case management.\r\n- Side Effects:  \r\n  Verify that any side effects are handled appropriately in useEffect hooks with proper dependencies.\r\n\r\n 4. Performance Considerations\r\n- Optimized Rendering:  \r\n  Ensure that the component only re-renders when necessary. Check if it’s wrapped in React.memo when appropriate.\r\n- Dependency Arrays:  \r\n  Inspect dependency arrays in hooks like useEffect to ensure they’re complete and correctly defined.\r\n\r\n 5. Security & Accessibility\r\n- Accessibility:  \r\n  Check for accessibility features, such as proper ARIA attributes or semantic HTML where needed.\r\n- Data Sanitization:  \r\n  If user input is handled, ensure proper sanitization to prevent vulnerabilities like XSS.\r\n\r\n 6. Testing & Maintainability\r\n- Unit Tests:  \r\n  Look for unit tests associated with the component to verify its functionality.\r\n- Separation of Concerns:  \r\n  Confirm that the component is doing only what it’s supposed to do without mixing concerns.\r\n- Scalability:  \r\n  Assess whether the component is built in a way that’s easy to extend or modify in the future.\r\n\r\nBy covering these areas, you can ensure that the code is not only functional but also robust, maintainable, and aligned with team standards.",
    "tags": [
      "interviewed"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 140,
    "topic": "reactJs",
    "question": "You have provided a codebase  with class component , you have to add new features in it , what type of component will use for it & why",
    "answer": "In a codebase built primarily with class components, you have a couple of options when adding new features. However, leveraging functional components with hooks is generally recommended for several reasons:\r\n\r\n Why Choose Functional Components with Hooks?\r\n\r\n- Modern Paradigm:  \r\n  Functional components with hooks are the current standard in React. They offer a cleaner and more concise syntax that is easier to maintain and understand.\r\n\r\n- Enhanced Readability & Maintainability:  \r\n  Hooks such as useState and useEffect simplify state management and side effects without the need for boilerplate code like constructor methods or binding event handlers.\r\n\r\n- Performance Improvements:  \r\n  Functional components can reduce the overhead associated with lifecycle methods found in class components, and they make it easier to implement optimizations like memoization with React.memo or useMemo.\r\n\r\n- Gradual Migration:  \r\n  Introducing functional components in new features allows you to progressively adopt modern practices without having to refactor the entire codebase at once.\r\n\r\n Considerations in a Mixed Codebase\r\n\r\n- Consistency:  \r\n  While you can introduce functional components, ensure that your team agrees on a strategy to maintain consistency across the codebase. This might mean planning a gradual migration for older class components or at least documenting the rationale for using a different style in new parts of the application.\r\n\r\n- Interoperability:  \r\n  Functional and class components can coexist seamlessly. You can integrate new functional components into a predominantly class-based codebase without issues.\r\n\r\n Conclusion\r\n\r\nGiven the benefits and the direction of React development, opting for a functional component with hooks for your new features is a strategic choice. This approach not only improves the quality and maintainability of the new code but also sets a forward-looking example for gradual modernization of your overall codebase.",
    "tags": [
      "interviewed"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 141,
    "topic": "reactJs",
    "question": "You have to create a dashboard which is responsive in all devices , how will create this ",
    "answer": "When creating a responsive dashboard, the goal is to ensure that it looks great and functions well across various devices—from mobile to desktop.\r\n\r\n 1. Mobile-First Approach\r\n- Start Small:  \r\n  Design the dashboard layout for small screens first. This approach forces you to prioritize essential content and functionality.\r\n- Progressive Enhancement:  \r\n  Add enhancements for larger screens, ensuring that the core experience is robust on mobile devices.\r\n\r\n 2. Responsive Layout Techniques\r\n- CSS Flexbox & Grid:  \r\n  Use CSS Flexbox and CSS Grid to create flexible layouts that adjust based on the available screen space.\r\n- Media Queries:  \r\n  Write media queries to adjust styles (e.g., font sizes, paddings, margins) for different breakpoints.\r\n\r\n 3. Component-Based Design\r\n- Reusable Components:  \r\n  Break the dashboard into modular, reusable components that can easily be rearranged or re-styled based on the screen size.\r\n- Container Components:  \r\n  Use container components to handle layout logic, keeping presentation components focused on displaying data.\r\n\r\n 4. Frameworks & Libraries\r\n- CSS Frameworks:  \r\n  Consider leveraging frameworks like Bootstrap, Material-UI, or Tailwind CSS, which have built-in responsive utilities.\r\n- React Component Libraries:  \r\n  Utilize pre-built components from libraries such as Material-UI, Ant Design, or Chakra UI that are designed with responsiveness in mind.\r\n\r\n 5. Testing & Optimization\r\n- Responsive Testing Tools:  \r\n  Use browser developer tools and responsive design testing tools (e.g., Chrome DevTools, BrowserStack) to simulate various device sizes.\r\n- Performance Considerations:  \r\n  Optimize images, fonts, and assets to ensure quick loading times across devices.\r\n\r\n 6. Progressive Enhancements & Accessibility\r\n- Progressive Enhancement:  \r\n  Ensure that interactive elements and advanced features gracefully degrade on older devices or slower networks.\r\n- Accessibility:  \r\n  Maintain accessibility by using semantic HTML, proper ARIA attributes, and ensuring sufficient contrast for readability.\r\n\r\n Conclusion\r\nBy starting with a mobile-first design, leveraging modern CSS layout techniques, and using component-based design patterns along with responsive frameworks, you can build a dashboard that adapts smoothly to various device sizes while ensuring a consistent user experience.",
    "tags": [
      "interviewed"
    ],
    "keyFeatures": [],
    "actionWords": ["Mobile-First Approach",],
    "codeExample": ""
  },
  {
    "id": 142,
    "topic": "reactJs",
    "question": "One of your modal component is not closing properly in some cases, how will you debug it & fix it\n",
    "answer": "When a modal isn’t closing properly in some cases, the best approach is to isolate the issue step-by-step. Here’s a systematic debugging and fixing process:\r\n\r\n 1. Reproduce and Identify the Issue\r\n- Document When It Fails:  \r\n  Determine the exact scenarios where the modal doesn’t close. Is it on a button click, clicking the backdrop, or due to some keyboard event?\r\n- Gather User Feedback:  \r\n  If possible, replicate the issue in your local environment based on reported cases.\r\n\r\n 2. Review the Component Code\r\n- State Management:  \r\n  Check how the modal’s open/closed state is managed. Make sure that the state (e.g., isOpen) is being updated correctly when the close function is called.\r\n- Event Handlers:  \r\n  Ensure that your close event (whether it’s a button click, backdrop click, or ESC key event) is properly wired up. Verify that any functions intended to change the state actually do so.\r\n- Conditional Rendering:  \r\n  Inspect the conditional rendering logic to ensure that when the state updates (e.g., isOpen becomes false), the modal unmounts or hides correctly.\r\n\r\n 3. Debugging Tools and Techniques\r\n- Console Logging:  \r\n  Add console.log statements in your close handler and state update functions to verify they’re being called and that the state changes as expected.\r\n- React DevTools:  \r\n  Use React DevTools to inspect the component’s props and state in real-time. Confirm that the state transitions match your expected flow.\r\n- Check Event Propagation:  \r\n  Look for any stopPropagation or preventDefault calls that might be interfering with the event handlers.\r\n\r\n 4. Analyze CSS and Animation Issues\r\n- CSS Transitions/Animations:  \r\n  If your modal uses transitions or animations, verify that these aren’t preventing the modal from disappearing. Sometimes, lingering CSS classes or delays can cause the modal to remain visible.\r\n- Z-Index and Overlays:  \r\n  Confirm that the modal’s overlay and any backdrop elements are not interfering with click events or hiding the actual modal close button.\r\n\r\n 5. Verify External Dependencies\r\n- Third-Party Libraries:  \r\n  If you’re using a library (like React Modal), review their documentation and GitHub issues to see if there are known bugs or configuration issues.\r\n- Integration Points:  \r\n  Make sure that any external logic interacting with the modal (e.g., Redux, context providers) is correctly updating state.\r\n\r\n 6. Apply Fixes and Test Thoroughly\r\n- Refactor if Necessary:  \r\n  Sometimes reorganizing the component or extracting the modal logic into a custom hook can simplify the flow and eliminate bugs.\r\n- Test Across Cases:  \r\n  After applying fixes, test all scenarios (clicking close buttons, backdrop clicks, keyboard events) to ensure the modal behaves consistently across different devices and browsers.\r\n- Code Review:  \r\n  If possible, have another developer review your changes to catch any oversights.\r\n\r\nBy following these steps, you can methodically pinpoint where the breakdown occurs and apply the appropriate fixes, ensuring that your modal closes reliably under all expected circumstances.",
    "tags": [
      "interviewed"
    ],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  },
  {
    "id": 143,
    "topic": "reactJs",
    "question": "How will you create a interactive chart ? what library will use ?",
    "answer": "When creating an interactive chart in a React application, you want a library that’s both flexible and easy to integrate.\n Below are some popular options and the approach to building one:\r\n\r\n Popular Libraries\r\n\r\n- Recharts:  \r\n  Built on React components, Recharts is great for creating responsive, interactive charts with a simple API and supports animations. It’s ideal if you need quick integration with a consistent React experience.\r\n\r\n- Victory:  \r\n  A React-specific charting library that offers a variety of customizable chart types and supports interactive features like tooltips and dynamic data updates.\r\n\r\n- Chart. (with react-chart-2):  \r\n  A widely used charting library with an official React wrapper. It offers rich, interactive charts with a large community, though it may require extra configuration for deep customization.\r\n\r\n- D3.:  \r\n  For advanced data visualization needs, D3. provides a powerful toolkit for creating highly customizable and interactive charts. However, integrating D3 directly in React can be complex; many developers combine it with hooks or use libraries like React + D3 patterns to manage DOM manipulations.\r\n\r\n Implementation Strategy\r\n\r\n1. Define Your Data and Interactions:  \r\n Start by understanding what type of chart you need (line, bar, pie, etc.) and which interactive features are required (e.g., tooltips, zoom, filtering).\r\n\r\n2. Choose a Library Based on Requirements:  \r\n For ease-of-use and quick development, Recharts is a solid choice. If you need more control or specific customizations, consider D3..\r\n\r\n3. Integrate the Library:  \r\n - Install the chosen library via npm (e.g., npm install recharts or npm install react-chart-2 chart.).\r\n - Create a dedicated chart component that receives data as props and configures the chart according to your requirements.\r\n\r\n4. Implement Interactive Features:  \r\n Utilize built-in features like tooltips, hover effects, and click events to update state or show additional data. For example, in Recharts:\r\n  \r\n  \r\n \r\n\r\n5. Testing and Optimization:  \r\n - Ensure the chart updates in response to state changes.\r\n - Test responsiveness and interactivity across devices and browsers.\r\n - Profile performance if you’re handling large data sets, and consider optimizations like data memoization or lazy loading additional data as needed.\r\n\r\nBy choosing the right library and planning the interactive elements, you can create a feature-rich, responsive interactive chart tailored to your project’s requirements.",
    "tags": [
      "interviewed"
    ],

    "keyFeatures": [],
    "actionWords": ["using external libraries like chart.js, recharts, victory"],
    "codeExample": " \r\n import React from 'react';\r\n import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';\r\n\r\n const data = [\r\n { name: 'Jan', value: 400 },\r\n { name: 'Feb', value: 300 },\r\n { name: 'Mar', value: 500 },\r\n // ...more data\r\n ];\r\n\r\n function InteractiveLineChart() {\r\n return (\r\n <LineChart width={600} height={300} data={data}>\r\n <XAxis dataKey=\"name\" />\r\n <YAxis />\r\n <CartesianGrid stroke=\"ccc\" />\r\n <Tooltip />\r\n <Line type=\"monotone\" dataKey=\"value\" stroke=\"8884d8\" />\r\n </LineChart>\r\n );\r\n }\r\n\r\n export default InteractiveLineChart;"
  },
  {
    "id": 144,
    "topic": "react",
    "question": "How will you handle errors in your react app gracefully ?",
    "answer": "Handling errors gracefully in a React app involves both capturing runtime errors and providing a smooth user experience when something goes wrong.\n Here are several strategies:\r\n\r\n 1. Error Boundaries\r\n- What They Are:  \r\n  Error boundaries are React components that <mark>catch JavaScript errors anywhere in their child component tree</mark>, log those errors, and display a fallback UI instead of the component tree that crashed.\r\n- How to Implement:  \r\n - Create a class component that implements <i>componentDidCatch and getDerivedStateFromError</i>, then wrap sections of your application with it\r\n\r\n  \r\n\r\n- Wrap your components or routes within the ErrorBoundary to ensure errors are caught at the appropriate level.\r\n\r\n 2. Graceful Degradation with Fallback UI\r\n- User Experience:  \r\n  Provide a clear and friendly fallback UI or error message to guide users if something fails, rather than a blank page or stack trace.\r\n- Example:  \r\n  If a data fetch fails, show a custom error message or retry option.\r\n\r\n 3. Global Error Handling\r\n- Network & Unhandled Errors:  \r\n  Use global error listeners for unhandled promise rejections and errors (e.g., using window.onerror or window.addEventListener('unhandledrejection', ...)), then log them appropriately.\r\n- Logging & Monitoring:  \r\n  Integrate with error tracking services like Sentry, LogRocket, or New Relic to capture and monitor errors in production.\r\n\r\n 4. Error Handling in Asynchronous Operations\r\n- Try/Catch in Async Functions:  \r\n  Wrap asynchronous operations in try/catch blocks to handle errors gracefully. Provide meaningful feedback to users when an operation fails.\r\n- Promise Handling:  \r\n  Ensure you add .catch to your promises and handle errors at each level of asynchronous operations.\r\n\r\n 5. Component-Level Error Handling\r\n- Local Error State:  \r\n  For errors that affect a single component (e.g., form validation errors, fetch failures), manage error state locally to render error messages inline without crashing the entire app.\r\n- User-Friendly Messages:  \r\n  Convert technical error messages into user-friendly notifications.\r\n\r\n 6. Testing and Monitoring\r\n- Unit & Integration Tests:  \r\n  Write tests to simulate error scenarios and verify that your error boundaries and error handling logic work as expected.\r\n- Real-Time Monitoring:  \r\n  Use monitoring tools to get alerted on production issues so you can quickly address them.\r\n\r\n Conclusion\r\n\r\nBy combining error boundaries with local error handling, asynchronous try/catch blocks, global error listeners, and robust logging, you can ensure that your React app handles errors gracefully, providing a better experience for users and making maintenance easier for developers.",
    "tags": [
      "interviewed"
    ],
    "keyFeatures": [],
    "actionWords": ["error boundaries", "fallback UI", "user freindly error messages", "use of try/catch block in async operations"],
    "codeExample": "\r\n  import React from 'react';\r\n\r\n  class ErrorBoundary extends React.Component {\r\n  constructor(props) {\r\n  super(props);\r\n  this.state = { hasError: false };\r\n  }\r\n\r\n  static getDerivedStateFromError(error) {\r\n  // Update state so the next render shows the fallback UI.\r\n  return { hasError: true };\r\n  }\r\n\r\n  componentDidCatch(error, errorInfo) {\r\n  // Log the error to an error reporting service.\r\n  console.error(\"Error caught by ErrorBoundary: \", error, errorInfo);\r\n  }\r\n\r\n  render() {\r\n  if (this.state.hasError) {\r\n  // Fallback UI\r\n  return <h1>Something went wrong.</h1>;\r\n  }\r\n  return this.props.children;\r\n  }\r\n  }\r\n\r\n  export default ErrorBoundary;\r\n  "
  },
  {
    "id": ":r0:0ads1",
    "topic": "nextjs",
    "question": "There is a dashboard component which is breaking due to api rate limiter how will you handle it ?",
    "answer": "When a dashboard component breaks due to an API rate limiter, it means the app is making too many requests in a short period, and the API is temporarily blocking further calls. Here’s how you can handle it:\n\n\n\n 1. 🔍 Identify the Cause:\n- Excessive API Calls:  \n-  Review your component to understand when and why multiple requests are fired. Is it due to frequent polling, user actions, or inefficient data fetching logic\n\n\n\n 2. 🚀 Implement Mitigation Strategies:\n\n- Caching:  \n-  Store API responses (using in-memory cache, localStorage, or libraries like SWR or React Query) so that subsequent renders use cached data rather than making a new API call.\n\n- Throttling/Debouncing:  \n  Use throttling or debouncing techniques to limit how often API calls are made. This is particularly useful if API requests are triggered by user input.\n\n- Retry Logic with Exponential Backoff:  \n  Automatically retry failed requests with increasing intervals between attempts. This helps mitigate temporary rate limiting without overwhelming the API.\n\n- Server-Side Aggregation:  \n  Create a server-side proxy or aggregation endpoint that makes fewer requests to the API. The client then fetches data from your own server, reducing the number of direct calls to the external API.\n\n\n\n 3. ⚠️ Enhance Error Handling & User Experience\n\n- Graceful Degradation:  \n  Detect rate limit errors (e.g., HTTP 429) and display a friendly message to the user, such as \"Our service is momentarily busy. Please try again in a few moments.\"\n\n- Fallback UI:  \n  Show cached or default data when the API call fails, ensuring that the dashboard remains functional and the user experience isn’t completely interrupted.\n\n- Monitoring & Alerts:  \n  Log these errors to help diagnose issues and adjust your fetching strategy as needed.\n\n\n\n 4. 💡 Example with React Query\n\nUsing React Query, you can implement caching, retry logic, and error handling out-of-the-box:\n\n```\nimport { useQuery } from 'react-query';\n\nconst fetchDashboardData = async () => {\n  const response = await fetch('https://api.example.com/dashboard-data');\n  if (!response.ok) {\n    throw new Error('Rate limited or other error');\n  }\n  return response.json();\n};\n\nfunction Dashboard() {\n  const { data, error, isLoading } = useQuery('dashboardData', fetchDashboardData, {\n    staleTime: 5  60  1000, // Cache data for 5 minutes\n    retry: (failureCount, error) => {\n      if (error.message.includes('Rate limited')) {\n        // Customize retry logic for rate limiting\n        return failureCount < 3;\n      }\n      return false;\n    },\n    retryDelay: attemptIndex => Math.min(1000  2  attemptIndex, 30000), // Exponential backoff\n  });\n\n  if (isLoading) return <p>Loading...</p>;\n  if (error) return <p>Service is busy. Please try again later.</p>;\n\n  return (\n    <div>\n      <h1>Dashboard Data</h1>\n      {/ Render your dashboard data /}\n      <pre>{JSON.stringify(data, null, 2)}</pre>\n    </div>\n  );\n}\n```\n\n\n\n 👍 Summary\n\nBy implementing caching, throttling, retry logic, and improved error handling, you can minimize the number of API calls, gracefully manage rate limiting, and maintain a smooth user experience even when the API is busy. Happy coding! 🚀",
    "tags": ["interviewed"],
    "keyFeatures": [],
    "actionWords": [],
    "codeExample": ""
  }


];