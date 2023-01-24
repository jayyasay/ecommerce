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