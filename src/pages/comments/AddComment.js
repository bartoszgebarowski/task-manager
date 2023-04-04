import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import api from "../../api/api";
import styles from "../../styles/Forms.module.css";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom";

function AddComment() {
  const token = localStorage.getItem("token");
  const currentUser = useCurrentUser();
  const redirect = useNavigate();
  const { id } = useParams();
  const [createComment, setCreateComment] = useState({
    comment: "",
    task_id: id,
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const { comment } = createComment;

  //  Handle changes to the input fields in the form
  const eventHandler = (event) => {
    setCreateComment({
      ...createComment,
      [event.target.name]: event.target.value,
    });
  };
  const [errors, setErrors] = useState({});

  // Submit data to add comment
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("task_id", createComment.task_id);
    api
      .post(`/tasks/${id}/comments`, createComment)
      .then((response) =>
        // On successful post request, reset form
        response.status === 201 ? (
          (setErrors(""),
          setSuccessMessage(true),
          setCreateComment({ comment: "", task_id: id }),
          setTimeout(() => {
            setSuccessMessage(false);
          }, 5000))
        ) : (
          <></>
        )
      )
      // Catch errors, from validating data
      .catch((err) => setErrors(err.response?.data));
  };

  useEffect(() => {
    // Check if task exists and if it does not exist redirect user to tasks page
    const handleMount = async () => {
      api
        .get(`tasks/${id}`)
        .then(() => {})
        .catch((err) =>
          err.response.status === 404 ? redirect("/tasks") : {}
        );

      if (!token) {
        redirect("/signin");
      }
    };
    handleMount();
  }, [token, redirect, currentUser, id]);
  return (
    <>
      {successMessage === true ? (
        <>
          <Alert variant="success">Comment added successfully !</Alert>
        </>
      ) : (
        <></>
      )}
      <h1 className={styles.FormHeader}>Add comment</h1>
      <Container className={`justify-content-center ${styles.FormContainer}`}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="comment"
              name="comment"
              value={comment}
              onChange={eventHandler}
            />
          </Form.Group>
          {errors.comment?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Button
            variant="primary"
            type="submit"
            aria-label="Create a new comment"
          >
            Add comment
          </Button>
          <Button
            variant="warning"
            className="ms-2"
            onClick={() => redirect(-1)}
            aria-label="Go back by one page"
          >
            Go back
          </Button>
          {errors.detail ? (
            <Alert variant="warning" className="mt-2">
              {errors.detail}
            </Alert>
          ) : (
            <></>
          )}
        </Form>
      </Container>
    </>
  );
}

export default AddComment;
