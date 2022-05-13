import { Modal } from 'react-bootstrap'

import { Button } from 'react-bootstrap';
import '../styles/gameOver.scss';

const Warning = ({ handleClose, warning, link }) => {
    return (
    <div>
      <Modal
        show={warning}
        onHide={() => handleClose(0, link)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>WARNING</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             
            <div>
                <h4 className="formHeader">Are you sure you want to navigate away? All game progress will be lost.</h4>
                <br />
                
                <div className="btns">
                  <Button onClick={() => handleClose(1, link)} className="yes" variant="primary" type="submit" size="lg" style={{width:"100%"}}>
                      Yes!
                  </Button>
                  <Button onClick={() => handleClose(0, link)} className="modalSubmit" variant="primary" type="submit" size="lg" style={{width:"100%"}}>
                      No.
                  </Button>
                </div>
                
            </div>

        </Modal.Body>
      </Modal>
    </div>
    )
}

export default Warning