// Create som new rest entitites
// (also see classes/rest-entity.class.js)
var Student = new RestEntity('student');
var Employee = new RestEntity('employee');
var Login = new RestEntity('login');

// Some utility methods for forms
var formHelpers = new FormHelpers();

// Load html templates
// (also see libs/template.jquery.js)
if(loadTemplate){
	$.loadTemplates([
	  'header',
	  'modal',
	  'navbar',
	  'restTestOutput',
	  'tableFromObject',
	  'formFromObject'
	],start);
}else{
	start();
}

// Start the app
function start(){
  // Wait for DOM ready
  $(()=>{
	  
	isLoggedIn();  
	
    // Create the main navbar
    new MainNavbar();
    // Run the rest tests
	if(loadTemplate){
		new RestTests();
	}
  });
}


function loggedIn(result){
	console.log(result);
	processLogin(true);
}

function isLoggedIn(){
	Login.find(function(result){
		if(result.status == "logged in"){
			processLogin(true);
		}else{
			processLogin(false);
		}
	});
}


function processLogin(loggedIn){
	if(loggedIn){
		// user LOGGED in
		if(pageName == "index"){
			
			//window.location.href = "main_page.html";	
		}else if(pageName == "main_page"){
			// nothing happens
		}
	}else{
		// user NOT LOGGED IN
		if(pageName == "index"){
			window.location.href = "main_page.html";	
		}else if(pageName == "main_page"){
			// nothing 
		}	
	}
}


function logOut(){
	Login.delete("",function(result){
		console.log(result)
	})
}

function createAccountView(){
	
	$(".firstView").show();
	
	$("#viewLoginFormBtn").click(function() {
		$("#firstView").hide();
		$("#formInputs").show();
		$("#personal").hide();
		$("#loginAccountBtn").show();
		$("#newAccountBtn").hide();
		$("#formTitle").html("Logga in");
	});

	$("#viewNewAccountFormBtn").click(function() {
		$("#firstView").hide();
		$("#formInputs").show();
		$("#personal").show();
		$("#loginAccountBtn").hide();
		$("#newAccountBtn").show();
		$("#formTitle").html("Skapa Konto");
	});
	
	$("#newAccountBtn").click(function(){
		console.log("Create account button pressed.");
		
		var mailadrs = $("#mail").val();
		var userpass = $("#password").val();
		var personal = $("#personalInput").val();
		var usertype = $("input[name=usertype]:checked").val();
		
		var newAccount = new createAccount(mailadrs, userpass, personal, usertype, "test", "test");
		console.log(newAccount);
	});
	
	$("#loginAccountBtn").click(function(){
		console.log("Login account button pressed.");
		
		var username = $("#mail").val();
		var userpassword = $("#password").val();
		// var usertype = $("input[name=usertype]:checked").val();

		//Loginhandler.find({
		/*Login.find({
			username: username,
			password: userpassword
		}, userFind);*/
		
		Login.create({
			username: username,
			password: userpassword
		},userFind);
		
		function userFind(result){
			console.log("result login");
			console.log(result);
			
			if(result.status == "logged in succesfully"){
				window.location.href = "main_page.html";
			}
		}
	});
}


$( "#skapautbildningbtn" ).click(function() {
  console.log('hej');
});






