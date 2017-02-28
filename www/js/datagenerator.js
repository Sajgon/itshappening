
$(function() {
		
	// REMOVE
	
	// REMOVE POSTS
	$("#removePosts").click(function(){
		console.log("Removing all posts...");
		deleteAllPosts();
		$("#datapage-title").html("Alla inlägg är borttagna!");
	});
	
	// REMOVE STUDENTS
	$("#removeStudents").click(function(){
		console.log("Removing all students...");
		deleteAllStudents();
		$("#datapage-title").html("Alla studenter är borttagna!");
	});
	
	// REMOVE TEACHERS
	$("#removeTeachers").click(function(){
		console.log("Removing all TEACHERS...");
		findAllEmployees(function(teachers){
			
			for(var i = 0; i < teachers.length; i++){
				if(teachers[i]._id && teachers[i].admin == false){
					deleteAccountById(teachers[i]._id);
				}
			}
			$("#datapage-title").html("Alla studenter är borttagna!");
		});
		
	});
	
	// REMOVE EDUCATIONS
	$("#removeEducations").click(function(){
		console.log("Removing all EDUCATIONS...");
		deleteAllEducations();
		$("#datapage-title").html("Alla utbildningar är borttagna!");
	});

	// ADD
	$("#addPosts").click(function(){
		createNewspostData();
		$("#datapage-title").html("Nya inlägg tillagda i databasen!");
		printPosts();
	});

	$("#addStudents").click(function(){
		createStudentData();
		$("#datapage-title").html("Nya studenter tillagda i databasen!");
	});

	$("#addTeachers").click(function(){
		createTeacherData();
		$("#datapage-title").html("Nya lärare tillagda i databasen!");
	});
	
	$("#addEducations").click(function(){
		createEducationData();
		$("#datapage-title").html("Nya utbildningar tillagda i databasen!");
	});
	
	function createNewspostData(){
		for(var i = 0; i < postData.length;i++){
			// example: new createNewspost(postTitle, postContent);
			new createNewspost(postData[i].title, postData[i].content);	
		}
		return true;
	}
	
	function createStudentData(){
		for(var i = 0; i < studentData.length;i++){
			new createAccount(studentData[i].username, studentData[i].password, studentData[i].personal, "Student", studentData[i].fname, studentData[i].lname);	
		}
		return true;
	}

	function createTeacherData(){
		for(var i = 0; i < teacherData.length;i++){
			// exempel new createAccount(mailadrs, userpass, personal, usertype, "test", "test");
			new createAccount(teacherData[i].username, teacherData[i].password, teacherData[i].personal, "Employee", teacherData[i].fname, teacherData[i].lname);	
		}
		return true;
	}
	
	function createEducationData(){
		console.log(educationData);
		console.log(educationData.length);
		for(var i = 0; i < educationData.length;i++){
			
			education = educationData[i];
			
			// exempel var newEducation = new createEducation(educationId, educationName, startDate, endDate, sessionid);
			new createEducation(education.educationId, education.educationName, education.startDate, education.endDate, sessionid);
		}

		return true;
	}
	
});


var postData = [
	{
	  "for_all": true,
	  "title": "Välkommen våren!",
	  "content": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst."
	}, {
	  "for_all": true,
	  "title": "Nya utbildningar!",
	  "content": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."
	}, {
	  "for_all": true,
	  "title": "Uppdaterad webbplats!",
	  "content": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."
	}, {
	  "for_all": true,
	  "title": "6th generation",
	  "content": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
	}, {
	  "for_all": true,
	  "title": "Välkommen till nya admin!",
	  "content": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."
	}, {
	  "for_all": true,
	  "title": "Nya utbildningar!",
	  "content": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."
	}, {
	  "for_all": true,
	  "title": "Ny funktion!",
	  "content": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum."
	}, {
	  "for_all": true,
	  "title": "Välkommen våren!",
	  "content": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."
	}
]

