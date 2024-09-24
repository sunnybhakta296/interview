//Function statement
function a() {
    console.log("a called");
}

//Function expression, 
var b = function () {
    console.log("b called");
}

// Named FUnction Expression
var m = function xyz() {
    console.log("b called");
}

//Function can be passed as argument
function x(y) {
    y();
}

x(function() {
    console.log("Function passed as argument");
});


//Ability to use function as a value, pass as argument, return as function is know as first class function



