var mongoose = require("mongoose");
var json2xls = require('json2xls');
var fs = require('fs');
// var userDetailModel = mongoose.model("userDetail");
var userDetailModel = require("../schema/userDetail");

var crypto_ctrl = require("../crypto_ctrl/security");
module.exports = 
{
    addUser : addUser,
    login : login,
    generateXls : generateXls,
    getAllUsers : getAllUsers
}
function addUser(req ,res)
{
    console.log("req>>>>>","localhost:3000/images"+req.file.filename);
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
    userDetailModel.find({user_email : req.body.userEmail , user_password : req.body.userPassword},(err ,data)=>
    {
        if(err)
        {
            res.json({
                status: 400,
                data: 'err'
            });
        }
        else if(data)
        {
            res.json({
                status: 200,
                data: 'validuser',
                path : "localhost:3000/assets/111.xlsx"
            });
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

    var xls = json2xls(userData);
    fs.writeFileSync(`./public/assets/${fileName}.xlsx`, xls, 'binary');
    res.json({
        status: 200,
        data: 'validuser',
        path : `localhost:3000/assets/${fileName}.xlsx`
    });
}

function getAllUsers(req ,res)
{   console.log("<<<<<<<<<<inside getAllUsers??>>>>>>>" , req.body);
    let pageNumber = req.body.pageNumber,
    limit = req.body.limit,
    skip = (parseInt(pageNumber)-1) *  parseInt(limit),
    isSearching = req.body.isSearching,
    condition ={}
    if(isSearching)
    {   console.log("isSearch>>>>");
        condition = {}
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