import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
export function TheMainNavBar(){
    return(
        <>
        <Navbar style={{ backgroundColor: '#FF6B6B' }} variant="dark" >
        <Container>
          <Navbar.Brand href="#home"><img src="/images/HouseHubNav.png" alt="" /></Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </>
    )
}
