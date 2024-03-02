const express = require("express");
const router = express.Router();
const pool = require("../pool");

const maxEntries = 100;

router.post("/", (req, res) => {
  // Assuming req.body is an array of marker objects
  const markers = req.body;

  // Check if table has more than 10 entries
  pool.query("SELECT COUNT(*) AS count FROM MarkerInformation", (countError, countResults) => {
    if (countError) {
      console.error("Error counting markers:", countError);
      return res.status(500).json({ error: "Database error during counting" });
    }

    const count = countResults[0].count;
    const excess = count + markers.length - maxEntries;

    if (excess > 0) {
      // If excess markers, delete the oldest ones
      pool.query("DELETE FROM MarkerInformation ORDER BY id LIMIT ?", [excess], (deleteError, deleteResults) => {
        if (deleteError) {
          console.error("Error deleting markers:", deleteError);
          return res.status(500).json({ error: "Database error during deletion" });
        }
        // Proceed to insert markers
        insertMarkers(markers, res);
      });
    } else {
      // Proceed to insert markers
      insertMarkers(markers, res);
    }
  });
});

function insertMarkers(markers, res) {
  markers.forEach((marker, index) => {
    const { latitude, longitude, info, groupId } = marker;

    pool.query(
      "INSERT INTO MarkerInformation (latitude, longitude, markerInformation, groupId) VALUES (?, ?, ?, ?)",
      [latitude, longitude, info, groupId],
      (insertError, results) => {
        if (insertError) {
          console.error("Error inserting marker:", insertError);
          if (index === markers.length - 1) {
            res.status(500).json({ error: "Database error during insertion" });
          }
          return;
        }

        if (index === markers.length - 1) {
          res.json({ message: "All markers added successfully" });
        }
      }
    );
  });
}

// Handle GET request for retrieving marker information by groupId
router.get("/:groupId", (req, res) => {
  const groupId = req.params.groupId;

  pool.query("SELECT * FROM MarkerInformation WHERE groupId = ?", [groupId], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: "No marker information found for the provided groupId" });
    }
    res.json(results);
  });
});

module.exports = router;
