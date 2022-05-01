import { Navbar, Container, Nav } from 'react-bootstrap';
import '../styles/navbar.scss';

const NavFull = () => {
  return (
    <Navbar variant="dark" className="navbar">
      <Container>
        <Navbar.Brand href="/">Soli-Blair</Navbar.Brand>
        <Nav>
          <Nav.Link href="/">Play</Nav.Link>
          <Nav.Link href="/signup">Leaderboard</Nav.Link>
          <Nav.Link href="/signup">Info</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavFull
