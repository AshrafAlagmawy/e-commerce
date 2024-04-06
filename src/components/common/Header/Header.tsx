import { HeaderBasket } from '../../eCommerce';
import { Badge, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import styles from './styles.module.css';
const { headerContainer, headerLogo } = styles;

const Header = () => {
  return (
    <header>
      <div className={headerContainer}>
        {/* Logo */}
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">Ecommerce</Badge>
        </h1>

        {/* Basket */}
        <HeaderBasket />
      </div>
      {/* Navigation */}
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Categories</Nav.Link>
              <Nav.Link href="#link">About Us</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">
                  First Selection
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Second Selection
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#home">Login</Nav.Link>
              <Nav.Link href="#link">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
