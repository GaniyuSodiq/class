let user = {
    name: "Smith",
    surname: "Cooper",

    get fullname(){
        return `${this.name} ${this.surname}`
    }
}

// We don’t call user.fullName as a function, we read it normally: 
// the getter runs behind the scenes.
console.log(user.fullname)