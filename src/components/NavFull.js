import { Navbar, Container, Nav } from 'react-bootstrap';
import '../styles/navbar.scss';
import { useState } from 'react'

import Warning from './Warning'

const NavFull = () => {
  const [warning, updateWarning] = useState(false);

  const noWarning = () => updateWarning(false);
  const handleWarning = () => updateWarning(true);

  return (
    <Navbar variant="dark" className="navbar">
      <Container>
        <Navbar.Brand href="/soliblair">Soli-Blair</Navbar.Brand>
        <Nav>
          <Nav.Link href="/soliblair">Play</Nav.Link>
          <Nav.Link href="/soliblair/leaderboard">Leaderboard</Nav.Link>
          <Nav.Link href="/soliblair/info">Info</Nav.Link>
        </Nav>
      </Container>
      <Warning warning={warning} handleClose={noWarning} />
    </Navbar>
  )
}

export default NavFull
