import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { API_URL_LABELS_SUFIX, API_URL_PATH } from '../../Util/Constants';
import './Labels.css';
import LabelTile from './LabelTile';

async function getLabels(token) {
    return fetch(API_URL_PATH+API_URL_LABELS_SUFIX, {
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



export default function Labels(props) {
    
    const [ message, setMessage ] = useState();
    const [ labels, setLabels ] = useState();

    const refreshLabels = () => {
        getLabels(props.token)
            .then( (response) => {
                if (response.success) {
                    setLabels(convertToArray(response.message));
                } else {
                    setMessage(response.message);
                }
            })
        props.setRefresh(false);
    }

    const handleRefresh = () => {
        props.onRefresh();
        refreshLabels();
    }

    const convertToArray = (labels) => {
        let labelArray = [];
        for (let i=0; i<labels.length; i++){
            labelArray.push(
                <li key={labels[i].id}><LabelTile token={props.token} label={labels[i]} onRefresh={handleRefresh}/></li>
            )
        }
        return labelArray
    }


    useEffect( () => {
        if(props.refresh) {
            refreshLabels();
        }
    })

    
    
    return (
        <Container fluid="true">
        { message && <Alert variant="danger">{message}</Alert>}
        <Container fluid="true" className="scrollable-list">
            <ul className="label-list">
                {labels}
            </ul>
            </Container>
        </Container>
    );
}