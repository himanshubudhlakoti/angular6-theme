let mongoose = require('mongoose');
// var db = require('../db.js');
let Schema = mongoose.Schema;
let userDetail = new Schema({
    user_fname : {type:String},
    user_lname : {type:String},
    user_email : {type:String},
    user_password : {type:String},
    token : { type : String},
    role : {type : String},
    image : String
    
}, {
    timestamps: true
})
module.exports = mongoose.model('userDetail', userDetail);