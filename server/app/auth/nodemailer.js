const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const SibApiV3Sdk = require("@sendinblue/client");

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
);
const sender = { name: "Bristols", email: process.env.BREVO_SENDER_EMAIL };

const sendRegisterMail = async (email, code) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = sender;
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = "Welcome to Bristol!";
    sendSmtpEmail.htmlContent = `<!DOCTYPE html>
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
    </html>`;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error(
      "Error: failed to send Welcome email: \n",
      JSON.stringify(error, null, 2),
    );
  }
};

const sendResetPasswordMail = async (email, code) => {
  try {
    const link = `${process.env.CLIENT_URL}/reset/${code}`;
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = sender;
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = "Reset your password";
    sendSmtpEmail.htmlContent = `<!DOCTYPE html>
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
    </html>`;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error(
      "Error: failed to send Welcome email: \n",
      JSON.stringify(error, null, 2),
    );
  }
};

module.exports = { sendRegisterMail, sendResetPasswordMail };
