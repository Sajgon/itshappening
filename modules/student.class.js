console.log("students file loaded");
module.exports = class Student extends User {

  schema(){
    return Object.assign({},super.schema(),{
      name: {type: String, required: true},
      age: {type: Number, min:0, max:30, required:true},
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
      }
    });
  }

  populate(){
    return 'employee';
  }

  speak(){
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    return greeting;
  }

}