const express = require("express");
const router = express.Router();
const pool = require("./Pool");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await pool.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser[0].length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await pool.promise().query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
