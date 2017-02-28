console.log("students.class.js loaded");
module.exports = class Student extends User {

	schema(){
		return Object.assign({},super.schema(),{
			fname: {type: String, required: true},
			lname: {type: String, required: true},
			personal: {type: Number, min:190001010000, max:202001010000, required:true}
		});
	}
	
	putAccess(user,req){

		// temporarily allow everything
		return true;
	}
}