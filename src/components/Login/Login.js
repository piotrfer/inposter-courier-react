import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginCourier(credentials) {
    return fetch('http://localhost:8000/courier/login', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => response.json())
        .then(data => {
            if(data.token) {
                return { status: 200, data: data.token};
            } else {
                return { status: 400, data: data.error};
            }
        })
}

export default function Login({setToken}) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage ] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const tokenString = await loginCourier({
            login,
            password
        })
        if( tokenString.status === 200 ){
            setToken(tokenString.data);
            setMessage('');
        } else {
            setMessage(tokenString.data);
        }
    }

    return(
        <div>
        <h2>Login</h2>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setLogin(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}