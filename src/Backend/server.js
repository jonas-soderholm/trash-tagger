const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3100;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

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
