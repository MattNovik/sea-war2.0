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

const RenderShip = (count) => {
  let shipSize = [];
  let id = nanoid();
  for (let i = 0; i < count; i++) {
    shipSize.push(renderShipSquare(id));
  }
  const [, drag] = useDrag(() => ({ type: 'box' }));
  return (
    <div key={id} ref={drag} className={'ship ship-' + count}>
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
  console.log(shipslist);

  return <div className="ships-board">{RenderShip(4)}</div>;
};

export default ShipsBoard;
