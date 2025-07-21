app.post('/send', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  console.log("Received contact form submission:");
  console.log({ name, email, phone, service, message });

  const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true,
    auth: {
      user: 'info@rndservicing.ie',
      pass: 'Robanddar2025!' // 
    }
  });

  try {
    const info = await transporter.sendMail({
      from: 'info@rndservicing.ie',
      to: 'info@rndservicing.ie',
      subject: 'New Inquiry from Contact Form',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`
    });

    console.log("Email sent:", info.response);
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});
