const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

app.use(cors());
app.use(bodyParser.json());

const mongoose = require("mongoose");

const ImageModel = require("./image.model");
const RegistrationModel = require("./registration.model");
const {
    log
} = require("console");

mongoose.connect("mongodb://localhost:27017/db", {
    useNewUrlParser: true
});

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '-' + file.originalname)
    },
});

const upload = multer({
    storage: Storage,
});

app.post("/api/db/login", (req, res) => {
    const {
        email,
        password
    } = req.body;
    RegistrationModel.findOne({
        email: email
    }, (error, user) => {
        if (error) {
            return res.status(500).send("Error in the server");
        }
        if (!user) {
            return res.status(404).send("No user found");
        }

        console.log(
            user
        );
        bcrypt.compare(password, user.password, (err, result) => {
            console.log(user.password);
            console.log(result);
            if (err) {
                return res.status(500).send({
                    auth: true,
                    error: "Error in the server",
                    token: null
                });
            }
            if (!result) {
                return res.status(401).send({
                    auth: false,
                    error: "Incorrect email or password",
                    token: null
                });
            }
            const token = jwt.sign({
                id: user._id
            }, config.get("secret"), {
                expiresIn: 86400
            });
            res.status(200).send({
                auth: true,
                token: token
            });
        });
    });
});

app.post("/api/db/registrations", (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send("Error in the server");
        }
        const registration = new RegistrationModel({
            username,
            email,
            password: hash,
        });
        registration.save().then(() => res.send("Registration successful!"));
    });
});

app.post("/api/db/products", upload.single("itemImage"), (req, res, next) => {
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

app.get("/api/db/login", (req, res) => {
    RegistrationModel.find().then((details) => {
        res.json(details);
    });
});

app.get("/api/db/registrations", (req, res) => {
    RegistrationModel.find().then((details) => {
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