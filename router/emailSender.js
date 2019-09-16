'use strict';
const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

router.post('/emailsender', async (req, res) => {
    console.log("Aqui vem o req.body:");
    console.log(req.body);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.live.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
              user: "paulo.marcos0108@live.com",
              pass: "70248084461.MP"
            }
          });
    
        let info = await transporter.sendMail({
            from: '"Marcos Paulo 👻" <paulo.marcos0108@live.com>', // sender address
            to: req.body.email2, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: req.body.message, // plain text body
            html: '<b>Hello world?</b>' // html body
        });
        console.log('Message sent: %s', info.messageId);
    
  });

module.exports = router;