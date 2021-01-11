import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { API_URL_PACKAGES_SUFIX, API_URL_PATH } from '../../Util/Constants';

async function generatePackage(label, token) {
    return fetch(API_URL_PATH+API_URL_PACKAGES_SUFIX, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            label: label
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                return {success: true, message: ''};
            }
            else {
                return { success: false, message: ''};
            }
        })
}


export default function CreatePackage(props) {
    
    const handleSave = () => {
        generatePackage(props.labelId, props.token)
            .then( (response) => {
                if(response.success){

                }
                props.onModalHide();
            })
    }

    const handleHide = () => {
        props.onModalHide();
    }

    return (
        <Modal show={props.show} onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>Generate Package</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to generate package?
            </Modal.Body>
            <Modal.Footer>
                <Button as="input" type="button" variant="primary" onClick={handleSave} value="Yes" />
                <Button as="input" type="button" variant="outline-secondary" onClick={handleHide} value="Cancel"  />
            </Modal.Footer>
        </Modal>
    );
}