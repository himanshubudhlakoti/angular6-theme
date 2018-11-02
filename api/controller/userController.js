var mongoose = require("mongoose");
var userDetailModel = mongoose.model("userDetail");

var crypto_ctrl = require("../crypto_ctrl/security");
module.exports = 
{
    addUser : addUser,
    login : login
}
function addUser(req ,res)
{
    console.log("req>>>>>","localhost:3000/images"+req.file.filename);
    console.log("???????",req.body);
    let imageUrl = "localhost:3000/images/"+req.file.filename;
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
function login()
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
                data: 'validuser'
            });
        }
    })
}