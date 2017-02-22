class createEducation {

  constructor(educationid, educationname, start, end, createdby){
    // Test communication with the server
    // through the Students and Employees objects

    var mem = {}
	console.log("Called create education class.");
	console.log(educationid, educationname, start, end, createdby);

	
	if(!educationid.length == 5){
		var message = "Education ID must include 4 characters.";
		$("#errMsg-skapautbildning").append(message);
		$("#showErrMessage").show();

	}else if(start > end){

		var message = "Starttiden måste vara före sluttiden.";
		$("#errMsg-skapautbildning").append(message);
		$("#showErrMessage").show();
		
	} else if(educationid.length && educationname.length && start && end && createdby.length){
		
		console.log("yes");
		// 
		function educationCreated(education){
			// the education is created or an error
			console.log(education);
			if(!education._error){
				// education is created what now?
				log("RETURN SUCCESS", education)
				
			}
			else {
				// report back to DOM/GUI
				log("EDUCATION NOT CREATED", education._error)
				
			}
		}
		
			Education.create({
				education_code: educationid,
				education_name: educationname,
				start: start,
				end: end,
				applyers_teachers: [],
				applyers_students: [],
				teachers: [],
				students: [],
				admin: createdby
			}, educationCreated);
		
	}else{
		var message = "Please submit the form correctly."
		$("#errMsg-skapautbildning").append(message);
		$("#showErrMessage").show();
	}

    // Log
    var logMem = [];
    function log(explanation,result){
      console.log(explanation,result);
      logMem.push({explanation: explanation, result: result});
    }
  }
}