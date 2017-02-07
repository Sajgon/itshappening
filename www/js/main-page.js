


$(function() {
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
		console.log("session id:");
		console.log(sessionid);
		
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
});


function findOnePost(){
	NewsPost.find('5899d43204165a3660061eef',viewPosts);
	
	function viewPosts(posts){
		console.log(posts);
	}
}


function findAllAdminPosts(){
	//NewsPost.find('*',viewPosts);
    //NewsPost.find('*',viewPosts);
	
	NewsPost.find('find/{for_all:/true.*/}',viewPosts);
	
	function viewPosts(posts){
		console.log(posts);
		printPosts(posts)
	}
}

function printPosts(posts){
	if(posts.length){
		for(var p = 0; p < posts.length; p++){
			console.log(posts[p]);
			console.log(posts[p].date_posted);
			
			fulldate = humanDate(posts[p].date_posted);
			
			var post = '<div class="panel panel-default col-xs-12 col-sm-8 paddingfix">' +
						'<div class="panel-heading"><h3 class="panel-title">'+posts[p].title+'</h3></div>' +
						'<div class="panel-body innehall">'+posts[p].content+'</div>' +
						'<div class="panel-footer datum"><span>'+fulldate+'</span><span style="float: right">'+fulldate+'</span></div>' +
						'</div>'
			
			$("#posts").append(post);
			
		}	
	}
}



findAllAdminPosts();
