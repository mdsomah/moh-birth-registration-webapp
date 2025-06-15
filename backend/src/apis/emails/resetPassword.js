require("dotenv").config();
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const logoURL = "http://localhost:5000/api/v1/images/logo/MOH-LOGO.png";

const passwordResetEmail = asyncHandler(async (option) => {
  try {
    const transporter = nodemailer.createTransport({
      host: `${process.env.EMAIL_HOST}`,
      service: `${process.env.EMAIL_SERVICE}`,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: `${process.env.EMAIL_ID}`,
        pass: `${process.env.EMAIL_APP_PASSWORD}`,
      },
    });
    const mailOptions = {
      from: `"MOH Birth Registration System" <${process.env.EMAIL_ID}>`,
      to: option.email,
      subject: option.subject,
      text: option.message,
      html: option.message,
      attachments: [
        {
          filename: "MOH-LOGO.png",
          path: `${logoURL}`,
          cid: "mohLogo",
        },
      ],
    };
    await transporter.sendMail(mailOptions, (err, _info) => {
      if (err) console.log(err);
    });
  } catch (err) {
    console.log(err, "Email not sent!");
  }
});

const mailTemplate = (displayName, content, buttonUrl, buttonText) => {
  return `<!DOCTYPE html>
  <html>
  <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
    <div
      style="
        max-width: 450px;
        margin: 10px;
        background-color: #fafafa;
        padding: 25px;
        border-radius: 20px;
      "
    >
      <div style="margin-bottom: 15px;">
        <img src="cid:mohLogo" style="width: 100px; height: 100px;" />
      </div>
      <p style="text-align: left;">
        ${displayName}
      </p>
      <p style="text-align: left;">
        ${content}
      </p>
      <a href="${buttonUrl}" target="_blank">
        <button
          style="
            background-color: #000;
            border: 0;
            width: 200px;
            height: 30px;
            border-radius: 6px;
            color: #d4bf79;
            cursor: pointer;
            margin-top: 5px;
            margin-bottom: 5px;
          "
        >
          ${buttonText}
        </button>
      </a>
      <p style="text-align: left;">
        If you are unable to click the above button, copy paste the below URL into your browser.
      </p>
      <a href="${buttonUrl}" target="_blank">
          <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">
            ${buttonUrl}
          </p>
      </a>
    </div>
  </body>
</html>`;
};

module.exports = { passwordResetEmail, mailTemplate };
