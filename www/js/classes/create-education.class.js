class createEducation {

  constructor(educationid, educationname, start, end, createdby){
    // Test communication with the server
    // through the Students and Employees objects

    var mem = {}
	console.log("Called create education class.");

	
	if(!educationid.length == 5){
		var message = "Education ID must include 4 characters.";
		$("#errMsg-skapautbildning").append(message);
		$("#showErrMessage").show();

		console.log("#1 ERROR CREATING EDUCATION");
		
	/*
	}else if(start > end){

		var message = "Starttiden måste vara före sluttiden.";
		$("#errMsg-skapautbildning").append(message);
		$("#showErrMessage").show();
		console.log("#2 ERROR CREATING EDUCATION");
	*/	
	} else if(educationid.length && educationname.length && start && end && createdby.length){
		// 
		function educationCreated(education){
			// the education is created or an error
			if(!education._error){
				// education is created what now?
				log("RETURN SUCCESS", education)
				
			}else {
				// report back to DOM/GUI
				log("EDUCATION NOT CREATED", education._error)
			}
		}
		
		Education.create({
			education_code: educationid,
			education_name: educationname,
			start: start,
			end: end,
			admin: createdby,
			applyers_teachers: ["test"],
			applyers_students: ["test"],
			teachers: ["test"],
			students: ["test"]
		}, educationCreated);
		
	}else{
		var message = "Please submit the form correctly."
		$("#errMsg-skapautbildning").append(message);
		$("#showErrMessage").show();
		
		console.log("#3 ERROR CREATING EDUCATION");
	}

    // Log
    var logMem = [];
    function log(explanation,result){
      console.log(explanation,result);
      logMem.push({explanation: explanation, result: result});
    }
  }
}