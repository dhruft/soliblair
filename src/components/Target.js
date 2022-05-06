import '../styles/target.scss'
import Card from './Card.js'
import { useDrop } from 'react-dnd';

const Target = ({ foundation, num, foundDropped, stock, moves }) => {

    const flowers = ["heart","diamond","clover","spade"];
    const currentFound = foundation[num];
    
    const [, dragRef] = useDrop(() => ({
        drop: (card) => {
            const tempCard = card.col===20 ? stock[1][0] : card
            foundDropped(tempCard, num, moves);
        },
        canDrop: (item) => {

            const tempCard = item.col===20 ? stock[1][0] : item

            if (currentFound.length === 0) {
                return (tempCard.flower === flowers[num] && tempCard.number === 1) 
            }
            return (tempCard.flower === flowers[num] && tempCard.number === currentFound[currentFound.length-1].number+1)

        },
        accept: 'card',
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
      }),
    }), [currentFound, num, stock, moves]);

    return (
        <div ref={dragRef} className="empty">
            {currentFound.length > 0 ? 
            <Card foundCard=" foundCard" flower={currentFound[currentFound.length-1].flower} number={currentFound[currentFound.length-1].number} col={7+num} hidden={false}/> :
            ""}
        </div>
    )
}

export default Target
