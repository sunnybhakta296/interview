## What is node js

 * Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
 * It allows you to run JavaScript code on the server-side, enabling you to build scalable and high-performance web applications.
 * Node.js uses an event-driven, non-blocking I/O model, making it efficient and lightweight.
 

## Event driven programing/architecture in node js

 * Event driven programing is a paradigm in which the flow of a program in determined by events, such as user actions, incoming HTTP request, file I/O completion, or a time expiration.

 * It allow developer to write non-blocking asynchronous code that responds to the events as they occur, without waiting blocking operations to complete.

 * Event loop is at the core for Node Js event driven architecture.

 * When an events occurs such as incoming HTTP request, file I/O completion, or a timer expiration, Node.JS’s event loop triggers the associated event handler.

## Event
* Events are signals indicating that a particular action or state change has occurred. In Node.js

# EventEmitter
It's used to create, emil and listen to custom events

```
const EventEmitter = require('events');
const emitter = new EventEmitter();

const messaeEventandler = (arg) => {
    console.log('Listener called', arg);
}

//Listening to Events
emitter.on('messageLogged', messaeEventandler);

//Emitting Events
emitter.emit('messageLogged', 600)
```

## Non-Blockin
* Referes to perform I/0 operations (reading from file, making network requests, or querying database) without blocking the execution of code.

* This is achieved through asynchronous programming, where operations are initiated and the program continues to run without waiting for the operation to complete

* When the operation finishes, a callback function is executed to handle the result.

## Asynchronous Operations
* Operations that do not block the execution of subsequent code.
* They are initiated and the program continues to run, with the result being handled later via callbacks, promises, or async/await.

```
const fs = require('fs');

console.log('Start');

// Non-blocking asynchronous file read
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

console.log('End');
```

## Callbacks
Functions that are passed as arguments to asynchronous operations and are called when the operation completes.

## JavaScript Runtime
An environment that provides the necessary infrastructure to run JavaScript code outside of a web browser. 

## Libuv
* A multi-platform support library used by Node.js to handle its event loop and asynchronous operations
* Manages non-blocking I/O operations, ensuring that the main thread is not blocked.
* Libuv provides the underlying mechanisms for Node.js's non-blocking I/O model, including file system operations, network operations, and timers.


## Event loop
* Event loop is a part of Libuv library and NOT a part of JS or V8 engine.
* we can think of it as an orchestration engine that runs continuesly, whose task is to manage the synchronous and asynchronous tasks until there are no incoming requests. 
* Allows Node Js to perform non-blocking I/O operations 
* despite the fact that a single JavaScript thread is used by default 
* by offloading operations to the system kernel whenever possible.
* Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background
* When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed.

* Technically, the event loop is just a C program
* It enables Node.js to perform I/O operations asynchronously, which means that instead of waiting for one operation to complete before moving on to the next, it can start multiple operations simultaneously and process them as they complete, this mechanism is achieved by offloading the IO operations from the call-stack ( V8 engine ) to the C++ Api ( Libuv ), which allows the main thread to execute other synchronous code.

* It handles asynchronous operations by managing multiple phases, each with its own queue of callbacks to execute.

### Event Loop Phases
- **Timers Phase :**  Executes callbacks scheduled by setTimeout and setInterval.

- **Pending Callbacks Phase (I/O Callbacks) :** In this phase, callbacks from completed I/O operations are processed. For example, when a file read operation finishes, its callback is placed in this phase.

- **Idle, Prepare Phase:** Internal use only.

- **Poll Phase :** Retrieves new I/O events; executes I/O-related callbacks (excluding timers and setImmediate).  

- **Check Phase :** Executes callbacks scheduled by setImmediate.

- **Close Callbacks Phase :** Executes close event callbacks,such as the close event of a socket or a database connection. (e.g., socket.on('close', ...)).

### Event Phase Priority
Timer will be executed first on the Timers phase before moving to I/O Callbacks, the event loop also make sure to process micro tasks like nextTick() and promises after each phase.

