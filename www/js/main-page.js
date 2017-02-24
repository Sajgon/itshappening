


$(function() {

	if(sessionid){
		console.log("Your login/session ID: ");
		console.log(sessionid);
		
		isAdmin(sessionid, function(callback){
			if(callback){
				// ADMIN PERMISSION STUFF
				$("#adminMenu").show();
				$("#rowSkapaInlagg").show();

                $("#newPostBtn").click(function(){

                    var postTitle = $("#postTitle").val();
                    var postContent = $("#postContent").val();

                    epochDate = (new Date).getTime();

                    // try to create a new student
                    NewsPost.create({
                        title: postTitle,
                        content: postContent,
                        for_all: "true",
                        for_education_id: "none",
                        date_posted: epochDate,
                        postedby_id: sessionid
                    },postCreated);

                    function postCreated(post) {
                        console.log("post");
                        console.log(post);
                    }
                });
			}else{
				$("#adminMenu").empty();
				$("#rowSkapaInlagg").empty();
			}
		});

        // set username in top right corner
        findOneStudent(sessionid, "username", function(username){
            if(username){
                $("#drowndown-username").html(username);
            }else{
                //search in emplyee
                findOneEmployee(sessionid, "username", function(username){
                    if(username){
                        $("#drowndown-username").html(username)
                    }
                });
            }
        });
        $("#posts").show();
	}
});


// FUNCTIONS BELOW
function findAllStudents(callback){
	Student.find('find/{fname:/.*/}', function(result){
		//console.log(result);
		callback(result);
	});
}
	
function findAllEmployees(callback){
	Employee.find('find/{fname:/.*/}', function(result){
		//console.log(result);
		callback(result);
	});
}

function findAllEducations(callback){
	Education.find('find/{admin:/.*/}', function(result){
		console.log(result);
		callback(result);
	});
}

// find one student with student ID
function findOneStudent(studentId, requestType, callback){

	Student.find(studentId, function(result){

		if(result){
			if(requestType == "username"){
				callback(result.username);
			}else if(requestType == "fname"){
				callback(result.fname);
			}else if(requestType == "lname"){
				callback(result.lname);
			}else if(requestType == "flname"){
				callback(result.fname + " " + result.lname);
			}else if(requestType == "personal"){
				callback(result.personal);
			}else if(requestType == "object"){
				callback(result);
			}
		}else{

			callback(false);
		}
	});
}

function findOneEmployee(studentId, requestType, callback){

	Employee.find(studentId, function(result){

		if(result){
			if(requestType == "username"){
				callback(result.username);
			}else if(requestType == "fname"){
				callback(result.fname);
			}else if(requestType == "lname"){
				callback(result.lname);
			}else if(requestType == "flname"){
				callback(result.fname + " " + result.lname);
			}else if(requestType == "personal"){
				callback(result.personal);
			}else if(requestType == "object"){
				callback(result);
			}
		}else{

			callback(false);
		}
	});
}

// get 1 post function
function findOnePost(callback){
	NewsPost.find('5899d43204165a3660061eef',viewPosts);
	
	function viewPosts(posts){
        callback(posts);
	}
}


function findAllAdminPosts(){
	
	NewsPost.find('find/{for_all:/true.*/}',printPosts);

}

function printPosts(posts){
    console.log("Posts:");
    console.log(posts);

	if(posts.length){
		for(var p = 0; p < posts.length; p++){
			printPost(posts[p]);
		}	
	}else {
		$("#noposts").html("You have no posts!");
	}
}

function printPost(post){
	//console.log("post", post);
	// title = post.title;
	// content = post.content;
	// fulldate = humanDate(post.date_posted);

	findOneStudent(post.postedby_id, "username", function(username) {
		var postMessage = '<div class="panel panel-default col-xs-12 col-sm-8 paddingfix">' +
							'<div class="panel-heading"><h3 class="panel-title">'+post.title+'</h3></div>' +
							'<div class="panel-body innehall">'+post.content+'</div>' +
							'<div class="panel-footer datum"><span>'+humanDate(post.date_posted)+'</span><span style="float: right">'+username+'</span></div>' +
							'</div>';
		
		$("#posts").append(postMessage);
	});
};


