import { useState } from "react";
import Product from '../../models/Product'
function AddProduct() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const product = new Product({id, name});
        product.save()
        .then(() => {
            console.log('Product Saved!');
            setId('');
            setName('');
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input type="text" value={id} onChange={event => setId(event.target.value)} />
                </label>
                <label>
                    Name:
                    <input type="text" value={name} onChange={event => setName(event.target.value)} />
                </label><br />
                <button type="submit">Add Product</button>
            </form>
        </>
    )
}

export default AddProduct