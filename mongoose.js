var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost");

fs = require('fs');

//old style require model
require('./user.js');

//require all js files under a certain directory
modelDirectory = __dirname + "/models/";
var files = fs.readdirSync(modelDirectory);
for (var i in files) {
    require(modelDirectory + files[i]);
}