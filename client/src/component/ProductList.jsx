import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Table, Button, Modal } from 'react-bootstrap';
import { userInstance } from '../config/axios';
import { server } from '../config/keys';
import ProductEdit from './ProductEdit';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [show, setShow] = useState(false);
    const [editId, setEditId] = useState('');
    let [pageIndex, setPageIndex] = useState(1);

    const getProducts = async () => {
        const { status, data } = await userInstance.get(`/products/product/page/${pageIndex}`);
        if (status === 200) {
            setProductList(data.list);
        } else {
            alert('Error Fetching Product list');
        }
    }

    const deleteProduct = async (_id) => {
        const { status, data: { msg } } = await userInstance.delete(`/products/product/${_id}`);
        if (status === 200) {
            alert(msg);
            getProducts();
        } else {
            alert(msg);
        }
    }

    const handleSearch = async (e) => {
        if (e.target.value !== '') {
            const response = await userInstance.get(`/products/${e.target.value}`);
            console.log('response', response);
            if (response.status === 200) {
                setProductList(response.data.products);
            }
        } else {
            getProducts();
        }
    }

    const handleSort = (e) => {
        const sort = e.target.value;
        let tempProducts = [];
        if (sort === 'asc') {
            tempProducts = productList.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'dsc') {
            tempProducts = productList.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sort === 'priceLow') {
            tempProducts = productList.sort((a, b) => a.price - b.price);
        } else if (sort === 'priceHigh') {
            tempProducts = productList.sort((a, b) => b.price - a.price);
        }
        setProductList([...tempProducts]);
    }

    const nextPage = () => {
        setPageIndex((pageIndex) => pageIndex + 1);
        getProducts();
    }

    const previousPage = () => {
        if (pageIndex >= 1) {
            setPageIndex((pageIndex) => pageIndex - 1);
            getProducts();
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (show === false) {
            getProducts();
        }
    }, [show]);

    return (
        <Layout>
            <div className="product-inner">
                <h3>List Product</h3>
                <div className="row">
                    <div className="md-6">
                        <h5>Sort By</h5>
                    </div>
                    <div className="md-6">
                        <select onChange={handleSort}>
                            <option selected disabled>Selet Sort By</option>
                            <option value="asc">{'Ascending'}</option>
                            <option value="dsc">{'Descending'}</option>
                            <option value="priceLow">{'Price Low to High'}</option>
                            <option value="priceHigh">{'Price High to Low'}</option>
                        </select>
                        <input type="text" name="search" placeholder="Search Products by name" onChange={handleSearch}></input>
                    </div>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Image</th>
                            <th>Name</th>
                            <th>Desciption</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList && productList.length !== 0 ?
                            productList.map((product, index) => {
                                return (
                                    <tr key={product._id}>
                                        <td>{++index}</td>
                                        <td>
                                            <img src={`${server}/${product.image}`} width="100" height="100" alt={`smartData_${product.name}`}></img>
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <Button variant="info" onClick={() => { setShow(true); setEditId(product._id) }}>Edit</Button>
                                            <Button variant="danger" onClick={() => {
                                                if (window.confirm("Are you sure, you want to Delete product?")) deleteProduct(product._id)
                                            }
                                            }>Delete</Button>
                                        </td>
                                    </tr>
                                );
                            })
                            :
                            <tr><td colSpan="6">No Product Found</td></tr>
                        }
                    </tbody>
                </Table>
                <Button variant="secondary" onClick={previousPage}>Prev</Button>
                <Button variant="dark" onClick={nextPage}>Next</Button>
                <Modal show={show} onHide={() => { setShow(false) }} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProductEdit editId={editId} setShow={setShow} />
                    </Modal.Body>
                </Modal>
            </div >
        </Layout>
    );
}

export default ProductList;