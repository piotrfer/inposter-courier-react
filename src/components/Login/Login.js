import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {CustomLink} from '../CustomLink/CustomLink';
import './Login.css';
import { API_URL_PATH, API_URL_LOGIN_SUFIX, REACT_DASHBOARD_PATH } from '../Util/Constants';
import { Container, Form, FormControl, Button, Alert, Row, Col } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

async function loginCourier(credentials) {
    return fetch(API_URL_PATH+API_URL_LOGIN_SUFIX, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                return { success: false, message: data.error};
            } else {
                return { success: true, message: data.token};
            }
        })
}

export default function Login(props) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage ] = useState();
    const { user, isAuthenticated, getAccessTokenWithPopup } = useAuth0();

    const handleLoginAuth0 = () => {
        console.log(user);
        getAccessTokenWithPopup()
            .then(response => response.json())
            .then(data => console.log(data))

    }

    const handleSubmit = async e => {
        e.preventDefault();
        loginCourier({
            login,
            password
        })
        .then( (response) => {
            if( response.success ){
                localStorage.setItem("token", response.message);
                localStorage.setItem("user", login);
                props.setToken(response.message);
            } else {
                setMessage(response.message);
            }
        }
        );
    }

    if (props.token) {
        return <Redirect to={{
            pathname : REACT_DASHBOARD_PATH,
            state : { message : "You have been logged in"}
        }} />
    }

    return(
        <Container fluid="true">
            <Row className="text-center page-title">
                <h2>Login</h2>
            </Row>
            <Row className="text-center">
                <Col md={{ span : 4}}>
                    {props.location && props.location.state && props.location.state.message && <Alert variant="warning">{props.location.state.message}</Alert>}
                </Col>
            </Row>
            <Row className="text-center">
                <Col md={{span : 4}}>
                    <Form onSubmit={handleSubmit}>
                        <FormControl onChange={e => setLogin(e.target.value)} placeholder="Username" type="text" className="input-form"/>
                        <FormControl onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="input-form"/> 
                        <Button as="input" type="submit" value="Submit" />
                        <CustomLink to="/register" text="Don't have an account? Register now!"/>
                        <Button as="input" type="button" value="Log In With Auth0" onClick={handleLoginAuth0} />
                    </Form>
                </Col>
            </Row>
            <Row className="text-center">
                <Col md={{ span : 4}}>
                    {message && <Alert variant="danger">{message}</Alert>}
                </Col>
            </Row>
        </Container>
    )
}