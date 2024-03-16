const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
//const helmet = require("helmet");
const PORT = process.env.PORT || 5000;
const mysql = require("mysql2");
const path = require("path");
require("dotenv").config();

app.use(cors());
//app.use(helmet());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL server");
  connection.release(); // Release the connection back to the pool
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per window
});

//app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

app.use(apiLimiter);
app.use(express.json());

// Import routes
const markerInformationRouter = require("./routes/MarkerInformation");
const createSharedLinkRouter = require("./routes/CreateSharedLink");
const userLogin = require("./routes/User");
const userRegister = require("./routes/UserRegister");

// Use routes
app.use("/MarkerInformation", markerInformationRouter);
app.use("/shared-markers", createSharedLinkRouter);
app.use("/login", userLogin);
app.use("/register", userRegister);

// app.get("*", (req, res) => {
//   console.log("llllllllllll");
//   res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({ error: "Internal Server Error" });
});
