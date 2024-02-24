const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("222");
  res.send("GET request received at root URL!"); // Respond with a message
});

module.exports = router;
