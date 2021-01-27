import React, { useState } from 'react';
import Layout from './Layout';
import { userInstance } from '../config/axios';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
    const [formData, setFormData] = useState({});
    let history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            user: formData.user,
            password: formData.password
        }
        try {
            const response = await userInstance.post('/admin/login', payload);
            if (response.status === 200) {
                localStorage.setItem('adminToken', response.data.token);
                history.push('/admin/dashboard');
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <Layout>
            <div className="inner">
                <form onSubmit={handleSubmit}>
                    <h3>Admin Panel Login</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="user" className="form-control" placeholder="Enter Username" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                </form>
            </div>
        </Layout>
    );
}

export default AdminLogin;