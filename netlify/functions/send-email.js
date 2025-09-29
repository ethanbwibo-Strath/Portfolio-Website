// netlify/functions/send-email.js
const sgMail = require("@sendgrid/mail");

exports.handler = async (event, context) => {
  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: "enbwibo@gmail.com",          // Where you want to receive messages
      from: "enbwibo@gmail.com",                         
      replyTo: email,                     // The visitor's email
      subject: `[Portfolio Contact] ${subject}`,
      text: `
        You have a new message from your portfolio site:

        Name: ${name}
        Email: ${email}
        Subject: ${subject}

        Message:
        ${message}
      `,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send email" }),
    };
  }
};
