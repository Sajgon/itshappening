


$(function() {

	if(sessionid){
		console.log("Your login/session ID: ");
		console.log(sessionid);

		// HEADER
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

		isAdmin(sessionid, function(isAdmin){
			if(isAdmin){
				console.log();
				// ADMIN PERMISSION STUFF
				$("#adminMenu").show();
				$("#rowSkapaInlagg").show();

				// create a new post button
				$("#newPostBtn").click(function(){
					var postTitle = $("#postTitle").val();
					var postContent = $("#postContent").val();

					 // try to create a new post
					new createNewspost(postTitle, postContent);
				});
				
				// Nytt inlägg visa ens username som mall
				findOneEmployee(sessionid, "username", function(username){
					$("#newpostusernameExample").html(username);
				});
				
				// Nytt inlägg visa dagens datum
				epochTime = new Date().getTime();
				epochToDate = epochToDate(epochTime);
				$("#newpostDateExample").html(epochToDate);
				
			}else{
				$("#adminMenu").empty();
				$("#rowSkapaInlagg").empty();
			}
		});
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

function findAllPosts(callback){
	NewsPost.find('find/{for_all:/true.*/}', function(result){
		//console.log(result);
		callback(result);
	});
}

function findAllAdminPosts(){
	
	NewsPost.find('find/{for_all:/true.*/}',printPosts);

}

// find one student with student ID
function findOneStudent(studentId, requestType, callback){

	Student.find(studentId, function(result){

		if(result){
			if(requestType == "username"){
				console.log("##happensss");
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
		}
		
		callback(false);
		
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





function printPosts(posts){
    //console.log("Posts:");
    //console.log(posts);

	$("#postsWall").empty();
	
	if(posts.length){
		for(var p = 0; p < posts.length; p++){
			getPost(posts[p]);
		}	
	}else {
		$("#noposts").html("Det finns inga inlägg att visa.");
	}
}

function getPost(post){
	//console.log("post", post);
	// title = post.title;
	// content = post.content;
	// fulldate = humanDate(post.date_posted);
	
	findOneStudent(post.postedby_id, "username", function(username){
	//Student.find(post.postedby_id, function(result){
	//Student.find('find/{_id:/'+post.postedby_id+'/}', function(result){
		if(!username){
			findOneEmployee(post.postedby_id, "username", function(username){
				printPost(post, username);
			});
		}else{
			printPost(post, username);
		}

		
	});
}

function printPost(post, username){
	var postMessage = '<div class="panel panel-default col-xs-12 col-sm-8 paddingfix">' +
							'<div class="panel-heading"><h3 class="panel-title">'+post.title+'</h3></div>' +
							'<div class="panel-body innehall">'+post.content+'</div>' +
							'<div class="panel-footer datum"><span>'+post.date_posted+'</span><span style="float: right">'+username+'</span></div>' +
							'</div>';
		
	$("#postsWall").append(postMessage);
}




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
		findAllAdminPosts();
		
		isAdmin(sessionid, function(isAdmin){
			
			if(isAdmin){
				// ADMIN PERMISSION STUFF
				$("#rowSkapaInlagg").show();

				// create a new post button
                $("#newPostBtn").click(function(){
                    var postTitle = $("#postTitle").val();
                    var postContent = $("#postContent").val();

					 // try to create a new post
                    new createNewspost(postTitle, postContent);
                });
				
				
			}else{
				$("#rowSkapaInlagg").empty();
			}
		});
	});

	// Visa alla utbildningar
	addRoute('/alla-utbildningar',function() {
		console.log("Alla utbildningar");
		$(".pageObj").hide();
		$("#rowEducations").show();

		function viewEducations(){
			findAllEducations(function(educations){
				
				if(educations.length > 0){
					isAdmin(sessionid, function(result){
						if(result){
							// is admin
							var educationList = "<thead><tr><th>Utbildningskod</th><th>Utbildningsnamn</th><th>Startar</th><th>Slutar</th><th>Ta bort</th></tr></thead>";
							educationList += "<tbody>";
							for(var i = 0; i < educations.length; i++){
								education = educations[i];
								educationList += "<tr>";
								educationList += "<td class='GoToEducation' id="+education.education_code+">"+education.education_code+"</td>";
								educationList += "<td class='GoToEducation' id="+education.education_code+">"+education.education_name+"</td>";
								educationList += "<td>"+education.start+"</td>";
								educationList += "<td>"+education.end+"</td>";
								educationList += "<td class='removeEducation' id="+education._id+"><i class='fa fa-times'></i></td>";
								educationList += "</tr>";
							}
							educationList += "</tbody>";
							
						}else{
							// normal user
							var educationList = "<thead><tr><th>Utbildningskod</th><th>Utbildningsnamn</th><th>Startar</th><th>Slutar</th></tr></thead>";
							educationList += "<tbody>";
							for(var i = 0; i < educations.length; i++){
								educationList += "<tr>";
								educationList += "<td class='GoToEducation' id="+educations[i].education_code+">"+educations[i].education_code+"</td>";
								educationList += "<td class='GoToEducation' id="+educations[i].education_code+">"+educations[i].education_name+"</td>";
								educationList += "<td>"+educations[i].start+"</td>";
								educationList += "<td>"+educations[i].end+"</td>";
								educationList += "</tr>";
							}
							educationList += "</tbody>";
						}
						
						$("#educationtable").empty().append(educationList);

						
						
						$("#educationtable").ready(function() {
							
							// go to a specific education 
							$(".GoToEducation").on('click', function() {
								var educationCodeId = $(this).attr('id');
								console.log("educationCodeId: ", educationCodeId);
								getEducationByCode(educationCodeId);
							});
							
							// Remove education button only for admins
							$(".removeEducation").on('click', function() {
								console.log("##happens");
								console.log(this.id);
								Education.delete(this.id, function(){
									console.log("Education has been removed.");
									viewEducations();
								});
							});
						});
					});
					
				}else{
					var educationList = "<thead><tr><th>Inga utbildningar registrerade.</th></thead>";
					$("#educationtable").empty().append(educationList);
				}
			});
		}
		
		// run viewEducations function
		viewEducations();
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
						educationList += "<tr>";
						educationList += "<td class='goToEducation' id="+educations[i].education_code+">"+educations[i].education_code+"</td>";
						educationList += "<td class='goToEducation' id="+educations[i].education_code+">"+educations[i].education_name+"</td>";
						educationList += "<td>"+educations[i].start+"</td>";
						educationList += "<td>"+educations[i].end+"</td>";
						educationList += "</tr>";
					}
					educationList += "</tbody>";
					
					$("#myEducationsTable").empty().append(educationList);
						
					$("#myEducationsTable").ready(function() {
						$(".goToEducation").on('click', function() {
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
					educationList += "<tr>";
					educationList += "<td class='goToEducation' id="+educations[i].education_code+">"+educations[i].education_code+"</td>";
					educationList += "<td class='goToEducation' id="+educations[i].education_code+">"+educations[i].education_name+"</td>";
					educationList += "<td>"+educations[i].start+"</td>";
					educationList += "<td>"+educations[i].end+"</td>";
					
					educationList += "</tr>";
					educationList += "</tbody>";
				}
				
				$("#educationtable").empty().append(educationList);
					
				$("#educationtable ").ready(function() {
					$(".goToEducation").on('click', function() {
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

	// ADMIN > LÄRARE PAGE
	addRoute('/larare',function() {
		console.log("ADMIN > Lärare..");
		$(".pageObj").hide();
		$("#rowLarare").show();

		function loadAllTeachers(){
			findAllEmployees(function(employees){

				var verifiedemployeestable = false
				
				// pendingVerification-employeestable
				var employeeList = "<thead><tr><th>Förnamn</th><th>Efternamn</th><th>Personnummer</th><th>Användarnamn</th><th>Pass</th><th>Deny</th></tr></thead>";
				employeeList += "<tbody>";
				for(var i = 0; i < employees.length; i++){
					employee = employees[i];
					if(employee.admin == false && employee.verified == false && employee.pendingVerification == true){
						employeeList += "<tr class='pendingTeachersTablerow'>";
						employeeList += "<td>"+employee.fname+"</td>";
						employeeList += "<td>"+employee.lname+"</td>";
						employeeList += "<td>"+employee.personal+"</td>";
						employeeList += "<td>"+employee.username+"</td>";
						employeeList += '<td class="passTeacherBtn" id="'+employee._id+'"><button><i class="fa fa-check"></i></button></td>';
						employeeList += '<td class="denyTeacherBtn" id="'+employee._id+'"><button><i class="fa fa-times"></i></button></td>';
						employeeList += "</tr>";
						verifiedemployeestable = true;
					}
				}
				
				// append to table
				employeeList += "</tbody>";
				if(!verifiedemployeestable){employeeList = "<p>Inga anställda i denna listan.</p>"}
				$("#pendingVerification-employeestable").empty().append(employeeList);
				
				$(".passTeacherBtn").on('click', function() {
					approveTeacher(this.id);
				});
				
				$(".denyTeacherBtn").on('click', function() {
					denyTeacher(this.id);
				});
				
				function approveTeacher(id){
					// get teacher by id
					Employee.find(id, function(result){
						console.log(result);
						if (result._id){
							result.verified = true;
							result.pendingVerification = false;
							Employee.update(result._id, result, function(updatedResult){
								console.log("updatedResult...");
								console.log(updatedResult);
								$("#teacherMessage").html(result.username + " has been approved.");
								loadAllTeachers();
							});
						}
					});
				}
				
				function denyTeacher(id){
					// get teacher by id
					Employee.find(id, function(result){
						console.log(result);
						if (result){
							result.verified = false;
							result.pendingVerification = false;
							Employee.update(result._id, result, function(updatedResult){
								$("#teacherMessage").html(result.username + " has been denied.");
								loadAllTeachers();
							});
						}
					});
				}
				
				
				// verified employeestable
				verifiedemployeestable = false;
				var employeeList = "<thead><tr><th>Förnamn</th><th>Efternamn</th><th>Personnummer</th><th>Användarnamn</th></tr></thead>";
				employeeList += "<tbody>";
				for(var j = 0; j < employees.length; j++){
					employee = employees[j];
					if(employee.admin == false && employee.verified == true && employee.pendingVerification == false){
						employeeList += "<tr>";
						employeeList += "<td>"+employee.fname+"</td>";
						employeeList += "<td>"+employee.lname+"</td>";
						employeeList += "<td>"+employee.personal+"</td>";
						employeeList += "<td>"+employee.username+"</td>";
						employeeList += "</tr>";
						verifiedemployeestable = true;
						console.log("##happens");
					}
				}
				employeeList += "</tbody>";
				if(verifiedemployeestable == false){employeeList = "<p>Inga anställda i denna listan.</p>"}
				$("#verified-employeestable").empty().append(employeeList);
				
				
				// denied teachers
				verifiedemployeestable = false;
				var employeeList = "<thead><tr><th>Förnamn</th><th>Efternamn</th><th>Personnummer</th><th>Användarnamn</th></tr></thead>";
				employeeList += "<tbody>";
				for(var k = 0; k < employees.length; k++){
					employee = employees[k];
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
		}
		
		// When ready
		loadAllTeachers();
		
	});
	
	addRoute('/studenter', function() {
		console.log("Student");
		$(".pageObj").hide();
		$("#rowStudenter").show();

		findAllStudents(function(students){
		  	

			var anystudents = false;
		  	var studentList = "<thead><tr><th>Förnamn</th><th>Efternamn</th><th>Personnummer</th><th>Användarnamn</th></tr></thead>";
			studentList += "<tbody>";
		  	for(var i = 0; i < students.length; i++){
		  		studentList += "<tr>";
		  		studentList += "<td>"+students[i].fname+"</td>";
		  		studentList += "<td>"+students[i].lname+"</td>";
		  		studentList += "<td>"+students[i].personal+"</td>";
		  		studentList += "<td>"+students[i].username+"</td>";
		  		studentList += "</tr>";
				anystudents = true;
		  	}
			studentList += "</tbody>";
			
			if(!anystudents){studentList = "<p>Inga anställda i denna listan.</p>"}
			
		  	$("#studentstable").empty().append(studentList);
		});
	});

	addRoute('/data-generator', function() {
		$(".pageObj").hide();
		$("#pageDatagenerator").show();
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
	  $("#mySettings").show();
	  
	  
		Login.find(function(result){
		  console.log(result);
		  user = result.user;
		  $("#inputNameSettings").val(user.fname);
		}); 
	  
		$("#updateFName").on('click', function() {
			denyTeacher(this.id);
		});
	 
	  
	  
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
				$("#searchErrorParagraph").html("Vi kunde tyvärr inte hitta utbildningskoden '"+idInputText+"'.");
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

		if(result[0]){
			education = result[0];
			educationcode = code;
			educationid = education._id;
			findOneEmployee(result[0].admin, "username", function(username){
			
				$(".pageObj").hide();
				$("#educationDetail").show();
				$("#educationTitle").html(result[0].education_name);
				$("#educationCode").html("UTBILDNINGSKOD: " + result[0].education_code);
				$("#educationStartDate").html("BÖRJAR: " + result[0].start);
				$("#educationEndDate").html("SLUTAR: " + result[0].end);
				$("#educationStartedBy").html("UTBILDNINGSANSVARIG: " + username);
				
				// Boring Data Handler
				if(education.applyers_students){
					applyers_students_length = education.applyers_students.length;
				}else{applyers_students_length = 0;}
				
				if(education.applyers_teachers){
					applyers_teachers_length = education.applyers_teachers.length;
				}else{applyers_teachers_length = 0;}
				
				if(education.students){
					students_length = education.students.length;
				}else{students_length = 0;}
				
				if(education.teachers){
					teachers_length = education.teachers.length;
				}else{teachers_length = 0;}
				
				$("#amountApplyers_students").html("Ansökande Studenter till utbildningen: "+ applyers_students_length);
				$("#amountApplyers_teachers").html("Ansökande Lärare till utbildningen: "+ applyers_teachers_length);
				$("#amount_students").html("Studenter i utbildningen: "+ students_length);
				$("#amount_teachers").html("Lärare i utbildningen: "+ teachers_length);
				$("#amount_admins").html("Administratörer i utbildningen: 1");
				
				
				
				// Lärare för utbildning
				if(result[0].applyers_teachers){
					$("#educationTeachers").html("LÄRARE: ");
					$("#educationTeachers").show();
					for(var u = 0; u < result[0].applyers_teachers.length; u++){
						findOneEmployee(applyers_teachers[u], "username", function(username){
							$("#educationTeachers").append(username + " ");
						});
					}
				}else{
					$("#educationTeachers").html("");
					$("#educationTeachers").hide();
				}
				
				// DEPENDING ON ROLE
				roleFunc(function(role){
					user = role.user;
					
					$("#applyAsStudentBtn").hide();
					$("#applyAsTeacher").hide();
				
					if(user.role == "Student"){
						// YOU ARE STUDENT
						// YOU ARE STUDENT
						// YOU ARE STUDENT
						
						$("#applyAsStudentBtn").show(); // BUTTON
						$("#applyAsStudentBtn").on('click', function() {
							
							Student.find(sessionid, function(student){
								console.log("###");
								console.log(student);
								if (student._id){
									
									// push education code to student
									if(!student.educations){student.educations = [];}
									student.educations.push(educationcode);
									
									Student.update(student._id, student, function(updatedStudent){
										
										console.log("updatedStudent");
										console.log(updatedStudent);
										
										Student.find(student._id, function(student){
											console.log(student);
											if(student){
												console.log("#student OUTPUT 2# above");
											}
										});
										
										
										// push student id to applyersStudents
										// Lägg till lärare på utbilding
										if (education._id){
											// push teacher._id 
											
											if(!education.applyers_students){education.applyers_students = []}
											education.applyers_students.push(student._id);
											
											console.log("education before send");
											console.log(education._id);	// returns 58b4a94fc8f61b06f89b4187
											console.log(education);		// returns the updated object
											
											Education.update(education._id, education, function(callback){
												$("#educationMessage").html("Bra! Du har ansökt till utbildningen som student! Vänta på besked från Läraren.");
												
												console.log("#EDUCATION OUTPUT 1");
												console.log(callback);
											
												Education.find(education._id, function(result){
													console.log(result);
													if(result){
														education = result;
														console.log("#EDUCATION OUTPUT 2#");
														console.log(education);
													}
												});
											});
											
										}
									});
								}
							});
						});
						
						
					}else if(user.role == "Employee"){
						isAdmin(sessionid, function(callback){
							
							if(callback){
								// YOU ARE ADMIN
								// YOU ARE ADMIN
								// YOU ARE ADMIN
								
								// Applying Students
								// Lägg till lärare på utbilding
								if (education._id){
									console.log("##education");
									console.log(education);
									console.log(education.applyers_students);
									var studentList = "";
									// Inga sökande studenter till utbildningen
									if(!education.applyers_students){
										studentList = "<p>Inga ansökande studenter i denna listan.</p>"
									}else{
										// hittade student IDs
										var anystudents = false;
										var studentList = "<thead><tr><th>Användarnamn</th><th>Godkänn</th><th>Neka</th></tr></thead>";
										studentList += "<tbody>";
								
										for(var i = 0; i < education.applyers_students.length; i++){
											Student.find(education.applyers_students[i], function(student){
												if(student._id){
													
													studentList += "<tr>";
													studentList += "<td>"+student.fname+"</td>";
													studentList += "<td>"+student.lname+"</td>";
													studentList += "<td>"+student.personal+"</td>";
													studentList += "<td>"+student.username+"</td>";
													studentList += "</tr>";
													anystudents = true;
												}
											});  
										}
										studentList += "</tbody>";
										if(!anystudents){studentList = "<p>Inga ansökande studenter i denna listan.</p>"}
									}
									
									$("#applyersStudents").empty().append(studentList);
									$("#applyersStudents").show();
									
									// Applying Teachers Table
									var employeeList = "";
									// Inga sökande studenter till utbildningen
									if(!education.applyers_teachers){
										employeeList = "<p>Inga ansökande lärare i denna listan.</p>"
									}else{
										// hittade employee IDs
										var anystudents = false;
										var employeeList = "<thead><tr><th>Användarnamn</th><th>Godkänn</th><th>Neka</th></tr></thead>";
										employeeList += "<tbody>";
								
										for(var i = 0; i < education.applyers_teachers.length; i++){
											Employee.find(education.applyers_teachers[i], function(employee){
												if(employee._id){
													employeeList += "<tr>";
													employeeList += "<td>"+employee.fname+"</td>";
													employeeList += "<td>"+employee.lname+"</td>";
													employeeList += "<td>"+employee.personal+"</td>";
													employeeList += "<td>"+employee.username+"</td>";
													employeeList += "</tr>";
													anystudents = true;
												}
											});  
										}
										employeeList += "</tbody>";
										if(!anystudents){employeeList = "<p>Inga ansökande lärare i denna listan.</p>"}
									}
									
									$("#applyersTeachers").empty().append(employeeList);
									$("#applyersTeachers").show();
									
								}
								
							}else{
								// YOU ARE TEACHER
								// YOU ARE TEACHER
								// YOU ARE TEACHER
								// YOU ARE TEACHER
								
								// Visa knappen
								$("#applyAsTeacher").show();
								// Ansök som lärare till utbildning
								$("#applyAsTeacher").on('click', function() {
									Employee.find(sessionid, function(employee){
										if (employee._id){
											// push education code
											if(!employee.educations){employee.educations = [];}
											employee.educations.push(code);
											
											// Lägg till utbildning för lärare
											Employee.update(employee._id, employee, function(updatedResult){
												
												// Lägg till lärare på utbilding
												if (education._id){
													// push teacher._id 
													
													if(!education.applyers_teachers){education.applyers_teachers = [];}
													education.applyers_teachers.push(employee._id);
													
													Education.update(education._id, education, function(updatedEducation){
														$("#educationMessage").html("Bra! Du har ansökt till utbildningen som lärare! Vänta på besked från Admin.");
													});
												}
											});
										}
									});
								});
							}
						});
					}
				});
			});
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

