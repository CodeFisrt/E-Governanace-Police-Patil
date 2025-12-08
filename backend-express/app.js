const authRoutes = require("./routers/authRoute");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`server is live on http://localhost:${port}`);
});
