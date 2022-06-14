import React from 'react';
import Table from '../Table';
import './index.scss';

const Board = () => {
  return (
    <div className="board">
      <Table uniqueKey="main" hero />
      {/* <Table uniqueKey="sec" /> */}
    </div>
  );
};

export default Board;
