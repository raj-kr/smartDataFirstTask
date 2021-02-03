import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { userInstance } from '../config/axios';
import Layout from './Layout';

const AdminDashboard = () => {
    const [userList, setUserList] = useState([]);

    const deleteUser = async (id) => {
        const response = await userInstance.delete(`/admin/user/${id}`);
        if (response.status === 200) {
            fetchUserList();
        } else {
            alert(response.data.msg);
        }
    }

    const blockUser = async (id) => {
        const response = await userInstance.patch(`/admin/block/${id}`);
        if (response.status === 200) {
            fetchUserList();
        } else {
            alert(response.data.msg);
        }
        console.log(response);

    }

    const fetchUserList = async () => {
        try {
            const response = await userInstance.get('/admin/users');
            if (response.status == 200) {
                setUserList(response.data);
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        fetchUserList();
    }, [])

    return (
        <Layout>
            <div className="product-inner">
                <h3>Admin Dashboard</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList && userList.length !== 0 ?
                            userList.map((user, index) => {
                                return (
                                    <tr key={user._id}>
                                        <td>{++index}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Button variant="warning" onClick={() => {
                                                if (window.confirm(`Are you sure, you want to Block ${user.name}?`)) blockUser(user._id)
                                            }}>{user.block ? 'Block' : 'Unblock'}</Button>
                                            <Button variant="danger" onClick={() => {
                                                if (window.confirm("Are you sure, you want to Delete User?")) deleteUser(user._id)
                                            }
                                            }>Delete</Button>
                                        </td>
                                    </tr>
                                );
                            })
                            :
                            <tr><td colSpan="6">No User Found</td></tr>
                        }
                    </tbody>
                </Table>
            </div>
        </Layout>
    );
}

export default AdminDashboard;