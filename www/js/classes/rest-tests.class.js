class RestTests {

  constructor(){

    // Test communication with the server
    // through the Students and Employees objects

    var mem = {}, tests = [
      // Clean the database
      () => {
        Student.delete('find/{name:/Pelle.*/}',next);
      },
      () => {
        Employee.delete('find/{name:/Kalle.*/}',next);
      },
      // Tests with Student
      () => {
        Student.create({
          username:"pesv",
          password:"1234",
          name:"Pelle Svanslös",
          age:8
        },next);
      },
      (student) => {
        log('Students created',student);
        Student.find('find/{name:/Pelle.*/}',next);
      },
      (students) => {
        log('All students named Pelle',students);
        mem.student = students[0];
        Student.update(students[0]._id,{age:11},next);
      },
      (result) => {
        log("Updating students Pelle", result);
        Student.find(mem.student._id,next);
      },
      (student) => {
        log("The updated Pelle",student);
        next();
      },
      // Test with employees
      () => {
        Employee.create({
          username: "kallecool",
          password: "1234",
          name:"Kalle Kattälskare",
          age:75,
          phoneNumber:'+46-040-312255',
          students:[mem.student._id],
        },next);
      },
      (employee) => {
        log('Employees created',employee);
        Student.update(mem.student._id,{employee:employee._id},next);
      },
      (result) => {
        log("Added the employees to Pelle...",result);
        Student.find(mem.student._id,next);
      },
      (student) => {
        log("Now Pelle knows about his employees",student);
        Employee.find('find/{name:/Kalle.*/}',next);
      },
      (employees) => {
        log('All employees named Kalle',employees);
        mem.employee = employees[0];
        Employee.update(employees[0]._id,{age:80},next);
      },
      (result) => {
        log("Updating employees Kalle", result);
        Employee.find(mem.employee._id,next);
      },
      (employee) => {
        log("The updated Kalle",employee);
        next();
        // DO NOT RUN THE DELETE TESTS
        // Employees.delete(employees._id,next);
      },
      /*(result) => {
        log("Deleting employees Kalle",result);
        Student.delete(mem.students._id,next);
      },
      (result) => {
        log("Deleting students Pelle",result);
      }*/
    ];

    // Run all tests
    function next(data){
      if(!tests.length){testOutput(); return;}
      if(data && data._error){
        log("Error",data._error);
        $('pre code').last().css({backgroundColor:'#ffe6e6'});
        testOutput();
      }
      else {
        tests.shift()(data);
      }
    }
    next();

    // Log
    var logMem = [];
    function log(explanation,result){
      console.log(explanation,result);
      logMem.push({explanation: explanation, result: result});
    }
	
	
    // Output
    function testOutput(){
      $('body').template('header',{appName: 'REST tests'});
      $('body').template('restTestOutput',{results:logMem});
      // syntax highlighting
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }

  }

}