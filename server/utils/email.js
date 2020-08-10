const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);
  console.log(`Message sent\n ${message}\n and the info we got is \n ${info} `);
};

exports.emailData = {
  from: process.env.EMAIL_FROM,
  to: req.body.email,
  subject: `Password Reset link`,
  html: `
          <h1>Please use the following link to reset your password</h1>
          <p>${process.env.CLIENT_URL}/auth/password/reset/${resetToken}</p>
          <hr />
          <p>This email may contain sensetive information</p>
          <p>${process.env.CLIENT_URL}</p>
      `,
};
