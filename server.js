// Import required modules
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

// Initialize the express app
const app = express();

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a POST route for the contact form submission
app.post("/submit", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate the received data (you can add more validation if needed)
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Name, email, and message are required.",
      });
  }

  // Set up the email transport using Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use any email service provider here
    auth: {
      user: "your-email@gmail.com", // Replace with your email
      pass: "your-email-password", // Replace with your email password
    },
  });

  // Set up the email content
  const mailOptions = {
    from: "danielkgetu@gmail.com", // Replace with your email
    to: "danielkgetu@gmail.com", // Replace with your recipient email (could be your email)
    subject: "New Contact Form Submission",
    text: `You have a new message from ${name} (${email}, ${phone}):\n\n${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error sending email.", error });
    }

    // Respond with a success message
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  });
});

// Set up the app to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
