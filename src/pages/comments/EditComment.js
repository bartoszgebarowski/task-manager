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

function EditComment() {
  const token = localStorage.getItem("token");
  const currentUser = useCurrentUser();
  const redirect = useNavigate();
  const { id } = useParams();
  const { comment_id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [updateComment, setUpdateComment] = useState({
    comment: "",
    task_id: id,
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const { comment } = updateComment;

  //  Handle changes to the input fields in the form
  const eventHandler = (event) => {
    setUpdateComment({
      ...updateComment,
      [event.target.name]: event.target.value,
    });
  };
  const [errors, setErrors] = useState({});

  // Submit data to edit task
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("task_id", updateComment.task_id);
    api
      .put(`/tasks/${id}/comments/${comment_id}`, updateComment)
      // Handle post request
      .then((response) =>
        response.status === 200 ? (
          (setErrors(""),
          setSuccessMessage(true),
          setTimeout(() => {
            setSuccessMessage(false);
          }, 5000))
        ) : (
          <></>
        )
      )
      // Catch errors from validating data
      .catch((err) => setErrors(err.response?.data));
  };

  useEffect(() => {
    // If there is no access token, redirect user to sign in page
    const handleMount = async () => {
      if (!token) {
        redirect("/signin");
      } else {
        api
          .get(`tasks/${id}/comments/${comment_id}`)
          // Handle response
          .then((response) => {
            // If a user is not a comment owner, redirect user to tasks page
            if (currentUser.id !== response.data.owner_id) {
              redirect("/tasks");
            } else {
              // set Update Comment data with data received from a backend
              setUpdateComment({ comment: response.data.comment, task_id: id });
              setIsLoaded(true);
            }
          })
          /* Catch errors and if a user tries to access comment 
          that does not exist, redirect user to tasks page */
          .catch((err) =>
            err.response
              ? err.response.status === 404
                ? redirect("/tasks")
                : {}
              : {}
          );
      }
    };

    handleMount();
  }, [token, redirect, currentUser, id, comment_id]);
  return (
    <>
      {isLoaded ? (
        <>
          {successMessage === true ? (
            <>
              <Alert variant="success">Comment edited successfully !</Alert>
            </>
          ) : (
            <></>
          )}
          <h1 className={styles.FormHeader}>Edit comment</h1>
          <Container
            className={`justify-content-center ${styles.FormContainer}`}
          >
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
                aria-label={`Edit comment`}
              >
                Edit comment
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
      ) : (
        <>Loading ...</>
      )}
    </>
  );
}

export default EditComment;
