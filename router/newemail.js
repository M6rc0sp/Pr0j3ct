'use strict';

const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

async function email() {

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
            to: 'paulo.marcos0108@live.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'req.body.message', // plain text body
            html: '<b>Hello world?</b>' // html body
        });
        console.log('Message sent: %s', info.messageId);
    
  }

email().catch(console.error);