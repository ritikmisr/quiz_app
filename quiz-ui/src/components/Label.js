import React from 'react';
import './Label.css';

function Label({ className, label, htmlFor }) {
    return (
        <>
            <label
                className={className}
                htmlFor={htmlFor}
            >{label}</label><br />
        </>
    );
}

export default Label;