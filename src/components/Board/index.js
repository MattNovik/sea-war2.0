import React from 'react';
import { Dustbin } from '../dustibin';
import ShipsBoard from '../ShipsBoard';
import Table from '../Table';
import './index.scss';

const Board = () => {
  return (
    <div className="board">
      <ShipsBoard />
      <Table uniqueKey="main" />
      <Table uniqueKey="sec" />
      <Dustbin />
    </div>
  );
};

export default Board;
