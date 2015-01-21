var mongoose = require('mongoose'), Schema = mongoose.Schema;

mongoose.model('user', new Schema({
    name: String,
    age: Number
}));