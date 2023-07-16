const nodemailer = require('nodemailer');

const sendMail = async ({ to, subject, body }) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Product hunter 🐻" <product@hunt.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html: body, // html body
  });

  return nodemailer.getTestMessageUrl(info);
};

module.exports = sendMail;
