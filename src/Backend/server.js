const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

const markerInformationRouter = require("./routes/MarkerInformation");
const createSharedLinkRouter = require("./routes/CreateSharedLink");

app.use("/MarkerInformation", markerInformationRouter);
app.use("/create-shared-link", createSharedLinkRouter);

app.get("/", (req, res) => {
  res.send("Hello World from the backend!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({ error: "Internal Server Error" });
});
