import './styles/menu.scss';
import { useEffect } from 'react';

const Menu = ({ gameStatus, dealCards, pauseGame, paused, running, time, setTime, updateScore, score }) => {

    useEffect(() => {
        let interval;
        if (running) {
          interval = setInterval(() => {
            if ((time + 10) % 1000 === 0) updateScore((prevScore) => prevScore-2);
            setTime((prevTime) => prevTime + 10);
          }, 10);
        } else if (!running) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, setTime, updateScore, time]);

    return (
        <div className="menu">
            <div size="lg" className="abtn" onClick={() => dealCards()}>
                {gameStatus ? "Restart" : "Start Game"}
            </div>
            <div size="lg" className="abtn" onClick={() => pauseGame()}>
                {paused ? "Unpause" : "Pause"}
            </div>
            <div className="stats">
                <div className="mainStats"> 
                    <div className="timer">
                        <div className="head">Timer</div>
                        <div className="content">
                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                        </div>
                    </div>
                    <div className="moves">
                        <div className="head">Score</div>
                        <div className="content">{score}</div>
                    </div>
                </div>
                <div className="footer">
                    Developed by Dhruva Arun
                </div>
            </div>
        </div>
    )
}

export default Menu
