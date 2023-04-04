import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Forms.module.css";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import api from "../../api/api";
import {
  useSetCurrentUser,
  useCurrentUser,
} from "../../contexts/CurrentUserContext";
import { getUserDetailsFrontToken } from "../../utils/utils";

function SignInForm() {
  const redirect = useNavigate();
  const setCurrentUser = useSetCurrentUser();
  const currentUser = useCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  // Handle changes to the input fields in the form
  const eventHandler = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const [errors, setErrors] = useState({});

  // Submit data to log in user
  const submitHandler = async (event) => {
    event.preventDefault();
    api
      .post("/profiles/token/", signInData)
      .then((response) => {
        const token = response.data;
        setCurrentUser(getUserDetailsFrontToken(token));
        // Add token to local storage
        localStorage.setItem("token", JSON.stringify(token));
        // Redirect user to a home page
        redirect("/");
      })
      // Catch errors returned from validating data
      .catch((err) => setErrors(err.response?.data));
  };

  return (
    <>
      {currentUser ? (
        redirect("/")
      ) : (
        <>
          <h1 className={styles.FormHeader}>Sign in</h1>
          <Container
            className={`justify-content-center ${styles.FormContainer}`}
          >
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={eventHandler}
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={eventHandler}
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Button
                variant="primary"
                type="submit"
                aria-label="Sign in into application"
              >
                Submit
              </Button>
              {errors.detail ? (
                <Alert variant="warning" className="mt-2">
                  {errors.detail}
                </Alert>
              ) : (
                <></>
              )}
            </Form>
            <div className="mt-2">
              Don't have an account ?
              <Link className={styles.FormLink} to="/signup">
                <span>Sign in</span>
              </Link>
            </div>
          </Container>
        </>
      )}
    </>
  );
}

export default SignInForm;
