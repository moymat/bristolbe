const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendRegisterMail = async (to, code) => {
  await transporter.sendMail({
    from: "Bristol",
    to,
    subject: "Welcome to Bristol!",
    html: `<!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Bristol!</title>
        <style>
          * {
            margin: 0;
            padding: 0;
          }
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .title {
            margin-top: 18px;
          }
          .content {
            margin-top: 12px;
          }
          .code {
            text-transform: uppercase;
            font-size: 28px;
            font-weight: bolder;
            text-decoration: none;
            margin-top: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="title">Welcome to Bristol!</h1>
          <p class="content">
            Here is your secret code to finalize your registration to Bristols.
          </p>
          <p class="code">${code}</p>
        </div>
      </body>
    </html>`,
  });
};

const sendResetPasswordMail = async (to, code) => {
  const link = `${process.env.CLIENT_URL}/reset/${code}`;
  await transporter.sendMail({
    from: "Bristols",
    to,
    subject: "Reset your password",
    html: `<!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset your password</title>
        <style>
          * {
            margin: 0;
            padding: 0;
          }
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .title {
            margin-top: 18px;
            text-align: center;
          }
          .content {
            margin-top: 12px;
          }
          .link {
            font-weight: bolder;
            text-decoration: none;
            color: #1565c0;
            margin-top: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="title">Reset your password</h1>
          <p class="content">
            Click the link below to reset your password. This link will expire  in 10 minutes.
          </p>
          <a href="${link}" class="link">Click here</a>
        </div>
      </body>
    </html>`,
  });
};

module.exports = { sendRegisterMail, sendResetPasswordMail };