### Microtasks Queue
- In addition to the main phases, there is a microtasks queue that includes:
- Promises (Promise.then, Promise.catch, Promise.finally)
- process.nextTick
- Microtasks are executed after each phase of the event loop, ensuring that they are processed before moving on to the next phase.


### Event Queue
Event queue contains below callback queue
- Timer
- Pending
- Poll
- check
- close

![alt text](assets/image.png)

![alt text](assets/image1.png)

![alt text](assets/eventloop3.png)

### Timer Execution [Youtube Video](https://www.youtube.com/watch?v=IT-vp7ieIn0)

- The order in which the timers are executed will vary depending on the context in which they are called.

- For example, if we run the following script which is not within an I/O cycle (i.e. the main module), the order in which the two timers are executed is non-deterministic, as it is bound by the performance of the process

```
//node/eventloop1.js
console.log('Without I/O cycle')

setImmediate(() => {
    console.log('Immediate 1')
})

//timer phase has higher check so it will be executed first
setTimeout(() => {
    console.log('Timeout 1')
}, 0)


//Without I/O cycle
//Timeout 1
//Immediate 1 
```

- However, if you move the two calls within an I/O cycle, the immediate callback is always executed first


```
//node\eventloop2.js   
const fs = require('fs');
fs.readFile(__filename, 'utf8', (err, data) => {
   setTimeout(()=>{
        console.log('Timeout 2')
   })
   setImmediate(()=>{
        console.log('Immediate 2')
   })
})

// Immediate 2
// Timeout 2
```

## Thread Pool in Node.js
* he thread pool is used for operations that cannot be performed asynchronously, such as file system operations, DNS lookups, and some crypto operations
* This thread pool is provided by libuv, the library that Node.js uses for handling asynchronous I/O operations.
* While JavaScript execution remains non-blocking, the thread pool allows Node.js to handle blocking operations without blocking the main event loop.
* By default, the thread pool has 4 threads. This can be configured using the UV_THREADPOOL_SIZE environment variable.l

```
//  npm run tp

const crypto = require("crypto");
const OS = require("os")

//need to set from env variable not in code
// process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("1");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("2 ");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("3 ");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("4 ");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("5 ");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("6 ");
});
```
## Use Case of thread pool

- **File System Operations**: Reading, writing, and deleting files.
- **DNS Lookups**: Resolving domain names to IP addresses.
- **Crypto Operations**: Hashing, encryption, and decryption.
- **Compression and Decompression**: Using libraries like zlib.
- **Database Operations**: Handling database queries with drivers that use the thread pool.


## Optimizing the performance of Node.js applications
- **1. Use Asynchronous Methods** : Always prefer asynchronous methods over synchronous ones to avoid blocking the event loop.

```
const fs = require('fs');

// Prefer this
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Over this
const data = fs.readFileSync('example.txt', 'utf8');
console.log(data);
```
- **2. Optimize Database Queries** : Ensure that your database queries are efficient. Use indexing, avoid unnecessary data retrieval, and use connection pooling.
```
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://user:password@localhost:5432/mydb'
});

pool.query('SELECT * FROM users WHERE id = $1', [userId], (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});
```
- **3. Use Caching**: Implement caching to reduce the load on your database and improve response times. Use in-memory caches like Redis or Memcached.


- **4. Avoid Blocking the Event Loop** : Avoid long-running synchronous operations and use worker threads or child processes for CPU-intensive tasks.
```
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js');
worker.on('message', (message) => {
  console.log('Worker message:', message);
});
```
- **5. Use Compression**: Enable gzip compression for HTTP responses to reduce the size of the data being transferred.
```
const express = require('express');
const compression = require('compression');
const app = express();

app.use(compression());
```
- **6. Optimize Middleware Usage**" : Minimize the number of middleware functions and ensure they are efficient. Use middleware only when necessary.

- **7. Monitor and Profile Your Application**: Use monitoring and profiling tools to identify performance bottlenecks. Tools like New Relic, PM2, and Node.js built-in profiler can be helpful.

