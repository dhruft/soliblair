import Card from './Card';
import '../styles/cardcol.scss';
import { useDrop } from 'react-dnd';

const CardColumn = ({ cards, colNum, dropped, accepts, foundation, stock }) => {

    const currentCards = cards[colNum];
    const checkDrop = (item) => {
      if (item.col === 20) {
        const tempCard = stock[1][0]
        return accepts[colNum].includes(tempCard.flower[0]+tempCard.number.toString());
      } else if (item.col>6) {
        const tempCard = foundation[item.col-7][foundation[item.col-7].length-1];
        return accepts[colNum].includes(tempCard.flower[0]+tempCard.number.toString());
      }
      return accepts[colNum].includes(item.flower[0]+item.number.toString());
    }

    const [, dragRef] = useDrop(() => ({
        drop: (card) => {
            dropped(card, colNum);
        },
        canDrop: (item) => {
            return checkDrop(item)
        },
        accept: 'card',
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
      }),
    }));
  
    return (
      <div ref={dragRef} className="column">
        <div className="spacer"/>
        {currentCards.map((card) => (
          <Card flower={card.flower} hidden={card.hidden} number={card.number} col={card.col} key={card.flower.charAt(0) + card.number.toString()}/>
        ))}
      </div>
    );
  };

export default CardColumn;