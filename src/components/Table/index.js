import React from 'react';
import Square from '../Square';
import { nanoid } from 'nanoid';
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import './index.scss';
import { RenderShip } from '../ShipsBoard';
import { useCallback } from 'react';
import update from 'immutability-helper';
import { useDispatch, useSelector } from 'react-redux';
import { moveBox } from '../../store/tableRedux/tableWorkSpace';

function getStyle(backgroundColor) {
  return {
    backgroundColor,
  };
}

const Table = (hero) => {
  const dispatch = useDispatch();
  const tableShips = useSelector((state) => state.table.ships);
  const tableSpace = useSelector((state) => state.table.tableSpace);
  /*   const moveBox = useCallback(
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
  ); */

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
        const newId = item.id;
        dispatch(moveBox({ newId, left, top, position }));
        return undefined;
      },
    }),
    []
  );

  const [bc] = useState('rgba(0, 0, 0, .5)');
  const renderSquare = (mean, i) => {
    return (
      <div key={i} id={i} value={mean} className="wrapper-square">
        <Square value={mean} />
      </div>
    );
  };

  const squaresList = [];
  for (let i = 0; i < tableSpace.length; i++) {
    squaresList.push(renderSquare(tableSpace[i].mean, tableSpace[i].id));
  }

  return (
    <div ref={drop} hero style={getStyle(bc)} className={'table '}>
      {squaresList}

      {hero ? (
        Object.keys(tableShips).map((key) => {
          const { left, top, count, position } = tableShips[key];
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
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Table;
