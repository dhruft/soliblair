import Card from './Card';
import '../styles/cardcol.scss';
import { useDrop } from 'react-dnd';

const CardColumn = ({ cards, colNum, dropped, accepts, foundation, stock, paused, gameStatus, isAnimating }) => {

    const currentCards = cards[colNum];

    const [, dragRef] = useDrop(() => ({
        drop: (card) => {
            dropped(card, colNum);
        },
        canDrop: (item) => {

          if (item.col === 20) {
            const tempCard = stock[1][0]
            return accepts[colNum].includes(tempCard.flower[0]+tempCard.number.toString());
          } else if (item.col>6) {
            const tempCard = foundation[item.col-7][foundation[item.col-7].length-1];
            return accepts[colNum].includes(tempCard.flower[0]+tempCard.number.toString());
          }
          return accepts[colNum].includes(item.flower[0]+item.number.toString());

        },
        accept: 'card',
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
      }),
    }), [dropped, colNum, accepts, foundation, stock]);

    const processDrag = (pos) => {
      
    }
  
    return (
      <div ref={dragRef} className="rowStack" style={{position: isAnimating ? 'relative' : ''}}>
          {Array.from(Array(currentCards.length).keys()).map((card) => (
            <div>

              <Card gameStatus={gameStatus} paused={paused} pos={card} flower={currentCards[card].flower} hidden={currentCards[card].hidden} 
              number={currentCards[card].number} col={currentCards[card].col} key={currentCards[card].flower.charAt(0) + currentCards[card].number.toString()}
              dragging={currentCards[card].dragging}/>

            </div>
          ))}
      </div>
    );
  };

export default CardColumn;