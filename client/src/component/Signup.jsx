import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userInstance } from '../config/axios';

const Signup = () => {
    const [formData, setFormData] = useState({});
    let history = useHistory();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name: formData.name, password: formData.password, email: formData.email }
        const { data: { code, msg } } = await userInstance.post('/users/signup', payload);
        console.log('msg', msg);
        if (code === 200) {
            alert(msg);
            history.push("/");
        } else {
            alert(msg);
        }
    }

    return (
        <div className="inner">
            <form onSubmit={handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="name" className="form-control" placeholder="First name" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/">log in?</a>
                </p>
            </form>
        </div>
    );
}

export default Signup;