findAllAdminPosts();



function logOut(){
	Login.delete("",function(result){
		console.log(result)
	})
}

function findStudentByUsername(username){
	Student.find('find/{username:/'+username+'/}', function(result){
		console.log(result);
	});
}


var routesToRegister = {};

function addRoute(url,func){
  routesToRegister[url] = func;
}

function registerAllRoutes(){
	new Router(routesToRegister);
} 



$(document).ready(function() {

	addRoute('/',function(){
		$(".pageObj").hide();
		$("#rowSkapaInlagg").show();
		$("#posts").show();
	});

	// Visa alla utbildningar
	addRoute('/alla-utbildningar',function() {
		console.log("Alla utbildningar");
		$(".pageObj").hide();
		$("#rowEducations").show();

		findAllEducations(function(educations){
			
			if(educations.length > 0){
				var educationList = "<thead><tr><th>Utbildningskod</th><th>Utbildningsnamn</th><th>Startar</th><th>Slutar</th></tr></thead>";
				for(var i = 0; i < educations.length; i++){
					educationList += "<tbody>";
					educationList += "<tr id="+educations[i].education_code+">";
					educationList += "<td>"+educations[i].education_code+"</td>";
					educationList += "<td>"+educations[i].education_name+"</td>";
					educationList += "<td>"+educations[i].start+"</td>";
					educationList += "<td>"+educations[i].end+"</td>";
					
					educationList += "</tr>";
					educationList += "</tbody>";
				}
				
				$("#educationtable").empty().append(educationList);

					
				$("#educationtable ").ready(function() {
					$("tr").on('click', function() {
						var educationCodeId = $(this).attr('id');
						getEducationByCode(educationCodeId);
					});
				});
			}else{
				var educationList = "<thead><tr><th>Inga utbildningar registrerade.</th></thead>";
				$("#educationtable").empty().append(educationList);
			}
		});
	});

	//Mina utbildningar
	addRoute('/mina-utbildningar',function() {
		console.log("Mina utbildningar");
		$(".pageObj").hide();
		$("#myEducations").show();

		// Visa mina utbildningar
		
		// roleFunc(sessionid, function(roletype){
			
			getMyData(function(user){
				if(user.educations){
					var educationList = "<thead><tr><th>Utbildningskod</th><th>Utbildningsnamn</th><th>Startar</th><th>Slutar</th></tr></thead>";
					educations = user.educations;
					educationList += "<tbody>";
					for(var i = 0; i < educations.length; i++){
						educationList += "<tr id="+educations[i].education_code+">";
						educationList += "<td>"+educations[i].education_code+"</td>";
						educationList += "<td>"+educations[i].education_name+"</td>";
						educationList += "<td>"+educations[i].start+"</td>";
						educationList += "<td>"+educations[i].end+"</td>";
						educationList += "</tr>";
					}
					educationList += "</tbody>";
					
					$("#myEducationsTable").empty().append(educationList);
						
					$("#myEducationsTable").ready(function() {
						$("tr").on('click', function() {
							var educationCodeId = $(this).attr('id');
							getEducationByCode(educationCodeId);
						});
					});
				}else{
					var educationList = "<thead><tr><th>Inga utbildningar registrerade.</th></thead>";
					$("#myEducationsTable").empty().append(educationList);
				}
			});
		//});
		
		findAllEducations(function(educations){
			
			if(educations.length > 0){
				var educationList = "<thead><tr><th>Utbildningskod</th><th>Utbildningsnamn</th><th>Startar</th><th>Slutar</th></tr></thead>";
				for(var i = 0; i < educations.length; i++){
					educationList += "<tbody>";
					educationList += "<tr id="+educations[i].education_code+">";
					educationList += "<td>"+educations[i].education_code+"</td>";
					educationList += "<td>"+educations[i].education_name+"</td>";
					educationList += "<td>"+educations[i].start+"</td>";
					educationList += "<td>"+educations[i].end+"</td>";
					
					educationList += "</tr>";
					educationList += "</tbody>";
				}
				
				$("#educationtable").empty().append(educationList);
					
				$("#educationtable ").ready(function() {
					$("tr").on('click', function() {
						var educationCodeId = $(this).attr('id');
						getEducationByCode(educationCodeId);
					});
				});
			}else{
				var educationList = "<thead><tr><th>Inga utbildningar registrerade.</th></thead>";
				$("#educationtable").empty().append(educationList);
			}
			
		});
	});

	
	
	
	
	
	addRoute('/sok-utbildningar',function()  {
		console.log("Sök Utbilnding");
		$(".pageObj").hide();
		$("#searchfield").show();


	});


	addRoute('/skapa-utbildning',function() {
	  console.log("Skapa Utbildning");
	  $(".pageObj").hide();
	  $("#rowSkapaUtbildning").show();
	});

	// När man som admin trycker på "Admins" i menyn
	addRoute('/admins',function() {
		console.log("Admins btn clicked.");
		$(".pageObj").hide();
		$("#rowAdmins").show();

		findAllEmployees(function(employee){
		  	console.log(employee);

		  	var employeeList = "<thead><tr><th>Förnamn</th><th>Efternamn</th><th>Personnummer</th><th>Användarnamn</th></tr></thead>";
			employeeList += "<tbody>";
		  	for(var i = 0; i < employee.length; i++){
		  		if(employee[i].admin == true){
					employeeList += "<tr>";
					employeeList += "<td>"+employee[i].fname+"</td>";
					employeeList += "<td>"+employee[i].lname+"</td>";
					employeeList += "<td>"+employee[i].personal+"</td>";
					employeeList += "<td>"+employee[i].username+"</td>";
					employeeList += "</tr>";
				}
		  	};
			employeeList += "</tbody>";
			
		  	$("#adminstable").empty().append(employeeList);
		});
	});

	addRoute('/larare',function() {
		console.log("Lärare");
		$(".pageObj").hide();
		$("#rowLarare").show();

		findAllEmployees(function(employee){
		  	console.log(employee);

			var verifiedemployeestable = false
			
			// verified-employeestable
		  	var employeeList = "<thead><tr><th>Förnamn</th><th>Efternamn</th><th>Personnummer</th><th>Användarnamn</th></tr></thead>";
			employeeList += "<tbody>";
		  	for(var i = 0; i < employee.length; i++){
				emplyee = employee[i];
		  		if(employee.admin == false && employee.verified == true && employee.pendingVerification == false){
					employeeList += "<tr>";
					employeeList += "<td>"+employee.fname+"</td>";
					employeeList += "<td>"+employee.lname+"</td>";
					employeeList += "<td>"+employee.personal+"</td>";
					employeeList += "<td>"+employee.username+"</td>";
					employeeList += "</tr>";
					verifiedemployeestable = true;
				}
		  	}
			employeeList += "</tbody>";
			if(!verifiedemployeestable){employeeList = "<p>Inga anställda i denna listan.</p>"}
		  	$("#pendingVerification-employeestable").empty().append(employeeList);
			
			
			verifiedemployeestable = false;
			
			// pendingVerification employeestable
		  	var employeeList = "<thead><tr><th>Förnamn</th><th>Efternamn</th><th>Personnummer</th><th>Användarnamn</th></tr></thead>";
			employeeList += "<tbody>";
		  	for(var j = 0; j < employee.length; j++){
				emplyee = employee[j];
		  		if(employee.admin == false && employee.verified == false && employee.pendingVerification == true){
					employeeList += "<tr>";
					employeeList += "<td>"+employee.fname+"</td>";
					employeeList += "<td>"+employee.lname+"</td>";
					employeeList += "<td>"+employee.personal+"</td>";
					employeeList += "<td>"+employee.username+"</td>";
					employeeList += "</tr>";
					verifiedemployeestable = true;
				}
		  	};
			employeeList += "</tbody>";
			if(!verifiedemployeestable){employeeList = "<p>Inga anställda i denna listan.</p>"}
		  	$("#verified-employeestable").empty().append(employeeList);
			
			
			verifiedemployeestable = false;
			// denied teachers
			// pendingVerification employeestable
		  	var employeeList = "<thead><tr><th>Förnamn</th><th>Efternamn</th><th>Personnummer</th><th>Användarnamn</th></tr></thead>";
			employeeList += "<tbody>";
		  	for(var k = 0; k < employee.length; k++){
				emplyee = employee[k];
		  		if(employee.admin == false && employee.verified == false && employee.pendingVerification == false){
					employeeList += "<tr>";
					employeeList += "<td>"+employee.fname+"</td>";
					employeeList += "<td>"+employee.lname+"</td>";
					employeeList += "<td>"+employee.personal+"</td>";
					employeeList += "<td>"+employee.username+"</td>";
					employeeList += "</tr>";
					verifiedemployeestable = true;
				}
		  	};
			employeeList += "</tbody>";
			if(!verifiedemployeestable){employeeList = "<p>Inga anställda i denna listan.</p>"}
		  	$("#denided-employeestable").empty().append(employeeList);
			
			
			
		});
	});
	
	addRoute('/studenter', function() {
		console.log("Student");
		$(".pageObj").hide();
		$("#rowStudenter").show();

		findAllStudents(function(students){
		  	console.log(students);

		  	var studentList = "<thead><tr><th>Förnamn</th><th>Efternamn</th><th>Personnummer</th><th>Användarnamn</th></tr></thead>";

		  	for(var i = 0; i < students.length; i++){
		  		studentList += "<tbody>";
		  		studentList += "<tr>";
		  		studentList += "<td>"+students[i].fname+"</td>";
		  		studentList += "<td>"+students[i].lname+"</td>";
		  		studentList += "<td>"+students[i].personal+"</td>";
		  		studentList += "<td>"+students[i].username+"</td>";
		  		studentList += "</tr>";
		  		studentList += "</tbody>";
		  	};
		  	$("#studentstable").empty().append(studentList);
		});
	});


	addRoute('/bokningar', function() {
	  console.log("Visa Bokningar");
	  $(".pageObj").hide();
	});


	addRoute('/boka-sal', function() {
	  console.log("Boka Sal");
	  $(".pageObj").hide();
	});


	addRoute('/byt-losenord', function() {
	  console.log("Byt Lösenord");
	  $(".pageObj").hide();
	});


	addRoute('/redigera-uppgifter',function() {
	  console.log("Redigera Uppgifter");
	  $(".pageObj").hide();
	});


	$("#logoutbtn").click(function(){
		logOut();
		isLoggedIn();
	});
	addRoute('/kontakta-oss',function() {
	  console.log("Kontakt sida");
	  $(".pageObj").hide();
	  $("#kontaktPage").show();
	});

	$("#newEducationBtn").click(function() {
		var educationId = $("#educationId").val();
		var educationName = $("#educationName").val();
		
		// Time handler
		var educationStartEpoch = new Date($("#educationStart").val()).getTime();
		var educationEndEpoch = new Date($("#educationEnd").val()).getTime();
		var startDate = epochToDate(educationStartEpoch);
		var endDate = epochToDate(educationEndEpoch);
		
		
		
		var newEducation = new createEducation(educationId, educationName, startDate, endDate, sessionid);
		console.log(newEducation);
	});


	$("#searchNameBtn").click(function(){
		console.log("Söker efter Namn");

		$("#searchOutput").empty();
		var nameInputText = $("#nameInputText").val();
		console.log(nameInputText);
		Education.find('find/{education_name:/.*/}',viewEducationByName);

		function viewEducationByName(education){
			console.log(education);

			var educationList = "<thead><tr><th>UtbildningsID</th><th>Utbildningsnamn</th><th>Startar</th><th>Slutar</th></tr></thead>";
			var found = false;

			for(var i = 0; i < education.length; i++){
				console.log(nameInputText, education[i].education_name);
				if(nameInputText == education[i].education_name){
					educationList += "<tbody>";
					educationList += "<tr>";
					educationList += "<td>"+education[i].education_code+"</td>";
					educationList += "<td>"+education[i].education_name+"</td>";
					educationList += "<td>"+education[i].start+"</td>";
					educationList += "<td>"+education[i].end+"</td>";
					educationList += "</tr>";
					educationList += "</tbody>";
					found=true;

					break;
				}
		
				
			}

			if(found==true){
				$("#searchOutput").empty().append(educationList);
			}else{
				console.log("hittar ingen utbildning")
			}
		}
	});

	$("#searchIdBtn").click(function(){
		console.log("Söker efter ID");
		$("#searchOutput").empty();
		var idInputText = $("#idInputText").val();
		console.log(idInputText);
		Education.find('find/{education_code:/.*/}',viewEducationByid);
			
			function viewEducationByid(education){
				console.log(education);

				var educationList = "<thead><tr><th>UtbildningsID</th><th>Utbildningsnamn</th><th>Startar</th><th>Slutar</th></tr></thead>";
				var found = false;

				for(var i = 0; i < education.length; i++){
					console.log(idInputText, education[i].education_code);
					if(idInputText == education[i].education_code){
						educationList += "<tbody>";
						educationList += "<tr>";
						educationList += "<td>"+education[i].education_code+"</td>";
						educationList += "<td>"+education[i].education_name+"</td>";
						educationList += "<td>"+education[i].start+"</td>";
						educationList += "<td>"+education[i].end+"</td>";
						educationList += "</tr>";
						educationList += "</tbody>";
						found=true;

						break;
					}
				}

				if(found==true){
					$("#searchOutput").empty().append(educationList);
				}else{
					console.log("hittar ingen utbildning")
				}
			}
	});


	// DO THIS AFTER ALL addRoutes !!!
	registerAllRoutes();

});

