// Create som new rest entitites
// (also see classes/rest-entity.class.js)
var Student = new RestEntity('student');
var Employee = new RestEntity('employee');
var NewsPost = new RestEntity('newspost');
var Education = new RestEntity('education');
var Login = new RestEntity('login');
var sessionid = "";


start();

// Start the app
function start(){
	isLoggedIn();
}



// not used
function loggedIn(result){
	//console.log(result);
	processLogin(true);
}


function isLoggedIn(){
	Login.find(function(result){
		// console.log(result);
		sessionid = result.user._id;
	if(result.status == "logged in"){
			// console.log(result.status);
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
			window.location.href = "/";	
		}else if(pageName == "main_page"){
			// nothing happens
		}
	}else{
		
		// user NOT LOGGED IN
		if(pageName == "main_page"){
			window.location.href = "/login";	
		}else if(pageName == "index"){
			// nothing happens
			firstIndexView();
		}	
	}
}





function deleteAccountById(id){
	
	Student.find(id, findStudent);     
	
	function findStudent(student){
		//console.log(student);
		if (student._id){
			// Delete a student
			Student.delete(student._id,accountDeleted);
		}else{
			// Look for an employee
			Employee.find(id, findEmployee);   
		}
	}
	
	function findEmployee(employee){
		//console.log(employee);
		if (employee._id){
			// Delete a student
			Employee.delete(employee._id, accountDeleted);
		}else{
			// _id not found.
			//console.log("The user ID you tried to delete does not exist.");
		}
	}
	
	function accountDeleted(result){
		//console.log("The account has been deleted succefully.");
	}
}

function deleteAllStudents(){
	findAllStudents(function(students){
		for(var i = 0; i < students.length; i++){
			deleteAccountById(students[i]._id);
		}
	});
}

function deleteAllEmployees(){
	findAllEmployees(function(employees){
		for(var i = 0; i < employees.length; i++){
			deleteAccountById(employees[i]._id);
		}
	});
}

function deleteAllEducations(){
	findAllEducations(function(educations){
		for(var i = 0; i < educations.length; i++){
			Education.delete(educations[i]._id, function(result){
				// education educations[i]._id deleted
			});
		}
	});
}

function deleteAllPosts(){
	findAllPosts(function(posts){
		//console.log(posts);
		for(var i = 0; i < posts.length; i++){
			NewsPost.delete(posts[i]._id, function(result){
				// posts[i]._id deleted
			});
		}
	});
}

function findAllEmployees(callback){
	Employee.find('find/{fname:/.*/}', function(result){
		//console.log(result);
		callback(result);
	});
}
