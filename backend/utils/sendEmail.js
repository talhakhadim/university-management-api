const nodemailer = require("nodemailer");

("use strict");

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (email, verifyLink, msg) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.STMP_HOST,
    port: process.env.STMP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.STMP_USER,
      pass: process.env.STMP_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Talha Khadim 👻" <talha@gmail.com>', // sender address
    to: email, // list of receivers
    subject: `${msg}`, // Subject line
    // text: `your OTP is ${verifyLink}`, // plain text body
    html: `<a href='${verifyLink}' >click to verify you email </a>`, // html body
  });

  console.log(`Message sent to ${email} `);
};

module.exports = sendEmail;
