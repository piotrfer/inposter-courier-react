import React from 'react';
import { Link } from 'react-router-dom';

export const CustomLink = (props) => {
    return (
        <div className="link-wrapper">
            <Link to={props.to}>
                <small>{props.text}</small>
            </Link>
        </div>
    )
}