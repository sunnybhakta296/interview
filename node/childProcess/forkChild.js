const { blockingFn } = require("./blocking");

console.log('Fork Child process started');

//listen for messages from parent process
process.on('message', (message) => {
    const count = blockingFn();
    //send to parent process
    process.send(count);
});