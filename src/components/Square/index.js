import React from 'react';
import './index.scss';
import { useState } from 'react';

function getStyle(backgroundColor) {
  return {
    backgroundColor,
  };
}

const Square = ({ value }) => {
  const [bc, setBc] = useState(value === 0 ? 'transparent' : 'red');

  return <div style={getStyle(bc)} value={value} className="square"></div>;
};

export default Square;
