// Create som new rest entitites
// (also see rest-entity.class.js)
var Student = new RestEntity('student');
var Employee = new RestEntity('employee');

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
    Student.create({name:"Pelle Svanslös",age:8},next);
  },
  (student) => {
    console.log('Students created',student);
    Student.find('find/{name:/Pelle.*/}',next);
  },
  (students) => {
    console.log('All students named Pelle',students);
    mem.student = students[0];
    Student.update(students[0]._id,{age:11},next);
  },
  (result) => {
    console.log("Updating students Pelle", result);
    Student.find(mem.student._id,next);
  },
  (student) => {
    console.log("The updated Pelle",student);
    next();
  },
  // Test with Employees
  () => {
    Employee.create({
      name:"Kalle Kattälskare",
      age:75,
      phoneNumber:'+46-040-312255',
      students:[mem.student._id],
    },next);
  },
  (employee) => {
    console.log('Employee created',employee);
    Student.update(mem.student._id,{employee:employee._id},next);
  },
  (result) => {
    console.log("Added the employees to Pelle...",result);
    Student.find(mem.student._id,next);
  },
  (student) => {
    console.log("Now Pelle knows about his employees",student);
    Employee.find('find/{name:/Kalle.*/}',next);
  },
  (employees) => {
    console.log('All Employees named Kalle',employees);
    mem.employee = employees[0];
    Employee.update(employees[0]._id,{age:80},next);
  },
  (result) => {
    console.log("Updating employees Kalle", result);
    Employee.find(mem.employee._id,next);
  },
  (employee) => {
    console.log("The updated Kalle",employee);
    Employee.delete(employee._id,next);
  },
  (result) => {
    console.log("Deleting employees Kalle",result);
    Student.delete(mem.student._id,next);
  },
  (result) => {
    console.log("Deleting students Pelle",result);
  }
];

// Run all tests
function next(data){
  if(!tests.length){return;}
  tests.shift()(data);
}
next();


// Display the console.log on screen
// - just for fun and a more human friendly output
(function(){
  var org = console.log;
  console.log = function(explanation,result){
    $('body').append(
      '<h2>' + explanation + '</h2><pre><code class="json">' +
      JSON.stringify(result,'','  ') + '</code></pre>'
    );
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    return org.apply(console,arguments);
  };
})();

