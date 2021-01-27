import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './component/Login';
import SignUp from './component/Signup';
import ProductAdd from './component/ProductAdd';
import ProductList from './component/ProductList';
import Profile from './component/Profile';
import AdminLogin from './component/AdminLogin';
import AdminDashboard from './component/AdminDashboard';
import { Switch, Route } from 'react-router-dom';
import { AdminRoute, PrivateRoute } from '../src/config/functions';

const App = () => {

  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute path="/add-product" component={ProductAdd} />
      <PrivateRoute path="/list-product" component={ProductList} />
      <PrivateRoute path="/profile" component={Profile} />

      <Route path='/admin/login' component={AdminLogin} />
      <AdminRoute path='/admin/dashboard' component={AdminDashboard} />
    </Switch>
  );
}

export default App;
