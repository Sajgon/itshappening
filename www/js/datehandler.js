function humanDate(epoch){
	var newdate = new Date(epoch);
	var getyear = newdate.getFullYear();
	//month
	var getmonth = newdate.getMonth()+1;
	if ( getmonth < 10) {
		getmonth = "0" + getmonth;
	};
	
	
	var getday = newdate.getDate();
	if ( getday < 10) {
		getday = "0" + getday;
	};
	
	
	var gethour = newdate.getHours();
	if (gethour < 10) {
		gethour = "0" + gethour;
	};
	
	
	var getminute = newdate.getMinutes();
	if (getminute < 10) {
		getminute = "0" + getminute;
	};

	var hightime = getyear + "-" + getmonth + "-" + getday + " " + gethour + ":" + getminute;
	return hightime;
}	
