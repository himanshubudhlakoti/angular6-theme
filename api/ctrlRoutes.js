let express = require("express");
let router = express.Router();
var path = require('path');
var multer = require("multer");
let userController = require('./controller/userController');
let validateToken = require("./authToken/auth");
let galleryController = require("./controller/galleryController")
console.log("type of >>>>>>>>>>>>>>>", require("./authToken/auth").generateToken)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("FILE>>>", file);
    // console.log("req body>>>", req.body);

    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    console.log("filename ", file.fieldname);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})
var upload = multer({ storage: storage}).single('file');

router.post("/uploadFile",upload, userController.addUser);
router.post("/login" , userController.login);
router.post("/forgotPassword" , userController.forgotPassword);

router.get("/generateXls",userController.generateXls);
router.post("/getAllUsers", validateToken.varifyToken , userController.getAllUsers);
router.post("/addPic", galleryController.addPic);
// router.post("/addPic", userController.convertApi);





module.exports = router;
