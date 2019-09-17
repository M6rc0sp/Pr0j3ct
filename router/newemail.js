const nodemailer = require('nodemailer');

async function email() {

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
              to: 'paulo.marcos0108@live.com', // list of receivers
              subject: 'Hello ✔', // Subject line
              text: 'req.body.message', // plain text body
              html: '<b>Hello world?</b>' // html body
          });
            console.log('Message sent: %s', info.messageId); 
          } catch (error) {
            console.log(error); 
          }
    
  }

email();