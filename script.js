// Accessor properties are represented by “getter” and “setter” methods.

let user = {
    name: "Smith",
    surname: "Cooper",

    get fullname(){
        return `${this.name} ${this.surname}`
    },

    set fullname(value){
       [this.name, this.surname] = value.split(" ")
    }
    
}

// We don’t call user.fullName as a function, we read it normally: 
// the getter runs behind the scenes.
console.log(user.fullname) // Smith Cooper

// set fullName is executed with the given value.
user.fullname = "Sodiq Ganiyu"

console.log(user.fullname) // Sodiq Ganiyu


// SMARTER GETTER/SETTER

let user2 = {
    get name(){
        return this._name
    },
    set name(value){
        if(value.length < 4){
            console.log(`Name is too short`)
            return
        }
       this._name = value
    }
}

user2.name = "Niyi"


// USING FOR COMPATIBILITY

// Imagine we started implementing user objects using data properties 
// name and age:

function UserT(name, age){
    this.name = name
    this.age = age
}

let john = new UserT("John", 25)

console.log(john.age) // 25

// …But sooner or later, things may change. 
// Instead of age we may decide to store birthday, 
// because it’s more precise and convenient:

function User(name, birthday){
    this.name = name
    this.birthday = birthday
}

john = new User("john", new Date(1993, 6, 1))

console.log(john.birthday) // Thu Jul 01 1993 00:00:00 GMT+0100 (West Africa Standard Time)

// Now what to do with the old code that still uses age property? 
// We can try to find all such places and fix them, 
// but that takes time and can be hard to do if 
// that code is used by many other people. And besides, 
// age is a nice thing to have in user, right?

// Let’s keep it.

// Adding a getter for age solves the problem:

function User(name, birthday){
    this.name = name,
    this.birthday = birthday

    // age is calculated from the current date and birthday

    Object.defineProperty(this, "age", {
        get(){
            let thisYear = new Date().getFullYear()
            return thisYear - this.birthday.getFullYear()
        }
    })
}

john = new User("John", new Date(1992, 4, 20))

console.log(john.age) // 33

console.log(john.birthday) // Wed May 20 1992 00:00:00 GMT+0100 (West Africa Standard Time)




// WHAT IS A CLASS
// In object-oriented programming, a class is an extensible program-code-template 
// for creating objects, providing initial values for state (member variables) 
// and implementations of behavior (member functions or methods).

// code template that spits out objects, it gives the first variables and methods for the obj

// function constructors do this same thing
// function UserC(name, age){
//     const obj = {} // this is hidden by deaault in fn constructors
//     this.name = name
//     this.age = age
//     return obj // and this too is hidden by deaault in fn constructors
// }

// let johnny = new UserC("John", 25) // john = {name = "John", age = 25}
// let waliu = new UserC("Waliu", 12) // waliu = {name = "Waliu", age = 12}
// console.log(waliu.age) // 12

// basix syntax

class Yourclass {
    constructor(){}
    method(){}
    anotherMethod(){}
    andAnotherMethod(){}
}

// the constructor method is executed by default when the class is called
// so constructor() is use to initialize the obj variable


// basic example
class Userclass{
    constructor(name){
        this.name = name 
    }
    sayHi(){
        console.log(this.name)
    }
}

let newUser = new Userclass("Wale")

newUser.sayHi() // Wale

// when we called 'new Userclass("Wale")' 
// a new object is created and stored in 'user'
// and this new object contains all the methods in the class
// the constructor object is executed upon calling the class with 'new Userclass("Wale")'

// the class decalration looks like object literal BUT it is not
// so the methods must not be separated with comma (,)
// else you will get sysntax error


// SO WHAT EXACTLY IS A CLASS?

// class is a special kind of function
console.log(typeof Userclass) // function

// when the class is called,
// 1- It creates a function named Userclass, 
// The function becomes the result of the class declaration. 
// The function code is taken from the constructor method 
// so more precisely, the constructor method
// (assumed empty if we don’t write such method).
// the class === the constructor method
// check if the content of Userclass is same as the content in Userclass.prototype.constructor
console.log(Userclass === Userclass.prototype.constructor) // true
// check if the content of Userclass is same as the content in Userclass.prototype.sayHi
console.log(Userclass === Userclass.prototype.sayHi) // false

// 2- Stores all other methods, such as sayHi in our sample above, in Userclass.prototype.
console.log(Userclass.prototype.sayHi) // sayHi(){ console.log(this.name) }

// 3- Everything in the class declaration are properties of our class
console.log(Object.getOwnPropertyNames(Userclass.prototype)) //  ['constructor', 'sayHi']
