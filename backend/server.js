const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { name, email, phone, service, message } = req.body;


  const transporter = nodemailer.createTransport({
  host: 'smtp.titan.email',
  port: 587,
  secure: false

  secure: true,
  auth: {
    user: 'info@rndservicing.ie',
    pass: 'Robanddar2025!'
  }
});

  try {
    await transporter.sendMail({
      from: 'info@rndservicing.ie',
      to: 'info@rndservicing.ie',
      subject: 'New Inquiry from Contact Form',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`

    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
