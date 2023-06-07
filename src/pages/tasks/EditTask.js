import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import api from "../../api/api";
import styles from "../../styles/Forms.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { handleCheckbox } from "../../utils/utils";
import { editTaskToast } from "../../utils/toasts";

function EditTask() {
  const location = useLocation();
  const userLocationOrigin = location.state;
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
  const { id } = useParams();

  //  Handle changes to the input fields in the form
  const handleChange = (event) => {
    setEditTaskData({
      ...editTaskData,
      [event.target.name]: event.target.value,
    });
  };

  // Set a checkbox value to true/false depending on user selection
  const checkboxHandler = (event) => {
    if (event.target.checked) {
      editTaskData.completed = true;
    } else {
      editTaskData.completed = false;
    }
  };

  const [errors, setErrors] = useState({});

  // Redirect user based on user previous location
  const handleLocationRedirect = () => {
    if (userLocationOrigin === null) {
      redirect("/tasks");
    } else if (userLocationOrigin.isSinglePageAccessed) {
      redirect(`/tasks/${id}`);
    } else {
      redirect("/tasks");
    }
  };

  // Submit data to edit task
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("completed", completed);
    api
      .put(`/tasks/${id}`, editTaskData)
      .then((response) =>
        // Handle form submission
        response.status === 200
          ? (editTaskToast(), handleLocationRedirect())
          : {}
      )
      // Set errors returned from validating data
      .catch((err) => setErrors(err.response?.data));
  };

  useEffect(() => {
    const handleMount = async () => {
      // Redirect to sign in page if there is no token
      if (!token) {
        redirect("/signin");
      } else {
        api
          .get(`/tasks/${id}`)
          .then((response) => {
            if (token && currentUser) {
              if (currentUser.id !== response.data.owner_id) {
                // Redirect user that is not authorized to tasks page
                redirect("/tasks");
              } else {
                // Populate the form with existing data
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
            // Catch errors and if task does not exist, redirect user to tasks page
            err.response.status === 404 ? redirect("/tasks") : {}
          );
      }
    };

    handleMount();
    if (isLoaded) {
      // Set checkbox according to task status
      handleCheckbox(completed);
    }
  }, [token, redirect, currentUser, id, completed, isLoaded]);

  return (
    <>
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
                onClick={() => handleLocationRedirect()}
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
