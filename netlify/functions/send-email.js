// netlify/functions/send-email.js
const sgMail = require("@sendgrid/mail");

exports.handler = async (event, context) => {
  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // 🔹 Email you receive
    const msgToMe = {
      to: "enbwibo@gmail.com",     // your inbox
      from: "enbwibo@gmail.com",   // must be a verified sender in SendGrid
      replyTo: email,              // lets you hit "Reply" directly
      subject: `[Portfolio Contact] ${subject}`,
      text: `
        New message from your portfolio:

        Name: ${name}
        Email: ${email}
        Subject: ${subject}

        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color:#0ea5e9;">📩 New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="margin:20px 0; border:none; border-top:1px solid #eee;">
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr style="margin:20px 0; border:none; border-top:1px solid #eee;">
          <p style="font-size:0.9em; color:#555;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    };

    // 🔹 Optional: Auto-reply to the sender
    const msgToSender = {
      to: email,
      from: "enbwibo@gmail.com", // same verified sender
      subject: `Thanks for reaching out, ${name}!`,
      text: `
        Hi ${name},

        Thanks for contacting me! I’ve received your message and will get back to you soon.

        Here’s what you sent:
        Subject: ${subject}
        Message: ${message}

        — Ethan Bwibo
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color:#0ea5e9;">Hi ${name}, thanks for reaching out!</h2>
          <p>I’ve received your message and will get back to you soon.</p>
          <h4>Your Message:</h4>
          <p><strong>Subject:</strong> ${subject}</p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <br>
          <p>Best regards,</p>
          <p><strong>Ethan Bwibo</strong></p>
        </div>
      `,
    };

    // Send both emails in parallel
    await sgMail.send(msgToMe);
    await sgMail.send(msgToSender);

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
