let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let hobbi = new Schema({
    emp_hobbi_name : {type:String}
     
}, {
    timestamps: true
})
module.exports = mongoose.model('hobbi', hobbi);