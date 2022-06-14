import React from 'react';
import SquareShip from '../SquareShip';
import { useDrag } from 'react-dnd';
import { nanoid } from 'nanoid';
import { ships } from '../../data/data';
import './index.scss';

const renderShipSquare = () => {
  let id = nanoid();
  return <SquareShip key={id} />;
};

export const RenderShip = ({
  id,
  left,
  top,
  position,
  count,
  hideSourceOnDrag,
}) => {
  let shipSize = [];
  let idS = nanoid();
  for (let i = 0; i < count; i++) {
    shipSize.push(renderShipSquare(idS));
  }

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'box',
      item: { id, left, top, count, position },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      isDragging: (monitor) => {
        console.log(monitor.getInitialClientOffset());
      },
      //end: (e, monitor) => console.log(monitor.getSourceClientOffset()),
    }),
    [id, left, top]
  );

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  return (
    <div
      ref={drag}
      data-testid="box"
      className={'ship ship-' + count}
      style={{ left, top, position }}
    >
      {shipSize}
    </div>
  );
};

const ShipsBoard = () => {
  const shipslist = [];

  for (let key in ships) {
    let newList = [];
    for (let k = 0; k < ships[key][1]; k++) {
      newList.push(RenderShip(ships[key][0]));
    }
    shipslist.push(newList);
  }

  return <div className="ships-board"></div>;
};

export default ShipsBoard;
