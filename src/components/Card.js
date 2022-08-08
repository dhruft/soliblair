import '../styles/card.scss';
import { useDrag } from 'react-dnd';

import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEffect } from 'react';

import CustomDragLayer from './CustomDragLayer'

const Card = ({ flower, number, hidden, col, foundCard, draggable, pos, paused, gameStatus, animator, cards }) => {

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

    const image = <img ref={drag} src={require("../cardPics/"+(hidden?"closed":(flower.charAt(0)+number))+".png")} alt={(hidden?"closed":(flower.charAt(0)+number))} 
    className={"cardBody "+foundCard+" "+animator+" "+(hidden?"hidden ":"notHidden ")} 
    style={{ visibility: isDragging ? 'hidden' : 'inherit'}}/>
  
    return (
      <div>
        {image}
        {isDragging && <CustomDragLayer flower={flower} hidden={hidden} number={number} key={flower} pos={pos} cards={cards[col]}/>}
      </div>
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