function setVerifedByUsername(username){
	Employee.find('find/{username:/'+username+'/}', function(result){
		console.log(result);
		if (result[0]){
			result[0].verified = true;
			result[0].pendingVerification = false;
			Employee.update(result[0]._id, result[0], function(updatedResult){
				console.log(updatedResult);
			});

			console.log(result[0]);
		}
	});
}

function setAdminByUsername(username){
	Employee.find('find/{username:/'+username+'/}', function(result){
		console.log(result);
		if (result[0]){
			result[0].admin = true;
			Employee.update(result[0]._id, result[0], function(updatedResult){
				console.log(updatedResult);
			});

			console.log(result[0]);
		}
	});
}

function getEducationByCode(code){
	Education.find('find/{education_code:/'+code+'/}', function(result){
		console.log(result);
		if (result[0]){
			$(".pageObj").hide();
			$("#educationDetail").show();
			$("#educationTitle").html(result[0].education_name);

			console.log(result[0]);
		}
	});
}

// 
function isAdmin(id, callback){
	// Check if you are admin
	Employee.find(sessionid, function(result){
		if(result){
			if(result.admin){
				callback(true);
			}else{
				callback(false);
			}
		}else{
			callback(false);
		}
	});
}

function roleFunc(callback){
	Login.find(callback);   
	/*
	function findStudent(student){
		if (student._id){
			// return role of student
			callback(student.role);
		}else{
			// Look for an employee
			Employee.find(id, findEmployee);   
		}
	}
	
	function findEmployee(employee){
		console.log("#####");
		console.log(employee);
		if (employee.role){
			// return role of employee 
			callback(employee.role);
		}else if(employee.admin == true){
			callback("admin");
		}else{
			// not found.
			callback(false);
		}
	}
	*/
}

function getMyData(callback){
	
	Student.find(sessionid, findStudent);   
	
	function findStudent(student){
		if (student._id){
			// return role of student
			callback(student);
		}else{
			// Look for an employee
			Employee.find(sessionid, findEmployee);   
		}
	}
	
	function findEmployee(employee){
		console.log(employee);
		if (employee._id){
			// return employee 
			callback(employee);
		}else{
			// not found.
			callback(false);
		}
	}
}




