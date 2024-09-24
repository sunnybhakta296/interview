console.log('Without I/O cycle')

setImmediate(() => {
    console.log('Immediate 1')
})

//timer phase has higher check so it will be executed first
setTimeout(() => {
    console.log('Timeout 1')
}, 0)


/**
 Without I/O cycle
Timeout 1
Immediate 1 
 */