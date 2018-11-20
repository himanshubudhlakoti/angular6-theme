var jwt = require('jsonwebtoken');
const mySecret = "this is himanshu";
module.exports =
    {
        generateToken: generateToken,
        varifyToken : varifyToken
    }
 //it will generate jwt token   
function generateToken(id) {
    console.log("*************************************");
    console.log("<<userid for generating JWT token>>>", id);
    console.log("*************************************");

    var token = jwt.sign({ id: id }, mySecret, {
        expiresIn: 20000 //expires in 100 secound
        
    });
    return token;
}

/*
 to varify token on each request 
 */
function varifyToken(req, res ,next) {//req.headers.authorization
    let tokenArr = req.headers.authorization.split(" "),
    token = tokenArr[1];

    jwt.verify( token, mySecret, function(err, decoded) {
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
        console.log("***************************************************************");
        console.log("jwt token varification is successful " ,decoded);
        console.log("***************************************************************");

        next()
    }
})
}
