let mongoose = require('mongoose');


var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../uploads/images')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});



let usermodel = require("../schema/userDetail");
let pupulation_model = require('../schema/emp_hobbies');
let emp_model = require('../schema/employee_schema');
// var kidsDataModel = mongoose.model('kidsDetail',"kidsDetail")
var kidsDataModel = require("../schema/kidz.js");
let auth = require('../authToken/auth');
const crypto = require('../crypto_ctrl/security');


//importing database


module.exports = {
    login: login,
    addUser: addUser,
    deleteUser: deleteUser,
    listUser: listUser,
    testing_populate : testing_populate,
    testing_populate2 : testing_populate2,
    push_hobbi : push_hobbi,
    getFullData :getFullData,
    getKidsData: getKidsData,
    editUser : editUser,
    uploadImage : uploadImage
}
function uploadImage(req ,res)
{   console.log("req file<<<<<<<" , req.file)
    console.log(">>>>>>>>>>", upload.single('req.file'))
}

function addUser(req, res) {
    console.log("data at add user controler >>>>>>>>>> ", req.body);
    try {
        let encriptedPassword = crypto.encrypt(req.body.userpassword);
        console.log("encripted password >>>>>>>>>>>>>>", encriptedPassword);

        let user = new usermodel({
            user_fname: req.body.fname,
            user_lname: req.body.lname,
            user_email: req.body.useremail,
            user_password: encriptedPassword,
            role: 'user',
            token: null

        });
        user.save(function (err, result) {
            console.log('result')
            if (err) {
                console.log(">>>>>>>>>>> error is ", err)
                res.json({
                    status: 400,
                    data: 'err'
                });
            } else if (result) {
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
        console.log("add user error is>>>>>>>>>>", e);
    }
}


function deleteUser(req, res) {
    console.log("user id from fornt  user id>>>>>>>>>>>>>>>>>> ", req.body.user_id);

    try {

        console.log("user id from fornt  user id>>>>>>>>>>>>>>>>>> ", req.body.user_id);
        usermodel.findByIdAndRemove({
            _id: req.body.user_id
        }).exec(function (err, result) {
            if (err) {
                res.json({
                    status: 400,
                    data: err
                });
            } else {
                res.json({
                    status: 200,
                    data: 'data sucessfully removed'
                });
            }
        });
    } catch (e) {
        console.log("deleteUser catch error is", e);

    }
}

function editUser(req, res) {
    console.log("user id from fornt  for edit>>>>>>>>>>>>>>>>>> ", req.query);

    // try {

    //     usermodel.update({
    //         _id: req.body.user_id
    //     }).exec(function (err, result) {
    //         if (err) {
    //             res.json({
    //                 status: 400,
    //                 data: err
    //             });
    //         } else {
    //             res.json({
    //                 status: 200,
    //                 data: 'data sucessfully removed'
    //             });
    //         }
    //     });
    // } catch (e) {
    //     console.log("deleteUser catch error is", e);

    // }
}

function listUser(req, res) {
    console.log("headers >>>>>", req.headers)
    try {
        console.log("button num..>>>>>>>>>>>>>",req.body.page);
        let skip = (parseInt(req.body.page) -1) * 2;
        console.log("skip >>>>>>>>>>>>",skip);
        usermodel.find({}).limit(2).skip(skip).exec(function (err, result) {
            console.log("????????????????????",result);
            let count = result.length;
            if (err) {
                res.json({
                    status: 400,
                    data: err
                });
            }
            if (result.length == 0) {
                res.json({
                    status: 404,
                    data: 'not fount'
                });
            } else {
                //   console.log(result);
                res.json({
                    status: 200,
                    data: result,
                    count : count
                });
            }
        })
    } catch (e) {
        console.log("listUser catch error is>>>>>>>", e);
    }
}

function login(req, res) {
    async function login1() {
        console.log("???")
         await usermodel.find({
            user_email: req.body.useremail
        }, function (err, data) {
            console.log("data >>>",data)
            if (err) {
                console.log("varify email err >>>>>>>", err)
            } else if (data.length == 1) {
                console.log("email matched>> calling for password>>>>>>", data)
                if (crypto.decrypt(data[0].user_password) == req.body.userpassword)
                {
                    console.log("password mactched")
                    let token = (auth.generateToken(data[0]._id))

                    res.json({status: 200,data: data[0],token: token});
                }
                else{
                    console.log("password not mactched")
                    res.json({ status: 404, data: 'not fount'});
                }
                    // return "password"
             }// else {
            //     console.log("no data");
            // }
        })
    }
    login1().then(userEmail => {
        console.log("user email >>>>>>>>>??????????????", userEmail)


    })
}


function testing_populate(req, res) {
    let hobbi = new pupulation_model({
        emp_hobbi_name : req.body.hobbi
    })
    hobbi.save((err ,data) =>
    {
        if(err)
        {
            console.log("error is >>>>>>>", err);
        } 
        else
        {
            console.log("data is >>>>>",data)
        } 
    })
}
function testing_populate2(req, res) {
    let emp_details = new emp_model({
    emp_fname : req.body.emp_fname,
    emp_email : req.body.emp_email,
    hobbbies : ["5b853fd1ff99e13c54cf8933"],
   
    })
    emp_details.save((err ,data) =>
    {
        if(err)
        {
            console.log("error is >>>>>>>", err);
        } 
        else
        {
            console.log("data is >>>>>",data)
        } 
    })
}

function push_hobbi(req, res) {
    emp_model.update({_id : "5b86860af2df225341a31b23"},{$push:{hobbbies : "5b853f848f8c473c2b11d87e"}}).exec((err ,data)=>
    {
        if(err)
        {
            console.log("err is >>>.",err);
        }
        else{
            console.log("data is >>>.",data);

        }
    })  
}

function getFullData(req, res) {

emp_model.find({ _id : "5b86860af2df225341a31b23"}).populate('hobbbies').exec((err ,data)=>{
    if(err)
        {
            console.log("error is >>>>>>>", err);
        } 
        else
        {
            console.log("data is >>>>>",data)
            res.send(data)
        } 
})
}
function getKidsData(req, res) {

   // kidsData.find({ _id : "5b86860af2df225341a31b23"}).populate('hobbbies').exec((err ,data)=>{
       console.log("????")
        // let kids = new kidsDataModel({
        //     parentName : req.body.parentName,
        //     kids : [{kidName : req.body.kidName},{kidName : req.body.kidName2}]

        // });
        // kids.save(function (err, result) {
        //     console.log('result')
        //     if (err) {
        //         console.log(">>>>>>>>>>> error is ", err)
        //         res.json({
        //             status: 400,
        //             data: 'err'
        //         });
        //     } else if (result) {
        //         res.json({
        //             status: 200,
        //             data: result
        //         });

        //     } else {
        //         console.log(result)
        //         res.json({
        //             status: 200,
        //             data: 'gone to null'
        //         });
        //     }
        // // });

        
        var str ="kids.$.kidName";
        // var toReplace = str.match(/[0]/g)
        var userId = "5b9b5a73241df722725b14b4";
        var index =0;
        var name ="22124333mahsasdfasdfdsehbhai";
        var key = str.replace(str[5] ,index);
        
        var condition ={$set:{[key]: name}}
        console.log(condition ,"....................",str[5])

        kidsDataModel.update({_id :userId},condition,(err, data)=> {
            if(err)
            {
                console.log("error is >>>>>>>", err);
            } 
            else
            {
                console.log("data is >>>>>",data)
                res.send(data)
            }           });



    }




    //     if(err)
    //         {
    //             console.log("error is >>>>>>>", err);
    //         } 
    //         else
    //         {
    //             console.log("data is >>>>>",data)
    //             res.send(data)
    //         } 
    // })
    // }
// function deleteUser(req, res) {

// }

// module.exports.name = function (req, res){

// }
// module.exports = {
//     name : name
// }

// function name(req, res) {

// }