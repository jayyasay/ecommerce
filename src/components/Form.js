import axios from "axios";
import { useState } from "react";

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        age: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
            [event.target.age]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/nameages', formData)
        .then(res => {
            setFormData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
        setFormData({
            name: '',
            age: ''
        });
    }

    return (
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" onChange={handleChange} value={formData.name} />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" onChange={handleChange} value={formData.age} />
                </label><br />
                <button type="submit">Add Details</button>
            </form>
  )
}

export default Form