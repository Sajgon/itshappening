// Create som new rest entitites
// (also see classes/rest-entity.class.js)
var Student = new RestEntity('student');
var Employee = new RestEntity('employee');
var NewsPost = new RestEntity('newspost');
var Login = new RestEntity('login');
var sessionid = "";

// Some utility methods for forms
// var formHelpers = new FormHelpers();

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


// not used
function loggedIn(result){
	console.log(result);
	processLogin(true);
}


function isLoggedIn(){
	Login.find(function(result){
		console.log(result);
		sessionid = result.user._id;
		if(result.status == "logged in"){
			console.log(result.status);
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
			window.location.href = "main_page.html";	
		}else if(pageName == "main_page"){
			// nothing happens
		}
	}else{
		// user NOT LOGGED IN
		if(pageName == "main_page"){
			window.location.href = "index.html";	
		}else if(pageName == "index"){
			// nothing happens
			createAccountView();
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
			}else if(result.status == "wrong credentials"){
				$("#errorMessage").html("Användarnamnet eller lösenordet är fel.");
				$("#errorMessage").show();
			}
		}
	});
}


$(document).ready(function() {
	$( "#allautbildningarbtn" ).click(function() {
	  console.log("Alla utbildningar");
	});

	$( "#minautbildningarbtn" ).click(function() {
	  console.log("Mina utbildningar");
	});
	$( "#skapautbildningbtn" ).click(function() {
	  console.log("Skapa Utbildning");
	});
	$( "#lararebtn" ).click(function() {
	  console.log("Lärare");
	});
	$( "#inlaggbtn" ).click(function() {
	  console.log("Inlägg");
	});
	$( "#visabokningarbtn" ).click(function() {
	  console.log("Visa Bokningar");
	});
	$( "#bokasalbtn" ).click(function() {
	  console.log("Boka Sal");
	});
	$( "#bytlosenordbtn" ).click(function() {
	  console.log("Byt Lösenord");
	});
	$( "#redigerauppgifterbtn" ).click(function() {
	  console.log("Redigera Uppgifter");
	});

	$("#logoutbtn").click(function(){
		logOut();
		isLoggedIn();
	});
});







