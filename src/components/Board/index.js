import React from 'react';
import update from 'immutability-helper';
//import { RenderShip } from '../ShipsBoard';
//import { Dustbin } from '../dustibin';
import ShipsBoard from '../ShipsBoard';
import Table from '../Table';
import './index.scss';
import { useDrop } from 'react-dnd';
import { useCallback, useState } from 'react';

const Board = () => {
  const [boxes, setBoxes] = useState({
    a: { top: 0, left: 0, count: 4, position: 'absolute' },
    b: { top: 0, left: 40, count: 4, position: 'absolute' },
  });

  const moveBox = useCallback(
    (id, left, top, position) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top, position },
          },
        })
      );
    },
    [boxes, setBoxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'box',
      drop(item, monitor) {
        /*         const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        const position = 'absolute'; */
        //moveBox(item.id, left, top, position);
        //console.log(item);
        //console.log(monitor);
        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <div ref={drop} className="board">
      {Object.keys(boxes).map((key) => {
        const { left, top, count, position } = boxes[key];
        return <></>;
      })}
      <ShipsBoard />
      <Table uniqueKey="main" />
      <Table uniqueKey="sec" />
      {/* <Dustbin /> */}
    </div>
  );
};

export default Board;
