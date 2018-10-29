const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_Api2');
// mongoose.connect('mongodb://localhost:27017/childsitting', { user: 'childsitting', pass: 'Dsf34sdewa' });		//SDN Staging server


var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error'));
db.once('open',function(callback){
    console.log('connection succeeded');
})