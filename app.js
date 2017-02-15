// Npm modules
var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var sha1 = require('sha1');
var mongoose = require('mongoose');
require('mongoosefromclass')(mongoose);

// Make some things global
global.mongoose = mongoose;
global.sha1 = sha1;
global.userRoles = ['Student','Employee', 'Admin'];
global.passwordSalt = "shouldBeHardToGuess132638@@@@x";

// Stop mongoose from using an old promise library
// (takes away the warning "mpromise is deprecated")
mongoose.Promise = Promise;

// Load classes, make them global and
// then convert selected ones to modules
var classesToLoad = {
  Sessionhandler: true,
  Loginhandler: true,
  Restrouter: true,
  Session: 'module',
  User: 'module',
  Student: 'module',
  Employee: 'module',
  NewsPost: 'module',
  Education: 'module'
};

for(let className in classesToLoad){
  let pathName = './modules/' + className.toLowerCase() + '.class';
  let required = require(pathName);
  global[className] = required;
}
for(let className in classesToLoad){
  if(classesToLoad[className] == 'module'){
    global[className] = mongoose.fromClass(global[className]);
  }
}

// Create a new express server, store in the variable app
var app = express();

// Make the express server able to read the body of requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Make the express server able to handle
// cookies, sessions and logins
app.use(cookieparser());
app.use(new Sessionhandler(Session).middleware());

// Never cache request starting with "/rest/"
app.use((req,res,next)=>{
  if(req.url.indexOf('/rest/') >= 0){
    // never cache rest requests
    res.set("Cache-Control", "no-store, must-revalidate");
  }
  next();
});

// Create restroutes to selected classes/mongoose models
new Restrouter(app,Student);
new Restrouter(app,Employee);
new Restrouter(app,NewsPost);
new Restrouter(app,Education);
new Loginhandler(app);

// A path to get user roles
app.get('/rest/user-roles',(req,res)=>{
  res.json(global.userRoles);
});

// Point to a folder where we have static files
// (our frontend code)
app.use(express.static('www'));

// Connect to mongoDB
// and when that is done start the express server
mongoose.connect('mongodb://localhost/itshappeningdb');
mongoose.connection.once('open',function(){
  app.listen(3000, function () {
    console.log('Express app listening on port 3000!');
  });
});



