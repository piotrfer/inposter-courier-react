import React, { useState } from 'react';
import {CustomLink} from '../CustomLink/CustomLink';
import './Login.css';
import { API_URL_PATH, API_URL_LOGIN_SUFIX } from '../Util/Constants';
import { Container, Form, FormControl, Button, Alert } from 'react-bootstrap';

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
                return { success: false, message: data.error}
            } else {
                return { success: true, message: data.token}
            }
        })
}

export default function Login({setToken}) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage ] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginCourier({
            login,
            password
        })
        if( response.success ){
            setToken(response.message);
            
        } else {
            setMessage(response.message);
        }
    }

    return(
        <Container>
             <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <FormControl onChange={e => setLogin(e.target.value)} value={login} placeholder="Username" type="text" />
                <FormControl onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" type="password"/> 
                <Button as="input" type="submit" value="Submit" />
            <CustomLink to="/register" text="Don't have an account? Register now!"/>
            </Form>
            {message && <Alert variant="danger">{message}</Alert>}
        </Container>
    )
}