import React from "react";
import Label from "./Label";

function RadioButton({ option, value, handleChange, className }) {
    console.log('value:: ', value);
    return (
        <>
            <input 
                type="radio" 
                className={className}
                id={option} 
                name="options" 
                value={option} 
                checked = {value === option} 
                onChange={handleChange}
            />
            <Label className={'label label-margin-0 label-display-normal'} label={option}  htmlFor={option} />
        </>
    );
}

export default RadioButton;