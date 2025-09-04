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

