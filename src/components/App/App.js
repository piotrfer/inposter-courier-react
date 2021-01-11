import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Register from '../Register/Register'
import { REACT_DASHBOARD_PATH, REACT_LOGIN_PATH, REACT_REGISTER_PATH } from '../Util/Constants';
import { Navbar, Nav, Button, Row, Col } from 'react-bootstrap';

const App = () => {
  
  const [ token, setToken ] = useState(localStorage.getItem("token"))

  const handleLogout = (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(undefined);
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>InPoster Courier</Navbar.Brand>
        { token  && 
        <Nav className="ml-auto">
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
          <Route path={REACT_DASHBOARD_PATH} render={(props) => <Dashboard {...props} token={token} />}/>
          <Route path={REACT_REGISTER_PATH} render={(props) => <Register {...props} token={token} />}/>
          <Route path={REACT_LOGIN_PATH} render={(props) => <Login {...props} token={token} setToken={setToken} />}/>
        </Switch>
      </BrowserRouter>
      <Row className="sticky-bottom">
        <Col>
          <a href="https://github.com/piotrfer/inposter-courier-react">Github Repository</a>
        </Col>
      </Row>
    </> 
  )
}

export default withRouter(App);