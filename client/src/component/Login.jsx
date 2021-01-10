import React, { useState } from 'react';
import { userInstance } from '../config/axios';
import { useHistory } from 'react-router-dom';

const Login = ({ setLogged }) => {
    const [formData, setFormData] = useState({});
    let history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: formData.email,
            password: formData.password
        }
        const { data: { code, token, msg } } = await userInstance.post('/users/login', payload);
        if (code === 200) {
            localStorage.setItem('accessToken', token);
            history.push('/list-product')
            setLogged(true);
        } else {
            alert(msg);
        }
    }

    return (
        <div className="inner">
            <form onSubmit={handleSubmit}>
                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
            </form>
        </div>
    );
}

export default Login;