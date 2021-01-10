import React from 'react';
import { Redirect } from 'react-router-dom';
import getToken from '../App/getToken';
import { REACT_LOGIN_PATH } from '../Util/Constants';
import Packages from './Packages/Packages';
import Labels from './Labels/Labels';
import { Row, Col } from 'react-bootstrap';

export default function Dashboard() {

    const token = getToken().token;

    if (!token) {
        return (
            <Redirect to={{
                pathname: REACT_LOGIN_PATH,
                state: { message: "" }
            }} />
        );
    }

    const handleRefresh = () => {
        console.log("refresh!");
    }

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3}}>
                    <h2>Dashboard</h2>
                    <h3>Labels</h3>
                </Col>
            </Row>
            <Row className="text-center">
                <Col md={{ span : 6 }}>
                    <Labels onRefresh={handleRefresh} />
                </Col>
            </Row>
            <Row>
            <Col md={{ span: 6, offset: 3}}>
                    <h3>Packages</h3>
                </Col>
            </Row>
            <Row className="text-center">
                <Col md={{ span : 6 }}>
                    <Packages/>
                </Col>
            </Row>
        </>
    )
}