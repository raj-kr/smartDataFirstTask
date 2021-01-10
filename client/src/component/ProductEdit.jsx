import React, { useState, useRef, useEffect } from 'react';
import { userInstance } from '../config/axios';
import { Form, Button } from 'react-bootstrap';

const ProductEdit = ({ editId, setShow }) => {
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
        setShow(false);
        const payload = {
            _id: editId,
            name: formData.name,
            description: formData.description,
            price: +formData.price,
            image: formData.image
        }
        try {
            const { status, data: { msg } } = await userInstance.patch('/products/product', payload);
            if (status === 200) {
                alert(msg);
            } else {
                alert(msg);
            }
        } catch (error) {
            alert(error)
        }
    }

    const getProduct = async () => {
        const response = await userInstance.get(`/products/product/${editId}`);
        if (response.status === 200) {
            setFormData(response.data.product);
        }
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <div>
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
                    <Form.File
                        id="custom-file"
                        label={formData.image || "Upload product image"}
                        name="image"
                        ref={fileRef}
                        onChange={handleImage}
                        custom
                    />
                </div>
                <Button variant="success" className="btn-block" type="submit" >Edit Product</Button>
            </form>
        </div>
    );
}

export default ProductEdit;