import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import api from "../../api/api";
import styles from "../../styles/Forms.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { handleCheckbox } from "../../utils/utils";
function EditTask() {
  const token = localStorage.getItem("token");
  const currentUser = useCurrentUser();
  const redirect = useNavigate();
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const { title, description, completed } = editTaskData;
  const [successMessage, setSuccessMessage] = useState(false);
  const { id } = useParams();

  const handleChange = (event) => {
    setEditTaskData({
      ...editTaskData,
      [event.target.name]: event.target.value,
    });
  };

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      editTaskData.completed = true;
    } else {
      editTaskData.completed = false;
    }
  };

  const [errors, setErrors] = useState({});

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("completed", completed);
    api
      .put(`/tasks/${id}`, editTaskData)
      .then((response) =>
        response.status === 200
          ? (setIsLoaded(true),
            setErrors(""),
            setSuccessMessage(true),
            setTimeout(() => {
              setSuccessMessage(false);
            }, 5000))
          : setIsLoaded(true)
      )
      .catch((err) => setErrors(err.response?.data));
  };

  useEffect(() => {
    const handleMount = async () => {
      if (!token) {
        redirect("/signin");
      } else {
        api
          .get(`/tasks/${id}`)
          .then((response) => {
            if (token && currentUser) {
              if (currentUser.id !== response.data.owner_id) {
                redirect("/tasks");
              } else {
                setEditTaskData({
                  title: response.data.title,
                  description: response.data.description,
                  completed: response.data.completed,
                });
                setIsLoaded(true);
              }
            }
          })
          .catch((err) =>
            err.response.status === 404 ? redirect("/tasks") : {}
          );
      }
    };

    handleMount();
    if (isLoaded) {
      handleCheckbox(completed);
    }
  }, [token, redirect, currentUser, id, completed, isLoaded]);

  return (
    <>
      {successMessage === true ? (
        <>
          <Alert variant="success">Task edited successfully !</Alert>
        </>
      ) : (
        <></>
      )}
      {!isLoaded ? (
        <>Loading ...</>
      ) : (
        <>
          <h1 className={styles.FormHeader}>Edit task</h1>
          <Container
            className={`justify-content-center ${styles.FormContainer}`}
          >
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="completed">
                <Form.Check
                  type="checkbox"
                  name="completed"
                  value={completed}
                  onChange={checkboxHandler}
                  label="Completed ?"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Edit task
              </Button>
              <Button
                variant="warning"
                className="ms-2"
                onClick={() => redirect(-1)}
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
      )}
    </>
  );
}

export default EditTask;
