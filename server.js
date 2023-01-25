const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json())


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true});
mongoose.set('strictQuery', false);

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const Product = new mongoose.model('Product', ProductSchema);

const product = new Product({id: 4, name: 'Jayster'});
product.save()
.then(() => {
    console.log('Product saved successfully!');
})
.catch(error => {
    console.log(error.message);
})

Product.find()
    .then(products => {
        console.log(products);
    })
    .catch(error => {
        console.log(error.message);
    });

app.get('/api/products', (req, res) => {
    Product.find()
    .then(products => {
        res.json(products)
    })
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})