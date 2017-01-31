console.log("employees file loaded");
module.exports = class Employee extends User {

  schema(){
    return Object.assign({},super.schema(),{
      name: {type: String, required: true},
      age: {type: Number, required: true, min:0, max:100},
      phoneNumber: {type: String, required: true},
      students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }]
    });
  }

  populate(){
    return 'students';
  }

  putAccess(user,req){

    // temporarily allow everything
    return true;

    var searchOrId = req.url.split('employee/')[1];

    // allow an Admin to update all Owners
    if(user && user.role == "Admin"){
      return true;
    }

    // only allow a Owner to update her/himself - not other owners
    if(user && user.role == "Emoployee" &&  searchOrId == user._id){
      return true;
    }

    return false;
  }

}