```
node --prof app.js
```
- **8. Use HTTP/2**: HTTP/2 can improve performance by allowing multiple requests and responses to be multiplexed over a single connection.
```
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
});

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8443);
```
- **9. Keep Dependencies Up-to-Date**:Regularly update your dependencies to benefit from performance improvements and security patches.

```
npm outdated
npm update
```


# The V8 JavaScript Engine
<!-- /https://medium.com/@manikmudholkar831995/worker-threads-multitasking-in-nodejs-6028cdf35e9d -->
todo add 


## Worker Threads in Node.js
- Worker Threads in Node.js allow you to run JavaScript code in parallel threads, which can be useful for performing CPU-intensive tasks without blocking the main event loop. This is particularly useful for tasks like data processing, image manipulation, or any other heavy computation.

### Key Points
**1 Parallel Execution**: Worker threads run in parallel, allowing you to perform multiple tasks simultaneously.

**2 Non-blocking**: By offloading CPU-intensive tasks to worker threads, you can keep the main event loop responsive.

**3 Communication**: Worker threads can communicate with the main thread using messages.

## Example
``` run 
   node node/workerThread/mainThread.js
```
 
 # Process
 - process object is a global object that provides information about, and control over, the current Node.js process
 - The process object is a powerful tool in Node.js that provides essential functionality for interacting with and controlling the Node.js runtime environment.
 

### Key Features of the process Object
- **Standard Input/Output**: Access to stdin, stdout, and stderr.
- **Environment Variables**: Access to environment variables.
- **Process Information**: Information about the current process.
- **Process Control**: Methods to control the process


### Standard Input/Output
- **process.stdin**: A readable stream for standard input.
- **process.stdout**: A writable stream for standard output.
- **process.stderr**: A writable stream for standard error.

```
process.stdout.write('Enter your name: ');

process.stdin.on('data', (data) => {
  console.log(`Hello, ${data.toString().trim()}!`);
  process.exit(0);
});
```
### Environment Variables
- **process.env**: An object containing the user environment.

### Process Information
- **process.pid**: The process ID.
- **process.version**: The Node.js version.
- **process.versions**: An object listing the version strings of Node.js and its dependencies.
- **process.platform**: The platform Node.js is running on (e.g., 'darwin', 'win32', 'linux').

### Process Control
- **process.exit([code(0 0r 1)])**: Exits the process with the specified code. By convention, a code of 0 indicates success, and a non-zero code indicates an error

```
if (someCondition) {
  console.log('Exiting process');
  process.exit(1);
}
```
- **process.on(event, listener)**:  Adds a listener for the specified event. Common events include 'exit', 'uncaughtException', and 'unhandledRejection'.
```
process.on('exit', (code) => {
  console.log(`Process exited with code: ${code}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
```


# Unhandled Promise Rejections
- Unhandled promise rejections can occur when a promise is rejected and there is no .catch() handler to handle the rejection
- Node.js provides a way to handle these rejections globally.

```
//node node unandledPromiseRejection
unandledPromiseRejectionprocess.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Perform cleanup or other necessary actions
    process.exit(1); // Exit the process with a non-zero exit code
  });
  
  // Example of a promise that will be rejected without a catch handler
  new Promise((resolve, reject) => {
    reject(new Error('This is an unhandled rejection'));
  });
```

## Uncaught Exceptions in Node.js
- Uncaught exceptions occur when an error is thrown and not caught by any try-catch block or error handler. 
- Node.js provides a way to handle these exceptions globally using the uncaughtException event. 

```
// Handle uncaught exceptions globally
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Perform cleanup or other necessary actions
  process.exit(1); // Exit the process with a non-zero exit code
});

