let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let kidsDetails = new Schema({
    parentName : {type:String},
    kids : [{kidName : String}],
   
    
}, {
    timestamps: true
})
module.exports = mongoose.model('kidsDetail', kidsDetails);