import '../styles/card.scss';
import { useDrag } from 'react-dnd';

import h1 from '../images/h1.png';
import closed from '../images/closed.png';

const Card = ({ flower, number, hidden, col, foundCard, draggable, isFirst, paused, gameStatus, animator }) => {

    const getStyle = (isDragging) => {
      if (isDragging) {
        return {border: 'solid red', opacity:0}
      }
    }

    const [{isDragging}, drag] = useDrag(() => ({
      type: (hidden ? 'hidden' : 'card'),
      item: { flower, number, hidden, col },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      canDrag: !hidden && draggable && !paused && gameStatus,
    }),[hidden, draggable, paused, gameStatus]);
  
    return (
      <>
        <div ref={drag} style={getStyle(isDragging)} className={foundCard+" "+animator}>
          <img src={hidden?closed:h1} alt="h1" className={"cardBody "+(hidden?"hidden ":"notHidden ")+isFirst} />  
        </div>
      </>
    );
  };

//<p>{`${flower.charAt(0)}${number}`}</p>

Card.defaultProps = {
    foundCard: "",
    draggable: true,
    isFirst: 'side',
    animator: "",
}

export default Card;