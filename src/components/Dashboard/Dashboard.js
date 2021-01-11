import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { REACT_LOGIN_PATH } from '../Util/Constants';
import Packages from './Packages/Packages';
import Labels from './Labels/Labels';
import { Row, Col } from 'react-bootstrap';

export default function Dashboard(props) {

    const [ packageRefresh, setPackageRefresh ] = useState(true);
    const [ labelRefresh, setLabelRefresh ] = useState(true);

    if (!props.token) {
        return (
            <Redirect to={{
                pathname: REACT_LOGIN_PATH,
                state: { message: "" }
            }} />
        );
    }

    const handleRefresh = () => {
        setPackageRefresh(true);
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
                    <Labels token={props.token} onRefresh={handleRefresh} refresh={labelRefresh} setRefresh={setLabelRefresh}/>
                </Col>
            </Row>
            <Row>
            <Col md={{ span: 6, offset: 3}}>
                    <h3>Packages</h3>
                </Col>
            </Row>
            <Row className="text-center">
                <Col md={{ span : 6 }}>
                    <Packages token={props.token} refresh={packageRefresh} setRefresh={setPackageRefresh} />
                </Col>
            </Row>
        </>
    )
}