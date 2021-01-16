import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_URL_PATH, API_URL_SINGLE_PACKAGE_SUFIX } from '../../Util/Constants';

const DEFAULT_STATUS = "received";

async function sendEditRequest(token, id, status) {
    return fetch(API_URL_PATH+API_URL_SINGLE_PACKAGE_SUFIX+`/${id}`, {
        method: 'PATCH',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token 
        },
        body : JSON.stringify({ 
            status : status
        })
    })
        .then( response => response.json())
        .then(data => {
            if (data.error) {
                return { success: false, message: data.error};
            } else {
                return { success: true, message: ''};
            }
        })
}

export default function UpdatePackage(props) {

    const [ status, setStatus ] = useState(DEFAULT_STATUS);

    const handleEdit = () => {
        console.log("there will be callout here");
        console.log(props.token);
        sendEditRequest(props.token, props.packageId, status)
            .then(response => {
                if (!response.success) {
                    
                }})
        props.onModalHide();
    }

    const handleHide = () => {
        props.onModalHide();
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    return (
        <Modal show={props.show} onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Package</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control as="select" onChange={handleStatusChange} defaultValue={DEFAULT_STATUS}>
                        <option value="received">Received</option>
                        <option value="in progress">In Progress</option>
                        <option value="delivered">Delivered</option>
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button as="input" type="button" variant="primary" onClick={handleEdit} value="Set Status" />
                <Button as="input" type="button" variant="outline-secondary" onClick={handleHide} value="Cancel"  />
            </Modal.Footer>
        </Modal>
    );
}