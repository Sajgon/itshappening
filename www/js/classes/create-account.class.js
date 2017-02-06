class createAccount {

  constructor(mail, pass, personal, usertype, fname, lname){
    // Test communication with the server
    // through the Students and Employees objects

    var mem = {}
	
	if(mail.length && pass.length && personal.length && fname.length && lname.length && usertype){
		
		function loggedIn(result){
			console.log(result);
		}
		
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
	
	
    // Output
    function testOutput(){
      $('body').template('header',{appName: 'REST tests'});
      $('body').template('restTestOutput',{results:logMem});
      // syntax highlighting
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }

  }

}