// Example of an uncaught exception
setTimeout(() => {
  throw new Error('This is an uncaught exception');
}, 1000);
```

# Child process in node
- Child processes are separate instances of the Node.js runtime that can execute code independently of the parent process.
- They are useful for running multiple instances of a Node.js application or executing external commands.

## Key Features
- **1 Separate Memory Space**: Each child process runs in its own memory space.
- **2 Inter-Process Communication (IPC)**: Communication between the parent and child processes is done via IPC channels.
- **3 Use Cases**: Suitable for running external commands, executing scripts, or running multiple instances of a Node.js application.

## Way to create child process
### Exec
- The exec() function in Node.js creates a new shell process and executes a command in that shell
- The output of the command is kept in a buffer in memory, which you can accept via a callback function passed into exec().
- Stores small amount of data due to buffer

```
const { exec } = require('child_process');

exec('ls -lh', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});
```
### execFile
- Similar to exec but execute shell file command instead of raw command
- Output is stored in buffer memory similar to exec
- Stores small amount of data due to buffer
```
const { execFile } = require('child_process');
//cmnd is file name contains command
execFile(__dirname + '/cmnd.sh', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});
```

### spawn()
- This function returns data via the stream API.
- Therefore, to get the output of the child process, we need to listen for stream events.
- with spawn(), all arguments to commands must be entered in the array.
- That’s because spawn(), unlike exec() and execFile(), does not create a new shell before running a process. 

```
const { spawn } = require('child_process');

const child = spawn('find', ['.']);

