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