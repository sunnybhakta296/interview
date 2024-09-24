console.log('Process ID:', process.pid);
console.log('Node.js Version:', process.version);
console.log('Platform:', process.platform);

process.stdout.write('Enter your name: ');

process.stdin.on('data', (data) => {
  console.log(`Hello, ${data.toString().trim()}!`);
  process.exit(0);
});