child.stdout.on('data', (data) => {
  console.log(`stdout:\n${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

child.on('error', (error) => {
  console.error(`error: ${error.message}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```
### fork()
- Node.js provides the fork() function, a variation of spawn(), to create a child process that’s also a Node.js process.
- The main benefit of using fork() to create a Node.js process over spawn() or exec() is that fork() enables communication between the parent and the child process.
- With fork(), in addition to retrieving data from the child process, a parent process can send messages to the running child process. Likewise, the child process can send messages to the parent process.
-  In Node.js, forking enables the generation of separate instances of the Node.js process, each capable of running independently. 
- inter-process communication (IPC) mechanisms to exchange messages between parent and child processes.

```
const { fork } = require('child_process');
const path = require('path');


console.log('Main process started');

// Fork a new child process
const child = fork(path.join(__dirname, 'forkChild.js'));

//send mes to child process
child.send('start');

//listen for messages from child process
child.on('message', (message) => {
    //return blockingFn result
    console.log('Message from child:', message);
});

// Handle child process exit
child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
 });

console.log('Main process ended');
```

```
//forkChild.js

const { blockingFn } = require("./blocking");

console.log('Fork Child process started');

//listen for messages from parent process
process.on('message', (message) => {
    const count = blockingFn();
    //send to parent process
    process.send(count);
});
```

# Child Process vs Worker Thread in Node.js
- Worker threads and child processes both allow for parallel execution in Node.js, but they have different characteristics and use cases
- By leveraging worker threads, you can achieve better performance and resource utilization for CPU-intensive tasks in your Node.js applications.

## 1. Shared Memory Space
- **Worker Threads**: 
  - Worker threads share the same memory space as the main thread.
  - This allows for faster communication and data sharing between threads without the need for serialization and deserialization.
- **Child Processes**: Each child process runs in its own memory space, requiring inter-process communication (IPC) for data exchange, which can be slower and more resource-intensive.


## 2. Lower Overhead
- **Worker Threads**: 
  - Since worker threads run within the same process, they have lower overhead compared to child processes. There is no need to create a new process, which involves additional memory and CPU resources.
- **Child Processes**: Creating a new process involves significant overhead, including memory allocation and CPU time for process management.

## 3.  Efficient for CPU-Intensive Tasks
- **Worker Threads**: 
  - Worker threads are ideal for CPU-intensive tasks such as data processing, image manipulation, and complex calculations.
  -  They can perform these tasks without blocking the main event loop, ensuring that the application remains responsive.
- **Child Processes**: While child processes can also handle CPU-intensive tasks, the overhead of process creation and IPC can make them less efficient for such tasks.

## 4.  Efficient for CPU-Intensive Tasks
- **Worker Threads**: 
  - Communication between the main thread and worker threads is done via message passing using the postMessage and onmessage methods. This is simpler and more efficient than IPC.
- **Child Processes**:  Communication between parent and child processes requires IPC mechanisms such as pipes or message channels, which can be more complex to implement and manage.

##  5. Better Resource Utilization
- **Worker Threads**: 
  -  Since worker threads share the same memory space, they can utilize resources more efficiently. This can lead to better performance and lower memory usage.
- **Child Processes**:  Each child process has its own memory space, leading to higher memory usage and potentially less efficient resource utilization.


# Buffer
- Buffer class is used to handle binary data directly
- Buffers are particularly useful when dealing with raw binary data, such as reading files, handling network packets, or working with binary protocols.
- Buffers allow you to work with raw binary data.
- Buffers have a fixed size, which is specified when they are created.
- Buffers are implemented in C++ and optimized for performance.

# Buffer remain metod (todo) 
Buffer.alloc()
buf.write()

## Creating Buffers

```
// 1. From a String
const buf = Buffer.from('Hello, World!', 'utf8');
console.log(buf); // <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21>

//2. From an Array
const buf = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
console.log(buf.toString()); // Hello

//3. Allocating a Buffer
const buf = Buffer.alloc(10); // Creates a buffer of length 10, filled with zeros
console.log(buf); // <Buffer 00 00 00 00 00 00 00 00 00 00>

//3. Write to buffer
buf.write('Hello, world!', 0, 'utf-8') 

```
## What are some common use cases for using buffers in Node.js?
todo

# streams
- Streams are a powerful feature in Node.js that allow you to handle data efficiently, especially when dealing with large amounts of data.
- They provide a way to work with data incrementally, rather than loading everything into memory at once. 
- This makes streams ideal for I/O-bound applications, such as reading and writing files, handling HTTP requests and responses, and processing data from network connections.

## Types of Streams
**1 Readable Streams**: Used for reading data.
```
const fs = require('fs');
const readableStream = fs.createReadStream('input.txt', {encoding: 'utf8'});
readableStream.on('data', (chunk) => {
  console.log(chunk.toString());
});
readableStream.on('end', () => {
  console.log('end');
});
readableStream.on('error', (error) => {
  console.error(error, ' .......error');
});
```
**2 Writable Stream**s: Used for writing data.
```
const fs = require('fs');
const writeableStream = fs.createWriteStream('output.txt', {encoding: 'utf8'}); 
writeableStream.write('Hello, World!');
writeableStream.write('Another line');
writeableStream.end(() => {
    console.log('Finished writing data');
})
writeableStream.on('error', (error) => {
    console.error(error, ' .......error');
});
```
**3 Duplex Streams**: Can be both readable and writable.
- //todo code sample

**4 Transform Streams**: A type of duplex stream that can modify or transform the data as it is read and written.
- //todo code sample

## Piping Streams
- Piping is a mechanism to connect the output of one stream to the input of another stream
- This is commonly used to read data from a source and write it to a destination.
```
const fs = require('fs');
const readableStream = fs.createReadStream('input.txt', {encoding: 'utf8'});
const writeableStream = fs.createWriteStream('output.txt', {encoding: 'utf8'});
readableStream.pipe(writeableStream);
readableStream.on('end', () => {
    console.log('readin end');
});
readableStream.on('error', (error) => {
    console.error(error, ' .......error');
});
writeableStream.on('error', (error) => {
    console.error(error, ' .......error');
});
writeableStream.on('finish', () => {
    console.log('Finished writing data');
});
```
## Common Use Cases of streams
- Reading and writing files
- Handling HTTP requests and responses
- Processing data from network connections
- Streaming data from databases

# Handling Backpressure in Node.js Streams
- Backpressure is a condition that occurs when the writable side of a stream cannot process data as quickly as the readable side can produce it.
-  This can lead to memory issues and degraded performance if not handled properly. 
- Node.js streams provide mechanisms to handle backpressure efficiently.

# Stream Chaining in Node.js
- Stream chaining is a powerful feature in Node.js that allows you to connect multiple streams together, passing data from one stream to the next. 
-  This is particularly useful for processing data through a series of transformations or operations. Stream chaining is typically achieved using the pipe method.

- todo code

# Node Js data type
- **Primitive Data Types**: String, Number, Boolean, Undefined, Null, Symbol, BigInt.
- **Object Data Types**: Object, Array, Function, Buffer.

# Handling errors in Node.js applications
## try catch
```
try {
  // Synchronous code that may throw an error
  const result = someFunction();
  console.log(result);
} catch (error) {
  console.error('Error occurred:', error.message);
}
```

## Callbacks
```
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error occurred:', err.message);
    return;
  }
  console.log(data);
});
```

## Promises, .catch() to handle errors
```
someAsyncFunction()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error('Error occurred:', error.message);
  });
