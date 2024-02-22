const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3100;
const markerInforRowLimit = 5;

app.use(express.json()); // Middleware to parse JSON bodies

// Create a connection to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "hejsan",
  database: "trashtagger",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Use CORS middleware to allow all origins
app.use(cors());

// Simple route to test the server
app.get("/", (req, res) => {
  res.send("Hello World from the backend!");
});

// Route to fetch users

// Route to fetch users
app.get("/TagInformation", (req, res) => {
  // Use the pool object to execute a query
  pool.query("SELECT * FROM TagInformation", (error, results) => {
    if (error) {
      // If there's an error, send a 500 status code with the error message
      return res.status(500).json({ error: "Database error" });
    }
    // If the query is successful, send the results as JSON
    res.json(results);
  });
});

function deleteExcessRows(callback) {
  // Use the pool object to execute a SELECT query to count the number of rows
  pool.query("SELECT COUNT(*) AS rowCount FROM TagInformation", (error, results) => {
    if (error) {
      // If there's an error, invoke the callback with the error
      return callback(error);
    }

    const rowCount = results[0].rowCount;

    // If the number of rows is greater than 10, delete all rows
    if (rowCount > markerInforRowLimit) {
      pool.query("DELETE FROM TagInformation", (error, results) => {
        if (error) {
          // If there's an error, invoke the callback with the error
          return callback(error);
        }
        // If deletion is successful, invoke the callback without an error
        callback(null);
      });
    } else {
      // If the number of rows is not greater than 10, invoke the callback without an error
      callback(null);
    }
  });
}

// Route to add a new tag
app.post("/TagInformation", (req, res) => {
  const { latitude, longitude, tagInformation } = req.body;

  // Delete excess rows before inserting the new tag
  deleteExcessRows((deleteError) => {
    if (deleteError) {
      // If there's an error deleting excess rows, send a 500 status code with the error message
      return res.status(500).json({ error: "Database error" });
    }

    // Use the pool object to execute an INSERT query
    pool.query(
      "INSERT INTO TagInformation (latitude, longitude, tagInformation) VALUES (?, ?, ?)",
      [latitude, longitude, tagInformation],
      (insertError, results) => {
        if (insertError) {
          // If there's an error inserting the new tag, send a 500 status code with the error message
          return res.status(500).json({ error: "Database error" });
        }
        // If the query is successful, send a success response
        res.json({ message: "Tag added successfully" });
      }
    );
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
