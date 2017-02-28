console.log("education file loaded");
module.exports = class Education {

	schema(){
		return {
		  education_code: {type: String, required: true},
		  education_name: {type: String, required: true},
		  start: {type: String, required: true},
		  end: {type: String, required: true},
		  admin: {type: String, required: true}
		}
	}
  
  	putAccess(user,req){

		// temporarily allow everything
		return true;
	}
}
