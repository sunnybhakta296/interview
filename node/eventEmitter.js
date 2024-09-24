const EventEmitter = require('events');
const emitter = new EventEmitter();

const messaeEventandler = (arg) => {
    console.log('Listener called', arg);
}

//Listening to Events
emitter.on('messageLogged', messaeEventandler);

//Emitting Events
emitter.emit('messageLogged', 600)