import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Register from '../Register/Register'
import { REACT_DASHBOARD_PATH, REACT_LOGIN_PATH, REACT_REGISTER_PATH } from '../Util/Constants';
import { Navbar, Nav, Button } from 'react-bootstrap';
import getToken from './getToken';

function useStorageToken() {
  const [ token, setToken ] = useState(getToken().token);

  useEffect( () => {
    console.log(window.localStorage.getItem("token"))
    setToken(window.localStorage.getItem("token"))
  }, []);

  return [ token, setToken ];
}


const App = () => {
  
  const [ token, setToken ] = useStorageToken();

  useEffect( () => {
    console.log("used");
  },[ localStorage.getItem("token")])


  const handleLogout = (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(undefined);
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>InPoster Courier</Navbar.Brand>
        { localStorage.getItem("token") && 
        <Nav>
          <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>  
        </Nav>}
      </Navbar>
      <BrowserRouter>
        <Switch>
        <Route
            exact
            path="/"
            render={() => {
                return (
                    token ?
                    <Redirect to={REACT_DASHBOARD_PATH} /> :
                    <Redirect to={REACT_LOGIN_PATH} /> 
                )
            }}
        />
          <Route path={REACT_DASHBOARD_PATH} render={(props) => <Dashboard {...props}/>}/>
          <Route path={REACT_REGISTER_PATH} render={(props) => <Register {...props}/>}/>
          <Route path={REACT_LOGIN_PATH} render={(props) => <Login {...props}/>}/>
        </Switch>
      </BrowserRouter>
    </> 
  )
}

export default withRouter(App);