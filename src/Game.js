import CardColumn from './components/CardColumn'
import Target from './components/Target'
import Stock from './components/Stock'

import './styles/game.scss';
import Menu from './Menu';

import { useState } from 'react';
import { useReducer } from 'react';

const Game = () => {

    const [cards, updateCards] = useState([[{flower:"spade",number:6,col:0}],[],[],[],[],[],[]]);
    const [foundation, updateFound] = useState([[],[],[],[]]);
    const [gameStatus, updateGame] = useState(false);
    const [stock, updateStock] = useState([[{flower:"heart",number:5,col:20}],[]])
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const stockClick = () => {
        if (stock[0].length===0) {
            let newStock = stock;
            newStock[0] = newStock[1];
            newStock[1] = [];
            updateStock(newStock);
        } else {
            let newStock = stock;
            newStock[1].unshift(newStock[0][newStock[0].length-1]);
            newStock[0] = newStock[0].slice(0,newStock[0].length-1);
            updateStock(newStock)
        }
        forceUpdate();
    }

    const foundDropped = (card, target) => {
        
        let newCards = cards;
        const oldCol = newCards[card.col];
        newCards[card.col] = oldCol.slice(0,oldCol.length-1)
        updateCards(newCards)

        const newObj = calculateObject(card.col, newCards)
        let newAccepts = accepts;
        newAccepts[card.col] = newObj;
        updateAccept(newAccepts);

        card.col = 7+["heart","diamond","clover","spade"].indexOf(card.flower);
        let tempFound = foundation;
        console.log(card)
        tempFound[target].push(card);
        updateFound(tempFound)

        forceUpdate();
    }

    const dropped = (card, colNum) => {

        console.log(card)
        
        const finalFound = foundation[["heart","diamond","clover","spade"].indexOf(card.flower)]
        let newCards = cards; 
        let oldCards = card.col>15 ? [stock[1][0]] : (card.col>6 ? [finalFound[finalFound.length-1]] : cards[card.col]);
        let currentCards = cards[colNum];      
        
        if (colNum !== card.col) {
            let oldIndex = 0;
            if (card.col<7) {
                oldIndex = oldCards.findIndex(oldCard => oldCard.flower === card.flower && oldCard.number === card.number);
                newCards[card.col] = oldCards.slice(0,oldIndex);
            }

            currentCards = currentCards.concat(
                oldCards.slice(oldIndex).map((oldCard => {
                oldCard.col = colNum;
                return oldCard;
            })));
            newCards[colNum] = currentCards;

            //calculate object code
            const newObj1 = calculateObject(colNum, newCards)
            let newObj2 = "";
            if (card.col>6 && card.col<15) {
                let newFoundation = foundation;
                newFoundation[card.col-7] = newFoundation[card.col-7].slice(0,newFoundation[card.col-7].length-1);
                updateFound(newFoundation)
            } else if (card.col>15) {
                let newStock = stock;
                newStock[1] = newStock[1].slice(1)
                updateStock(newStock);
            } else {
                console.log(newCards)
                if (newCards[card.col].length>0) {
                    newCards[card.col][newCards[card.col].length-1].hidden = false
                }
                newObj2 = calculateObject(card.col, newCards)
            }

            let newAccepts = accepts;

            newAccepts[colNum] = newObj1;
            if (card.col<7) newAccepts[card.col] = newObj2;

            //final stuff

            updateAccept(newAccepts);

            updateCards(newCards);

            forceUpdate();
        }
    }

    
    const calculateObject = (colNum, newCards) => {
        const currentCards = newCards[colNum];

        let lastCard = {};
        let accepted = [];
        if (currentCards.length!==0) {
            lastCard = currentCards[currentCards.length-1];
            if (["spade", "clover"].includes(lastCard.flower)) {
                accepted = ["heart", "diamond"]
            } else {
                accepted = ["spade", "clover"]
            }
        } else {
            lastCard = {number: 14};
            accepted = ["heart","spade","clover","diamond"];
        }

        const finalAccepted = accepted.map(aFlower => (
            aFlower[0] + (lastCard.number-1).toString()
        ));
        
        return finalAccepted;
    }

    var [accepts, updateAccept] = useState([0,1,2,3,4,5,6].map((num)=>{
        return calculateObject(num, cards);
    }));

    const startGame = () => {

        let deck = [];

        for (let num = 1; num <= 13; num++) {
            for (let suit of ["heart", "clover","spade","diamond"]) {
                let card = { flower: suit, number:num, col:0, hidden: true };
                deck.push(card);
            }
        }

        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }

        let startUpCards = [[],[],[],[],[],[],[]];
        let counter = 0;
        for (var column=0; column<7; column++) {
            for (var row=0; row<=column; row++) {
                let card = deck[counter]
                if (row === column) card.hidden = false;
                card.col = column
                startUpCards[column].push(card);
                counter++;
            }
        }

        let newStock = [deck.slice(28).map((card)=>{
            card.col=20
            return card;
        }),[]]

        updateStock(newStock)
        updateCards(startUpCards);
        updateFound([[],[],[],[]])
        updateGame(true);

        forceUpdate();
    }

    return (
        <div className="wrapper">
            <div className="gameContainer shadow-lg">
                <div className="column stock">
                    <Stock stock={stock} stockClick={stockClick}/>
                </div> 
                <div></div>
                <CardColumn cards={cards} colNum={0} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock}/>
                <CardColumn cards={cards} colNum={1} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock}/>
                <CardColumn cards={cards} colNum={2} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock}/>
                <CardColumn cards={cards} colNum={3} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock}/>
                <CardColumn cards={cards} colNum={4} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock}/>
                <CardColumn cards={cards} colNum={5} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock}/>
                <CardColumn cards={cards} colNum={6} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock}/>
                <div className="column foundation">
                    <Target foundation={foundation} num={0} foundDropped={foundDropped}/>
                    <Target foundation={foundation} num={1} foundDropped={foundDropped}/>
                    <Target foundation={foundation} num={2} foundDropped={foundDropped}/>
                    <Target foundation={foundation} num={3} foundDropped={foundDropped}/>
                </div> 
            </div>
            <Menu gameStatus={gameStatus} startGame={startGame}/>
        </div>
    )

    /*
 
*/
}

export default Game
