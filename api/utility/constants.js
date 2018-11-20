module.exports=
{   errResponse : errResponse,
    successResponse : successResponse,
    notFoundResponse : notFoundResponse,
    messages:  {
        dbErr : "Something Went Wrong",
        success : "Records Fetched Successfully!",
        notfound : "No Records Found"
    },
    codes : {
        errCode : 500,
        successCode : 200,
        notfoundCode : 400 
    }
}
function errResponse(req ,res)
{
   res.json(
    {   code : 403,
        messages : "Something Went Wrong"
    });
}

function successResponse(req ,res ,data)
{
   res.json(
    {   code : 200,
        data: data,
        messages : "Records Fetched Successfully!"
    });
}
function notFoundResponse(req ,res , data)
{
   res.json(
    {   code : 400,
        messages : "Records Not Found",
        data : data
    });
}

