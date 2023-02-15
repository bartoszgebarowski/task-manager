import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="lg">
      <Container>
        <Navbar.Brand className={styles.NavBarBrand}>
          <i className="fa-solid fa-t"></i>
          <i className="fa-solid fa-k"></i>
          <i className="fa-solid fa-m"></i>
        </Navbar.Brand>
        <Navbar.Toggle
          className={styles.NavBarToggleButton}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-start">
            <Nav.Link className={styles.NavBarLink} href="#">
              <i className="fa-sharp fa-solid fa-house"></i>
              Home
            </Nav.Link>
            <Nav.Link className={styles.NavBarLink} href="#">
              <i className="fa-solid fa-right-to-bracket"></i>
              Sign in
            </Nav.Link>
            <Nav.Link className={styles.NavBarLink} href="#">
              <i className="fa-sharp fa-solid fa-user-plus"></i>
              Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
