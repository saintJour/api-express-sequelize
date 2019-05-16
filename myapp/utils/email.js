
const nodemailer = require('nodemailer');
const config = require('../local');

let sendVerificationEmail = async (email, emailToken) => {

  try{

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL.USER,
        pass: config.EMAIL.PASS
      }
    });
    
    let info = await transporter.sendMail({
      from: '"Apuntes" <apuntes@example.com>', 
      to: email, 
      subject: "Bienvenido a Apuntes ✔", 
      text: "Por favor presiona el siguiente link para activar tu cuenta: http://localhost:4200/verify/" + emailToken
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return true;

  }
  catch(e){
    console.log(e);
    return false;
  }
  
}

module.exports = {
  sendVerificationEmail
};
