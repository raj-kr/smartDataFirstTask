import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './component/Login';
import SignUp from './component/Signup';
import ProductAdd from './component/ProductAdd';
import ProductList from './component/ProductList';
import { Switch, Route, Link } from 'react-router-dom';
import { PrivateRoute, isLogged, logout } from '../src/config/functions';

const App = () => {
  const [isLog, setLogged] = useState(false);

  useEffect(() => {
    let loginSatus = isLogged();
    if (loginSatus) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={isLog ? '/list-product' : '/'}>smartData eCom</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {!isLog ?
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/"}>Sign in</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
              :
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/add-product"}>Add Product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/list-product"}>List Product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={() => { setLogged(false); logout() }}>Logout</Link>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>

      <div className="outer">
          <Switch>
            <Route exact path='/' render={(props) => <Login setLogged={setLogged} {...props} />} />
            <Route path="/sign-up" component={SignUp} />
            <PrivateRoute path="/add-product" component={ProductAdd} />
            <PrivateRoute path="/list-product" component={ProductList} />
          </Switch>
      </div>
    </div>
  );
}

export default App;
