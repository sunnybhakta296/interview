
// EX0
console.log("=================EX0===================");

const data = {
    name: "John Doe",
    city: ["New York", "London", "Paris"],
    showCity: function() {
        this.city.forEach(function(city) {
            console.log(`${this.name} lives in ${city}`);
        });

        this.city.forEach(city => {
            console.log(`${this.name} lives in ${city}`);
        });

        const that = this;
        this.city.forEach(function(city) {
            console.log(`${that.name} lives in ${city}`);
        });
    }
}

data.showCity(); // undefined lives in New York, undefined lives in London, undefined lives in Paris, John Doe lives in New York, John Doe lives in London, John Doe lives in Paris

console.log("=================EX1===================");

// EX1
function Person(name) {
    this.name = name;
    this.sayName = () => {
        console.log(`In start ${this.name}`);

        setTimeout(function() {
            console.log(`My name is ${this.name}`);
        }, 1000);

        setTimeout(() => {
            console.log(`My name is ${this.name}`);
        }, 1000);

        const that = this;
        setTimeout(function() {
            console.log(`My name is ${that.name}`);
        }, 1000);
    }    
}

const person = new Person("John Doe");
person.sayName(); // In start John Doe, My name is undefined, My name is John Doe
