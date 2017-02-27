class createNewspost {

	constructor(postTitle, postContent){
		// Test communication with the server
		// through the users and Employees objects

		var mem = {}
		
		if(postTitle.length && postContent.length){
			
			// 
			function postCreated(post) {
				// created a new post
				console.log(post);
				console.log("post created");
			}
			
			var nowDate = new Date();
			var fulldate = nowDate.getDate() +"/"+ nowDate.getMonth()+1 +"/"+ nowDate.getFullYear();
			
			// try to create a new student
			NewsPost.create({
				title: postTitle,
				content: postContent,
				for_all: "true",
				date_posted: fulldate,
				postedby_id: sessionid
			},postCreated);
		}
	}
}