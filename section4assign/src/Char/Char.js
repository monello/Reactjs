import React from 'react';

const Char = (letter) => {
    const style = {
      display: 'inline-block',
      padding: '15px',
      textAlign: 'center',
      border: '1px solid black'
    };
    return (
        <div style={style}>{letter}</div>
    );
};

export default Char;
