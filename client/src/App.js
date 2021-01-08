import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './component/Login';
import SignUp from './component/Signup';
import ProductAdd from './component/ProductAdd';
import ProductList from './component/ProductList';
import { Switch, Route, Link } from 'react-router-dom';

const App = () => {
  return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>SmartData eCom</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/"}>Sign in</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/add-product" component={ProductAdd} />
            </Switch>
          </div>
        </div>
      </div>
  );
}

export default App;
