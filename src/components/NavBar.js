import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import useClickedOutsideToggle from "../hooks/useClickedOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickedOutsideToggle();

  // Set current user to null and logout the user
  const logoutHandler = async () => {
    try {
      localStorage.removeItem("token");
      setCurrentUser(null);
    } catch (err) {}
  };

  // Links in the Navbar for authenticated users
  const actionBar = (
    <>
      <NavLink
        to="addtask"
        className={styles.NavBarLink}
        style={({ isActive }) => ({ color: isActive ? "orange" : "" })}
      >
        <i className="fa-regular fa-square-plus"></i>
        Add task
      </NavLink>
      <NavLink
        to="tasks"
        className={styles.NavBarLink}
        style={({ isActive }) => ({ color: isActive ? "orange" : "" })}
      >
        <i className="fa-solid fa-bars"></i>
        Tasks
      </NavLink>
    </>
  );

  // Display current user, username
  const loggedAs = (
    <Nav className="me-auto text-white">
      <span className="me-auto">Logged as : {currentUser?.username}</span>
    </Nav>
  );

  // Logout button
  const loggedOutButton = (
    <>
      <NavLink className={styles.NavBarLink} onClick={logoutHandler}>
        <i className="fa-solid fa-right-from-bracket"></i>
        Logout
      </NavLink>
    </>
  );

  // Icons for not authenticated users
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavBarLink}
        style={({ isActive }) => ({ color: isActive ? "orange" : "" })}
      >
        <i className="fa-solid fa-right-to-bracket"></i>
        Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavBarLink}
        style={({ isActive }) => ({ color: isActive ? "orange" : "" })}
      >
        <i className="fa-sharp fa-solid fa-user-plus"></i>
        Sign up
      </NavLink>
    </>
  );
  return (
    <Navbar className={styles.NavBar} expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand className={styles.NavBarBrand}>
          <i className="fa-solid fa-t"></i>
          <i className="fa-solid fa-k"></i>
          <i className="fa-solid fa-m"></i>
        </Navbar.Brand>
        <Navbar.Toggle
          className={styles.NavBarToggleButton}
          aria-controls="basic-navbar-nav"
          ref={ref}
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          {currentUser ? loggedAs : <></>}
          <Nav className="ms-auto text-start">
            {currentUser ? actionBar : <></>}
            <NavLink
              to="/"
              className={styles.NavBarLink}
              style={({ isActive }) => ({ color: isActive ? "orange" : "" })}
            >
              <i className="fa-sharp fa-solid fa-house"></i>
              Home
            </NavLink>
            {currentUser ? loggedOutButton : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
