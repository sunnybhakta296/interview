console.log(a)
let a = 10

// VM335:1 Uncaught ReferenceError: a is not defined
//     at <anonymous>:1:13


const b;
b=5
// Uncaught SyntaxError: Missing initializer in const declaration


const c=5
c=6
// VM344:9 Uncaught TypeError: Assignment to constant variable.
//     at <anonymous>:9:2