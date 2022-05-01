import Card from './Card'
import '../styles/stock.scss';

const Stock = ({ stock, stockClick }) => {
    return (
    <div>
        <div className="spacer"/>
        <div className="deck" onClick={stockClick}>
            {
                stock[0].length > 0 ? <Card flower={stock[0][0].flower} number={stock[0][0].number} col={20} hidden={true} draggable={false}/> :
                <div className="empty s"/>
            }
        </div>
        <div className="spacer"/>
        <div className="display">
            {stock[1].slice(1,Math.min(3,stock[1].length)).reverse().map((card) =>
                <Card flower={card.flower} number={card.number} col={20} draggable={false} key={card.flower.charAt(0) + card.number.toString()}/> 
            )}
            {stock[1].length>0 ? <Card flower={stock[1][0].flower} number={stock[1][0].number} col={20}/> : ""}
        </div> 
    </div>
  )
}

export default Stock
