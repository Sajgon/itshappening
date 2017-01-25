// Npm modules
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
require('mongoosefromclass')(mongoose);

// Stop mongoose from using an old promise library
// (takes away the warning "mpromise is deprecated")
mongoose.Promise = Promise;

// We need to make mongoose a global because
// we use it for certain data types in our
// schemas (defined in different classes)
global.mongoose = mongoose;

// Classes (as modules)
var Restrouter = require('./modules/restrouter.class');
var Kitten = require('./modules/kitten.class');
var Owner = require('./modules/owner.class');

// Create a new express server, store in the variable app
var app = express();

// Make the express server able to read the body of requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Convert selected classes to mongoose models
Kitten = mongoose.fromClass(Kitten);
Owner = mongoose.fromClass(Owner);

// Create restroutes to selected classes/mongoose models
new Restrouter(app,Kitten,'owner');
new Restrouter(app,Owner,'kittens');

// Point to a folder where we have static files
// (our frontend code)
app.use(express.static('www'));

// Connect to mongoDB
// and when that is done start the express server
mongoose.connect('mongodb://localhost/kittendb');
mongoose.connection.once('open',function(){
  app.listen(3000, function () {
    console.log('Express app listening on port 3000!');
  });
});
