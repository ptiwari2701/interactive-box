import React from 'react';
import './Box.css';

const Box = ({ id, color, onClick, isDisabled }) => {
  return (
    <div
      className={`box ${color === 'green' ? 'box-green' : 'box-red'}`}
      onClick={isDisabled ? undefined : onClick}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
      data-testid={`box-${id}`}
    />
  );
};

export default Box;
