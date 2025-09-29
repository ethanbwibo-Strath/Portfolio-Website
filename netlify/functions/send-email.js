// netlify/functions/send-email.js
const sgMail = require("@sendgrid/mail");

exports.handler = async (event, context) => {
  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // 🔹 Base styles
    const containerStart = `
      <div style="font-family: Inter, Arial, sans-serif; background:#f9fafb; padding:30px;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background:#0ea5e9; color:white; padding:20px; text-align:center;">
            <img src="https://ethan-bwibo.netlify.app/media/ethan-bwibo-logo.png" alt="Ethan Bwibo Logo" style="height:60px; margin-bottom:10px;">
            <h1 style="margin:0; font-size:22px;">Ethan Bwibo</h1>
            <p style="margin:0; font-size:14px;">Software Developer & Data Analyst</p>
          </div>
          <!-- Body -->
          <div style="padding:25px; color:#333;">
    `;

    const containerEnd = `
          </div>
          <!-- Footer -->
          <div style="background:#f9fafb; padding:15px; text-align:center; font-size:13px; color:#666;">
            <p>Connect with me:</p>
            <a href="https://www.linkedin.com/in/ethan-bwibo/" style="margin:0 8px; color:#0ea5e9; text-decoration:none;">LinkedIn</a> |
            <a href="https://github.com/ethanbwibo-Strath" style="margin:0 8px; color:#0ea5e9; text-decoration:none;">GitHub</a>
          </div>
        </div>
      </div>
    `;

    // 🔹 Email you receive
    const msgToMe = {
      to: "enbwibo@gmail.com",
      from: "enbwibo@gmail.com",
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        ${containerStart}
          <h2 style="color:#0ea5e9; font-size:20px;">📩 New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#0ea5e9;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin:20px 0; padding:15px; background:#f3f4f6; border-radius:6px; font-size:15px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="font-size:13px; color:#555;">This message was sent from your portfolio contact form.</p>
        ${containerEnd}
      `,
    };

    // 🔹 Auto-reply to sender
    const msgToSender = {
      to: email,
      from: "enbwibo@gmail.com",
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        ${containerStart}
          <h2 style="color:#0ea5e9; font-size:20px;">Hi ${name}, thanks for reaching out!</h2>
          <p>I’ve received your message and will get back to you soon.</p>
          <h4>Your Message:</h4>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin:15px 0; padding:15px; background:#f3f4f6; border-radius:6px; font-size:15px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <br>
          <p>Best regards,</p>
          <p><strong>Ethan Bwibo</strong></p>
        ${containerEnd}
      `,
    };

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
