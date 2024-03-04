const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/", (req, res) => {
  const { groupId } = req.query;

  if (!groupId) {
    return res.status(400).json({ error: "groupId parameter is required" });
  }

  pool.query("SELECT * FROM MarkerInformation WHERE groupId = ?", [groupId], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No marker information found for the provided groupId" });
    }
    res.json(results);
  });
});

module.exports = router;
