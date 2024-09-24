process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Perform cleanup or other necessary actions
    process.exit(1); // Exit the process with a non-zero exit code
  });
  
  // Example of a promise that will be rejected without a catch handler
  new Promise((resolve, reject) => {
    reject(new Error('This is an unhandled rejection'));
  });