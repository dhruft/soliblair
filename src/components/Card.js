import '../styles/card.scss';
import { useDrag } from 'react-dnd';

import h1 from '../images/h1.png';
import closed from '../images/closed.png';

import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEffect } from 'react';

import Draggable from './CustomDragLayer'

const Card = ({ flower, number, hidden, col, foundCard, draggable, isFirst, paused, gameStatus, animator }) => {

    const [{isDragging}, drag, dragPreview] = useDrag(() => ({
      type: (hidden ? 'hidden' : 'card'),
      item: { flower, number, hidden, col },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      canDrag: !hidden && draggable && !paused && gameStatus,
    }),[hidden, draggable, paused, gameStatus]);

    useEffect(() => {
      dragPreview(getEmptyImage())
    }, []);
  
    return (
      <>
        <img ref={drag} src={hidden?closed:h1} alt="h1" className={"cardBody "+foundCard+" "+animator+" "+(hidden?"hidden ":"notHidden ")+isFirst} 
        style={{ visibility: isDragging ? 'hidden' : 'inherit'}}/>
        <Draggable imgName={h1}/>
      </>
    );
  };

//<p>{`${flower.charAt(0)}${number}`}</p>
//<Draggable imgName={`${flower[0]}${number}`}/>

Card.defaultProps = {
    foundCard: "",
    draggable: true,
    isFirst: 'side',
    animator: "",
}

export default Card;