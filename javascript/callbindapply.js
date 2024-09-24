const data = {
    name: "John Doe",
    city: "New York",
    userInfo: function(country) {
        return `My name is ${this.name} and I live in ${this.city} From ${country}`;
    }
}

console.log(data.userInfo()); // My name is John Doe and I live in New York

//call
const data1 = {
    name: "Sara Doe",
    city: "London"
}

console.log(data.userInfo.call(data1, "UK")); // My name is Sara Doe and I live in London From UK

//apply
const data2 = {
    name: "Doe",
    city: "Paris"
}
console.log(data.userInfo.apply(data2, ["France"])); // My name is Doe and I live in Paris From France

//bind
const data3 = {
    name: "Sam",
    city: "berkley"
}
const binded = data.userInfo.bind(data3, "USA");
console.log(binded()); // My name is Sam and I live in berkley From USA

