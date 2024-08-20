import React from 'react';
import './TextField.css';

function TextField({ className, placeholder, type, id, value, handleChange }) {
    return (
        <>
            <input
                className={className}
                id={id}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={handleChange}
            /><br />
        </>
    );
}

export default TextField;