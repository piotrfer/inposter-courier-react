import React, { useState } from 'react';

async function registerCourier(credentials) {
    return fetch('http://localhost:8000/courier/signup', {
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
        <div>
            <h2>Register</h2>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>First name</p>
                    <input type="text" onChange={e => setFirstname(e.target.value)}/>
                </label>
                <label>
                    <p>Last name</p>
                    <input type="text" onChange={e => setLastname(e.target.value)}/>
                </label>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setLogin(e.target.value)}/>
                </label>
                <label>
                    <p>Email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <label>
                    <p>Confirm password</p>
                    <input type="password" onChange={e => setRepassword(e.target.value)}/>
                </label>
                <label>
                    <p>Licence</p>
                    <input type="licence" onChange={e => setLicence(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}