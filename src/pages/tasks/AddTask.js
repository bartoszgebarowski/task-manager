import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import api from "../../api/api";
import styles from "../../styles/Forms.module.css";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { resetCheckbox } from "../../utils/utils";
function AddTask() {
  const token = localStorage.getItem("token");
  const currentUser = useCurrentUser();
  const redirect = useNavigate();
  const [createTaskData, setCreateTaskData] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const { title, description, completed } = createTaskData;
  const [successMessage, setSuccessMessage] = useState(false);

  const eventHandler = (event) => {
    setCreateTaskData({
      ...createTaskData,
      [event.target.name]: event.target.value,
    });
  };

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      createTaskData.completed = true;
    } else {
      createTaskData.completed = false;
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
      .post("/tasks/", createTaskData)
      .then((response) =>
        response.status === 201 ? (
          (setErrors(""),
          resetCheckbox(),
          setSuccessMessage(true),
          setCreateTaskData({ title: "", description: "", completed: false }),
          setTimeout(() => {
            setSuccessMessage(false);
          }, 5000))
        ) : (
          <></>
        )
      )
      .catch((err) => setErrors(err.response?.data));
  };

  useEffect(() => {
    const handleMount = async () => {
      if (!token) {
        redirect("/signin");
      }
    };
    handleMount();
  }, [token, redirect, currentUser]);
  return (
    <>
      {successMessage === true ? (
        <>
          <Alert variant="success">Task added successfully !</Alert>
        </>
      ) : (
        <></>
      )}
      <h1 className={styles.FormHeader}>Add task</h1>
      <Container className={`justify-content-center ${styles.FormContainer}`}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={eventHandler}
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
              onChange={eventHandler}
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
            Create task
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
  );
}

export default AddTask;
