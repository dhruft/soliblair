import { useEffect, useState } from 'react';
import { useDragLayer } from 'react-dnd'
import '../styles/card.scss'

const CustomDragLayer = ({ flower, hidden, number }) => {
    
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
              <img className={"cardBody"} update={{hidden, flower, number}} src={require("../cardPics/"+(hidden?"closed":(flower.charAt(0)+number))+".png")} 
              alt={(hidden?"closed":(flower.charAt(0)+number))} key={item.id}/> {item.id}
          </div> 
        : null;
};

export default CustomDragLayer;