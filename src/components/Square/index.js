import React from 'react';
import './index.scss';
import { useDrop } from 'react-dnd';
import { useState } from 'react';

function getStyle(backgroundColor) {
  return {
    backgroundColor,
  };
}

const Square = () => {
  const [bc, setBc] = useState('red');
  /* const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: 'box',
      drop(_item, monitor) {
        console.log(monitor);
        setBc('red');
        //const didDrop = monitor.didDrop();
        return undefined;
      },
      collect: (monitor) => ({
        //isOver: monitor.isOver(),
        //isOver: console.log('hover'),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    []
  ); */
  return <div style={getStyle(bc)} className="square"></div>;
};

export default Square;
