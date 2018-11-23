'use strict';
const nodemailer = require('nodemailer');
const crypto = require('../crypto_ctrl/security');
let constants = require("../utility/constants");

        
module.exports =
{
    sendEmail : function (req ,res , userData)
    {
        console.log("send email>>>>>>>" ,userData[0].user_email);
        let userEmail = userData[0].user_email,
        encriptedEmail = crypto.encrypt(userEmail);
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                // port: 587,
                // secure: false, // true for 465, false for other ports
                auth: {
                    user: "bhimanshu75@gmail.com", // generated ethereal user
                    pass: "himanshu@123" // generated ethereal password
                }
            });

            let mailOptions = {
                from: 'bhimanshu75@gmail.com', 
                to: userEmail,
                subject: 'Reset Password ✔', 
                text: 'Hello world?',
                html: '<b><a href="http://localhost:4200/#/login/forgot?id='+ encriptedEmail +'">Click on link to Reset Password </a></b>'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    constants.errResponse(req ,res);
                    return console.log("email error is " , error);

                }
                console.log('Message sent: %s', info.messageId);
                constants.successResponse(req ,res ,`Please Check ${userEmail} to reset password  `);

                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });

    }
}