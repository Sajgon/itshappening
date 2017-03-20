


$(function() {

	if(sessionid){
		console.log("Your login/session ID: ", sessionid);

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
				// ADMIN PERMISSION STUFF
				$("#adminMenu").show();
				//$("#applyersStudentsTitle").show();
				//$("#applyersTeachersTitle").show();
				
			}else{
				$("#adminMenu").empty();
			}
		});
	}
	
	$("#logoutbtn").click(function(){
		logOut();
		isLoggedIn();
	});
	
});


// FUNCTIONS BELOW
function findAllStudents(callback){
	Student.find('find/{fname:/.*/}', function(result){
		//console.log(result);
		callback(result);
	});
}
	


function findAllEducations(callback){
	Education.find('find/{admin:/.*/}', function(result){
		//console.log(result);
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
			//console.log("p: " + p);
			getPost(posts[p]);
		}
	}else {
		$("#noposts").html("Det finns inga inlägg att visa.");
	}
}

function getPost(post){

	findOneEmployee(post.postedby_id, "username", function(username){
		printPost(post, username);
	});

}

function printPost(post, username){
	var postMessage = '<div class="panel panel-default col-xs-12 col-sm-8 paddingfix">';
		postMessage += '<div class="panel-heading"><h3 class="panel-title">'+post.title+'</h3></div>';
		postMessage += '<div class="panel-body innehall">'+post.content+'</div>';
		postMessage += '<div class="panel-footer datum"><span>'+post.date_posted+'</span><span style="float: right">'+username+'</span></div>';
		postMessage += '</div>';
		
	$("#postsWall").append(postMessage);
}




function logOut(){
	Login.delete("",function(result){
		//console.log(result)
	})
}

