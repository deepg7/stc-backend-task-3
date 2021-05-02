const nodemailer=require('nodemailer')
const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });


function mailer(to,subject,text){
    console.log('in mailer')
const output = `
  <h1>STC-VIT Welcomes You!</h1>
    <img src="cid:stc" alt="STC-LOGO">
    <p>${text}</p>
    
  `;
 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
  service:"gmail", // 
  auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASS  // generated ethereal password
  },
  tls:{
    rejectUnauthorized:false
  }
});
//mythilikiranemani,deepgandhi151
// setup email data with unicode symbols
let mailOptions = {
    from:process.env.EMAIL , // sender address
    to: to, // list of receivers
    subject: subject, // Subject
    html:output,
    attachments: [
    {   // use URL as an attachment
      filename: 'stc-logo.jpeg',
      path: __dirname + '/stc-logo.jpeg',
      cid:'stc'
  }]

};


// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('mailsent')
});
}

module.exports=mailer