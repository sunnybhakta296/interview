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


