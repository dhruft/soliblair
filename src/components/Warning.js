import { Modal } from 'react-bootstrap'

import { Button } from 'react-bootstrap';
import '../styles/gameOver.scss';

const Warning = ({ handleClose, warning}) => {
    return (
    <div>
      <Modal
        show={warning}
        onHide={() => handleClose(0)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>You Won!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             
            <div>
                <hr />
                <h4 className="formHeader">You made the Leaderboard!</h4>
                <br />
                    
                <Button onClick={() => handleClose(1)} className="modalSubmit" variant="primary" type="submit" size="lg" style={{width:"100%"}}>
                    Submit
                </Button>
            </div>

        </Modal.Body>
      </Modal>
    </div>
    )
}

export default Warning