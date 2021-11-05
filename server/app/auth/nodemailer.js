const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASS,
	},
});

const sendRegisterMail = async (to, code) => {
	await transporter.sendMail({
		from: "Bristols",
		to,
		subject: "Welcome to Bristols!",
		html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Bristols!</title>
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
          <h1 class="title">Welcome to Bristols!</h1>
          <p class="content">
            Here is you secret code to finalize your registration to Bristols.
          </p>
          <p class="code">${code}</p>
        </div>
      </body>
    </html>`,
	});
};

module.exports = { sendRegisterMail };
