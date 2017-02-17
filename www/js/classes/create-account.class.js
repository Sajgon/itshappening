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
				log("RETURN SUCCESS", student);
				
				tryLogin(mail, pass);
			}
			else {
				// report back to DOM/GUI
				log("USER NOT CREATED", student._error)
				
				if(student._error && student._error.errors && student._error.errors.username && student._error.errors.username.message){
					if(student._error.errors.username.message == "Path `username` is not unique"){
						$("#errorMessage").html("Användarnamnet är upptaget.");
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
				personal: personal,
				verified: false,
				pendingVerification: true,
				admin: false
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