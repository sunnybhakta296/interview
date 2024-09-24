const arr = [1, 2, 3, 4, 5];

const reduce = arr.reduce((acc, curr) => {
    return acc + curr;
},0)

console.log(reduce); // 15