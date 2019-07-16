import React from 'react';

const Validation = textLength => {
    return textLength < 5 ? 'Text too short' : 'Test long enough';
};

export default Validation;
