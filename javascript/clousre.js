// basic closure example
function outerFunction() {
    var outerVariable = "I am outside!";
    function innerFunction() {
        console.log(outerVariable);
    }
    return innerFunction;
}

var myInnerFunction = outerFunction();
myInnerFunction(); // "I am outside!"

// closure for data privacy
function createCounter() {
    let count = 0
    return {
        increment() { 
            count++
            return count
         },
        decrement() { 
            count--
            return count
         },
        value() { return count }
    }
}

const counter = createCounter()
console.log(counter.increment()) // 1
console.log(counter.increment()) // 2
console.log(counter.decrement()) // 1
console.log(counter.value()) // 1


//Example: Stateful Functions
function createAdder(x) {
  return function (y) {
    return x + y;
  };
}

console.log(createAdder(5)(2)); // 7
