const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'YOUR_EMAIL@gmail.com',
      pass: 'YOUR_APP_PASSWORD'
    }
  });

  try {
    await transporter.sendMail({
      from: 'YOUR_EMAIL@gmail.com',
      to: 'info@rndservicing.ie',
      subject: 'New Inquiry from Contact Form',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));