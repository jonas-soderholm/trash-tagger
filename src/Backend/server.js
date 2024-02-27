const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const helmet = require("helmet");
const PORT = process.env.PORT || 3100;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

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
const emailSenderRouter = require("./routes/EmailSender");
const userLogin = require("./routes/User");
const userRegister = require("./routes/UserRegister");

app.use("/MarkerInformation", markerInformationRouter);
app.use("/shared-markers", createSharedLinkRouter);
app.use("/emailSender", emailSenderRouter);
app.use("/login", userLogin);
app.use("/register", userRegister);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({ error: "Internal Server Error" });
});
