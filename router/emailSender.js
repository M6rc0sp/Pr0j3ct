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
    
          try {
            let info = await transporter.sendMail({
                from: '"Marcos Paulo 👻" <paulo.marcos0108@live.com>', // sender address
                to: 'paulo.marcos0108@live.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
            });
            console.log('Message sent: %s', info.messageId);
          } catch (err) {
            return res.sendStatus(500);
          }
    
  });

module.exports = router;