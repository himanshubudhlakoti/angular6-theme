let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let empDetails = new Schema({
    emp_fname : {type:String},
    emp_email : {type:String},
    hobbbies : [{type:mongoose.Schema.Types.ObjectId , ref: 'hobbi'}],
   
    
}, {
    timestamps: true
})
module.exports = mongoose.model('empDetails', empDetails);