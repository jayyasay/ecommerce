const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");

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
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

const NameAge = new mongoose.model("NameAge", NameAgeSchema);

app.post("/api/db/nameage", (req, res) => {
  const nameage = new NameAge(req.body);
  nameage.save().then((result) => {
    res.json({ message: "Product save successfully", nameage: result });
  });
});

app.post("/api/db/products", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const products = new ImageModel({
        itemName: req.body.itemName,
        itemDesc: req.body.itemDesc,
        itemQuantity: req.body.itemQuantity,
        itemImage: {
          data: req.body.filename,
          contentType: "image/png",
        },
      });
      products.save().then(() => res.send("successfully uploaded!"));
    }
  });
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
