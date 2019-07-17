import React from 'react';

const validation = (props) => {
    let message = props.inputLength <= 5 ? 'Text too short' : 'Text long enough';
    return <p>{message}</p>
};

export default validation;
