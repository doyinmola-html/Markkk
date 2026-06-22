const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});
async function sendRegistrationAlert(user) {
  const mailOptions = {
    from: `"Marketonomy" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `🎉 New ${user.role} Registered on Marketonomy`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;border:1px solid #eee;border-radius:10px;padding:30px;">
        <h2 style="color:#39B102;">New User Registration</h2>
        <p>A new user just joined Marketonomy!</p>
        <table style="width:100%;border-collapse:collapse;margin-top:20px;">
          <tr><td style="padding:8px;color:#666;">Name</td><td style="padding:8px;font-weight:bold;">${user.name}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Email</td><td style="padding:8px;">${user.email}</td></tr>
          <tr><td style="padding:8px;color:#666;">Role</td><td style="padding:8px;text-transform:capitalize;">${user.role}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Skill</td><td style="padding:8px;">${user.skill}</td></tr>
          <tr><td style="padding:8px;color:#666;">Registered At</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
        </table>
        <p style="margin-top:20px;color:#999;font-size:12px;">This is an automated notification from Marketonomy.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendRegistrationAlert };
