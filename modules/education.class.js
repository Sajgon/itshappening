console.log("education file loaded");
module.exports = class Education {

  schema(){
    return {
      education_code: {type: String, required: true},
      education_name: {type: String, required: true},
      start: {type: Number, required: true},
      end: {type: Number, required: true},
      admin: {type: String, required: true}
    };
  }

  putAccess(user,req){

    // temporarily allow everything
    return true;

    var searchOrId = req.url.split('education/')[1];

    // allow an Admin to update all Owners
    if(user && user.role == "Employee"){
      return true;
    }

    // only allow a Owner to update her/himself - not other owners
    if(user && user.role == "Employee" && searchOrId == user._id){
      return true;
    }

    return false;
  }

}
