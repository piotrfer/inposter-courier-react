import React from 'react';
import { Redirect } from 'react-router-dom';
import getToken from '../App/getToken';
import { REACT_LOGIN_PATH } from '../Util/Constants';

export default function Dashboard() {
    
    const token = getToken().token;
    
    if (!token) {
        return (
        <Redirect to={{
            pathname: REACT_LOGIN_PATH,
            state: { message : "You have to be logged in to see this page!"}}} />
        );
    }
    
    return(
        <h2>Dashboard</h2>
    )
}