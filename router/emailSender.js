'use strict';
const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

router.post('/emailsender', async (req, res) => {
    console.log("Aqui vem o req.body:");
    console.log(req.body);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
              user: "paulo.marcos0108@gmail.com",
              pass: "70248084461MP"
            },
            tls: {
                ignoreTLS: true,
                rejectUnauthorized: false
              }
          });
          try {
            let info = await transporter.sendMail({
              from: '"Marcos Paulo 👻" <paulo.marcos0108@live.com>', // sender address
              to: req.body.email, // list of receivers
              subject: 'Hello ✔', // Subject line
              text: req.body.message, // plain text body
              html: '<b>'+req.body.message+'</b>' // html body
          });
            console.log('Message sent: %s', info.messageId); 
          } catch (error) {
            console.log(error); 
          }
    
  });

module.exports = router;