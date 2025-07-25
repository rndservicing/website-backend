const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  // const { name, email, phone, service, message } = req.body;
  console.log(req.body);
  // console.log(${name));
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const service = req.body.service;
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
    host: 'smtp0101.titan.email',
    port: 587,
    secure: true,
    auth: {
      user: 'info@rndservicing.ie',
      pass: 'Robanddar2025!' // Ideally use an environment variable for security
    }
  });
  try {
    await transporter.sendMail({
      from: 'info@rndservicing.ie',
      to: 'info@rndservicing.ie',
      subject: 'New Inquiry from Contact Form',
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Message: ${message}
      `
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email failed to send:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