var educationData = [
	{
	  "educationId": "TE2EA",
	  "educationName": "JAVASCRIPT PROGRAMMING",
	  "startDate": "21/10/2016",
	  "endDate": "05/06/2017"
	}, {
	  "educationId": "2EDWQ",
	  "educationName": "HTML PROGRAMMING",
	  "startDate": "15/11/2016",
	  "endDate": "06/06/2017"
	}, {
	  "educationId": "FQ32Q",
	  "educationName": "CSS PROGRAMMING",
	  "startDate": "09/06/2016",
	  "endDate": "08/06/2017"
	}, {
	  "educationId": "FSEF3",
	  "educationName": "PYTHON PROGRAMMING",
	  "startDate": "27/11/2016",
	  "endDate": "05/06/2017"
	}, {
	  "educationId": "QD2FQ",
	  "educationName": "JAVA PROGRAMMING",
	  "startDate": "18/02/2017",
	  "endDate": "01/06/2019"
	}, {
	  "educationId": "AWDY5",
	  "educationName": "LUA PROGRAMMING",
	  "startDate": "01/02/2017",
	  "endDate": "05/06/2019"
	}, {
	  "educationId": "32TRW",
	  "educationName": "C++ PROGRAMMING",
	  "startDate": "21/10/2016",
	  "endDate": "06/06/2017"
	}, {
	  "educationId": "G23GS",
	  "educationName": "ANGULAR 4 PROGRAMMING",
	  "startDate": "02/11/2016",
	  "endDate": "05/06/2017"
	}, {
	  "educationId": "H54RE",
	  "educationName": "PHP PROGRAMMING",
	  "startDate": "16/04/2016",
	  "endDate": "06/06/2017"
	}, {
	  "educationId": "GA42S",
	  "educationName": "RUBY PROGRAMMING",
	  "startDate": "28/04/2016",
	  "endDate": "06/06/2017"
	}, {
	  "educationId": "TKGE4",
	  "educationName": "SQL PROGRAMMING",
	  "startDate": "22/01/2017",
	  "endDate": "04/06/2018"
	}, {
	  "educationId": "K8D4A",
	  "educationName": ".NET PROGRAMMING",
	  "startDate": "11/02/2016",
	  "endDate": "04/06/2018"
	}, {
	  "educationId": "G2WD1",
	  "educationName": "GO PROGRAMMING",
	  "startDate": "06/08/2016",
	  "endDate": "03/06/2017"
	}, {
	  "educationId": "12EEA",
	  "educationName": "HASKELL PROGRAMMING",
	  "startDate": "23/07/2016",
	  "endDate": "06/06/2017"
	}, {
	  "educationId": "G433W",
	  "educationName": "ACTIONSCRIPT PROGRAMMING",
	  "startDate": "04/08/2016",
	  "endDate": "02/06/2017"
	}
]



