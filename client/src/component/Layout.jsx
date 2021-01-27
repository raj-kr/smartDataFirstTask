import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { isLogged, isAdminLogged, logout, adminLogout } from '../config/functions';

const Layout = ({ children }) => {
    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={isLogged() ? '/list-product' : isAdminLogged() ? '/admin/dashboard' : '/'}>smartData eCom</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        {!isLogged() && !isAdminLogged() ?
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/"}>Sign in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                </li>
                            </ul>
                            :
                            isLogged() ?
                                <ul className="navbar-nav ml-auto">
                                    < li className="nav-item">
                                        <Link className="nav-link" to={"/add-product"}>Add Product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/list-product"}>List Product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/profile"}>Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={() => { logout() }}>Logout</Link>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/admin/dashboard"}>Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={() => { adminLogout() }}>Logout</Link>
                                    </li>
                                </ul>
                        }
                    </div>
                </div>
            </nav >
            <div className="outer">
                {children}
            </div>
        </div >
    );
}

export default Layout;