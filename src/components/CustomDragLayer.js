import { useDragLayer } from 'react-dnd'

import h1 from '../images/h1.png'
import '../styles/card.scss'

const CustomDragLayer = ({ imgName }) => {  
    
    const {isDragging, currentOffset, item} = useDragLayer(
            (monitor) => {
            return {
                isDragging: monitor.isDragging(),
                currentOffset: monitor.getSourceClientOffset(),
                item: monitor.getItem()
            };
        }
    );

    return isDragging && currentOffset
        ? <div style={{ 
              // functional
              transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
              position: 'fixed',
              top: 0,
              left: 0,
              pointerEvents: 'none', 
        
              //design only
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}>
              <img className="cardBody" src={h1} alt={"h1"}/>
          </div> 
        : null;
};

export default CustomDragLayer;