var studentData = [
	{"fname":"Steven","lname":"Reyes","username":"test@student.com","personal":192483322590,"password":"123","joined":"13/03/2002","educations":[]},
	{"fname":"Mildred","lname":"Wright","username":"mwright1@engadget.com","personal":194193242791,"password":"123","joined":"13/02/2006","educations":[]},
	{"fname":"Stephanie","lname":"Oliver","username":"soliver2@cbsnews.com","personal":195335460007,"password":"123","joined":"29/04/2013","educations":[]},
	{"fname":"Lois","lname":"Rice","username":"lrice3@dmoz.org","personal":197253171124,"password":"123","joined":"15/09/2009","educations":[]},
	{"fname":"Lillian","lname":"Jacobs","username":"ljacobs4@indiegogo.com","personal":196529197595,"password":"123","joined":"25/03/2015","educations":[]},
	{"fname":"Gerald","lname":"Ryan","username":"gryan5@printfriendly.com","personal":197769626867,"password":"123","joined":"06/02/2011","educations":[]},
	{"fname":"Peter","lname":"Roberts","username":"proberts6@google.com.au","personal":197698544931,"password":"123","joined":"11/12/2014","educations":[]},
	{"fname":"Louis","lname":"Snyder","username":"lsnyder7@mit.edu","personal":197947832247,"password":"123","joined":"29/09/2013","educations":[]},
	{"fname":"Jane","lname":"Owens","username":"jowens8@discuz.net","personal":195357842110,"password":"123","joined":"19/09/2011","educations":[]},
	{"fname":"Jeremy","lname":"Carr","username":"jcarr9@businessweek.com","personal":201119287953,"password":"123","joined":"13/05/2002","educations":[]},
	{"fname":"Doris","lname":"Peters","username":"dpetersa@bbc.co.uk","personal":197531656076,"password":"123","joined":"29/11/2004","educations":[]},
	{"fname":"Louise","lname":"Wood","username":"lwoodb@sitemeter.com","personal":196171511546,"password":"123","joined":"23/09/2008","educations":[]},
	{"fname":"Frank","lname":"Martinez","username":"fmartinezc@boston.com","personal":198918645321,"password":"123","joined":"21/02/2001","educations":[]},
	{"fname":"Catherine","lname":"Rose","username":"crosed@europa.eu","personal":196635860569,"password":"123","joined":"11/04/2001","educations":[]},
	{"fname":"Cynthia","lname":"Wallace","username":"cwallacee@cbc.ca","personal":197259223798,"password":"123","joined":"24/03/2007","educations":[]},
	{"fname":"Joseph","lname":"Brooks","username":"jbrooksf@163.com","personal":190527607010,"password":"123","joined":"09/03/2006","educations":[]},
	{"fname":"Robin","lname":"Montgomery","username":"rmontgomeryg@cmu.edu","personal":195403295232,"password":"123","joined":"02/07/2015","educations":[]},
	{"fname":"Patrick","lname":"Lawrence","username":"plawrenceh@php.net","personal":194875292817,"password":"123","joined":"11/01/2005","educations":[]},
	{"fname":"Albert","lname":"Baker","username":"abakeri@ebay.com","personal":192532696401,"password":"123","joined":"26/12/2003","educations":[]},
	{"fname":"Jonathan","lname":"Bell","username":"jbellj@chicagotribune.com","personal":193189394301,"password":"123","joined":"19/05/2006","educations":[]},
	{"fname":"William","lname":"Hamilton","username":"whamiltonk@ted.com","personal":201367084768,"password":"123","joined":"24/06/2002","educations":[]},
	{"fname":"David","lname":"Morgan","username":"dmorganl@mtv.com","personal":194738864352,"password":"123","joined":"15/10/2005","educations":[]},
	{"fname":"Larry","lname":"Armstrong","username":"larmstrongm@umich.edu","personal":195812653973,"password":"123","joined":"10/06/2000","educations":[]},
	{"fname":"Wanda","lname":"Flores","username":"wfloresn@purevolume.com","personal":198783039977,"password":"123","joined":"02/12/2009","educations":[]},
	{"fname":"Beverly","lname":"Robertson","username":"brobertsono@behance.net","personal":199607283406,"password":"123","joined":"02/02/2001","educations":[]},
	{"fname":"Judy","lname":"Gomez","username":"jgomezp@nydailynews.com","personal":198147024118,"password":"123","joined":"17/01/2003","educations":[]},
	{"fname":"Douglas","lname":"Schmidt","username":"dschmidtq@slate.com","personal":195580122544,"password":"123","joined":"03/09/2001","educations":[]},
	{"fname":"Karen","lname":"Russell","username":"krussellr@springer.com","personal":193528016486,"password":"123","joined":"08/02/2013","educations":[]},
	{"fname":"Christina","lname":"Watkins","username":"cwatkinss@seesaa.net","personal":194357972508,"password":"123","joined":"07/04/2000","educations":[]},
	{"fname":"Randy","lname":"Ryan","username":"rryant@spotify.com","personal":190856462263,"password":"123","joined":"26/06/2005","educations":[]},
	{"fname":"Michelle","lname":"Grant","username":"mgrantu@cdc.gov","personal":199123543351,"password":"123","joined":"30/08/2011","educations":[]},
	{"fname":"Jeffrey","lname":"Lawrence","username":"jlawrencev@hud.gov","personal":195778563929,"password":"123","joined":"14/06/2011","educations":[]},
	{"fname":"Lillian","lname":"Davis","username":"ldavisw@symantec.com","personal":193524717652,"password":"123","joined":"04/01/2011","educations":[]},
	{"fname":"Deborah","lname":"Carpenter","username":"dcarpenterx@paginegialle.it","personal":190697358646,"password":"123","joined":"02/05/2007","educations":[]},
	{"fname":"Katherine","lname":"Alvarez","username":"kalvarezy@vkontakte.ru","personal":195625783598,"password":"123","joined":"23/12/2002","educations":[]},
	{"fname":"Robert","lname":"Harper","username":"rharperz@scribd.com","personal":195559960212,"password":"lDWNHr6q","joined":"18/07/2013","educations":[]},
	{"fname":"Andrew","lname":"Holmes","username":"aholmes10@economist.com","personal":192940975671,"password":"QIrUTQj6bB","joined":"24/04/2006","educations":[]},
	{"fname":"Jack","lname":"Lee","username":"jlee11@mozilla.com","personal":190167261316,"password":"wj3beKTJIQx","joined":"08/06/2006","educations":[]},
	{"fname":"Alice","lname":"Fields","username":"afields12@domainmarket.com","personal":196380856163,"password":"ih0hwCLUov","joined":"14/09/2006","educations":[]},
	{"fname":"Gary","lname":"Romero","username":"gromero13@army.mil","personal":191867631050,"password":"sHCmNpN","joined":"03/01/2011","educations":[]},
	{"fname":"Phillip","lname":"Banks","username":"pbanks14@earthlink.net","personal":196297811201,"password":"TpRpJkGT","joined":"02/05/2009","educations":[]},
	{"fname":"Elizabeth","lname":"Owens","username":"eowens15@geocities.jp","personal":192652777663,"password":"A0IfXYjvhWA","joined":"12/06/2007","educations":[]},
	{"fname":"Joyce","lname":"Henderson","username":"jhenderson16@etsy.com","personal":195094748055,"password":"7KKHfEW3V6","joined":"25/09/2010","educations":[]},
	{"fname":"Jessica","lname":"Carroll","username":"jcarroll17@dmoz.org","personal":192817688107,"password":"K1NBIf5U5RD","joined":"13/02/2010","educations":[]},
	{"fname":"Shirley","lname":"Myers","username":"smyers18@stanford.edu","personal":191888014190,"password":"rQKxYUfojan","joined":"21/10/2014","educations":[]},
	{"fname":"Jack","lname":"Brown","username":"jbrown19@icio.us","personal":190772429184,"password":"H3UakGj2Hiz","joined":"09/04/2003","educations":[]},
	{"fname":"Susan","lname":"Boyd","username":"sboyd1a@vkontakte.ru","personal":192145967386,"password":"yaqKrfo","joined":"14/08/2001","educations":[]},
	{"fname":"Lori","lname":"Gomez","username":"lgomez1b@usatoday.com","personal":193161418547,"password":"TkoPBRhZfE","joined":"08/01/2010","educations":[]},
	{"fname":"Joseph","lname":"Garrett","username":"jgarrett1c@bravesites.com","personal":190030452500,"password":"zeAJQH","joined":"26/05/2009","educations":[]},
	{"fname":"Aaron","lname":"Armstrong","username":"aarmstrong1d@digg.com","personal":193277260915,"password":"GIivcnvyaQP","joined":"09/01/2008","educations":[]},
	{"fname":"Louise","lname":"Garrett","username":"lgarrett1e@wikispaces.com","personal":199042912789,"password":"lxRGe4B5zby","joined":"20/11/2014","educations":[]},
	{"fname":"Norma","lname":"Murray","username":"nmurray1f@wordpress.org","personal":199232619118,"password":"JmT5WFg2p","joined":"04/08/2005","educations":[]},
	{"fname":"Virginia","lname":"Reed","username":"vreed1g@webnode.com","personal":191583638959,"password":"b3V05Ba","joined":"06/05/2004","educations":[]},
	{"fname":"Elizabeth","lname":"Edwards","username":"eedwards1h@webeden.co.uk","personal":199333088488,"password":"lybF2YAnsWi","joined":"21/12/2013","educations":[]},
	{"fname":"Jimmy","lname":"Bowman","username":"jbowman1i@comsenz.com","personal":195073932989,"password":"uvi95XI7a","joined":"13/09/2005","educations":[]},
	{"fname":"James","lname":"Williams","username":"jwilliams1j@examiner.com","personal":190346015658,"password":"X6CSXheI","joined":"24/04/2014","educations":[]},
	{"fname":"Russell","lname":"Freeman","username":"rfreeman1k@telegraph.co.uk","personal":199385673848,"password":"bK4tT8HdKGkv","joined":"03/08/2012","educations":[]},
	{"fname":"Alan","lname":"Stanley","username":"astanley1l@intel.com","personal":200074937498,"password":"XOhfvNSv","joined":"01/06/2011","educations":[]},
	{"fname":"Mark","lname":"Bailey","username":"mbailey1m@about.com","personal":191143993858,"password":"HUYIIio8","joined":"20/11/2015","educations":[]},
	{"fname":"Patricia","lname":"Garcia","username":"pgarcia1n@phoca.cz","personal":190430149730,"password":"fzs1Py0","joined":"12/12/2006","educations":[]},
	{"fname":"Heather","lname":"Watson","username":"hwatson1o@miitbeian.gov.cn","personal":200803221353,"password":"VPANJ9apu","joined":"13/11/2015","educations":[]},
	{"fname":"Nicholas","lname":"Ryan","username":"nryan1p@mapquest.com","personal":200669132746,"password":"73hMx3","joined":"07/04/2001","educations":[]},
	{"fname":"Laura","lname":"Oliver","username":"loliver1q@phoca.cz","personal":197106032853,"password":"yb4Ni6JMW","joined":"15/05/2008","educations":[]},
	{"fname":"Scott","lname":"Baker","username":"sbaker1r@constantcontact.com","personal":192882647611,"password":"PjeV3RASV0bi","joined":"13/10/2016","educations":[]},
	{"fname":"Jonathan","lname":"Clark","username":"jclark1s@ezinearticles.com","personal":200824600365,"password":"ynGTte1T","joined":"19/11/2009","educations":[]},
	{"fname":"Johnny","lname":"Austin","username":"jaustin1t@ox.ac.uk","personal":192601403794,"password":"tAdwGkMn","joined":"14/08/2006","educations":[]},
	{"fname":"Raymond","lname":"Peterson","username":"rpeterson1u@google.ca","personal":195550043067,"password":"d3HyuevB9To","joined":"25/11/2010","educations":[]},
	{"fname":"Daniel","lname":"Ryan","username":"dryan1v@nifty.com","personal":190605169122,"password":"EgwvzRaiT","joined":"28/01/2005","educations":[]},
	{"fname":"William","lname":"Fisher","username":"wfisher1w@twitter.com","personal":201528990154,"password":"r9lxHOY","joined":"22/10/2008","educations":[]},
	{"fname":"Mark","lname":"Carr","username":"mcarr1x@ed.gov","personal":190162608941,"password":"P5oQne","joined":"03/09/2012","educations":[]},
	{"fname":"Timothy","lname":"Kennedy","username":"tkennedy1y@ocn.ne.jp","personal":201157926044,"password":"w4pwmIFn4","joined":"18/08/2015","educations":[]},
	{"fname":"Gary","lname":"Rice","username":"grice1z@spotify.com","personal":198812069359,"password":"s0XQN20POld","joined":"08/09/2001","educations":[]},
	{"fname":"Annie","lname":"Gomez","username":"agomez20@va.gov","personal":193323447322,"password":"Qc6DMcmFP","joined":"11/02/2005","educations":[]},
	{"fname":"Denise","lname":"Schmidt","username":"dschmidt21@shinystat.com","personal":196727581683,"password":"l14o7jFZ2sM","joined":"13/02/2012","educations":[]},
	{"fname":"Wanda","lname":"Olson","username":"wolson22@stumbleupon.com","personal":198795057965,"password":"DUs3Ot","joined":"19/01/2005","educations":[]},
	{"fname":"Doris","lname":"Bryant","username":"dbryant23@about.com","personal":192281980847,"password":"yhVySd","joined":"05/04/2010","educations":[]},
	{"fname":"Steve","lname":"Mason","username":"smason24@imgur.com","personal":190091666592,"password":"XVqyRbxFXm","joined":"01/10/2008","educations":[]},
	{"fname":"Howard","lname":"Reed","username":"hreed25@about.com","personal":198927441878,"password":"GLdtaN8kDm","joined":"17/10/2005","educations":[]},
	{"fname":"Maria","lname":"Cook","username":"mcook26@whitehouse.gov","personal":193676966879,"password":"xlZ1vsRcK1yu","joined":"22/11/2001","educations":[]},
	{"fname":"Joshua","lname":"Reed","username":"jreed27@prlog.org","personal":196471053216,"password":"rWm5goJ","joined":"10/10/2007","educations":[]},
	{"fname":"Diane","lname":"Medina","username":"dmedina28@microsoft.com","personal":196595930829,"password":"uyHNFAueQP","joined":"08/04/2003","educations":[]},
	{"fname":"Margaret","lname":"Nichols","username":"mnichols29@is.gd","personal":194789836489,"password":"JXPNgKSh","joined":"24/04/2006","educations":[]},
	{"fname":"Wanda","lname":"Gutierrez","username":"wgutierrez2a@state.tx.us","personal":197528301515,"password":"BuhZvp","joined":"24/04/2012","educations":[]},
	{"fname":"Mark","lname":"Sims","username":"msims2b@xrea.com","personal":196918244952,"password":"NjsuGGr5","joined":"24/12/2009","educations":[]},
	{"fname":"Philip","lname":"Matthews","username":"pmatthews2c@time.com","personal":193066019017,"password":"cKN2vusZ32yJ","joined":"13/01/2007","educations":[]},
	{"fname":"Kimberly","lname":"Wagner","username":"kwagner2d@vinaora.com","personal":193459527274,"password":"o9AgOY","joined":"24/04/2008","educations":[]},
	{"fname":"Theresa","lname":"Rodriguez","username":"trodriguez2e@1und1.de","personal":191995510008,"password":"CkSqkwu","joined":"04/01/2016","educations":[]},
	{"fname":"Wayne","lname":"Snyder","username":"wsnyder2f@joomla.org","personal":198533241194,"password":"cpIMJIfL","joined":"09/01/2003","educations":[]},
	{"fname":"Michelle","lname":"Nguyen","username":"mnguyen2g@blinklist.com","personal":198053026793,"password":"5bvnXzN7","joined":"23/04/2016","educations":[]},
	{"fname":"Betty","lname":"Hill","username":"bhill2h@nih.gov","personal":197613684648,"password":"UOUV7oWamGke","joined":"12/05/2016","educations":[]},
	{"fname":"Steven","lname":"Henry","username":"shenry2i@tiny.cc","personal":192404439824,"password":"3ojvds","joined":"22/02/2002","educations":[]},
	{"fname":"Elizabeth","lname":"Romero","username":"eromero2j@unc.edu","personal":195756089343,"password":"ppZNX6cvfUk","joined":"15/05/2010","educations":[]},
	{"fname":"William","lname":"Ross","username":"wross2k@bbb.org","personal":194130608146,"password":"TOcdvSeDT","joined":"24/06/2000","educations":[]},
	{"fname":"Daniel","lname":"Davis","username":"ddavis2l@google.com.au","personal":200672529433,"password":"8Kd3p0ZrPlhr","joined":"19/06/2005","educations":[]},
	{"fname":"Ruby","lname":"Romero","username":"rromero2m@joomla.org","personal":193807821428,"password":"mL7R5R","joined":"22/02/2001","educations":[]},
	{"fname":"Wayne","lname":"Walker","username":"wwalker2n@hao123.com","personal":196934193494,"password":"kYstqp5j","joined":"10/11/2013","educations":[]},
	{"fname":"Ann","lname":"Burke","username":"aburke2o@statcounter.com","personal":201292974312,"password":"183jtfflWXX","joined":"17/05/2013","educations":[]},
	{"fname":"Frances","lname":"Ramirez","username":"framirez2p@mapquest.com","personal":198235521757,"password":"bNigLtsgL7FA","joined":"05/08/2004","educations":[]},
	{"fname":"Ruth","lname":"Gibson","username":"rgibson2q@telegraph.co.uk","personal":201550463916,"password":"AGVh077","joined":"17/11/2016","educations":[]},
	{"fname":"Sharon","lname":"Meyer","username":"smeyer2r@ow.ly","personal":192303669002,"password":"39rrRfwKvt","joined":"14/12/2006","educations":[]}
]



