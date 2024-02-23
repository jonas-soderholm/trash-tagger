const express = require("express");
const router = express.Router();
const pool = require("./Pool");

router.post("/", (req, res) => {
  // Assuming req.body is an array of marker objects
  const markers = req.body;

  // Prepare to insert each marker
  markers.forEach((marker, index) => {
    const { latitude, longitude, info } = marker; // Destructure each marker, note the change to 'info'

    pool.query(
      "INSERT INTO MarkerInformation (latitude, longitude, markerInformation) VALUES (?, ?, ?)",
      [latitude, longitude, info], // Use 'info' here
      (insertError, results) => {
        if (insertError) {
          // Log the error or handle it as you see fit
          console.error("Error inserting marker:", insertError);
          if (index === markers.length - 1) {
            // If it's the last marker, send a response indicating failure
            res.status(500).json({ error: "Database error during insertion" });
          }
          return;
        }

        if (index === markers.length - 1) {
          // If it's the last marker, send a success response
          res.json({ message: "All markers added successfully" });
        }
      }
    );
  });
});

router.get("/", (req, res) => {
  pool.query("SELECT * FROM MarkerInformation", (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: "No marker information found" });
    }
    res.json(results);
  });
});

module.exports = router;
