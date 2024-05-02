import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { authLogout } from '@store/auth/authSlice';
import { actGetWishlistItems } from '@store/wishlist/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import HeaderLeftBar from './HeaderLeftBar/HeaderLeftBar';
import { Badge, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
// Styles
import styles from './styles.module.css';
const { headerContainer, headerLogo } = styles;

const Header = () => {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlistItems('productIds'));
    }
  }, [dispatch, accessToken]);

  const navigate = useNavigate();

  return (
    <header>
      <div className={headerContainer}>
        {/* Logo */}
        <h1 className={headerLogo} onClick={() => navigate('/')}>
          <span>Our</span> <Badge bg="info">eCom</Badge>
        </h1>
        <HeaderLeftBar />
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
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown
                    title={`Welcome, ${user?.firstName} ${user?.lastName} `}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item as={NavLink} to="profile" end>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="profile/orders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={NavLink}
                      to="/"
                      onClick={() => dispatch(authLogout())}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
