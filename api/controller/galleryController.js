var fs = require('fs-extra')
var formidable = require('formidable');
var im = require('imagemagick')
let constants = require("../utility/constants");


module.exports =
    {
        addPic: addPic
    }
function addPic(req, res)
{    console.log("INside formidable >>>>>>" );

    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/images";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024*1024;
    form.multiples = true;
    form.parse(req, (err, fields, files)=> {
        if(err)
        {
            console.log("formidable err is>>>>>>>" , err);
            constants.errResponse(req ,res);
        }
        else
        {
            console.log("formidable upload succesfully >>>>>>>" , files);
            console.log("type of >>>>>>>>>>>" , files.file.path);
            console.log("type of >>>>>>>>>>>" , typeof(files.file));

            constants.successResponse(req ,res, "image upload successfully");

        }

    //     // else{
        //     var arrOfFiles = files;
        //     console.log(">>>>>>>>>>>>>>>>arrof files" ,arrOfFiles.length);
        //     if(arrOfFiles.length > 0 )
        //     {
        //         var fileNames = [];
        //         arrOfFiles.forEach(eachFile=>
        //             {
        //                 fileNames.push(eachFile.path);
        //             });
        //             console.log("success>>>>>>>>>>>>>>>");

        //     }
        //     else{
        //         console.log("failed>>>>>>>>>>>>>>>");
        //     }
        // }
  //  })

    // form.parse(req, function(err, fields, files) {
    //     if(err)
    //     {
    //         console.log(" formidable err is >>>>>" , err);
    //     }
    //     else
    //     {
    //         console.log("req fields >>>>", fields);
    //         console.log("req files >>>>", files);
    //     }

    });
    

   
}