console.log("students.class.js loaded");
module.exports = class Student extends User {

  schema(){
    return Object.assign({},super.schema(),{
      fname: {type: String, required: true},
      lname: {type: String, required: true},
      personal: {type: Number, min:190001010000, max:202001010000, required:true},
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