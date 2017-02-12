console.log("employees file loaded");
module.exports = class Employee extends User {

  schema(){
    return Object.assign({},super.schema(),{
      fname: {type: String, required: true},
      lname: {type: String, required: true},
      personal: {type: Number, min:190001010000, max:202001010000, required:true},
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