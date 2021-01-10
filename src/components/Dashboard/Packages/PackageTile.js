import React from 'react';
import './PackageTile.css'
import { Container, Card, Button} from 'react-bootstrap';

export default function PackageTile(props) {
    
    const handleClick = () => {

    }

    const received = (new Date(props.package.received*1000)).toLocaleDateString("pl-Pl",
    { day: 'numeric',  month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'  });

    return (
        <Container fluid="true">
            <Card className="package-card">
                <Card.Header>{props.package.id}</Card.Header>
                <Card.Body>
                    <Card.Text className="package-text"> Label - {props.package.label}</Card.Text>
                    <Card.Text className="package-text"> Status - {props.package.status}</Card.Text>
                    <Card.Text className="package-text"> Received - {received}</Card.Text>
                </Card.Body>
                <Card.Footer className="package-footer">
                    <Button as="input" type="button" variant="outline-success" onClick={handleClick} value="Change Status" size="md" block/>
                </Card.Footer>
            </Card>
        </Container>
    );
}