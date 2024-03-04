const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve the user from the database
    const [users] = await pool.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the password with the hashed password in the database
    const validPassword = await bcrypt.compare(password, users[0].password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // If the password is correct, proceed to log the user in
    res.json({ message: "Login successful", user: users[0] });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
