/* eslint no-console: 0 */

'use strict';
const nodemailer = require('nodemailer');
const fs = require('fs')
const cors = require('cors');
const express = require('express');
const app = express(),
      bodyParser = require("body-parser"),
      port = 3080;

app.use(cors({
    origin: '*'
}));
// place holder for the data
// const users = ['u1','u2','u3'];

app.use(bodyParser.json());

// app.get('/api/users', (req, res) => {
//   console.log('api/users called!!!!')
//   res.json(users);
// });

app.post('/api/sendemail', (req, res) => {
  const email = req.body.email;
  console.log('sending email');  
  buildAndSendEmail(email,res); 
});

app.get('/', (req,res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

// const chokidar = require('chokidar');
// const watcher = chokidar.watch('c:/Users/eitan/Desktop/email-test.html', {
//   ignored: /(^|[/\\])\../, // ignore dotfiles
//   persistent: true
// });

// watcher  
//   .on('change', path => {
//       console.log(`File ${path} has been changed`)
//       sendEmail()
//     })  

function buildAndSendEmail(html,res){
    let emailTemplatePath = "c:/Users/eitan/Desktop/email-test-template.html";
    // let sendFilePath = "c:/Users/eitan/Desktop/email-test.html";
    fs.readFile(emailTemplatePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      
      let fullEmail = data.replace("<--content-->", html);
      sendEmail(fullEmail,res);
    //   fs.writeFile(sendFilePath, this.fileContent, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //   });
    });
}

// fs.watch('c:/Users/eitan/Desktop/email-test.html', function() {
//     //console.log("File changed!");
//     sendEmail()
// });

function sendEmail(data,res){
    // fs.readFile('c:/Users/eitan/Desktop/email-test.html', 'utf8' , (err, data) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }        
        
        // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err) => {
        if (err) {
            console.error('Failed to create a testing account');
            console.error(err);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: 'eitan2007@gmail.com',
                    pass: 'gnnjozexfwnmwewi'
                },
                logger: true,
                transactionLog: true // include SMTP traffic in the logs
            },
            {
                // default message fields

                // sender info
                from: 'Nodemailer <example@nodemailer.com>',
                headers: {
                    'X-Laziness-level': 1000 // just an example header, no need to use this
                }
            }
        );

        // Message object
        let message = {
            // Comma separated list of recipients
            to: 'eitan2007@gmail.com',

            // Subject of the message
            subject: 'Nodemailer is unicode friendly ✔' + Date.now(),

            // // plaintext body
            // text:'fghfghfg',

            // HTML body
            html: data,

            // AMP4EMAIL
            amp: `<!doctype html>
            <html ⚡4email>
            <head>
                <meta charset="utf-8">
                <style amp4email-boilerplate>body{visibility:hidden}</style>
                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
            </head>
            <body>
                <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
                <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
            </body>
            </html>`,

            // An array of attachments
            attachments: [
                // String attachment
                // {
                //     filename: 'notes.txt',
                //     content: 'Some notes about this e-mail',
                //     contentType: 'text/plain' // optional, would be detected from the filename
                // },

                // Binary Buffer attachment
                {
                    filename: 'image1.png',
                    content: Buffer.from(
                        '',
                        'base64'
                    ),

                    cid: 'image1' // should be as unique as possible
                },

                // File Stream attachment
                // {
                //     filename: 'nyan cat ✔.gif',
                //     path: __dirname + '/assets/nyan.gif',
                //     cid: 'nyan@example.com' // should be as unique as possible
                // }
            ],

            // list: {
            //     // List-Help: <mailto:admin@example.com?subject=help>
            //     help: 'admin@example.com?subject=help',

            //     // List-Unsubscribe: <http://example.com> (Comment)
            //     unsubscribe: [
            //         {
            //             url: 'http://example.com/unsubscribe',
            //             comment: 'A short note about this url'
            //         },
            //         'unsubscribe@example.com'
            //     ],

            //     // List-ID: "comment" <example.com>
            //     id: {
            //         url: 'mylist.example.com',
            //         comment: 'This is my awesome list'
            //     }
            // }
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return process.exit(1);
            }
            
            res.json("success");
            console.log('Message sent successfully!');
            console.log(nodemailer.getTestMessageUrl(info));

            // only needed when using pooled connections
            transporter.close();    
        });

    });    
}