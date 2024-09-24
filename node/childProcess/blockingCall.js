const { blockingFn } = require("./blocking");

console.log('Main process started');

//this will block the main thread
const result = blockingFn();
console.log('Result:', result);
console.log('Main process ended');