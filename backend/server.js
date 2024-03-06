const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const helmet = require("helmet");
const PORT = process.env.PORT || 5000;

const mysql = require("mysql2");
require("dotenv").config(); // Make sure this is at the top

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
});

// Close the connection
connection.end();

app.use(cors());

app.use(helmet());

// Define a rate limit rule
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per window
});

app.use(apiLimiter);
app.use(express.json());
app.use(express.static("/public"));

const markerInformationRouter = require("./routes/MarkerInformation");
const createSharedLinkRouter = require("./routes/CreateSharedLink");
const userLogin = require("./routes/User");
const userRegister = require("./routes/UserRegister");

app.use("/MarkerInformation", markerInformationRouter);
app.use("/shared-markers", createSharedLinkRouter);
app.use("/login", userLogin);
app.use("/register", userRegister);

app.listen(PORT, () => {
  //console.log(`Server is running on port ${PORT}`);
});

app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({ error: "Internal Server Error" });
});
