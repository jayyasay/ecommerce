const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json())


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true});

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

const Product = mongoose.model('Product', ProductSchema);

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

app.post('/products', (req, res) => {
    const product = req.body;
    product.save()
        .then(() => {
            res.status(201).send({ message: 'Product created successfully' });
        })
        .catch(error => {
            res.status(400).send({ message: error.message });
        });
    res.status(201).send({message: 'Product created successfully'});
});

app.get('/products', (req, res) => {
    res.send([{id: 1, name: 'product 1'}, {id: 2, name: 'product 2'}, {id: 3, name: 'product 3'}]);
})

app.get('/', (req, res) => {
    res.send('Hello from the back-end server!!!');
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})