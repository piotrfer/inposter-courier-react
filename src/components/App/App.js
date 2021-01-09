import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { REACT_DASHBOARD_PATH, REACT_LOGIN_PATH, REACT_REGISTER_PATH } from '../Util/Constants';
import { Navbar } from 'react-bootstrap';

export default function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>InPoster Courier</Navbar.Brand>
      </Navbar>
      <BrowserRouter>
        <Switch>
          <Route path={REACT_DASHBOARD_PATH} render={(props) => <Dashboard {...props}/>}/>
          <Route path={REACT_REGISTER_PATH} render={(props) => <Register {...props}/>}/>
          <Route path={REACT_LOGIN_PATH} render={(props) => <Login {...props}/>}/>
        </Switch>
      </BrowserRouter>
    </> 
  )
}