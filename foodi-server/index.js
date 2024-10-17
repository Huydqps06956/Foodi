const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 6001;

//middleware
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//mongoDB configuration using mongoose
async function main() {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi-cluster.2vwea.mongodb.net/foodi-client?retryWrites=true&w=majority&appName=foodi-cluster`
  );
}

main()
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
