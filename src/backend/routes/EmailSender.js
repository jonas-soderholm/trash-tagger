const express = require("express");
const router = express.Router();
const pool = require("../pool");

// Import Mailgun
const mailgun = require("mailgun-js")({
  apiKey: process.env.MG_API_KEY,
  domain: "sandbox62a82f196bc94aaf94d3bc0002687fee.mailgun.org",
});

// Define a route to send a test email
router.get("/", async (req, res) => {
  try {
    console.log(process.env.MG_API_KEY);

    const data = {
      from: "Jonas Soderholm <jonas.soderholm89@gmail.com>",
      to: "jonas.soderholm89@gmail.com",
      subject: "Hello!!!",
      text: "Testing some Mailgun awesomeness!",
    };

    // Use Mailgun to send an email
    mailgun.messages().send(data, (error, body) => {
      if (error) {
        console.error("Error sending test email:", error);
        res.status(500).send("Error sending test email");
      } else {
        console.log("Test email sent successfully:", body);
        res.status(200).send("Test email sent successfully");
      }
    });
  } catch (error) {
    console.error("Error sending test email:", error);
    res.status(500).send("Error sending test email");
  }
});

module.exports = router;
