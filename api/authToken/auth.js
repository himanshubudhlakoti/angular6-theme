var jwt = require('jsonwebtoken');
const mySecret = "this is himanshu";
module.exports =
    {
        generateToken: generateToken,
        varifyToken : varifyToken
    }
 //it will generate jwt token   
function generateToken(id) {
    var token = jwt.sign({ id: id }, mySecret, {
        expiresIn: 100 //expires in 100 secound
        
    });
    return token;
}

/*
 to varify token on each request 
 */
function varifyToken(req, res ,next) {//req.headers.authorization
    // console.log("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNzY1Yjc5MDNhZWY0MmM1MDcwYjhhNSIsImlhdCI6MTUzNDUwMjQzMiwiZXhwIjoxNTM0NTg4ODMyfQ.5EX5YsVvxRVD89d3folnmSxGs38AOP1IZFeKzFD5P5Q",'req.headerreq.headerreq.header')
    //  console.log(req.headers.authorization,"<<<<<<<<<<<<<<<<<<<<<<<<req.headers.authorizationreq.headers.authorizationreq.headers.authorization")
 console.log("token value is >>>>>", req.headers.token);
    jwt.verify(req.headers.authorization, mySecret, function(err, decoded) {
    if (err)
    {
        console.log("jwt token varification error is >>>>>>>>>" ,err);
        res.json({
            "status" : 400,
            messege : 'invalid user',
            data : null
        });
    }
    else if(decoded)
    {
        console.log("jwt token varification is successful >>>>>>>>>" ,decoded);
        next()
    }
})
}
