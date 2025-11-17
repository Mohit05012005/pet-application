const nodemailer = require('nodemailer');

const sendEmail = async function (option){        // option contain about who sending to whome and message
    // CREATE A TRANSPORTER
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })
//
    const emailOption = {
        from:process.env.EMAIL_USER,
        to:option.email,
        subject:option.subject,
        text: option.text
    }
   await transporter.sendMail(emailOption);
}


module.exports = sendEmail;