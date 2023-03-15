import jwt_decode from "jwt-decode";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import api from "../../api/api";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

function SignInForm() {
  const redirect = useNavigate();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  if (currentUser) {
    console.log("you should not be here");
  }
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const eventHandler = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const [errors, setErrors] = useState({});

  const submitHandler = async (event) => {
    event.preventDefault();
    api
      .post("/profiles/token/", signInData)
      .then((response) => {
        const token = response.data;
        const decodedToken = jwt_decode(token.access);
        console.log(decodedToken);
        const user = {
          username: decodedToken.username,
          email: decodedToken.email,
        };
        setCurrentUser(user);
        localStorage.setItem("token", JSON.stringify(token));
        redirect("/");
      })
      .catch((err) => setErrors(err.response?.data));
  };

  return (
    <>
      <h1 className={styles.FormHeader}>Sign in</h1>
      <Container className={`justify-content-center ${styles.FormContainer}`}>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
        <div className="mt-2">
          Don't have an account ?
          <Link className={styles.FormLink} to="/signup">
            <span>Sign in</span>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default SignInForm;
