import { Modal } from 'react-bootstrap'
import { useState } from 'react';

import { InputGroup, Button, Form } from 'react-bootstrap';
import '../styles/gameOver.scss';

const GameOver = ({ won, handleClose, score, time, isTop, insert, insertDaily }) => {

    const [isError, updateError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const name = event.target[0].value;
    
        if (name.length < 1) {
          updateError(true);
        } else {
          event.stopPropagation();
          insertDaily(name, score)
          if (isTop[0]) {
            insert(name,score)
          }
          handleClose();
        }
    }

    return (
    <div>
      <Modal
        show={won}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>You Won!</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="statsBody">
                <h5>{"Score: " + score}</h5>
                    <h5>
                        {"Time: "}
                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                    </h5>
            </div>

             
            {(isTop[0]||isTop[1]) && <div>
                <hr />
                <h4 className="formHeader">{`You made the Daily ${isTop[0]?"and All-Time ":""}Leaderboard!`}</h4>
                <br />

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" id="name">
                        <InputGroup> 
                            <InputGroup.Text id="basic-addon1">Name: </InputGroup.Text>
                            <Form.Control 
                            type="username" 
                            placeholder="Enter Name"
                            isInvalid={ isError } />
                            <Form.Control.Feedback type='invalid'>
                                Please enter a name!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    
                    <Button className="modalSubmit" variant="primary" type="submit" size="lg" style={{width:"100%"}}>
                        Submit
                    </Button>
                </Form>
            </div>}

        </Modal.Body>
      </Modal>
    </div>
    )
}

export default GameOver
