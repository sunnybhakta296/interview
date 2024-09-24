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