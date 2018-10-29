let express = require("express");
let router = express.Router();
var path = require('path');
var multer = require("multer");

let authcontroller = require('./controller/authController');
let userController = require('./controller/userController');

let validateToken = require("./authToken/auth");

console.log("type of >>>>>>>>>>>>>>>",require("./authToken/auth").generateToken)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("FILE>>>" , file);
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      console.log("filename ", file.fieldname);
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  })
   var upload = multer({ storage: storage }).single('file');

  router.post("/uploadFile",upload ,userController.addUser)
  
//   (req ,res)=>{
//       console.log("asdfsfas???????????",req);
//     console.log("req>>>>>","localhost:3000/images"+req.file.filename);
//     console.log("???????",req.body);
//     res.send("localhost:3000/images/"+req.file.filename);
//   });



router.post('/adduser', authcontroller.addUser);

router.post('/adduser' , require("./authToken/auth").generateToken);

router.get('/addkid' ,authcontroller.getKidsData);
router.post('/uploadImage' ,authcontroller.uploadImage);

module.exports = router;



/*these are lines
require('./mainroute.js')(router)
module.exports = router;
    console.log("all roteus >>>>>>>>>>>");


    */

    // router.get('/list', );
    // router.post('/delete', );
    // router.post('/update', );
//    return router/;




// module.exports = function(express) {
//     var router = express.Router()
//     console.log('test routere ', router)
//     require('./controller/authController')(router);
//     return router;
// }





