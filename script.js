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