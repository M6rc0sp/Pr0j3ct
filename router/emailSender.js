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
              from: ''+req.body.name+'', // sender address
              to: 'paulo.marcos0108@live.com', // list of receivers
              subject: 'Contato do Blog', // Subject line
              text: req.body.message, // plain text body
              html: '<p>'+req.body.message+'</p><br/><p>Informações para contato:</p><p>'+req.body.tel+'</p><br/><p>'+req.body.email+'</p>' // html body
          });
            console.log('Message sent: %s', info.messageId); 
          } catch (error) {
            console.log(error); 
          }
    
  });

module.exports = router;