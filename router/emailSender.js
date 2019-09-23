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
              user: "dinamicasacademicas@gmail.com",
              pass: "Jdpgb1952"
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
              html: '<p>'+req.body.message+'</p><br/><p>Informações para contato:</p><p>Nome: '+req.body.name+'</p><p>'+req.body.tel+'</p><p>'+req.body.email+'</p>'
            });
            console.log('Message sent: %s', info.messageId); 
            return res.sendStatus(204);
          } catch (error) {
            console.log(error); 
            return res.sendStatus(500);
          }
    
  });

  router.post('/siteemailsender', async (req, res) => {
    console.log("Aqui vem o req.body:");
    console.log(req.body);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: "dinamicasacademicas@gmail.com",
            pass: "Jdpgb1952"
          },
          tls: {
              ignoreTLS: true,
              rejectUnauthorized: false
            }
        });
          try {
            let info = await transporter.sendMail({
              from: ''+req.body.name+'', // sender address
              to: 'jotarn08@gmail.com', // list of receivers
              subject: 'Contato do Site', // Subject line
              text: req.body.message, // plain text body
              html: '<p>'+req.body.message+'</p><br/><p>Informações para contato:</p><p>Nome: '+req.body.name+'</p><p>'+req.body.tel+'</p><p>'+req.body.email+'</p>' 
            });
            console.log('Message sent: %s', info.messageId); 
            return res.sendStatus(204);
          } catch (error) {
            console.log(error); 
            return res.sendStatus(500);
          }
    
  });

  router.post('/emailadvisor', async (req, res) => {
    console.log("Aqui vem o req.body:");
    console.log(req.body);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: "dinamicasacademicas@gmail.com",
            pass: "Jdpgb1952"
          },
          tls: {
              ignoreTLS: true,
              rejectUnauthorized: false
            }
        });
          try {
            let info = await transporter.sendMail({
              from: '', // sender address
              to: 'jotarn08@gmail.com', // list of receivers
              subject: 'Uma aula foi acessada.', // Subject line
              text: 'O email '+req.body.email+' acessou o link: '+req.body.url+'.', // plain text body
              html: '<p>O email '+req.body.email+' acessou o link: <a href="'+req.body.url+'"> '+req.body.url+'.</a></p>'
            });
            console.log('Message sent: %s', info.messageId);
            return res.sendStatus(204);
          } catch (error) {
            console.log(error); 
            return res.sendStatus(500);
          }
    
  });

module.exports = router;