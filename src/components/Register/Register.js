import React, { useState } from 'react';
import { API_URL_PATH, API_URL_REGISTER_SUFIX, REACT_LOGIN_PATH } from '../Util/Constants';
import { CustomLink } from '../CustomLink/CustomLink';
import { Container, Form, FormControl, Button, Alert } from 'react-bootstrap';

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
            const response = await registerCourier({
                firstname,
                lastname,
                login,
                email,
                password,
                licence
            });
            if (response.success) {
                setMessage('You were registered successfuly');
            } else {
                setMessage(response.message);
            }
        }
        else {
            setMessage('The provided credentials are invalid');
        }
    }

    return(
        <Container>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <FormControl onChange={e => setFirstname(e.target.value)} value={firstname} placeholder="First Name" type="text" />
                <FormControl onChange={e => setLastname(e.target.value)} value={lastname} placeholder="Last Name" type="text" />
                <FormControl onChange={e => setLogin(e.target.value)} value={login} placeholder="Username" type="text" />
                <FormControl onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" type="email" />
                <FormControl onChange={e => setLicence(e.target.value)} value={licence} placeholder="Licence Number" type="text" />
                <FormControl onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" type="password" />
                <FormControl onChange={e => setRepassword(e.target.value)} value={repassword} placeholder="Confirm Password" type="password" />
                <Button as="input" type="submit" value="Submit" />
            </Form>
            <CustomLink to={REACT_LOGIN_PATH} text="You already have an account? Log in now!" />
        { message && <Alert variant="danger">{message}</Alert>}
        </Container>
    );
}