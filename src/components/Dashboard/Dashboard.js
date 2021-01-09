import React from 'react';
import { Redirect } from 'react-router-dom';
import useToken from '../App/useToken';
import { REACT_LOGIN_PATH } from '../Util/Constants';

export default function Dashboard() {
    
    const { token,  } = useToken();
    
    if (!token) {
        return (
        <Redirect to={REACT_LOGIN_PATH} />
        );
    }
    
    return(
        <h2>Dashboard</h2>
    )
}