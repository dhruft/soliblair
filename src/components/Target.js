import '../styles/target.scss'
import Card from './Card.js'
import { useDrop } from 'react-dnd';

const Target = ({ foundation, num, foundDropped }) => {

    const flowers = ["heart","diamond","clover","spade"];
    const currentFound = foundation[num];

    const foundDrop = (item) => {
        if (currentFound.length === 0) {
            if (item.flower === flowers[num] && item.number === 1) {
                return true;
            } else {
                return false;
            }
        } else {
            if (item.flower === flowers[num] && item.number === currentFound[currentFound.length-1].number+1) {
                return true;
            } else {
                return false;
            }
        }
    }
    
    const [, dragRef] = useDrop(() => ({
        drop: (card) => {
            foundDropped(card, num);
        },
        canDrop: (item) => {
            return foundDrop(item);
        },
        accept: 'card',
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
      }),
    }));

    return (
        <div ref={dragRef} className="empty">
            {currentFound.length > 0 ? 
            <Card foundCard=" foundCard" flower={currentFound[currentFound.length-1].flower} number={currentFound[currentFound.length-1].number} col={7+num} hidden={false}/> :
            ""}
        </div>
    )
}

export default Target
