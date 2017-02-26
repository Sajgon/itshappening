// Create som new rest entitites
// (also see classes/rest-entity.class.js)
var Student = new RestEntity('student');
var Employee = new RestEntity('employee');
var NewsPost = new RestEntity('newspost');
var Login = new RestEntity('login');
var sessionid = "";


start();

// Start the app
function start(){
  	// Wait for DOM ready
	$(()=>{
  		// SKAPA EN TEMPLATE ADMIN KONTO
		var newAdmin = new createAccount("admin@itshappening.com", "123", 198001011010, "teacher", "Ad", "Min");
		console.log(newAdmin);
  	});
}


function viewLoginAccount(){
	$("#firstView").hide();
		$("#formInputs").show();
		$("#personal").hide();
		$("#loginAccountBtn").show();
		$("#newAccountBtn").hide();
		$("#usrtype").hide();
		$("#formTitle").html("Logga in");
}

function viewCreateAccount(){
	$("#firstView").hide();
		$("#formInputs").show();
		$("#personal").show();
		$("#loginAccountBtn").hide();
		$("#newAccountBtn").show();
		$("#usrtype").show();
		$("#formTitle").html("Skapa Konto");
}

function firstIndexView(){
	
	$(".firstView").show();
	
	$("#viewLoginFormBtn").click(function() {
		viewLoginAccount();
	});

	$("#viewNewAccountFormBtn").click(function() {
		viewCreateAccount();
	});
	
	$("#newAccountBtn").click(function(){
		console.log("Create account button pressed.");
		$("#errorMessage").hide();
		
		var mailadrs = $("#mail").val();
		var userpass = $("#password").val();
		var personal = $("#personalInput").val();
		var usertype = $("input[name=usertype]:checked").val();
		
		var newAccount = new createAccount(mailadrs, userpass, personal, usertype, "test", "test");
		console.log(newAccount);
	});
	
	$("#loginAccountBtn").click(function(){
		console.log("Login account button pressed.");
		$("#errorMessage").hide();
		
		var username = $("#mail").val();
		var userpassword = $("#password").val();
		//var usertype = $("input[name=usertype]:checked").val();
		
		tryLogin(username, userpassword);
		
	});
}


function findStudentByUsername(username, callback){
	console.log("finding student: ", username);
	Student.find('find/{username:"'+username+'"}', function(result){
		console.log(result);
		callback(result);
	});
};

function findEmployeeByUsername(username, callback){
	Employee.find('find/{username:"'+username+'"}', function(result){
		callback(result);
	});
};


function tryLogin(usrn, pass){
	
	
	function tryCreateSession(usrn, pass){
		console.log("trying to create a session...");
		Login.create({
			username: usrn,
			password: pass
		},userFind);		
	}

	function userFind(result){
		console.log("result login");
		console.log(result);
		
		/*
		console.log("usertypes");
		console.log(usertype);
		console.log(result.user.role);
		*/
		
		//if(usertype == result.user.role){
			if(result.status == "logged in succesfully"){
				window.location.href = "/";
			}else if(result.status == "wrong credentials"){
				$("#errorMessage").html("Användarnamnet eller lösenordet är fel.");
				$("#errorMessage").show();
			}
		//}
	}
	
	// First try to find the username in Students
	findStudentByUsername(usrn, function(result){
		console.log("get student username:");
		console.log(result);
		user = result[0];
		if(user){
			tryCreateSession(usrn, pass);
		}else{
			// Second try to find the username in employees
			findEmployeeByUsername(usrn, function(result){
				console.log("get employee username:");
				user = result[0];
				console.log(user);
				
				if(user){
					console.log("username found...");
					if(user.verified == true){
						console.log("You are verified, now try create a session..");
						tryCreateSession(usrn, pass);
					}else if(user.verified == false){
						console.log("You are not verified");
						if(user.pendingVerification == true){
							$("#errorMessage").html("Vänligen vänta på att en administratör godkänner ditt konto.");
							$("#errorMessage").show();
							viewLoginAccount();
						}else if(user.pendingVerification == false){
							$("#errorMessage").html("Tyvärr har ditt konto blivit nekad av administratör.");
							$("#errorMessage").show();
						}
					}
				}else{
					$("#errorMessage").html("Tyvärr är ditt användarnamn fel.");
					$("#errorMessage").show();
				}
				
			});
		}
	});

}



