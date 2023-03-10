import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const loggedIn = <>{currentUser?.email}</>;
  const loggedOut = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavBarLink}
        style={({ isActive }) => ({ color: isActive ? "green" : "" })}
      >
        <i className="fa-solid fa-right-to-bracket"></i>
        Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavBarLink}
        style={({ isActive }) => ({ color: isActive ? "green" : "" })}
      >
        <i className="fa-sharp fa-solid fa-user-plus"></i>
        Sign up
      </NavLink>
    </>
  );
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
            <NavLink
              to="/"
              className={styles.NavBarLink}
              style={({ isActive }) => ({ color: isActive ? "green" : "" })}
            >
              <i className="fa-sharp fa-solid fa-house"></i>
              Home
            </NavLink>
            {currentUser ? loggedIn : loggedOut}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
