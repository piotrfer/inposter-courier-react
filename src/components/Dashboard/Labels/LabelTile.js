import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import './LabelTile.css'

export default function LabelTile(props) {
    return (
        <Container fluid="true">
            <Card className="label-card">
                <Card.Header>{props.label.id}</Card.Header>
                <Card.Body>
                    <Card.Text className="label-text"> Name - {props.label.name}</Card.Text>
                    <Card.Text className="label-text"> Address {props.label.address} | {props.label.box}</Card.Text>
                    <Card.Text className="label-text"> Dimensions {props.label.dimensions} </Card.Text>
                </Card.Body>
                { props.label.sent && 
                <Card.Footer className="label-footer">
                    <Button as="input"  variant="outline-success" value="Generate Package" className="generate-button"/>
                </Card.Footer> }
            </Card>
        </Container>
    );
}