import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { HeaderBasket, HeaderWishlist } from '../../eCommerce';
import { Badge, Navbar, Container, Nav } from 'react-bootstrap';

import styles from './styles.module.css';
const { headerContainer, headerLogo, leftBar } = styles;

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className={headerContainer}>
        {/* Logo */}
        <h1 className={headerLogo} onClick={() => navigate('/')}>
          <span>Our</span> <Badge bg="info">Ecommerce</Badge>
        </h1>

        <div className={leftBar}>
          {/* Wishlist */}
          <HeaderWishlist />
          {/* Basket */}
          <HeaderBasket />
        </div>
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
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About Us
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
