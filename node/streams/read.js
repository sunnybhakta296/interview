const fs = require('fs');
const readableStream = fs.createReadStream('input.txt', {encoding: 'utf8'});
readableStream.on('data', (chunk) => {
  console.log(chunk.toString());
});
readableStream.on('end', () => {
  console.log('end');
});
readableStream.on('error', (error) => {
  console.error(error, ' .......error');
});
