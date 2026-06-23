async function sendRegistrationAlert(user) {
  console.log('BREVO_API_KEY starts with:', process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY.substring(0, 15) : 'NOT FOUND');
  console.log('Sending notification to:', process.env.NOTIFY_EMAIL);
console.log('Sending from:', 'af9459001@smtp-brevo.com');

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
     sender: { name: 'Marketonomy', email: 'marketonomyorganisation@gmail.com' },
      to: [{ email: process.env.NOTIFY_EMAIL }],
      subject: `New ${user.role} Registered on Marketonomy`,
      htmlContent: `<div style="font-family:Arial,sans-serif;padding:30px;">
        <h2 style="color:#39B102;">New User Registration</h2>
        <p>Name: ${user.name}</p>
        <p>Email: ${user.email}</p>
        <p>Role: ${user.role}</p>
        <p>Skill: ${user.skill}</p>
        <p>Registered At: ${new Date().toLocaleString()}</p>
      </div>`
    })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(data));
  return data;
}

module.exports = { sendRegistrationAlert };
