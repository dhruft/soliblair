import '../styles/card.scss';
import { useDrag } from 'react-dnd';

const Card = ({ flower, number, hidden, col, foundCard, draggable  }) => {

    const [{ isDragging }, dragRef, dragPreview] = useDrag(() => ({
      type: (hidden ? 'hidden' : 'card'),
      item: { flower, number, hidden, col },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      canDrag: !hidden && draggable,
    }));
  
    return (
      <>
        {
        isDragging && (
          <div ref={dragPreview} className={"cardBody"+foundCard+(hidden ? " hidden" : "")}>
              <p>{`${flower.charAt(0)}${number}`}</p>
          </div>
        )}
        {!isDragging && (
            <div ref={dragRef} className={"cardBody"+foundCard+(hidden ? " hidden" : "")}>
                <p>{`${flower.charAt(0)}${number}`}</p>
            </div>
        )}
      </>
    );
  };

Card.defaultProps = {
    foundCard: "",
    draggable: true
}

export default Card;