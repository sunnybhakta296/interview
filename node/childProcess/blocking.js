exports.blockingFn = function() {
    let counter = 0;
    while (counter < 5000000000) {
      counter++;
    }
  
    return counter;
}