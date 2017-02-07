class createAccount {

  constructor(mail, pass, personal, usertype, fname, lname){
    // Test communication with the server
    // through the Students and Employees objects

    var mem = {}
	
	if(mail.length && pass.length && personal.length && fname.length && lname.length && usertype){
		
		
		
		if(usertype == "student"){
			
			// try to create a new student
			Student.create({
				username: mail,
				password: pass,
				fname: fname,
				lname: lname,
				personal: personal
			},studentCreated);
			
			
			// 
			function studentCreated(student){
				// the student is created or an error
				// because the username is taken
				if(!student._error){
					// student is created what now?
					// auto login?
					log("RETURN SUCCESS", student)
					Login.create({
						username: mail,
						password: pass
					},loggedIn);
				}
				else {
					// report back to DOM/GUI
					log("STUDENT NOT CREATED", student._error)
					
					if(student._error.errors.username.message){
						if(student._error.errors.username.message == "Path `username` is not unique"){
							$("#errorMessage").html("Användarnamnet är redan använt.");
							$("#errorMessage").show();
						}
					}else {
						$("#errorMessage").html("Formuläret är fel inskrivet.");
						$("#errorMessage").show();
					}
					
				}
			}
			
			
		}else if(usertype = "teacher"){
			console.log("Try create a teacher ..");
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