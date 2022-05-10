import CardColumn from './components/CardColumn'
import Target from './components/Target'
import Stock from './components/Stock'
import GameOver from './components/GameOver';
import Card from './components/Card'

import './styles/game.scss';
import Menu from './Menu';

import { useState, useReducer } from 'react';
import { motion } from "framer-motion";

const Game = ({ insert, insertDaily, checkInsert }) => {

    const [cards, updateCards] = useState([[],[],[],[],[],[],[]]);
    const [foundation, updateFound] = useState([[],[],[],[]]);
    const [gameStatus, updateGame] = useState(false);
    const [stock, updateStock] = useState([[{ flower:"lol", number:69 }],[]])
    const [paused, changePause] = useState(false);
    const [running, setRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [hiddenCount, updateHidden] = useState(100)
    const [won, setWon] = useState(false);
    const [score, updateScore] = useState(0);
    const [isTop, changeTop] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const handleClose = () => {
        setWon(false)
        updateCards([[],[],[],[],[],[],[]])
        updateGame(false);
        setRunning(false)
        changePause(false)
        setTime(0)
        updateScore(0)
        updateFound([[],[],[],[]])
        updateStock([[{ flower:"lol", number:69 }],[]])
    };
    const handleShow = () => setWon(true);

    const stockClick = () => {
        if (!gameStatus) return;
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

    const foundDropped = (card, target, numMoves) => {
        
        let newCards = cards;
        let newHidden = hiddenCount+0;
        console.log("newHidden is " + hiddenCount)

        if (card.col !== 20) {
            //update old column cards
            const oldCol = newCards[card.col];
            newCards[card.col] = oldCol.slice(0,oldCol.length-1)
            if (newCards[card.col].length>0 && newCards[card.col][newCards[card.col].length-1].hidden===true) {
                newHidden --;
                newCards[card.col][newCards[card.col].length-1].hidden = false
            }
        }
        updateCards(newCards)

        if (card.col === 20) {
            //update stock
            let newStock = stock;
            newStock[1] = newStock[1].slice(1)
            updateStock(newStock);
        } else {
            //update accepts for columns
            const newObj = calculateObject(card.col, newCards)
            let newAccepts = accepts;
            newAccepts[card.col] = newObj;
            updateAccept(newAccepts);
        }

        card.col = 7+["heart","diamond","clover","spade"].indexOf(card.flower);
        let tempFound = foundation;
        tempFound[target].push(card);

        updateFound(tempFound)

        updateHidden(newHidden);

        console.log(newHidden + " found")
        if (newHidden === 0) endGame();

        forceUpdate();
    }

    const dropped = (card, colNum) => {

        const finalFound = foundation[["heart","diamond","clover","spade"].indexOf(card.flower)]
        let newCards = cards; 
        let oldCards = card.col>15 ? [stock[1][0]] : (card.col>6 ? [finalFound[finalFound.length-1]] : newCards[card.col]);
        let currentCards = newCards[colNum];
        let newHidden = hiddenCount+0;
        let newScore = score;
        
        if (colNum !== card.col) {
            let oldIndex = 0;
            if (card.col<7) {
                oldIndex = oldCards.findIndex(oldCard => oldCard.flower === card.flower && oldCard.number === card.number);
                newCards[card.col] = oldCards.slice(0,oldIndex);
            }

            currentCards = currentCards.concat(
                oldCards.slice(oldIndex).map((oldCard => {
                oldCard.col = colNum;
                oldCard.hidden = false;
                return oldCard;
            })));
            newCards[colNum] = currentCards;

            //calculate object code
            const newObj1 = calculateObject(colNum, newCards)
            let newObj2 = "";
            if (card.col>6 && card.col<15) {
                newScore -= 15;
                let newFoundation = foundation;
                newFoundation[card.col-7] = newFoundation[card.col-7].slice(0,newFoundation[card.col-7].length-1);
                updateFound(newFoundation)
            } else if (card.col>15) {
                newScore += 5;
                let newStock = stock;
                newStock[1] = newStock[1].slice(1)
                updateStock(newStock);
            } else {
                if (newCards[card.col].length>0 && newCards[card.col][newCards[card.col].length-1].hidden===true) {
                    newHidden--;
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

            updateHidden(newHidden)

            updateScore(newScore);

            console.log(newHidden + " row")
            if (newHidden === 0) endGame();

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
                card.dragging = false;
                startUpCards[column].push(card);
                counter++;
            }
        }

        let newStock = [deck.slice(28).map((card)=>{
            card.col=20
            return card;
        }),[]]

        let newAccepts = [0,1,2,3,4,5,6].map((column) => calculateObject(column, startUpCards))

        updateStock(newStock)
        updateCards(startUpCards);
        updateFound([[],[],[],[]])
        updateGame(true);
        updateAccept(newAccepts);
        setRunning(true)
        updateHidden(21)
        updateScore(625)

        forceUpdate();
    }

    const dealCards = () => {
        setWon(false)
        changePause(false)
        updateStock([[{ flower:"lol", number:69 }],[]])
        updateFound([[],[],[],[]])
        updateCards([[],[],[],[],[],[],[]]);
        setRunning(false);
        setTime(0)
        changeTop(false)
        setAnimate(true)
        setTimeout(() => startGame(), 1500)
    }

    const pauseGame = () => {
        if (gameStatus) {
            if (stock[0].length === 0) {
                changePause(!paused);
                setRunning(!running);
            } else if (stock[0][0].flower !== "lol") {
                changePause(!paused);
                setRunning(!running);
            }
        }
    }

    const endGame = () => {
        setRunning(false)
        changePause(true)
        setWon(true)

        checkInsert(score).then(isItTop => {
            changeTop(isItTop);
        }).then(handleShow())
    }

    const animateEnd = () => {
        setTimeout(()=>setAnimate(false),50)
    }

    return (
        <div className="wrapper">
            <div className="gameContainer shadow-lg">
                <div className="column stock">
                    <Stock stock={stock} stockClick={stockClick} running={running}/>
                    <div className="animateRow">
                        {animate && (
                            [0,1,2,3,4,5,6].map((num) =>
                            //3.4+1.668*num
                            <motion.div
                                key={animate+num}
                                initial={{ x: `${-5.6*num-5.7}vw`, opacity: 1 }}
                                animate={{ x:`${1.6*2+1.6*num}vw`, opacity: 1 }}
                                exit={{ x: 0, opacity: 0 }}
                                transition={{default: { duration: 1.5 }}}
                                onAnimationComplete={animateEnd}>       
                                    <Card flower={"lol"} number={69} col={20} hidden={true}/>
                            </motion.div>)
                        )}
                    </div>
                </div> 
                <div></div>
                <CardColumn cards={cards} colNum={0} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock} paused={paused} gameStatus={gameStatus} isAnimating={animate}/>
                <CardColumn cards={cards} colNum={1} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock} paused={paused} gameStatus={gameStatus} isAnimating={animate}/>
                <CardColumn cards={cards} colNum={2} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock} paused={paused} gameStatus={gameStatus} isAnimating={animate}/>
                <CardColumn cards={cards} colNum={3} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock} paused={paused} gameStatus={gameStatus} isAnimating={animate}/>
                <CardColumn cards={cards} colNum={4} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock} paused={paused} gameStatus={gameStatus} isAnimating={animate}/>
                <CardColumn cards={cards} colNum={5} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock} paused={paused} gameStatus={gameStatus} isAnimating={animate}/>
                <CardColumn cards={cards} colNum={6} dropped={dropped} accepts={accepts} foundation={foundation} stock={stock} paused={paused} gameStatus={gameStatus} isAnimating={animate}/>
                <div></div>
                <div className="column foundation">
                    <Target foundation={foundation} num={0} foundDropped={foundDropped} stock={stock}/>
                    <Target foundation={foundation} num={1} foundDropped={foundDropped} stock={stock}/>
                    <Target foundation={foundation} num={2} foundDropped={foundDropped} stock={stock}/>
                    <Target foundation={foundation} num={3} foundDropped={foundDropped} stock={stock}/>
                </div>
            </div>
            <Menu gameStatus={gameStatus} dealCards={dealCards} pauseGame={pauseGame} paused={paused} updateCards={updateCards} running={running} 
            time={time} setTime={setTime} updateScore={updateScore} score={score}/>
            <GameOver won={won} handleClose={handleClose} time={time} score={score} insert={insert} 
            isTop={isTop} insertDaily={insertDaily}/>
        </div>
    )

}

export default Game