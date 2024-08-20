import React from 'react';
import './Card.css';

function Card({className, children}) {
    return (<div className={className}>{children}</div>);
}

export default Card;