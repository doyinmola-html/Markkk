async function sendRegistrationAlert(user) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: { name: 'Marketonomy', email: process.env.NOTIFY_EMAIL },
      to: [{ email: process.env.NOTIFY_EMAIL }],
      subject: `New ${user.role} Registered on Marketonomy`,
      htmlContent: `
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
    })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(data));
  return data;
}

module.exports = { sendRegistrationAlert };
