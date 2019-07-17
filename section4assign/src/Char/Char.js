import React from 'react';

const char = (props) => {
    const style = {
        display: 'inline-block',
        padding: '16px',
        margin: '16px',
        textAlign: 'center',
        border: '1px solid black'
    };

    return (
        <div style={style} onClick={props.delete}>{props.character}</div>
    )
};

export default char;
