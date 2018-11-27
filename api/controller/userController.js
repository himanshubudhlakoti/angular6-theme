var mongoose = require("mongoose");
var json2xls = require('json2xls');
var fs = require('fs');
var waterfall = require('async-waterfall');

var convertapi = require('convertapi')('JCKNLpyNkFwlExEN');

// var userDetailModel = mongoose.model("userDetail");
var userDetailModel = require("../schema/userDetail");
let constants = require("../utility/constants");
let crypto_ctrl = require("../crypto_ctrl/security");
let auth = require("../authToken/auth");
let emailController = require("./emailController");
module.exports = 
{
    addUser : addUser,
    login : login,
    forgotPassword : forgotPassword,
    generateXls : generateXls,
    getAllUsers : getAllUsers,
    convertApi : convertApi
}
function addUser(req ,res)
{
   // console.log("req>>>>>","localhost:3000/images"+req.file.filename);
    console.log("???????",req.body);
    let imageUrl = "http://localhost:3000/images/"+req.file.filename;
    let encriptedPassword = crypto_ctrl.encrypt(req.body.userPassword);
    console.log("encripted password >>>>>>>>>>>>>>", encriptedPassword);


    try {
        let user = new userDetailModel({
            user_fname: req.body.userName,
            user_email: req.body.userEmail,
            user_password: encriptedPassword,
            role: 'user',
            token: null,
            image : imageUrl
        });
        user.save(function (err, result) {
            if (err) {
                console.log(">>>>>>>>>>> error is ", err)
                res.json({
                    status: 400,
                    data: 'err'
                });
            } else if (result) {
                console.log(">>>>>>>>>>> error is ", err)

                res.json({
                    status: 200,
                    data: result
                });

            } else {
                console.log(result)
                res.json({
                    status: 200,
                    data: 'gone to null'
                });
            }
        });
    } catch (e) {
        console.log("add user exception is>>>>>>>>>>", e);
    }

}
function login(req , res)
{  
    let userEmail = req.body.userEmail,
    userPassword = req.body.userPassword,
    encriptedPassword = crypto_ctrl.encrypt(userPassword),
    userDataWithToken = {};

    async function login()
    {
        await userDetailModel.find({user_email : userEmail , user_password : encriptedPassword},(err ,userData)=>
        {
            if(err)
            {
                constants.errResponse(req ,res);
            }
            else if(userData.length > 0)
            {   
                let token =  auth.generateToken(userData[0]._id);
                userDataWithToken.token = token;
                userDataWithToken. userData = userData;
                return userDataWithToken;  
            }
            else
            {   
                constants.notFoundResponse(req ,res ,null);
            }
            return "hello";
        })
    }
    login().then(a=>
        {   console.log("::::::::::::::" ,a);
            let userId = userDataWithToken.userData[0]._id ;
            userDetailModel.update({_id : userId},{$set:{token : userDataWithToken.token}}).exec((err , data)=>
            {
                if(err)
                {
                    constants.errResponse(req ,res);
                }
                else
                {  
                    constants.successResponse(req , res , userDataWithToken)
                }
            })
        })
}
function forgotPassword(req , res)
{
    let userEmail = req.body.userEmail;
    userDetailModel.find({user_email : userEmail }).exec((err , userData)=>
    {
        if(err)
        {   
            constants.errResponse(req ,res);
        }
        else if(userData.length > 0)
        {  
            emailController.sendEmail(req , res , userData);
        }
        else
        {  
            constants.notFoundResponse(req , res , `${userEmail} is not registered with us please enter registered email`)
        }

    })
}
function generateXls(req , res)
{
    let fileName = "himanshu";
    console.log("inside generateXls??>>>>>>>");
    var userData = {
    firstName: 'himanshu',
    lastName: 'budhalakoti',
    contact: '9638527410',
    updatedAt: new Date()
    }

        var file = './public/images/upload_9c71b31767f52100847945ade8efbaeb.png';
        res.download(file, (err)=>
        {   if(err)
            {
                console.log("err is >>>>", err);

            }
        }); 

    // var xls = json2xls(userData);
    // fs.writeFileSync(`./public/assets/${fileName}.xlsx`, xls, 'binary');
    // res.json({
    //     status: 200,
    //     data: 'validuser',
    //     path : `localhost:3000/assets/${fileName}.xlsx`
    // });
}

function getAllUsers(req ,res)
{   console.log("<<<<<<<<<<inside getAllUsers??>>>>>>>" , req.body);

    let pageNumber = req.body.pageNumber,
    limit = req.body.limit,
    skip = (parseInt(pageNumber)-1) *  parseInt(limit),
    isSearching = req.body.isSearching,
    condition ={},
    searchingData = req.body.searchingData,
    regex = new RegExp(searchingData); // it will convert string to regex like "searchingData"  to   /searchingData/
    if(isSearching)
    {   
        condition = {user_email :{$regex : regex ,$options : 'i' }}
        console.log("isSearch>>>>" , condition);
    }
    
    userDetailModel.find(condition).skip(skip).limit(limit).exec((err ,usersData)=>
    {
        if(err)
        {
            console.log(" getAllUsers err is " , err);
        }
        else{
            res.json({"status" : 200 , data : usersData});
        }
    })
   
}
function convertApi(req , res)
{  console.log("inside convert>>>>>>>>" ,Date.now());
   let url= `./public/pdf/file${Date.now()}.pdf`;
   convertapi.convert('pdf', { File: './public/images/upload_9a2f6a5ccba6025c80bf0e1754fd7abe.docx' })
  .then(function(result) {
    // get converted file url
    console.log("Converted file url: " + result.file.url);
    // console.log("Converted file url>>>>>>>>: " , JSON.parse(result.file));


    // save to file
    return result.file.save(url);
  })
  .then(function(file) {
    console.log("File saved: " + file);
  })
}