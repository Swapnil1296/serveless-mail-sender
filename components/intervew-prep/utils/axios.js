export const Axios = [
    {
      "id": 1,
      "topic": "axios",
      "question": "What is Axios?",
      "answer": "Axios is a versatile and feature-rich library for making HTTP requests in JavaScript applications, offering a convenient and efficient way to interact with remote APIs and services. Its simplicity, flexibility, and robust feature set make it a popular choice among developers for handling HTTP communication in web and Node. applications.",
      "tags": [
        "fundatmental"
      ],
      "keyFeatures": [],
      "actionWords": [
        "convenient & effiecient way to interact with remote api"
      ],
      "codeExample": ""
    },
    {
      "id": 2,
      "topic": "axios",
      "question": " What are some of the most common security threats that a developer needs to be aware of when developing a web application?",
      "answer": "Developers need to be aware of various security threats when developing web applications to ensure that their applications are protected against potential vulnerabilities and attacks. Some of the most common security threats include:\r\n\r\n1.   Injection Attacks  :\r\n   - Injection attacks, such as SQL injection and NoSQL injection, occur when malicious code is injected into input fields or parameters and executed by the application's backend database. This can lead to unauthorized access, data leakage, and data manipulation.\r\n\r\n2.   Cross-Site Scripting (XSS)  :\r\n   - XSS attacks involve injecting malicious scripts into web pages that are viewed by other users. These scripts can steal sensitive information, such as cookies or session tokens, or perform actions on behalf of the user, such as redirecting them to phishing sites.\r\n\r\n3.   Cross-Site Request Forgery (CSRF)  :\r\n   - CSRF attacks trick users into performing unintended actions on a web application, such as transferring funds or changing account settings, by exploiting the user's authenticated session. Attackers craft malicious requests that are automatically executed when the user visits a compromised website.\r\n\r\n4.   Broken Authentication and Session Management  :\r\n   - Weaknesses in authentication and session management mechanisms can lead to unauthorized access to user accounts, session hijacking, and privilege escalation. Developers must ensure secure storage of credentials, proper session handling, and protection against brute force attacks and credential stuffing.\r\n\r\n5.   Insecure Direct Object References (IDOR)  :\r\n   - IDOR vulnerabilities occur when an application exposes internal object references, such as database keys or file paths, in URLs or parameters, allowing attackers to manipulate these references to access unauthorized resources or sensitive data.\r\n\r\n6.   Security Misconfigurations  :\r\n   - Security misconfigurations, such as default settings, open ports, unnecessary services, and outdated software, can expose web applications to various attacks, including unauthorized access, data breaches, and denial-of-service (DoS) attacks. Developers should follow best practices for secure configuration and regularly audit their application's environment.\r\n\r\n7.   Sensitive Data Exposure  :\r\n   - Improper handling and storage of sensitive data, such as passwords, credit card numbers, and personal information, can lead to data breaches and privacy violations. Developers must encrypt sensitive data, use secure protocols for transmission, and implement access controls to restrict unauthorized access.\r\n\r\n8.   Insecure Deserialization  :\r\n   - Insecure deserialization vulnerabilities occur when untrusted data is deserialized by an application without proper validation or sanitization. Attackers can exploit these vulnerabilities to execute arbitrary code, perform denial-of-service attacks, or gain unauthorized access to sensitive systems.\r\n\r\n9.   Security Headers  :\r\n   - Missing or misconfigured security headers, such as Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), and X-Content-Type-Options, can leave web applications vulnerable to various attacks, including XSS, clickjacking, and data injection.\r\n\r\n10.   Unvalidated Redirects and Forwards  :\r\n    - Unvalidated redirects and forwards occur when web applications redirect users to external URLs based on untrusted input or parameters. Attackers can exploit these vulnerabilities to redirect users to malicious websites or phishing pages.\r\n",
      "tags": [
        "security"
      ],
      "keyFeatures": [],
      "actionWords": [
        "injection attacks",
        " XSS",
        "CSRF",
        "IDOR"
      ],
      "codeExample": ""
    },
    {
      "id": 3,
      "topic": "axios",
      "question": "What is the main advantage of using axios over other AJAX libraries like jQuery?",
      "answer": "One of the main advantages of using Axios over other AJAX libraries like jQuery is its simplicity and flexibility, along with its support for modern JavaScript features. Here are some key advantages of Axios:\r\n\r\n1.   Promise-based API  :\r\n   - Axios uses promises, which are a modern JavaScript feature, to handle asynchronous operations. This makes it easier to write asynchronous code and handle asynchronous data flows compared to traditional callback-based approaches used by libraries like jQuery.\r\n\r\n2.   Simplicity and Lightweight  :\r\n   - Axios is a standalone library focused solely on making HTTP requests, whereas jQuery is a larger library with a broader scope that includes DOM manipulation, event handling, and animation. As a result, Axios is often considered lighter and more focused, making it easier to use and integrate into projects without unnecessary overhead.\r\n\r\n3.   Support for Node.  :\r\n   - Axios is compatible with both web browsers and Node. environments, allowing developers to use the same library for making HTTP requests in client-side and server-side applications. This consistency simplifies code maintenance and reduces the need for separate client-side and server-side AJAX implementations.\r\n\r\n4.   Interceptors  :\r\n   - Axios provides a powerful interceptor mechanism that allows developers to intercept and modify HTTP requests and responses globally or at the individual request level. This flexibility enables advanced features such as request/response logging, authentication handling, and error handling.\r\n\r\n5.   Modern JavaScript Features  :\r\n   - Axios is written in modern JavaScript and supports features such as arrow functions, template literals, and async/await syntax. This makes it more aligned with modern JavaScript development practices and allows developers to write cleaner and more expressive code.\r\n\r\n6.   JSON Handling  :\r\n   - Axios automatically parses JSON responses by default, simplifying the process of working with JSON data from APIs. It also provides options for customizing request and response data formats, making it versatile for handling various data types and formats.\r\n\r\n7.   Community Support  :\r\n   - Axios has a large and active community of developers who contribute to its development, provide support, and share resources and best practices. This vibrant community ensures that Axios remains well-maintained, up-to-date, and supported by a wealth of documentation and tutorials.\r\n\r\nOverall, Axios offers a modern, lightweight, and flexible solution for making HTTP requests in JavaScript applications, with a focus on simplicity, consistency, and compatibility across different environments. Its promise-based API, support for modern JavaScript features, and powerful interceptor mechanism make it a preferred choice for many developers seeking a robust AJAX library.",
      "tags": [
        "comparision"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 4,
      "topic": "axios",
      "question": "What is the JSONP technique? Is it used by Axios? If yes, then why?",
      "answer": "JSONP (JSON with Padding) is a technique used to overcome the same-origin policy restrictions in web browsers when making cross-origin AJAX requests. It involves dynamically creating a  \"<script> \" tag with a src attribute pointing to a remote server that returns JSON data wrapped in a function call. By using JSONP, developers can bypass the browser's same-origin policy and fetch data from different domains.\r\n\r\nAxios does not directly support JSONP requests out of the box. It is primarily designed for making XMLHttpRequests or fetch requests, which adhere to the browser's same-origin policy and do not support cross-origin requests to different domains.\r\n\r\nHowever, developers can still use JSONP with Axios by creating their own custom implementation or by using additional libraries or plugins that provide JSONP support. One common approach is to use the  \"onp \" adapter provided by the  \"axios-onp \" library, which allows Axios to make JSONP requests by wrapping the request in a  \"<script> \" tag and handling the response accordingly.\r\n\r\nWhy use JSONP with Axios?\r\n\r\n1.   Cross-Origin Requests  :\r\n   - JSONP allows developers to fetch data from different domains or origins, which is useful for integrating with third-party APIs or services that do not support CORS (Cross-Origin Resource Sharing).\r\n\r\n2.   Legacy Browser Support  :\r\n   - JSONP is supported by older browsers that may not support modern features like CORS or fetch. Using JSONP with Axios allows developers to maintain compatibility with older browser versions while still accessing remote APIs.\r\n\r\n3.   Dynamic Data Loading  :\r\n   - JSONP can be used to dynamically load data from external sources without requiring server-side proxying or modifying server configurations. This makes it a convenient option for fetching dynamic content or integrating with external services in client-side JavaScript applications.\r\n\r\n4.   Fallback Mechanism  :\r\n   - JSONP can serve as a fallback mechanism when CORS is not available or when other cross-origin techniques are not feasible. By providing JSONP support in Axios, developers can ensure their applications can access remote resources in a variety of environments and scenarios.\r\n",
      "tags": [
        "conceptual"
      ],
      "keyFeatures": [],
      "actionWords": [
        "overcome same-origin-policy",
        " axios does not support"
      ],
      "codeExample": ""
    },
    {
      "id": 5,
      "topic": "axios",
      "question": "What are some situations where sending data as query params might be better than sending them via post requests?",
      "answer": "Sending data as query parameters in the URL can be preferable to sending them via POST requests in certain situations:\r\n\r\n1.   Caching and Bookmarking  :\r\n   - Data sent as query parameters become part of the URL, making the URL uniquely identifiable. This allows browsers and proxies to cache the response, leading to improved performance for subsequent requests. Additionally, users can bookmark or share the URL, preserving the specific state of the application.\r\n\r\n2.   State Preservation  :\r\n   - Query parameters can be used to preserve the state of the application, allowing users to navigate back to a specific page or view with the same parameters. This is especially useful in web applications where users may want to revisit or share specific views or search results.\r\n\r\n3.   GET Requests  :\r\n   - Query parameters are typically used with GET requests, which are idempotent and safe. They can be cached, bookmarked, and shared without any side effects on the server. If the operation is read-only or does not modify server state, sending data as query parameters via GET requests can be appropriate.\r\n\r\n4.   Simple Data Transfer  :\r\n   - For small amounts of data, such as search queries, filters, or sorting criteria, sending them as query parameters is simple and straightforward. It eliminates the need for complex request bodies and parsing on the server side.\r\n\r\n5.   Cross-Origin Requests  :\r\n   - Query parameters are part of the URL, making them visible and accessible to clients and servers. This can simplify cross-origin requests, as they do not require complex headers or preflight requests like POST requests with custom headers.\r\n\r\n6.   Compatibility and Integration  :\r\n   - Query parameters are widely supported by web servers, frameworks, and APIs. They are easy to work with and integrate into existing systems, making them a practical choice for interoperability and compatibility.\r\n\r\nHowever, it's essential to consider security implications when sending sensitive data as query parameters, as they are visible in the URL and can be logged by intermediaries or exposed in browser history. For sensitive or confidential data, using POST requests with request bodies encrypted over HTTPS is generally recommended to ensure data privacy and security.",
      "tags": [
        "conceptual"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 6,
      "topic": "axios",
      "question": "What are the preflight requests that Axios makes while interacting with external APIs?",
      "answer": "Preflight requests are a part of the   Cross-Origin Resource Sharing (CORS)   protocol, which is used to determine whether an actual request to an external API is safe to make. They occur when a request doesn't meet the   simple request   criteria defined by CORS.\n\n      When does a preflight request happen?  \nA preflight request is sent before the actual request if:\n1.   Request Methods  : The request uses HTTP methods like PUT, DELETE, PATCH, or any custom methods (not GET, POST, or HEAD).\n2.   Headers  : The request includes custom headers like Authorization, Content-Type (if it's not application/x-www-form-urlencoded, multipart/form-data, or text/plain), or other non-simple headers.\n3.   CORS Policies  : The request is being made to a different origin (different domain, protocol, or port).\n\n      What happens in a preflight request?  \nA preflight request:\n- Uses the OPTIONS HTTP method.\n- Checks with the server to see if it allows the actual request.\n- Includes the following headers:\n  - Origin: Specifies the origin of the request.\n  - Access-Control-Request-Method: Specifies the HTTP method of the actual request.\n  - Access-Control-Request-Headers: Lists custom headers used in the actual request.\n\n      \n\n      How Axios Handles Preflight Requests  \nAxios itself doesn't directly control preflight requests; these are handled by the browser as part of the CORS protocol. However, you can configure Axios to avoid unnecessary preflight requests by:\n1.   Using simple requests  : Stick to GET, POST, or HEAD and avoid custom headers.\n2.   Correct Content-Type  : Use application/x-www-form-urlencoded instead of application/on if possible.\n3.   CORS Configuration on the Server  : Ensure the server allows the necessary origins, methods, and headers in its CORS configuration.\n\n\n\n      Key Points  \n- Preflight requests are initiated by the browser, not Axios.\n- They are sent as OPTIONS requests to ensure CORS policy compliance.\n- Minimizing custom headers and using \"simple requests\" can reduce preflight requests.\n- Proper server-side CORS configuration is essential for handling preflight and subsequent actual requests.",
      "tags": [
        "request"
      ],
      "keyFeatures": [],
      "actionWords": [
        "part of cors protocol"
      ],
      "codeExample": "Example of a Preflight Request  \nIf a client (frontend) sends an API request like this using Axios:\n\n\naxios.post('https://api.example.com/data', payload, {\n  headers: {\n    'Authorization': 'Bearer token',\n    'Content-Type': 'application/on',\n  },\n});\n\n\nA preflight request will be made like this:\n\n\nOPTIONS /data HTTP/1.1\nHost: api.example.com\nOrigin: http://your-frontend.com\nAccess-Control-Request-Method: POST\nAccess-Control-Request-Headers: Authorization, Content-Type\n\n\nThe server responds with CORS headers if the request is allowed:\n\n\nHTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: http://your-frontend.com\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\nAccess-Control-Allow-Headers: Authorization, Content-Type\n\n\nIf the server allows it, the browser then sends the actual request.\n\n"
    },
    {
      "id": 7,
      "topic": "axios",
      "question": "What is Axios, and how is it different from the native fetch API?\r",
      "answer": " Axios is a promise-based HTTP client for the browser and Node., used to make HTTP requests. It differs from the fetch API in the following ways:\r\n- Axios automatically transforms response data into JSON.\r\n- It supports older browsers like Internet Explorer, unlike fetch.\r\n- Axios has built-in XSRF protection.\r\n- Axios can intercept requests and responses, allowing for custom logic to be applied.\r\n- It allows for cancelling requests easily.\r",
      "tags": [
        "fundatmental"
      ],
      "keyFeatures": [],
      "actionWords": [
        "promise-based http client",
        " makes http request"
      ],
      "codeExample": ""
    },
    {
      "id": 8,
      "topic": "axios",
      "question": "What are interceptors in Axios?\r",
      "answer": "Interceptors allow you to intercept and modify requests or responses before they are handled by .then() or .catch(). There are two types:\n- Request Interceptor : Allows modification or logging of the request before it is sent.\n- Response Interceptor : Allows modification or logging of the response before it is processed.\n\n",
      "tags": [
        "fundatmental"
      ],
      "keyFeatures": [],
      "actionWords": [
        "modify req/res",
        ""
      ],
      "codeExample": " Example:\n\naxios.interceptors.request.use(request => {\n// Modify request here\nreturn request;\n});\n\naxios.interceptors.response.use(response => {\n// Modify response here\nreturn response;\n});"
    },
    {
      "id": 9,
      "topic": "axios",
      "question": "How do you handle errors with Axios?\r",
      "answer": "Axios uses try...catch blocks or .catch() to handle errors. The error response includes response, request, and message which provide useful information for debugging.\n",
      "tags": [
        "fundatmental"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "- Example:\n\naxios.get('/data')\n.then(response => console.log(response))\n.catch(error => {\nif (error.response) {\nconsole.error('Response error:', error.response);\n} else if (error.request) {\nconsole.error('Request error:', error.request);\n} else {\nconsole.error('Error:', error.message);\n}\n});"
    },
    {
      "id": 10,
      "topic": "axios",
      "question": "How can you make parallel requests with Axios?\r",
      "answer": "Axios allows you to make multiple requests simultaneously using axios.all() and axios.spread():\n\n\n",
      "tags": [
        "fundatmental"
      ],
      "keyFeatures": [],
      "actionWords": [
        "axios.all()",
        " axios.spread()"
      ],
      "codeExample": "axios.all([axios.get('/endpoint1'), axios.get('/endpoint2')])\n.then(axios.spread((response1, response2) => {\nconsole.log(response1.data);\nconsole.log(response2.data);\n}))\n.catch(error => console.error(error));"
    },
    {
      "id": 11,
      "topic": "axios",
      "question": " What is the cancelToken in Axios?\r",
      "answer": "The cancelToken is used to cancel requests in Axios. This is useful when you want to abort a request based on certain conditions or avoid unnecessary network traffic (e.g., cancelling requests for outdated data).\n\n",
      "tags": [
        "conceptual"
      ],
      "keyFeatures": [],
      "actionWords": [
        "cancel request"
      ],
      "codeExample": "- Example:\n\nconst CancelToken = axios.CancelToken;\nconst source = CancelToken.source();\n\naxios.get('/data', {\ncancelToken: source.token\n})\n.then(response => console.log(response))\n.catch(error => {\nif (axios.isCancel(error)) {\nconsole.log('Request canceled', error.message);\n} else {\nconsole.error(error);\n}\n});\n\n// Cancel request\nsource.cancel('Request canceled by user');"
    },
    {
      "id": 12,
      "topic": "axios",
      "question": " How can you set default headers in Axios?\r",
      "answer": "You can set default headers globally for all requests by configuring the default object in Axios:\n\n\n\n",
      "tags": [
        "request"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "axios.defaults.headers.common['Authorization'] = 'Bearer token';\naxios.defaults.headers.post['Content-Type'] = 'application/on';"
    },
    {
      "id": 13,
      "topic": "axios",
      "question": "What are the differences between axios.get() and axios.post() methods?\r",
      "answer": "- axios.get() is used to send GET requests (usually for retrieving data from the server).\r\n- axios.post() is used to send POST requests (usually for submitting or sending data to the server).\r",
      "tags": [
        "request"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": ""
    },
    {
      "id": 14,
      "topic": "axios",
      "question": "How would you set a timeout for an Axios request?\r\n",
      "answer": "You can set a timeout by passing the timeout option in the Axios configuration object. If the request takes longer than the specified time, it will be canceled automatically.\n\n\n",
      "tags": [
        "request"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "axios.get('/data', { timeout: 5000 }) // Timeout after 5 seconds\n.then(response => console.log(response))\n.catch(error => console.error('Error:', error));"
    },
    {
      "id": 15,
      "topic": "axios",
      "question": "What are params and data in Axios?",
      "answer": "params are used for query string parameters, and they are appended to the URL.\n- data is used to send the request body with methods like POST, PUT, or PATCH.\n",
      "tags": [
        "request"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": " Example:\n\naxios.get('/data', {\nparams: { userId: 123 }\n}).then(response => console.log(response));\n\naxios.post('/data', { name: 'John', age: 30 }).then(response => console.log(response));"
    },
    {
      "id": 16,
      "topic": "axios",
      "question": "What are the different methods to make HTTP requests with Axios?",
      "answer": "Axios provides several methods for making HTTP requests:\n        \n\n",
      "tags": [
        "request"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "// GET request\naxios.get('/users');\n\n// POST request\naxios.post('/users', { name: 'John' });\n\n// PUT request\naxios.put('/users/1', { name: 'John' });\n\n// DELETE request\naxios.delete('/users/1');\n\n// PATCH request\naxios.patch('/users/1', { name: 'John' });\n\n// Multiple concurrent requests\naxios.all([\n  axios.get('/users'),\n  axios.get('/posts')\n]);"
    },
    {
      "id": 17,
      "topic": "axios",
      "question": " How do you configure default settings in Axios?",
      "answer": "You can configure default settings using axios.defaults or creating an instance:\n        \n\n",
      "tags": [
        "fundatmental"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "// Global defaults\naxios.defaults.baseURL = 'https://api.example.com';\naxios.defaults.headers.common['Authorization'] = 'Bearer token';\naxios.defaults.timeout = 5000;\n\n// Instance defaults\nconst instance = axios.create({\n  baseURL: 'https://api.example.com',\n  timeout: 5000,\n  headers: {'X-Custom-Header': 'value'}\n});"
    },
    {
      "id": 18,
      "topic": "axios",
      "question": "How do you add request interceptors in Axios?",
      "answer": "Request interceptors can modify requests before they are sent:\n        \n\n",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "// Add request interceptor\naxios.interceptors.request.use(\n  config => {\n    // Modify request config\n    config.headers['Authorization'] =   Bearer ${getToken()}  ;\n    return config;\n  },\n  error => {\n    // Handle request error\n    return Promise.reject(error);\n  }"
    },
    {
      "id": 19,
      "topic": "axios",
      "question": "How do you add response interceptors in Axios?\r",
      "answer": "Response interceptors can modify responses before they reach your code:\n        \n\n",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "// Add response interceptor\naxios.interceptors.response.use(\n  response => {\n    // Any status code within 2xx range\n    return response;\n  },\n  error => {\n    // Any status codes outside 2xx range\n    if (error.response.status === 401) {\n      // Handle unauthorized error\n      refreshToken();\n    }\n    return Promise.reject(error);\n  }\n);"
    },
    {
      "id": 20,
      "topic": "axios",
      "question": "How do you cancel requests in Axios?",
      "answer": "Axios provides a CancelToken to cancel requests:\n        \n\n",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "const CancelToken = axios.CancelToken;\nconst source = CancelToken.source();\n\naxios.get('/api/data', {\n  cancelToken: source.token\n}).catch(error => {\n  if (axios.isCancel(error)) {\n    console.log('Request cancelled:', error.message);\n  }\n});\n\n// Cancel the request\nsource.cancel('Request cancelled by user');"
    },
    {
      "id": 21,
      "topic": "axios",
      "question": "How do you track upload/download progress with Axios?",
      "answer": "Axios provides onUploadProgress and onDownloadProgress options:\n        \n\n",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "axios.post('/upload', formData, {\n  onUploadProgress: progressEvent => {\n    const percentCompleted = Math.round(\n      (progressEvent.loaded  100) / progressEvent.total\n    );\n    console.log(  Upload Progress: ${percentCompleted}%  );\n  },\n  onDownloadProgress: progressEvent => {\n    const percentCompleted = Math.round(\n      (progressEvent.loaded  100) / progressEvent.total\n    );\n    console.log(  Download Progress: ${percentCompleted}%  );\n  }\n});"
    },
    {
      "id": 22,
      "topic": "axios",
      "question": "How do you handle file uploads with Axios?\r",
      "answer": "Files can be uploaded using FormData:\n        \n\n",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "const formData = new FormData();\nformData.append('file', fileInput.files[0]);\n\naxios.post('/upload', formData, {\n  headers: {\n    'Content-Type': 'multipart/form-data'\n  }\n});"
    },
    {
      "id": 23,
      "topic": "axios",
      "question": "How do you handle authentication with Axios?\r",
      "answer": "",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Several ways to handle authentication:\n        \n// Basic auth\naxios.get('/api', {\n  auth: {\n    username: 'user',\n    password: 'pass'\n  }\n});\n\n// Bearer token\naxios.get('/api', {\n  headers: {\n    'Authorization':   Bearer ${token}  \n  }\n});\n\n// Using interceptors\naxios.interceptors.request.use(config => {\n  const token = localStorage.getItem('token');\n  if (token) {\n    config.headers.Authorization =   Bearer ${token}  ;\n  }\n  return config;\n});"
    },
    {
      "id": 24,
      "topic": "axios",
      "question": "How do you transform request and response data in Axios?\r",
      "answer": "",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Axios allows data transformation using transformRequest and transformResponse:\r\n        \r\nconst instance = axios.create({\r\n  transformRequest: [(data, headers) => {\r\n    // Transform request data\r\n    return data;\r\n  }],\r\n  transformResponse: [(data) => {\r\n    // Transform response data\r\n    return data;\r\n  }]\r\n});\r"
    },
    {
      "id": 25,
      "topic": "axios",
      "question": "How do you handle request timeouts in Axios?\r",
      "answer": "",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Timeouts can be set globally or per request:\r\n        \r\n// Global timeout\r\naxios.defaults.timeout = 5000;\r\n\r\n// Request specific timeout\r\naxios.get('/api/data', {\r\n  timeout: 3000\r\n});\r\n"
    },
    {
      "id": 26,
      "topic": "axios",
      "question": " How do you make requests with different content types?\r",
      "answer": "",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Content types can be specified in headers:\r\n        \r\n// JSON (default)\r\naxios.post('/api', {\r\n  data: { key: 'value' }\r\n});\r\n\r\n// Form data\r\naxios.post('/api', 'name=John&age=30', {\r\n  headers: {\r\n    'Content-Type': 'application/x-www-form-urlencoded'\r\n  }\r\n});\r\n\r\n// Multipart form data\r\nconst formData = new FormData();\r\naxios.post('/api', formData, {\r\n  headers: {\r\n    'Content-Type': 'multipart/form-data'\r\n  }\r\n});\r"
    },
    {
      "id": 27,
      "topic": "axios",
      "question": "How do you handle response schemas with Axios?",
      "answer": "",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "You can validate responses using a schema validation library:\r\n        \r\nimport  as yup from 'yup';\r\n\r\nconst userSchema = yup.object().shape({\r\n  id: yup.number().required(),\r\n  name: yup.string().required(),\r\n  email: yup.string().email().required()\r\n});\r\n\r\naxios.get('/api/user')\r\n  .then(response => {\r\n    try {\r\n      const validatedData = userSchema.validateSync(response.data);\r\n      return validatedData;\r\n    } catch (error) {\r\n      throw new Error('Invalid response schema');\r\n    }\r\n  });\r"
    },
    {
      "id": 28,
      "topic": "axios",
      "question": "How do you implement retry logic with Axios?",
      "answer": "",
      "tags": [
        "use-case"
      ],
      "keyFeatures": [],
      "actionWords": [],
      "codeExample": "Retry logic can be implemented using interceptors:\r\n        \r\naxios.interceptors.response.use(null, error => {\r\n  const config = error.config;\r\n  \r\n  // Set retry count if not set\r\n  config.retryCount = config.retryCount || 0;\r\n  \r\n  if (config.retryCount >= 3) {\r\n    return Promise.reject(error);\r\n  }\r\n  \r\n  // Increase retry count\r\n  config.retryCount += 1;\r\n  \r\n  // Create new promise to retry\r\n  const backoff = new Promise(resolve => {\r\n    setTimeout(() => resolve(), 1000  Math.pow(2, config.retryCount));\r\n  });\r\n  \r\n  return backoff.then(() => axios(config));\r\n});\r"
    }
  ]