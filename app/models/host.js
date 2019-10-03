var mongoose = require('mongoose');
//schema to our host details
var hostSchema = mongoose.Schema({
firstName:{type:String},
lastName:{type:String},
nic:{type:String},
address:{type:String},
phonenumber:{type:Number}


});


module.exports = mongoose.model('host', hostSchema);
