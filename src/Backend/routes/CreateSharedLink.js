const express = require("express");
const router = express.Router();
const pool = require("./Pool");

router.post("/", async (req, res) => {
  const { markerIds } = req.body; // Expect an array of marker IDs to be shared

  try {
    // Insert a new entry into SharedLinks and get the linkId
    const [linkResult] = await pool.promise().query("INSERT INTO SharedLinks (createdAt) VALUES (NOW())");
    const linkId = linkResult.insertId;

    // For each markerId, insert a row into LinkMarkers linking it to the created linkId
    await Promise.all(
      markerIds.map((markId) =>
        pool.promise().query("INSERT INTO LinkMarkers (linkId, markId) VALUES (?, ?)", [linkId, markId])
      )
    );

    // Return the URL containing the linkId as a part of the shareable link
    res.json({ link: `http://localhost:3000/shared-markers/${linkId}` });
  } catch (error) {
    console.error("Error creating shared link:", error);
    res.status(500).json({ error: "Failed to create shared link." });
  }
});

module.exports = router;
