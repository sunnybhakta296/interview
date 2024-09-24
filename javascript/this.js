console.log(this); // Window

function x() {
  console.log(this); // Window
}

//this substitution
// if value of this keyword is null or undefined, 
//it will be replaced with global object in non strict mode
x() // this will be window object

//this value depend on how function is called
window.x() // this will be window object
this.x() // this will be window object

const data = {
    name: 'John',
    printName: function() {
        // this will refer to data object
        console.log(this.name);
    },
    printNameArraow: () => {
        // this will refer to window object
        console.log(this.name);
    },
    trueArrow: function() {
        //enclosing lexical scope will be in this of arrow function
        const j = () => {
            console.log(this.name);
        }
        j();
    }
}
data.printName(); // John
data.printName.call({name: 'Jane'}); // Jane
data.printNameArraow(); // undefined
data.trueArrow(); // John




