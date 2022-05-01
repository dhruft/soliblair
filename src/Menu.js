import { Button } from 'react-bootstrap';
import './styles/menu.scss';

const Menu = ({ gameStatus, startGame }) => {
    return (
        <div className="menu">
            <Button size="lg" className="btn" onClick={() => startGame()}>
                {gameStatus ? "Restart" : "Start Game"}
            </Button>
            <Button size="lg" className="btn">
                Pause
            </Button>
        </div>
    )
}

export default Menu
