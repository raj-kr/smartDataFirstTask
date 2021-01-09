import React, { useState, useRef } from 'react';
import { userInstance } from '../config/axios';

const ProductAdd = () => {
    const [formData, setFormData] = useState({});
    const fileRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleImage = async (e) => {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        const { status, data: { file, msg } } = await userInstance.post("/products/photo", data);
        if (status === 200) {
            setFormData({ ...formData, image: file });
        } else {
            alert(msg);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: formData.name,
            description: formData.description,
            price: +formData.price,
            image: formData.imageFilePath
        }
        try {
            const { status, data: { msg } } = await userInstance.post('/products/product', payload);
            if (status === 200) {
                alert(msg);
                setFormData({ name: '', description: '', price: '' });
                fileRef.current.value = "";
            } else {
                alert(msg);
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <h3>Add Product</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} className="form-control" placeholder="Enter product name" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea type="text" name="description" value={formData.description} className="form-control" placeholder="Enter product description" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" value={formData.price} className="form-control" min="1" placeholder="Enter product price" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" name="image" ref={fileRef} className="form-control" onChange={handleImage} />
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Add Product</button>
            </form>
        </div>
    );
}

export default ProductAdd;