import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userInstance } from '../config/axios';

const Profile = () => {
    const [formData, setFormData] = useState({});
    let history = useHistory();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name: formData.name, email: formData.email }
        const response = await userInstance.patch('/users/update', payload);
        if (response.status === 200) {
            setFormData(response.data.userDetail);
            alert(response.data.msg);
        } else {
            alert(response.data.msg);
        }
    }

    const getProfileDetail = async () => {
        const response = await userInstance.get('/users/profile');
        if (response.status === 200) {
            setFormData(response.data.userDetail);
        } else {
            alert('Internal Server Error');
        }
    }

    useEffect(() => {
        getProfileDetail();
    }, []);

    return (
        <div className="inner">
            <form onSubmit={handleSubmit}>
                <h3>Update Profile</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="name" value={formData.name} className="form-control" placeholder="First name" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} className="form-control" placeholder="Enter email" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Update Profile</button>
            </form>
        </div>
    );
}

export default Profile;