import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Forms.module.css";
import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signUpData;

  //  Handle changes to the input fields in the form
  const eventHandler = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const [errors, setErrors] = useState({});

  const redirect = useNavigate();

  // Submit data to create user
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/profiles/create-user/", signUpData);
      //  Redirect user to sign in page
      redirect("../signin");
    } catch (err) {
      // Catch errors returned from data validation
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <h1 className={styles.FormHeader}>Sign up</h1>
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
          <Button
            variant="primary"
            type="submit"
            aria-label="Create an account"
          >
            Submit
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
        <div className="mt-2">
          Already have an account?
          <Link className={styles.FormLink} to="/signin">
            <span>Sign in</span>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default SignUpForm;
