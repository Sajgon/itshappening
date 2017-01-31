// Create som new rest entitites
// (also see classes/rest-entity.class.js)
var Student = new RestEntity('student');
var Employee = new RestEntity('employee');
var Login = new RestEntity('login');

// Some utility methods for forms
var formHelpers = new FormHelpers();

// Load html templates
// (also see libs/template.jquery.js)
if(loadTemplate){
	$.loadTemplates([
	  'header',
	  'modal',
	  'navbar',
	  'restTestOutput',
	  'tableFromObject',
	  'formFromObject'
	],start);
}

// Start the app
function start(){
  // Wait for DOM ready
  $(()=>{
    // Create the main navbar
    new MainNavbar();
    // Run the rest tests
    new RestTests();
  });
}
