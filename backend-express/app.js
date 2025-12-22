const authRoutes = require("./routers/authRoute");
const policeStationRouter = require("./routers/admin/policeStationRouter");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);

// for add police station through admin

app.use("/api/admin", policeStationRouter);

// const BASE_URL = "https://india-location-hub.in/api";

// app.get("/api/states", async (req, res) => {
//   const r = await fetch(`${BASE_URL}/locations/states`);
//   const data = await r.json();
//   res.json(data);
// });

// app.get("/api/districts", async (req, res) => {
//   const r = await fetch(
//     `${BASE_URL}/locations/districts?state_id=${req.query.state_id}`
//   );
//   const data = await r.json();
//   res.json(data);
// });

// app.get("/api/talukas", async (req, res) => {
//   const r = await fetch(
//     `${BASE_URL}/locations/talukas?district_id=${req.query.district_id}`
//   );
//   const data = await r.json();
//   res.json(data);
// });

// app.get("/api/villages", async (req, res) => {
//   const { state, district, taluka } = req.query;

//   const r = await fetch(
//     `${BASE_URL}/locations/villages?state=${state}&district=${district}&taluka=${taluka}`
//   );
//   const data = await r.json();
//   res.json(data);
// });

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`server is live on http://localhost:${port}`);
});
