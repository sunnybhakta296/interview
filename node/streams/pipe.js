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