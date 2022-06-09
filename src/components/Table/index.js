import React from 'react';
import Square from '../Square';
import { nanoid } from 'nanoid';

import './index.scss';

const Table = ({ uniqueKey }) => {
  const renderSquare = (i) => {
    return (
      <div key={i} className="wrapper-square">
        <Square />
      </div>
    );
  };

  const squaresList = [];
  for (let i = 0; i < 100; i++) {
    squaresList.push(renderSquare(nanoid()));
  }

  return <div className={'table ' + uniqueKey}>{squaresList}</div>;
};

export default Table;
