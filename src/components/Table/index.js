import React from 'react';
import Square from '../Square';
import { nanoid } from 'nanoid';
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import './index.scss';
import { RenderShip } from '../ShipsBoard';
import { useCallback } from 'react';
import update from 'immutability-helper';

function getStyle(backgroundColor) {
  return {
    backgroundColor,
  };
}

const Table = ({ uniqueKey }) => {
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
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(
          item.left +
            (delta.x - (delta.x % 40)) +
            (delta.x % 40 < 0
              ? delta.x % 40 <= -20
                ? -40
                : 0
              : delta.x % 40 >= 20
              ? 40
              : 0)
        );
        const top = Math.round(
          item.top +
            (delta.y - (delta.y % 40)) +
            (delta.y % 40 < 0
              ? delta.y % 40 <= -20
                ? -40
                : 0
              : delta.y % 40 >= 20
              ? 40
              : 0)
        );
        const position = 'absolute';
        moveBox(item.id, left, top, position);
        return undefined;
      },
    }),
    [moveBox]
  );

  const [bc, setBc] = useState('rgba(0, 0, 0, .5)');
  const renderSquare = (i) => {
    return (
      <div key={i} className="wrapper-square">
        <Square />
      </div>
    );
  };

  /*   if (isOverCurrent || isOver) {
    backgroundColor = 'darkgreen';
  } */

  const squaresList = [];
  for (let i = 0; i < 100; i++) {
    squaresList.push(renderSquare(nanoid()));
  }

  return (
    <div ref={drop} style={getStyle(bc)} className={'table ' + uniqueKey}>
      {squaresList}
      {Object.keys(boxes).map((key) => {
        const { left, top, count, position } = boxes[key];
        return (
          <RenderShip
            key={key}
            id={key}
            count={count}
            left={left}
            top={top}
            position={position}
            hideSourceOnDrag={true}
          ></RenderShip>
        );
      })}
    </div>
  );
};

export default Table;
