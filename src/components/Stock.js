import Card from './Card'
import '../styles/stock.scss';
import { useState } from 'react';

import { motion } from "framer-motion"

const Stock = ({ stock, stockClick, running }) => {

    const [animate, setAnimate] = useState(false);

    const handleClick = () => {
        if (running && !animate) {
            if (stock[0].length > 0) {
                setAnimate(true)
                setTimeout(()=>stockClick(), 520)
            } else {
                stockClick();
            }
        }
    }

    return (
    <div className="side">
        <div className="deck" onClick={handleClick}>
            <div className="mainDeck">
                {(stock[0].length !== 0 ? <Card flower={stock[0][0].flower} number={stock[0][0].number} col={20} hidden={true} draggable={false}/> :
                <div className="empty F"/>)}
            </div>

            {animate && (
            <motion.div
                key={animate}
                initial={{ y: `${-3.85}vw`, opacity: 1 }}
                animate={{ y: stock[1].length===0 ? "6vw" : (stock[1].length===1 ? "8vw" : "10vw"), opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                transition={{default: { duration: 0.5 }}}
                onAnimationComplete={()=>setAnimate(false)}>       
                    {stock[0].length!==0 ? <Card animator="animate" draggable={false} flower={stock[0][stock[0].length-1].flower} number={stock[0][stock[0].length-1].number} col={20}/> : ""}
            </motion.div>)}

        </div>
        <div className={"spacer"}/>
        <div className={"display"+(animate?" animate":"")}>
            {stock[1].slice(1,Math.min(3,stock[1].length)).reverse().map((card) =>
                <Card flower={card.flower} number={card.number} col={20} draggable={false} key={card.flower.charAt(0) + card.number.toString()}/> 
            )}
            {stock[1].length>0 ? <Card flower={stock[1][0].flower} number={stock[1][0].number} col={20}/> : ""}
        </div> 
    </div>
  )
}

export default Stock
