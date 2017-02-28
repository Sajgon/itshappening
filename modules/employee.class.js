console.log("employees file loaded");
module.exports = class Employee extends User {

  schema(){
    return Object.assign({},super.schema(),{
      fname: {type: String, required: true},
      lname: {type: String, required: true},
      personal: {type: Number, min:190001010000, max:202001010000, required:true},
	  verified: {type: Boolean, required: true},
	  pendingVerification: {type: Boolean, required: true},
	  admin: {type: Boolean, required: true}
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
    if(user && user.admin == true){
      return true;
    }

    // only allow a Owner to update her/himself - not other owners
    if(user && user.role == "Employee" &&  searchOrId == user._id){
      return true;
    }

    return false;
  }

}