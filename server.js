// Import required modules
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS package
require('dotenv').config();  // Load environment variables

const multer = require('multer');
const upload = multer(); // Default storage engine (memory storage)

// Initialize the express app
const app = express();

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes (default settings allow all origins)

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a POST route for the contact form submission
// app.post("/submit", (req, res) => {
//   const { name, email, phone, message } = req.body;

  

//   // Validate the received data (you can add more validation if needed)
//   if (!name || !email || !phone || !message ) {
//     return res.status(400).json({
//       success: false,
//       message: "Name, email, and message are required.",
//     });
//   }

app.post("/submit", upload.none(), (req, res) => {
  // .none() indicates no files are expected
  console.log(req.body); // Log incoming data

  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone, and message are required.",
    });
  }

  // Set up the email transport using Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use any email service provider here
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address (from .env)
      pass: process.env.EMAIL_PASSWORD, // The App Password you generated (from .env)
    },
  });

  // Set up the email content for the owner
  const ownerMailOptions = {
    from: process.env.EMAIL_USER, // Replace with your email
    to: process.env.EMAIL_USER, // Replace with your email address
    subject: "New Contact Form Submission",
    text: `You have a new message from ${name} (email: ${email}, phone: ${phone}):\n\n message: ${message}`,
  };

  // Set up the email content for the person who submitted the form
  const userMailOptions = {
    from: process.env.EMAIL_USER, // Replace with your email
    to: email, // Send to the email of the person who submitted the form
    subject: "Thank You for Your Message",
    text: `Dear ${name},\n\nThank you for your message! I have received your inquiry and will respond within one business day.\n\nBest regards,\nDaniel`, // Modify with your actual message
  };

  // Send the owner's email
  transporter.sendMail(ownerMailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email to owner:", error);
      return res.status(500).json({
        success: false,
        message: "Error sending email to owner.",
        error,
      });
    }

    console.log("Email sent to owner:", info.response);

    // Send the user's confirmation email
    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email to user:", error);
        return res.status(500).json({
          success: false,
          message: "Error sending email to user.",
          error,
        });
      }

      console.log("Email sent to user:", info.response);
      res
        .status(200)
        .json({ success: true, message: "Message sent successfully!" });
    });
  });
});

// Set up the app to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Multer simplifies handling file uploads in your Node.js application.
// You can configure storage, file filters, and limits as per your needs.
// It integrates well with Express.js for server-side handling.

// // Import required modules
// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cors = require("cors"); // Import CORS package

// // Initialize the express app
// const app = express();

// // Use CORS middleware
// app.use(cors()); // Enable CORS for all routes (default settings allow all origins)

// // Middleware to parse JSON and URL-encoded form data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Set up a POST route for the contact form submission
// app.post("/submit", (req, res) => {
//   const { name, email, phone, message } = req.body;

//   // Validate the received data (you can add more validation if needed)
//   if (!name || !email || !message) {
//     return res.status(400).json({
//       success: false,
//       message: "Name, email, and message are required.",
//     });
//   }

//   // Set up the email transport using Nodemailer
//   const transporter = nodemailer.createTransport({
//     service: "gmail", // You can use any email service provider here
//     auth: {
//       user: process.env.EMAIL_USER, // Replace with your email
//       pass: process.env.EMAIL_PASSWORD, // Replace with your email password
//     },
//   });

//   // Set up the email content
//   const mailOptions = {
//     from: process.env.EMAIL_USER, // Replace with your email
//     to: process.env.EMAIL_USER, // Replace with your recipient email (again my email)
//     subject: "New Contact Form Submission",
//     text: `You have a new message from ${name} (${email}, ${phone}):\n\n${message}`,
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error sending email.", error });
//     }

//     // Respond with a success message
//     res
//       .status(200)
//       .json({ success: true, message: "Message sent successfully!" });
//   });
// });

// // Set up the app to listen on a port
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
