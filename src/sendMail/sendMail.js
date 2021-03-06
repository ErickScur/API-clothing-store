const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const ejs = require("ejs");
const fs = require('fs');
let transporter = nodemailer.createTransport(
    smtpTransport({
        host: 'smtp.gmail.com', 
        port: 465, 
        secure: true, 
        service: 'Gmail', 
        auth: { 
            user: "your email", 
            pass: "you 16 digit password" 
        }, 
        tls: { 
            rejectUnauthorized: false 
        } 
    }));

function sendConfirmationMail(email,uuid,name){
     ejs.renderFile(__dirname + "/confirmation.ejs", {email:email, uuid:uuid, name:name}, function (err, data) {
        if(err){
            console.log(err);
        }else{
            transporter.sendMail({
                from: "your email",
                to: email,
                subject:"Please confirm your email!",
                html:data
            }).then(message => {
                console.log(message);
            }).catch(err=>{
                console.log(err);
            })
        }
    });
}
module.exports = sendConfirmationMail;