```

## Centralized Error Handling (error handling middleware )
```
  app.use((err, req, res, next)=>{
  console.error('Error occurred:', err.message);
    res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  })
```

## Handling Uncaught Exceptions and Unhandled Rejections
```
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  // Perform cleanup and exit the process
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason.message);
  // Perform cleanup and exit the process
  process.exit(1);
});
```

# Glbal objects in Node Js
 - Buffer
 - Global
 - Process
 - Console

# Not Found Route
 - When a user requests a route that does not exist, the server should respond with a 404 status code and a meaningful message.

```
  // Handle 404 - Not Found
  app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
  });
``` 
## or
```
// Wildcard route to handle 404 errors
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

```
# Secure node js app
- **Use HTTPS**: Encrypt data transmitted between the client and server.
- **Validate and Sanitize Input**: Prevent injection attacks by validating and sanitizing user input.
- **Use Helmet**: Secure your Express app by setting various HTTP headers.
- **Implement Rate Limiting**: Prevent brute-force and DoS attacks.
- **Secure Cookies**: Set secure and HTTP-only flags on cookies.
- **Use Environment Variables**: Store sensitive information in environment variables.
- **Keep Dependencies Updated**: Regularly update your dependencies.
- **Use a Web Application Firewall (WAF)**: Protect your application from common web exploits.


# Using Node.js Cluster Module
- The Node.js Cluster module allows you to create child processes (workers) that share the same server port, enabling you to take advantage of multi-core systems.
- This can significantly improve the performance and scalability of your Node.js applications.

## Cluster Module:
Use the Cluster module to leverage multiple CPU cores by forking worker processes.

## Master Process:
Manages worker processes and handles their lifecycle.

## Worker Processes: 
Run the actual server code and share the same server port.

## Fault Tolerance:
Automatically restart worker processes if they crash.

## Centralized Error Handling: 
Use middleware to handle errors centrally.

## Uncaught Exceptions and Unhandled Rejections:
Handle these globally to ensure the application exits gracefully.


```
const cluster = require('cluster')
const http = require('http');
const os = require('os')

if(cluster.isMaster) {
  const numCpus = os.cpus().length;

  for(let i=0; i<numCpus; i++){
    cluster.fork()
  }

    cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Optionally, you can restart the worker
    cluster.fork();
  });

} else {
// Workers can share any TCP connection
  // In this case, it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello, world!\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

# Middleware in Node.js
- Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

- Middleware functions can read and modify the request and response objects.

- Middleware functions can end the request-response cycle or pass control to the next middleware function using next().

- Multiple middleware functions can be stacked to handle different aspects of the request-response cycle.

## Application-Level Middleware: 
Bound to an instance of the Express application using app.use() or app.METHOD().

## Router-Level Middleware:
Bound to an instance of express.Router().

## Error-Handling Middleware:
Defined with four arguments and used to handle errors.

## Built-In Middleware:
Provided by Express, such as express.static and express.json.

## Third-Party Middleware: 
Middleware provided by third-party libraries, such as body-parser and morgan.


# app.all
# SIGINT, SIGTERM
# node js advantages over java
# package.json, package-lock.json











