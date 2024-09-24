const {Worker} = require('worker_threads');

console.log('Main thread start');

//create new worker
const worker = new Worker('./node/workerthread/worker.js')

//Listen messae from worker
worker.on("message", (message)=>{
    console.log('Message from worker:', message);
})

// Listen for errors from the worker
worker.on('error', (error) => {
    console.error('Worker error:', error);
  });
  
  // Listen for the worker to exit
  worker.on('exit', (code) => {
    console.log('Worker exited with code:', code);
  });

  console.log('Main thread end');