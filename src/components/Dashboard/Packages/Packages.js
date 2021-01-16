import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { API_URL_PATH, API_URL_PACKAGES_SUFIX } from '../../Util/Constants';
import PackageTile from './PackageTile';
import './Packages.css'

async function getPackages(token) {
    return fetch(API_URL_PATH+API_URL_PACKAGES_SUFIX, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.msg) {
                return { success: false, message: data.msg };
            } else {
                return { success: true, message: data._embedded.items}
            }
        })
}

function convertToArray(packages, refreshFunction, token) {
    let packageArray = [];
    for (let i=0; i<packages.length; i++){
        packageArray.push(
            <li key={packages[i].id}><PackageTile token={token} package={packages[i]} setRefresh={refreshFunction} /></li>
        )
    }
    return packageArray
}



export default function Packages(props) {
    
    const [ message, setMessage ] = useState();
    const [ packages, setPackages ] = useState();

    const refreshPackages = () => {
        getPackages(props.token)
            .then( (response) => {
                if (response.success) {
                    setPackages(convertToArray(response.message, props.setRefresh, props.token));
                } else {
                    setMessage(response.message);
                }                    
            })
        props.setRefresh(false);
    }


    useEffect( () => {
        if (props.refresh) {
            refreshPackages();
        }
    })

    return (
        <Container fluid="true">
            {message && <Alert variant="danger">{message}</Alert>}
            <Container fluid="true" className="scrollable-list">
                <ul className="package-list">
                    {packages}
                </ul>
            </Container>
        </Container>
    )
}