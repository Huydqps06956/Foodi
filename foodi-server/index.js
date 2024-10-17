const express = require("express");
const app = express();
const port = process.env.PORT || 6001;
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

//mongoDB configuration using mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi-cluster.2vwea.mongodb.net/foodi-client?retryWrites=true&w=majority&appName=foodi-cluster`
  )
  .then(console.log("MogoDB Connected Successfully"))
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

//import routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
