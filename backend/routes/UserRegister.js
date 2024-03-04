const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await pool.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser[0].length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const saltRounds = 10; // You can adjust the cost factor as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool.promise().query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
