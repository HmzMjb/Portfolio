const express = require('express');
const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');

const router = express.Router();
const dataPath = path.join(__dirname, '..', 'data', 'messages.json');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    const messages = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    messages.push(newMessage);
    fs.writeFileSync(dataPath, JSON.stringify(messages, null, 2));
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save message' });
  }

  try {
    if (!resend) {
      throw new Error('Resend API key not configured');
    }
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return res.status(500).json({ error: 'Failed to send email: ' + error.message });
    }

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email. Message was saved but email was not delivered.' });
  }
});

module.exports = router;
