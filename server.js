const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json());

const mongoose = require("mongoose");
const ImageModel = require("./image.model");

mongoose.connect("mongodb://localhost:27017/db", { useNewUrlParser: true });

const NameAgeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});

const upload = multer({
  storage: Storage,
});

const NameAge = new mongoose.model("NameAge", NameAgeSchema);

app.post("/api/db/nameage", (req, res) => {
  const nameage = new NameAge(req.body);
  nameage.save().then((result) => {
    res.json({ message: "Product save successfully", nameage: result });
  });
});

app.post("/api/db/products", upload.single("testImage"), (req, res, next) => {
  const products = new ImageModel({
    itemName: req.body.itemName,
    itemDesc: req.body.itemDesc,
    itemQuantity: req.body.itemQuantity,
    itemImage: {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
    },
  });
  products.save().then(() => res.send("Successfully uploaded!"));
});

app.get("/api/db/nameage", (req, res) => {
  NameAge.find().then((details) => {
    res.json(details);
  });
});

app.get("/api/db/products", (req, res) => {
  ImageModel.find().then((details) => {
    res.json(details);
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
