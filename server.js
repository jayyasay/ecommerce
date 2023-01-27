const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/db", { useNewUrlParser: true });

const NameAgeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const ProductSchema = new mongoose.Schema({
  itemName: {
    type: String,
  },
  itemDesc: {
    type: String,
  },
  itemQuantity: {
    type: Number,
  },
});

const NameAge = new mongoose.model("NameAge", NameAgeSchema);
const Products = new mongoose.model("Products", ProductSchema);

app.post("/api/db/nameage", (req, res) => {
  const nameage = new NameAge(req.body);
  nameage.save().then((result) => {
    res.json({ message: "Product save successfully", nameage: result });
  });
});

app.post("/api/db/products", (req, res) => {
    const products = new Products(req.body);
    products.save().then((result) => {
      res.json({ message: "Product save successfully", products: result });
    });
  });

app.get("/api/db/nameage", (req, res) => {
  NameAge.find().then((details) => {
    res.json(details);
  });
});

app.get("/api/db/products", (req, res) => {
  Products.find().then((details) => {
    res.json(details);
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
