


$(function() {

	$("#rowSkapaInlagg").show();
		$("#posts").show();
	$("#newPostBtn").click(function(){
		
		var postTitle = $("#postTitle").val();
		var postContent = $("#postContent").val();

		console.log(postTitle);
		console.log(postContent);
		
		/*
		Student.find(sessionid, findStudent);
		
		function findStudent(student){
			//console.log(student);
			console.log("YEAAHAH");
		}*/
		
		
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
	
	
	if(sessionid){
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
	}
});
	
function findAllStudents(callback){
	Student.find('find/{fname:/.*/}', function(result){
		console.log(result);
		callback(result);
	});
}
	
function findAllEmployees(){
	Employee.find('find/{fname:/.*/}', function(result){
		console.log(result);
	});
}
	
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




function findOnePost(){
	NewsPost.find('5899d43204165a3660061eef',viewPosts);
	
	function viewPosts(posts){
		console.log(posts);
	}
}


function findAllAdminPosts(){
	
	NewsPost.find('find/{for_all:/true.*/}',viewPosts);
	
	function viewPosts(posts){
		console.log(posts);
		printPosts(posts)
	}
}

function printPosts(posts){
	if(posts.length){
		for(var p = 0; p < posts.length; p++){
			console.log(posts[p])
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
};



$(document).ready(function() {

	$("#inlaggBtn").click(function(){
		$(".pageObj").hide();
		$("#rowSkapaInlagg").show();
		$("#posts").show();

	});

	$( "#allautbildningarbtn" ).click(function() {
	  console.log("Alla utbildningar");

	  $(".pageObj").hide();
	});


	$( "#minautbildningarbtn" ).click(function() {
	  console.log("Mina utbildningar");
	  $(".pageObj").hide();
	});


	$( "#skapautbildningbtn" ).click(function() {
	  console.log("Skapa Utbildning");
	  $(".pageObj").hide();
	  $("#rowSkapaUtbildning").show();

	});


	$( "#lararebtn" ).click(function() {
	  console.log("Lärare");
	  $(".pageObj").hide();

	});
	$( "#studentbtn" ).click(function() {
	  console.log("Student");
	  $(".pageObj").hide();
	  $("#rowStudenter").show();

	  findAllStudents(function(students){
	  	console.log(students);

	  	var studentList = "<tr><th>Förnamn</th><th>Efternamn</th><th>Personnummer</th><th>Användarnamn</th></tr>";

	  	for(var i = 0; i < students.length; i++){
	  		studentList += "<tr>";
	  		studentList += "<td>"+students[i].fname+"</td>";
	  		studentList += "<td>"+students[i].lname+"</td>";
	  		studentList += "<td>"+students[i].personal+"</td>";
	  		studentList += "<td>"+students[i].username+"</td>";
	  		studentList += "</tr>";
	  	};
	  	$("#studentstable").append(studentList);
	  });



	});


	$( "#inlaggbtn" ).click(function() {
	  console.log("Inlägg");
	  $(".pageObj").hide();
	});


	$( "#visabokningarbtn" ).click(function() {
	  console.log("Visa Bokningar");
	  $(".pageObj").hide();
	});


	$( "#bokasalbtn" ).click(function() {
	  console.log("Boka Sal");
	  $(".pageObj").hide();
	});


	$( "#bytlosenordbtn" ).click(function() {
	  console.log("Byt Lösenord");
	  $(".pageObj").hide();
	});


	$( "#redigerauppgifterbtn" ).click(function() {
	  console.log("Redigera Uppgifter");
	  $(".pageObj").hide();
	});


	$("#logoutbtn").click(function(){
		logOut();
		isLoggedIn();
	});
	$( "#kontaktbtn" ).click(function() {
	  console.log("Kontakt sida");
	  $(".pageObj").hide();
	  $("#kontaktPage").show();
	});

	$("#newEducationBtn").click(function() {
		var educationId = $("#educationId").val();
		var educationName = $("#educationName").val();
		var educationStart = new Date($("#educationStart").val()).getTime();
		var educationEnd = new Date($("#educationEnd").val()).getTime();
		var newEducation = new createEducation(educationId, educationName, educationStart, educationEnd, sessionid);
		console.log(newEducation);
	});
});


