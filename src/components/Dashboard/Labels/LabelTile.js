import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import './LabelTile.css'
import CreatePackage from '../Packages/CreatePackage';

export default function LabelTile(props) {
    
    const [ show, setShow ] = useState();

    const handleClick = () => {
        setShow(true);
    }

    const handleHide = () => {
        setShow(false);
        props.onRefresh();
    }
    
    return (
        <Container fluid="true">
            <Card className="label-card">
                <Card.Header>{props.label.id}</Card.Header>
                <Card.Body>
                    <Card.Text className="label-text"> Name - {props.label.name}</Card.Text>
                    <Card.Text className="label-text"> Address {props.label.address} | {props.label.box}</Card.Text>
                    <Card.Text className="label-text"> Dimensions {props.label.dimensions} </Card.Text>
                </Card.Body>
                <Card.Footer className="label-footer">
                    { props.label.sent==="False" && 
                    <Button as="input" type="button" variant="outline-success" onClick={handleClick} value="Generate Package" size="md" block/>
                    }
                    { props.label.sent==="True" && 
                    <Button as="input" type="button" variant="outline-secondary" value="Package already generated" size="md" block disabled />
                    }
                </Card.Footer>
            </Card>
            <CreatePackage token={props.token} show={show} labelId={props.label.id} onModalHide={handleHide}/>
        </Container>
    );
}