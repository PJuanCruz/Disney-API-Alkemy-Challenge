const mailRover = require('./mailer');
// const transporter = require('./mailer');

const sendRegisterMail = async (userEmail) => {
  mailRover(async (transporter) => {
    await transporter.sendMail({
      from: `"PJuanCruz" <${process.env.NODEMAILER_USER}>`,
      to: userEmail,
      subject: 'Bienvenido!',
      html: `
      <html lang="en-US">
      <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <style type="text/css">
          a:hover {
            text-decoration: underline !important;
          }
        </style>
      </head>
    
      <body
        marginheight="0"
        topmargin="0"
        marginwidth="0"
        style="margin: 0px; background-color: #f2f3f8"
        leftmargin="0"
      >
          <h2>BIENVENIDO! Gracias por visitar este proyecto.<h2>
      </body>
    </html>`,
    });
  });
};

module.exports = sendRegisterMail;
