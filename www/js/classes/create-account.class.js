class createAccount {

  constructor(mail, pass, personal, usertype, fname, lname){
    // Test communication with the server
    // through the users and Employees objects

    var mem = {}
	
	if(mail.length && pass.length && personal && fname.length && lname.length && usertype.length){
		
		// 
		function accountCreated(user){
			
			console.log(user);
			
			if(!user._error){
				// user is created what now?
				// auto login?
				log("RETURN SUCCESS", user);
				
				if (mail != "admin@itshappening.com"){
					tryLogin(mail, pass);
				}
			}
			else {
				// report back to DOM/GUI
				log("USER NOT CREATED", user._error)
				if (mail != "admin@itshappening.com"){
					if(user._error && user._error.errors && user._error.errors.username && user._error.errors.username.message){
						if(user._error.errors.username.message == "Path `username` is not unique"){
							$("#errorMessage").html("Användarnamnet är upptaget.");
							$("#errorMessage").show();
						}
					}else {
						$("#errorMessage").html("Formuläret är fel inskrivet.");
						$("#errorMessage").show();
					}
				}

				
			}
		}
		
		if(usertype == "user"){
			// try to create a new user
			user.create({
				username: mail,
				password: pass,
				fname: fname,
				lname: lname,
				personal: personal
			},accountCreated);
			
		}else if(usertype = "teacher"){
			var isAdmin = false;
			var isVerified = false;
			var pendingVerification = true;
			if (mail == "admin@itshappening.com"){
				isAdmin = true;
				isVerified = true;
				pendingVerification = false;
			}
			// try to create a new Teacher
			Employee.create({
				username: mail,
				password: pass,
				fname: fname,
				lname: lname,
				personal: personal,
				verified: isVerified,
				pendingVerification: pendingVerification,
				admin: isAdmin
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