var teacherData = [

	{"fname":"Kathryn","lname":"Dixon","username":"test@teacher.com","personal":192748908050,"password":"123","joined":"06.03.1998","educations":[]},
	{"fname":"Janet","lname":"Ward","username":"jward1@google.cn","personal":200051615944,"password":"123","joined":"13.06.2002","educations":[]},
	{"fname":"Debra","lname":"Reyes","username":"dreyes2@mozilla.org","personal":198672707972,"password":"pUYVLUpDv5R","joined":"25.05.1995","educations":[]},
	{"fname":"Jerry","lname":"Wagner","username":"jwagner3@arizona.edu","personal":190525204928,"password":"EDv5MRkYa4f","joined":"27.03.2006","educations":[]},
	{"fname":"Kathy","lname":"Boyd","username":"kboyd4@gnu.org","personal":191515306591,"password":"OwbeL6","joined":"30.06.2015","educations":[]},
	{"fname":"Ryan","lname":"Dixon","username":"rdixon5@sakura.ne.jp","personal":198566036541,"password":"BhVvQoH9Tbzc","joined":"12.06.1996","educations":[]},
	{"fname":"Jesse","lname":"Cox","username":"jcox6@google.es","personal":197893924642,"password":"mkPeU4PvQoPm","joined":"02.01.2002","educations":[]},
	{"fname":"Shawn","lname":"Stephens","username":"sstephens7@taobao.com","personal":195894780982,"password":"ALZCJX88rP","joined":"12.07.2012","educations":[]},
	{"fname":"Elizabeth","lname":"Greene","username":"egreene8@foxnews.com","personal":191236648156,"password":"GxtWzyK","joined":"05.09.1998","educations":[]},
	{"fname":"Patricia","lname":"Kennedy","username":"pkennedy9@state.tx.us","personal":196884372630,"password":"owr9dQBo","joined":"19.07.2014","educations":[]},
	{"fname":"Robert","lname":"Woods","username":"rwoodsa@ft.com","personal":195471093878,"password":"Qq0Mj47B","joined":"07.05.1991","educations":[]},
	{"fname":"Benjamin","lname":"Miller","username":"bmillerb@amazon.co.uk","personal":192743596558,"password":"7xdlbVT6jqI","joined":"22.10.2001","educations":[]},
	{"fname":"Maria","lname":"Stevens","username":"mstevensc@unesco.org","personal":195354290381,"password":"tgKXWJqc","joined":"30.04.2005","educations":[]},
	{"fname":"Maria","lname":"Reid","username":"mreidd@behance.net","personal":190538591114,"password":"W8gOm3tzBY8","joined":"06.12.1990","educations":[]},
	{"fname":"George","lname":"Jones","username":"gjonese@google.nl","personal":194886597756,"password":"Fx5EPzXknY","joined":"24.06.1994","educations":[]},
	{"fname":"Matthew","lname":"Jordan","username":"mjordanf@earthlink.net","personal":192850516248,"password":"fdQ3uW","joined":"19.09.1995","educations":[]},
	{"fname":"Rachel","lname":"Harris","username":"rharrisg@twitpic.com","personal":198005316608,"password":"Q6Xt2vKU0xX","joined":"24.04.2008","educations":[]},
	{"fname":"Eugene","lname":"Cox","username":"ecoxh@instagram.com","personal":196451874125,"password":"4ZpGRRstb","joined":"20.09.1997","educations":[]},
	{"fname":"Phyllis","lname":"Gibson","username":"pgibsoni@artisteer.com","personal":196220721675,"password":"123","joined":"13.12.1999","educations":[]},
	{"fname":"Sara","lname":"Hunter","username":"shunterj@ucla.edu","personal":198167415564,"password":"2gtlTsiSt","joined":"28.03.2015","educations":[]}

]