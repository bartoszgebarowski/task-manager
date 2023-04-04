import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/HomePage.module.css";
import welcomeLogoLogged from "../../assets/task_manager_welcome_logo_logged.jpg";
import welcomeLogo from "../../assets/task_manager_welcome_logo.jpg";
import { Container } from "react-bootstrap";

function HomePage() {
  const currentUser = useCurrentUser();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const handleMount = async () => {
      setIsLoaded(true);
    };
    handleMount();
  }, [currentUser]);
  return (
    <>
      {isLoaded ? (
        <>
          {currentUser ? (
            <Container fluid>
              <div className="mt-3">
                <h1>Home page</h1>
                <div className={styles.WordBreakAll}>
                  Hello {currentUser.username}
                </div>
                <div className="mt-2">Let's start organizing!</div>
                <div className={styles.FlexContainer}>
                  <div className={styles.ImageContainer}>
                    <img
                      src={welcomeLogoLogged}
                      alt="Welcome logo for logged users"
                    />
                  </div>
                </div>
              </div>
            </Container>
          ) : (
            <Container fluid>
              <div className="mt-3">
                <h1>Task manager</h1>
                <div>
                  Welcome to Task Manager (TKM), where you can keep your
                  schedule well organized.
                </div>
                <div className="mt-2">
                  Add, edit and share your tasks with others. Remain focused all
                  day long with us!
                </div>
                <div className={styles.FlexContainer}>
                  <div className={styles.ImageContainer}>
                    <img
                      src={welcomeLogo}
                      alt="Welcome logo for logged out users"
                    />
                  </div>
                </div>
              </div>
            </Container>
          )}
        </>
      ) : (
        <>Loading ....</>
      )}
    </>
  );
}

export default HomePage;
