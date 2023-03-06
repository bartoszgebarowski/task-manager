import React from "react";
import styles from "../../styles/SignInUpForm.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function SignInForm() {
  return (
    <>
      <h1 className={styles.FormHeader}>Sign in</h1>
      <Container className={`justify-content-center ${styles.FormContainer}`}>
        <Form>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="mt-2">
          Don't Have an Account?
          <Link className={styles.FormLink} to="/signup">
            <span>Sign up</span>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default SignInForm;
