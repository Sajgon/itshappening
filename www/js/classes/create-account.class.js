class createAccount {

  constructor(mail, pass, personal, usertype, fname, lname){
    // Test communication with the server
    // through the Students and Employees objects

    var mem = {}
	
	if(mail.length && pass.length && personal.length && fname.length && lname.length && usertype){
		
		
		// 
		function accountCreated(student){
			// the student is created or an error
			// because the username is taken
			if(!student._error){
				// student is created what now?
				// auto login?
				console.log("HERE")
				log("RETURN SUCCESS", student)
				Login.create({
					username: mail,
					password: pass
				},isLoggedIn);
			}
			else {
				// report back to DOM/GUI
				log("STUDENT NOT CREATED", student._error)
				
				if(student._error && student._error.errors && student._error.errors.name && student._error.errors.name.message){
					if(student._error.errors.name.message == "Path `username` is not unique"){
						$("#errorMessage").html("Användarnamnet är redan använt.");
						$("#errorMessage").show();
					}
				}else {
					$("#errorMessage").html("Formuläret är fel inskrivet.");
					$("#errorMessage").show();
				}
			}
		}
		
		if(usertype == "student"){
			// try to create a new Student
			Student.create({
				username: mail,
				password: pass,
				fname: fname,
				lname: lname,
				personal: personal
			},accountCreated);
			
		}else if(usertype = "teacher"){
			// try to create a new Teacher
			Employee.create({
				username: mail,
				password: pass,
				fname: fname,
				lname: lname,
				personal: personal
			},accountCreated);
		}
	}

    // Log
    var logMem = [];
    function log(explanation,result){
      console.log(explanation,result);
      logMem.push({explanation: explanation, result: result});
    }
  }
}