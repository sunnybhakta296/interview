const {parentPort}= require('worker_threads')

console.log('Worker thread start');

// Perform a CPU-intensive task
let sum = 0;
for (let i = 0; i < 1e9; i++) {
  sum += i;
}

// Send the result back to the main thread
parentPort.postMessage(`Sum is ${sum}`);

console.log('Worker thread end');