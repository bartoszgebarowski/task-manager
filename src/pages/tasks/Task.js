import React from "react";
import api from "../../api/api";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { changeCursor } from "../../utils/utils";
const Task = (props) => {
  const {
    id,
    owner,
    owner_id,
    title,
    completed,
    messages,
    description,
    updated_at,
    isTasksPage,
    noTasks,
    setTask,
    setTasks,
  } = props;
  const ownerDeconstructed = { ...owner };
  const redirect = useNavigate();
  const currentUser = useCurrentUser();
  let actionBar;
  let actionBarSingle;
  let completedStatus;

  const truncateChars = (str, isDate) => {
    if (str && isDate) {
      return str.substring(0, 10);
    } else if (str) {
      return str.length > 7 ? str.substring(0, 7) + "..." : str;
    } else {
      return "-";
    }
  };

  const removeTask = async () => {
    api
      .delete(`/tasks/${id}`)
      .then(() => {
        if (isTasksPage) {
          setTasks((prevTasks) => ({
            ...prevTasks,
            results: prevTasks.results.filter((element) => element.id !== id),
          }));
        } else {
          setTask({ results: [] });
          redirect("/tasks/");
        }
      })
      .catch((err) =>
        err.response.status === 404
          ? redirect("/tasks")
          : err.response.status === 401
          ? redirect("/")
          : {}
      );
  };

  if (currentUser) {
    if (completed) {
      completedStatus = (
        <span>
          <i className="fa-solid fa-check"></i>
        </span>
      );
    } else {
      completedStatus = (
        <span>
          <i className="fa-solid fa-xmark"></i>
        </span>
      );
    }
  }
  if (currentUser) {
    if (owner_id === currentUser.id) {
      actionBar = (
        <>
          <span className="me-2">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <span className="me-2">
            <i className="fa-solid fa-pencil pointer"></i>
          </span>
          <span className="me-2">
            <i className="fa-solid fa-trash pointer" onClick={removeTask}></i>
          </span>
        </>
      );
    } else {
      actionBar = (
        <>
          <span>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </>
      );
    }
  }

  if (currentUser) {
    if (owner_id === currentUser.id) {
      actionBarSingle = (
        <>
          <button onClick={removeTask}></button>
        </>
      );
    } else {
      actionBarSingle = <>Single edit</>;
    }
  }

  changeCursor();

  return (
    <>
      {isTasksPage ? (
        <>
          {noTasks ? (
            <>No tasks found</>
          ) : (
            <>
              <Row>
                <Col className="text-center mb-1">
                  {truncateChars(ownerDeconstructed.username)}
                </Col>
                <Col className="text-center mb-1">{truncateChars(title)}</Col>
                <Col className="text-center mb-1">
                  <span>{truncateChars(description)}</span>
                </Col>
                <Col className="text-center mb-1">{completedStatus}</Col>
                <Col className="text-center mb-1">
                  <i className="fa-regular fa-comment ml-3"></i>
                  {`(${messages.length})`}
                </Col>
                <Col className="text-center mb-1">
                  {truncateChars(updated_at, true)}
                </Col>
                <Col className="text-center mb-1">{actionBar}</Col>
              </Row>
            </>
          )}
        </>
      ) : (
        <>
          <Container>
            {ownerDeconstructed.username} {actionBarSingle}
          </Container>
        </>
      )}
    </>
  );
};

export default Task;
