import React, { useState } from 'react';
import { API_URL_PATH, API_URL_REGISTER_SUFIX, REACT_LOGIN_PATH, REACT_DASHBOARD_PATH } from '../Util/Constants';
import { CustomLink } from '../CustomLink/CustomLink';
import { Container, Form, FormControl, Button, Alert, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './Register.css';
import getToken from '../App/getToken';

async function registerCourier(credentials) {
    return fetch(API_URL_PATH+API_URL_REGISTER_SUFIX, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.error) {
                return { success: false, message: data.error}
            } else {
                return { success: true, message: ''}
            }
        })
}

function validate(credentials) {
    if (!credentials.firstname) {
        return false;
    }
    if (!credentials.lastname) {
        return false;
    }
    if (!credentials.login) {
        return false;
    }
    if (!credentials.email) {
        return false;
    }
    if (!credentials.password) {
        return false;
    }
    if (!credentials.repassword) {
        return false;
    }
    if (credentials.password !== credentials.repassword) {
        return false;
    }
    if (!credentials.licence) {
        return false;
    }
    return true;
}

export default function Register() {
    
    const [ message, setMessage ] = useState();
    const [ firstname, setFirstname ] = useState();
    const [ lastname, setLastname ] = useState();
    const [ login, setLogin ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ repassword, setRepassword ] = useState();
    const [ licence, setLicence ] = useState();
    const [ token ] = useState(getToken().token);
    const [ registered, setRegistered ] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        if (validate({
            firstname,
            lastname,
            login,
            email,
            password,
            repassword,
            licence
        })) {
            registerCourier({
                firstname,
                lastname,
                login,
                email,
                password,
                licence
            })
            .then((response) => {
                if (response.success) {
                    setMessage('You were registered successfuly');
                    setRegistered(true);
                } else {
                    setMessage(response.message);
                }
            })
        }
        else {
            setMessage('The provided credentials are invalid');
        }
    }

    if (token)  {
        return (
            <Redirect to={{
                pathname : REACT_DASHBOARD_PATH,
                state : { message : "You are already logged in" }
            }} />
        );
    }

    if (registered) {
        return (
            <Redirect to={{
                pathname : REACT_LOGIN_PATH,
                state : { message : "You have been registered"}
            }} />
        );
    }

    return(
        <Container fluid="true">
            <Row className="text-center page-title">
                <h2>Register</h2>
            </Row>
            <Row className="text-center">
                <Col md={{span : 4}}>
                    <Form onSubmit={handleSubmit}>
                        <FormControl onChange={e => setFirstname(e.target.value)} placeholder="First Name" type="text" className="input-form" />
                        <FormControl onChange={e => setLastname(e.target.value)} placeholder="Last Name" type="text" className="input-form" />
                        <FormControl onChange={e => setLogin(e.target.value)} placeholder="Username" type="text" className="input-form" />
                        <FormControl onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="input-form" />
                        <FormControl onChange={e => setLicence(e.target.value)} placeholder="Licence Number" type="text" className="input-form" />
                        <FormControl onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="input-form" />
                        <FormControl onChange={e => setRepassword(e.target.value)} placeholder="Confirm Password" type="password" className="input-form" />
                        <Button as="input" type="submit" value="Submit" />
                        <CustomLink to={REACT_LOGIN_PATH} text="You already have an account? Log in now!" />
                    </Form>
                </Col>
            </Row>
            <Row className="text-center">
                <Col md={{ span : 4}}>
                    {message && <Alert variant="danger">{message}</Alert>}
                </Col>
            </Row>
        </Container>
    );
}