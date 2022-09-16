import React from 'react';
import './InputField.scss'


const InputField = () => {



    return (
        <div className="inputField">
            <input 
                className="cityInputField"
                type="text"
                placeholder="search for city"
            />
        </div> 
    )
}

export default InputField