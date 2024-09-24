let b=100

{
    var a=1
    let b=2
    const c=3

    console.log(a) // 1
    //it Shadowing parent b
    console.log(b) // 2
    console.log(c) // 3
}

console.log(a) // 1
console.log(b) // 100










