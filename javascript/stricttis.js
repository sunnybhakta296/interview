'use strict';

console.log(this); // Window

function x() {
  console.log(this); // Window
}

//this substitution
// if value of this keyword is null or undefined, 
//it will be replaced with global object in non strict mode
x() //undefined due to use strict

//this value depend on how function is called
window.x() // this will be window object
this.x() // this will be window object