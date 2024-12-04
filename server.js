const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.post('/send-email', (req, res) => {
    const email = req.body.email; // Get the email from the form
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Store in .env file
      pass: process.env.EMAIL_PASS, // Store in .env file
    },
    logger: true,
    debug: true,
  });

  // Set email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Application entry",
    text: "Hello to myself!",
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.send('Error sending email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Password reset email sent.');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
