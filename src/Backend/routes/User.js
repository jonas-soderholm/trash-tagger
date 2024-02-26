const express = require("express");
const router = express.Router();
const pool = require("./Pool");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the username and password match a user in the database
    const [users] = await pool
      .promise()
      .query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Login successful", user: users[0] });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
