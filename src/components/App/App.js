import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Register from '../Register/Register';
import useToken from './useToken';
import { REACT_DASHBOARD_PATH, REACT_LOGIN_PATH, REACT_REGISTER_PATH } from '../Util/Constants';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  const { token, setToken } = useToken();
    
  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
      />  
      <Navbar bg="dark" variant="tabs" expand="lg">
        <Navbar.Brand>InPoster Courier</Navbar.Brand>
        <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href={REACT_DASHBOARD_PATH}>Dashboard</Nav.Link>
              <Nav.Link href={REACT_LOGIN_PATH}>Login</Nav.Link>
              <Nav.Link href={REACT_REGISTER_PATH}>Register</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      <BrowserRouter>
        <Switch>
          <Route path={REACT_DASHBOARD_PATH}>
            <Dashboard token={token} />
          </Route>
          <Route path={REACT_LOGIN_PATH}>
            <Login setToken={setToken} />
          </Route>
          <Route path={REACT_REGISTER_PATH}>
            <Register />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