function findStudentByUsername(username){
	Student.find('find/{username:/'+username+'/}', function(result){
		//console.log(result);
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
				
				// Nytt inlägg visa ens username som mall
				findOneEmployee(sessionid, "username", function(username){
					$("#newpostusernameExample").html(username);
				});
				
				// Nytt inlägg visa dagens datum
				epochTime = new Date().getTime();
				epochToDate = epochToDate(epochTime);
				$("#newpostDateExample").html(epochToDate);
				
				
				
			}else{
				$("#rowSkapaInlagg").empty();
			}
		});
	});

	// Visa alla utbildningar
	addRoute('/alla-utbildningar',function() {
		//console.log("Alla utbildningar");
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
								// console.log("educationCodeId: ", educationCodeId);
								getEducationByCode(educationCodeId);
							});
							
							// Remove education button only for admins
							$(".removeEducation").on('click', function() {
								// console.log("##happens");
								// console.log(this.id);
								Education.delete(this.id, function(){
									//console.log("Education has been removed.");
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
		// console.log("Mina utbildningar");
		$(".pageObj").hide();
		$("#myEducations").show();

		// Visa mina utbildningar
		getMyData(function(user){
			if(user.educations){
				var educationList = "<thead><tr><th>Utbildningskod</th><th>Utbildningsnamn</th><th>Startar</th><th>Slutar</th></tr></thead>";
				$("#myEducationsTable").append(educationList);
				
				educations = user.educations;
				
				$("#myEducationsTable").empty();
				if(educations.length > 1){
					for(var i = 0; i < educations.length; i++){
						// console.log(educations[i]);
						if(educations[i] !== "test"){
							
							Education.find('find/{education_code:/'+educations[i]+'/}', function(result){
							//Education.find(education._id, function(education){
								if(education){
									educationList = "<tr>";
									educationList += "<td class='GoToEducation' id="+education.education_code+">"+education.education_code+"</td>";
									educationList += "<td class='GoToEducation' id="+education.education_code+">"+education.education_name+"</td>";
									educationList += "<td>"+education.start+"</td>";
									educationList += "<td>"+education.end+"</td>";
									educationList += "</tr>";
									
									$("#myEducationsTable").append(educationList);
								}
							});
						}
					}
				}else{
					$("#myEducationsTable").append("<p>Du går ingen utbildning..</p>");
				}
				
				
				
					
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
		//console.log("Sök Utbilnding");
		$(".pageObj").hide();
		$("#searchfield").show();
	});


	addRoute('/skapa-utbildning',function() {
	  // console.log("Skapa Utbildning");
	  $(".pageObj").hide();
	  $("#rowSkapaUtbildning").show();
	});

	// När man som admin trycker på "Admins" i menyn
	addRoute('/admins',function() {
		//console.log("Admins btn clicked.");
		$(".pageObj").hide();
		$("#rowAdmins").show();

		findAllEmployees(function(employee){
		  	//console.log(employee);

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
		// console.log("ADMIN > Lärare..");
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
						//console.log(result);
						if (result._id){
							Employee.update(result._id, {verified:true,pendingVerification:false}, function(updatedResult){
								//console.log("updatedResult...");
								// console.log(updatedResult);
								$("#teacherMessage").html(result.username + " has been approved.");
								loadAllTeachers();
							});
						}
					});
				}
				
				function denyTeacher(id){
					// get teacher by id
					Employee.find(id, function(result){
						//console.log(result);
						if (result){
							Employee.update(result._id, {verified:false,pendingVerification:false}, function(updatedResult){
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
						//console.log("##happens");
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
		//console.log("Student");
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
	  //console.log("Visa Bokningar");
	  $(".pageObj").hide();
	});


	addRoute('/boka-sal', function() {
	  //console.log("Boka Sal");
	  $(".pageObj").hide();
	  alert("TYVÄRR DENNA FUNKTIONALITET FUNGERAR INTE.");
	});


	addRoute('/byt-losenord', function() {
		//console.log("Byt Lösenord");
		$(".pageObj").hide();
		alert("TYVÄRR DENNA FUNKTIONALITET FUNGERAR INTE.");
	});


	addRoute('/redigera-uppgifter',function() {
		//console.log("Redigera Uppgifter");
		$(".pageObj").hide();
		$("#mySettings").show();
	  
		Login.find(function(result){
			//console.log(result);
			user = result.user;
			$("#inputNameSettings").val(user.fname);
			
			$("#updateFName").on('click', function() {
				
					var newusername = $("#inputNameSettings").val();
					// console.log(user.role);
					if(user.role == "Student"){
						Student.update(sessionid, {fname: newusername}, function(updatedResult){
							$("#inputNameSettings").val(newusername);
							$("#settingsMessage").html("Ditt förnamn har blivit uppdaterat till '" + newusername + "'.").show();
						});
					}else if(user.role == "Employee"){
						Employee.update(sessionid, {fname: newusername}, function(updatedResult){
							// console.log(updatedResult);
							$("#inputNameSettings").val(newusername);
							$("#settingsMessage").html("Ditt förnamn har blivit uppdaterat till " + newusername + ".").show();
							
						});
					}
			});
		});
	});

	addRoute('/kontakta-oss',function() {
	  //console.log("Kontakt sida");
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
		//console.log(newEducation);
	});


	$("#searchNameBtn").click(function(){
		//console.log("Söker efter Namn");

		$("#searchOutput").empty();
		var nameInputText = $("#nameInputText").val();
		//console.log(nameInputText);
		Education.find('find/{education_name:/.*/}',viewEducationByName);

		function viewEducationByName(education){
			//console.log(education);

			var educationList = "<thead><tr><th>UtbildningsID</th><th>Utbildningsnamn</th><th>Startar</th><th>Slutar</th></tr></thead><tbody>";
			var found = false;

			for(var i = 0; i < education.length; i++){
				//console.log(nameInputText, education[i].education_name);
				if(nameInputText == education[i].education_name){
					educationList += "<tr>";
					educationList += "<td>"+education[i].education_code+"</td>";
					educationList += "<td>"+education[i].education_name+"</td>";
					educationList += "<td>"+education[i].start+"</td>";
					educationList += "<td>"+education[i].end+"</td>";
					educationList += "</tr>";
					found=true;

					break;
				}
			}

			if(found==true){
				educationList += "</tbody>";
				$("#searchOutput").empty().append(educationList);
			}else{
				//console.log("hittar ingen utbildning")
			}
		}
	});

	$("#searchIdBtn").click(function(){
		//console.log("Söker efter ID");
		$("#searchOutput").empty();
		var idInputText = $("#idInputText").val();
		//console.log(idInputText);
		Education.find('find/{education_code:/.*/}',viewEducationByid);
			
		function viewEducationByid(education){
			//console.log(education);

			var educationList = "<thead><tr><th>UtbildningsID</th><th>Utbildningsnamn</th><th>Startar</th><th>Slutar</th></tr></thead>";
			var found = false;

			for(var i = 0; i < education.length; i++){
				//console.log(idInputText, education[i].education_code);
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
				//console.log("hittar ingen utbildning")
				$("#searchErrorParagraph").html("Vi kunde tyvärr inte hitta utbildningskoden '"+idInputText+"'.");
			}
		}
	});



	
	// DO THIS AFTER ALL addRoutes !!!
	registerAllRoutes();

});

function setVerifedByUsername(username){
	Employee.find('find/{username:/'+username+'/}', function(result){
		//console.log(result);
		if (result[0]){
			// update example: Kitten.update(kittens[0]._id,{age:11},next);
			Employee.update(result[0]._id, {verified: true, pendingVerification: false}, function(updatedResult){
				//console.log(updatedResult);
			});
		}
	});
}

function setAdminByUsername(username){
	Employee.find('find/{username:/'+username+'/}', function(result){
		//console.log(result);
		if (result[0]){
			//result[0].admin = true;
			Employee.update(result[0]._id, {admin: true}, function(updatedResult){
				// console.log(updatedResult);
			});
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
				
				if(username){$("#educationStartedBy").html("UTBILDNINGSANSVARIG: " + username)}
				
				//console.log("education.applyers_students", education.applyers_students);
				
				// Boring Data Handler
				if(education.applyers_students){
					applyers_students_length = education.applyers_students.length;
					if(education.applyers_students[0] == "test"){applyers_students_length--}//-1 is because "test" is counted
				}else{applyers_students_length = 0;}
				
				if(education.applyers_teachers){
					applyers_teachers_length = education.applyers_teachers.length;
					if(education.applyers_teachers[0] == "test"){applyers_teachers_length--}//-1 is because "test" is counted
				}else{applyers_teachers_length = 0;}
				
				if(education.students){
					students_length = education.students.length;
					if(education.students[0] == "test"){students_length--}//-1 is because "test" is counted
				}else{students_length = 0;}
				
				if(education.teachers){
					teachers_length = education.teachers.length;
					if(education.teachers[0] == "test"){teachers_length--}//-1 is because "test" is counted
				}else{teachers_length = 0;}
				
				
				$("#amountApplyers_students").html("Ansökande Studenter till utbildningen: "+ (applyers_students_length));
				$("#amountApplyers_teachers").html("Ansökande Lärare till utbildningen: "+ (applyers_teachers_length));
				$("#amount_students").html("Studenter i utbildningen: "+ (students_length));
				$("#amount_teachers").html("Lärare i utbildningen: "+ (teachers_length));
				$("#amount_admins").html("Administratörer i utbildningen: 1");
				
			
				function educationApproveStudent(id) {
					// get student by id
					Student.find(id, function (student) {
						if (student._id) {
							var newEdu = student.educations.push(code);

							Student.update(student._id, {educations: newEdu}, function (updatedResult) {

								var pos = education.applyers_students.indexOf(id);
								education.applyers_students.splice(pos, 1);

								// update education.
								education.students.push(id);

								Education.update(education._id, {
									applyers_students: education.applyers_students,
									students: education.students
								}, function (updatedEducation) {
									
									getEducationByCode(code);
									$("#educationMessage").html("Bra! Användaren hör nu till utbildningen.").show();
									$("#"+id).parent().remove();
								});
							});
						}
					});
				}

				function educationDenyStudent(id) {
					// get teacher by id
					Student.find(id, function (student) {
						if (student._id) {
							var pos = education.applyers_students.indexOf(id);
							education.applyers_students.splice(pos, 1);

							Education.update(education._id, {applyers_students: education.applyers_students}, function (updatedEducation) {
								getEducationByCode(code);
								$("#educationMessage").html("Studenten fick inte vara med i utbildningen. ").show();
								$("#"+id).parent().remove();
							});
						}
					});
				}
				
				function educationApproveTeacher(id) {
					// get student by id
					Employee.find(id, function (teacher) {
						if (teacher._id) {
							var newEdu = teacher.educations.push(code);

							Employee.update(teacher._id, {educations: newEdu}, function (updatedResult) {

								var pos = education.applyers_teachers.indexOf(id);
								education.applyers_teachers.splice(pos, 1);

								// update education.
								education.teachers.push(id);

								Education.update(education._id, {
									applyers_teachers: education.applyers_teachers,
									teachers: education.teachers
								}, function (updatedEducation) {
									$("#"+id).parent().remove();
									getEducationByCode(code);
								});
							});
						}
					});
				}
				
				function educationDenyTeacher(id) {
					// get teacher by id
					Employee.find(id, function(teacher) {
						if (teacher._id) {
							var pos = education.applyers_teachers.indexOf(id);
							education.applyers_teachers.splice(pos, 1);

							Education.update(education._id, {applyers_teachers: education.applyers_teachers}, function (updatedEducation) {
								$("#"+id).parent().remove();
								getEducationByCode(code);
							});
						}
					});
				}
				

				// DEPENDING ON ROLE
				roleFunc(function(role){
					
					user = role.user;
					
					$("#applyAsStudentBtn").hide();
					$("#applyAsTeacher").hide();
					$("#educationMessage").hide();
				
					// YOU ARE STUDENT
					if(user.role == "Student") {
                        // ## YOU ARE STUDENT
                        // ## YOU ARE STUDENT
                        // ## YOU ARE STUDENT

                        $("#applyersStudentsTitle").hide();
                        $("#applyersStudents").hide();
                        $("#applyersTeachersTitle").hide();
                        $("#applyersTeachers").hide();
                        $("#educationStudentsTitle").hide();	// dölj studenter i utbildningen
                        $("#educationStudents").hide();			// dölj studenter i utbildningen

                        var isAlreadyAMember = false;
                        for (var u = 0; u < education.students.length; u++) {
                            if (education.students[u] !== "test" && education.students[u] == sessionid) {
                                isAlreadyAMember = true;
                               // console.log("You are already a member of this education.");
                            }
                        }

                        var isAlreadyAnApplyer = false;
                        for (var u = 0; u < education.applyers_students.length; u++) {
                            //console.log(education.applyers_students);
                            if (education.applyers_students[u] !== "test" && education.applyers_students[u] == sessionid) {
                                isAlreadyAnApplyer = true;
                                //console.log("You are already a member of this education.");
                            }
                        }

                        if (isAlreadyAMember == false && isAlreadyAnApplyer == false) {
                            $("#applyAsStudentBtn").show(); // BUTTON
                            $("#applyAsStudentBtn").on('click', function () {
                                // console.log("You are applying as a student..");
                                // push student id to applyersStudents
                                // Lägg till lärare på utbilding

                                if (education.applyers_students) {
                                    // push teacher._id

                                    education.applyers_students.push(sessionid);
                                    // console.log("You are not a member of this education.");
									
                                    Education.update(education._id, {applyers_students: education.applyers_students}, function (callback) {
                                        $("#educationMessage").html("Bra! Du har ansökt till utbildningen som student! Vänta på besked från Läraren.").show();
                                        $("#applyAsStudentBtn").hide();

                                        Education.find(education._id, function (result) {
                                            //console.log(result);
                                            if(result){
                                                education = result;
                                            }
                                        });
                                    });
                                }
                            });

                        }else if(isAlreadyAMember == true){
							 // you are a student of this education
                            $("#educationMessage").html("Du är en student i denna utbildning!").show();
							$("#applyAsStudentBtn").hide();
                        }else if(isAlreadyAnApplyer == true){
                            // you are a student of this education
                            $("#educationMessage").html("Du har ansökt till utbildningen som student! Vänligen vänta på att en lärare eller admin ska godkänna dig..").show();
							$("#applyAsStudentBtn").hide();
                        }

						// teachers
						// teachers
						// teachers
						$("#educationTeachers").empty();
						var teachersToShow = [];
						findAllEmployees(function(teachers){
							// console.log(teachers);
							for(i = 0; i < teachers.length; i++){
								teacher = teachers[i];
								if(education.teachers.indexOf(teacher._id) < 0){
									continue;
								}
								teachersToShow.push(teacher);
							}

							if(teachersToShow.length == 0){
								studentList = "<p>Inga lärare finns med i utbildningen.</p>";
								$("#educationTeachers").html(studentList);
								$("#educationTeachers").show();
							}else{
								var studentList = "<table class='table'><thead><tr><th>Användarnamn</th></tr></thead><tbody>";

								for(var i = 0; i < teachersToShow.length; i++){
									teacher = teachersToShow[i];
									studentList += "<tr>";
									studentList += "<td>" + teacher.username + "</td>";
									studentList += "</tr>";
								}

								studentList += "</tbody></table>";
								$("#educationTeachers").html(studentList);
								$("#educationTeachers").show();
							}
						});

						

					// YOU ARE ADMIN or teacher
					}else if(user.role == "Employee"){
						isAdmin(sessionid, function(isAdmin){
							if(isAdmin){	// returns true or false
								// ## YOU ARE ADMIN
								// ## YOU ARE ADMIN
								// ## YOU ARE ADMIN
								// console.log("You are entering an education as an Admin.");

								// students
                                // students
                                // students
                                $("#educationStudents").empty();
                                if(education.students[0] == "test"){education.students.shift();}
								var studentsToShow = [];
								findAllStudents(function(students){
									//console.log(students);
									for(i = 0; i < students.length; i++){
										student = students[i];
										if(education.students.indexOf(student._id) < 0){
											continue;
										}
										studentsToShow.push(student);
									}

									if(studentsToShow.length == 0){
										studentList = "<p>Inga studenter finns med i utbildningen.</p>";
										$("#educationStudents").html(studentList);
										$("#educationStudents").show();
									}else{
										var studentList = "<table class='table'><thead><tr><th>Användarnamn</th></tr></thead><tbody>";

										for(var i = 0; i < studentsToShow.length; i++){
											student = studentsToShow[i];
											studentList += "<tr>";
											studentList += "<td>" + student.username + "</td>";
											studentList += "</tr>";
										}

										studentList += "</tbody></table";
										$("#educationStudents").html(studentList);
										$("#educationStudents").show();
									}
								});

                                // teachers
                                // teachers
                                // teachers
								$("#educationTeachers").empty();
								var teachersToShow = [];
								findAllEmployees(function(teachers){
									//console.log(teachers);
									for(i = 0; i < teachers.length; i++){
										teacher = teachers[i];
										if(education.teachers.indexOf(teacher._id) < 0){
											continue;
										}
										teachersToShow.push(teacher);
									}

									if(teachersToShow.length == 0){
										studentList = "<p>Inga lärare finns med i utbildningen.</p>";
										$("#educationTeachers").html(studentList);
										$("#educationTeachers").show();
									}else{
										var studentList = "<table class='table'><thead><tr><th>Användarnamn</th></tr></thead><tbody>";

										for(var i = 0; i < teachersToShow.length; i++){
											teacher = teachersToShow[i];
											studentList += "<tr>";
											studentList += "<td>" + teacher.username + "</td>";
											studentList += "</tr>";
										}

										studentList += "</tbody></table>";
										$("#educationTeachers").html(studentList);
										$("#educationTeachers").show();
									}
								});

								// applying students
								// applying students
								// applying students
								$("#applyersStudents").empty();
								if(education.students[0] == "test"){education.students.shift();}
								var studentsToShow = [];
								findAllStudents(function(students){
									//console.log(students);
									for(i = 0; i < students.length; i++){
										student = students[i];
										if(education.applyers_students.indexOf(student._id) < 0){
											continue;
										}
										studentsToShow.push(student);
									}

									if(studentsToShow.length == 0){
										studentList = "<p>Inga studenter har ansökt till utbildningen.</p>";
										$("#applyersStudents").html(studentList).show();
									}else{
										var studentList = "<table><thead><tr><th>Användarnamn</th><th>Godkänn</th><th>Neka</th></tr></thead><tbody>";

										for(var i = 0; i < studentsToShow.length; i++){
											student = studentsToShow[i];
											studentList += "<tr>";
											studentList += "<td>" + student.username + "</td>";
											studentList += '<td class="educationApproveStudentBtn" id="' + student._id + '"><button><i class="fa fa-check"></i></button></td>';
											studentList += '<td class="educationDenyStudentBtn" id="' + student._id + '"><button><i class="fa fa-times"></i></button></td>';
											studentList += "</tr>";
										}

										studentList += "</tbody></table";
										$("#applyersStudents").html(studentList).show();
										
										// onclick
										$(".educationApproveStudentBtn").on('click', function (){
											//console.log("happening...");
											educationApproveStudent(this.id);
										});

										// onclick
										$(".educationDenyStudentBtn").on('click', function (){
											//console.log("happening...");
											educationDenyStudent(this.id);
										});
									}
								});
								

								// APPLYING TEACHERS
								// APPLYING TEACHERS
								// APPLYING TEACHERS
								$("#applyersStudents").empty();
								if(education.teachers[0] == "test"){education.students.shift();}
								var teachersToShow = [];
								findAllEmployees(function(teachers){
									//console.log(teachers);
									for(i = 0; i < teachers.length; i++){
										teacher = teachers[i];
										if(education.applyers_students.indexOf(teacher._id) < 0){
											continue;
										}
										teachersToShow.push(teacher);
									}

									if(teachersToShow.length == 0){
										employeeList = "<p>Inga studenter har ansökt till utbildningen.</p>";
										$("#applyersTeachers").html(employeeList);
										$("#applyersTeachers").show();
									}else{
										var employeeList = "<table><thead><tr><th>Användarnamn</th><th>Godkänn</th><th>Neka</th></tr></thead><tbody>";

										for(var i = 0; i < teachersToShow.length; i++){
											teacher = teachersToShow[i];
											employeeList += "<tr>";
											employeeList += "<td>" + teacher.username + "</td>";
											employeeList += '<td class="educationApproveTeacherBtn" id="' + teacher._id + '"><button><i class="fa fa-check"></i></button></td>';
											employeeList += '<td class="educationDenyTeacherBtn" id="' + teacher._id + '"><button><i class="fa fa-times"></i></button></td>';
											employeeList += "</tr>";
										}

										employeeList += "</tbody></table>";
										$("#applyersTeachers").html(employeeList);
										$("#applyersTeachers").show();
										
										// onclick
										$(".educationApproveTeacherBtn").on('click', function (){
											//console.log("happening...");
											educationApproveTeacher(this.id);
										});

										// onclick
										$(".educationDenyTeacherBtn").on('click', function (){
											//console.log("happening...");
											educationDenyTeacher(this.id);
										});
									}
								});

							}else{
								// ## YOU ARE TEACHER
								// ## YOU ARE TEACHER
								// ## YOU ARE TEACHER
								//console.log("You are entering an education as a teacher ");
								
								$("#educationStudentsTitle").hide();
								$("#educationStudents").hide();
								$("#applyersTeachersTitle").hide();	// du kan bara se ansökande lärare om du är lärare för utbildningen
								$("#applyersTeachers").hide();		// du kan bara se ansökande lärare om du är lärare för utbildningen
								$("#applyersStudentsTitle").hide();	// du kan bara se ansökande studenter om du är lärare för utbildningen
								$("#applyersStudents").hide();		// du kan bara se ansökande studenter om du är lärare för utbildningen

                                var isAlreadyATeacher = false;
                                for (var u = 0; u < education.students.length; u++) {
                                    if (education.teachers[u] !== "test" && education.teachers[u] == sessionid) {
                                        isAlreadyATeacher = true;
                                       // console.log("You are already a teacher of this education.");
                                    }
                                }

                                var isAlreadyAnApplyer = false;
                                for (var u = 0; u < education.applyers_teachers.length; u++) {
                                    if (education.applyers_teachers[u] !== "test" && education.applyers_teachers[u] == sessionid) {
                                        isAlreadyAnApplyer = true;
                                       // console.log("You are already a member of this education.");
                                    }
                                }

                                //
                                if (isAlreadyATeacher == false && isAlreadyAnApplyer == false) {
                                    // Visa knappen
                                    $("#applyAsTeacher").show();
                                    $("#applyersTeachersTitle").hide();

                                    // Ansök som lärare till utbildning
                                    $("#applyAsTeacher").on('click', function() {

                                        // Lägg till lärare på utbilding
                                        if (education._id){
                                            // push self._id

                                            if(!education.applyers_teachers){education.applyers_teachers = [];}
                                            education.applyers_teachers.push(sessionid);

                                            Education.update(education._id, {applyers_teachers: education.applyers_teachers}, function(updatedEducation){
                                                $("#educationMessage").html("Bra! Du har ansökt till utbildningen som lärare! Vänta på besked från Admin.").show();
                                                $("#applyAsTeacher").hide();
                                            });
                                        }
                                    });
                                }else if(isAlreadyATeacher == true){
									// applying students
									// applying students
									// applying students
									$("#applyersStudents").empty();
									if(education.students[0] == "test"){ education.students.shift();}
									var studentsToShow = [];
									findAllStudents(function(students){
										// console.log(students);
										for(i = 0; i < students.length; i++){
											student = students[i];
											if(education.applyers_students.indexOf(student._id) < 0){
												continue;
											}
											studentsToShow.push(student);
										}

										if(studentsToShow.length == 0){
											studentList = "<p>Inga studenter har ansökt till utbildningen.</p>";
											
											$("#applyersStudents").html(studentList);
											$("#applyersStudentsTitle").show();
											$("#applyersStudents").show();
										}else{
											var studentList = "<table><thead><tr><th>Användarnamn</th><th>Godkänn</th><th>Neka</th></tr></thead><tbody>";

											for(var i = 0; i < studentsToShow.length; i++){
												student = studentsToShow[i];
												studentList += "<tr>";
												studentList += "<td>" + student.username + "</td>";
												studentList += '<td class="educationApproveStudentBtn" id="' + student._id + '"><button><i class="fa fa-check"></i></button></td>';
												studentList += '<td class="educationDenyStudentBtn" id="' + student._id + '"><button><i class="fa fa-times"></i></button></td>';
												studentList += "</tr>";
											}

											studentList += "</tbody></table>";
											$("#applyersStudents").html(studentList);
											$("#applyersStudentsTitle").show();
											$("#applyersStudents").show();
											
											// onclick
											$(".educationApproveStudentBtn").on('click', function (){
												// console.log("happening...");
												educationApproveStudent(this.id);
											});

											// onclick
											$(".educationDenyStudentBtn").on('click', function (){
												//console.log("happening...");
												educationDenyStudent(this.id);
											});
										}
									});
									
									
									// students
									// students
									// students
									$("#educationStudents").empty();
									if(education.students[0] == "test"){education.students.shift();}
									var studentsToShow = [];
									findAllStudents(function(students){
										// console.log(students);
										for(i = 0; i < students.length; i++){
											student = students[i];
											if(education.students.indexOf(student._id) < 0){
												continue;
											}
											studentsToShow.push(student);
										}

										if(studentsToShow.length == 0){
											studentList = "<p>Inga studenter finns med i utbildningen.</p>";
											$("#educationStudents").html(studentList);
											$("#educationStudents").show();
										}else{
											var studentList = "<table class='table'><thead><tr><th>Användarnamn</th></tr></thead><tbody>";

											for(var i = 0; i < studentsToShow.length; i++){
												student = studentsToShow[i];
												studentList += "<tr>";
												studentList += "<td>" + student.username + "</td>";
												studentList += "</tr>";
											}

											studentList += "</tbody></table>";
											$("#educationStudents").html(studentList);
											$("#educationStudents").show();
										}
									});	
								}


                                // teachers
                                // teachers
                                // teachers
								$("#educationTeachers").empty();
								var teachersToShow = [];
								findAllEmployees(function(teachers){
									// console.log(teachers);
									for(i = 0; i < teachers.length; i++){
										teacher = teachers[i];
										if(education.teachers.indexOf(teacher._id) < 0){
											continue;
										}
										teachersToShow.push(teacher);
									}

									if(teachersToShow.length == 0){
										studentList = "<p>Inga lärare finns med i utbildningen.</p>";
										$("#educationTeachers").html(studentList);
										$("#educationTeachers").show();
									}else{
										var studentList = "<table class='table'><thead><tr><th>Användarnamn</th></tr></thead><tbody>";

										for(var i = 0; i < teachersToShow.length; i++){
											teacher = teachersToShow[i];
											studentList += "<tr>";
											studentList += "<td>" + teacher.username + "</td>";
											studentList += "</tr>";
										}

										studentList += "</tbody></table>";
										$("#educationTeachers").html(studentList);
										$("#educationTeachers").show();
									}
								});

								
							
								
								
                       	 	}//you are teacher end
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
		// console.log(employee);
		if (employee._id){
			// return employee 
			callback(employee);
		}else{
			// not found.
			callback(false);
		}
	}
}







