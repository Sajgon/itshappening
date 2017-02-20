// Create som new rest entitites
// (also see classes/rest-entity.class.js)
var Student = new RestEntity('student');
var Employee = new RestEntity('employee');
var NewsPost = new RestEntity('newspost');
var Education = new RestEntity('education');
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
	isLoggedIn();
  
	// Wait for DOM ready
	$(()=>{
		// Run the rest tests
		if(loadTemplate){
			new MainNavbar();  // Create the main navbar
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
			firstIndexView();
		}	
	}
}
function epochToFullDate(epoch){
	var newdate = new Date(epoch);
	var getyear = newdate.getFullYear();
	//month
	var getmonth = newdate.getMonth()+1;
	if ( getmonth < 10) {
		getmonth = "0" + getmonth;
	}
	
	var getday = newdate.getDate();
	if ( getday < 10) {
		getday = "0" + getday;
	}
	
	var gethour = newdate.getHours();
	if (gethour < 10) {
		gethour = "0" + gethour;
	}
	
	var getminute = newdate.getMinutes();
	if (getminute < 10) {
		getminute = "0" + getminute;
	}

	var fulldate = getyear + "-" + getmonth + "-" + getday + " " + gethour + ":" + getminute;
	return fulldate;
}

function epochToDate(epoch){
	var newdate = new Date(epoch);
	var getyear = newdate.getFullYear();
	//month
	var getmonth = newdate.getMonth()+1;
	if ( getmonth < 10) {
		getmonth = "0" + getmonth;
	}
	
	var getday = newdate.getDate();
	if ( getday < 10) {
		getday = "0" + getday;
	}

	var date = getyear + "-" + getmonth + "-" + getday;
	return date;
}









