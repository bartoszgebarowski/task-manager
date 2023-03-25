import React from "react";
import api from "../../api/api";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { changeCursor } from "../../utils/utils";
import { Link } from "react-router-dom";
import { truncateChars } from "../../utils/utils";
import styles from "../../styles/Tasks.module.css";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

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
    idx,
  } = props;
  const ownerDeconstructed = { ...owner };

  const redirect = useNavigate();
  const currentUser = useCurrentUser();
  let actionBar;
  let actionBarSingle;
  let completedStatus;
  let completedStatusWorded;

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
    if (completed) {
      completedStatusWorded = <span>Completed</span>;
    } else {
      completedStatusWorded = <span>Not completed</span>;
    }
  }

  if (currentUser) {
    if (owner_id === currentUser.id) {
      actionBar = (
        <>
          <span className="me-2">
            <Link
              to={`${id}`}
              aria-label={`Link to detailed Task page with ${title} title, created by ${ownerDeconstructed.username}`}
            >
              <i
                className={`fa-solid fa-magnifying-glass ${styles.Taskaction}`}
              ></i>
            </Link>
          </span>
          <span className="me-2">
            <Link
              to={`edittask/${id}`}
              aria-label={`Link to edit Task page with ${title} title, created by ${ownerDeconstructed.username}`}
            >
              <i
                className={`fa-solid fa-pencil pointer ${styles.Taskaction}`}
              ></i>
            </Link>
          </span>
          <span className="me-2">
            <i
              className={`fa-solid fa-trash pointer ${styles.Taskaction}`}
              onClick={removeTask}
            ></i>
          </span>
        </>
      );
    } else {
      actionBar = (
        <>
          <span className="me-2">
            <Link
              to={`${id}`}
              aria-label={`Link to detailed Task page with ${title} title, created by ${ownerDeconstructed.username}`}
            >
              <i
                className={`fa-solid fa-magnifying-glass ${styles.Taskaction}`}
              ></i>
            </Link>
          </span>
        </>
      );
    }
  }

  if (currentUser) {
    if (owner_id === currentUser.id) {
      actionBarSingle = (
        <>
          <Link to={`../edittask/${id}`}>
            <Button
              variant="dark"
              className="ms-1"
              size="sm"
              aria-label={`Edit task with ${title}`}
            >
              Edit task
            </Button>
          </Link>
          <Button
            variant="danger"
            className="ms-1"
            size="sm"
            aria-label={`Delete task with ${title} title`}
            onClick={removeTask}
          >
            Delete task
          </Button>
          <Button
            variant="warning"
            className="ms-1"
            size="sm"
            aria-label="Go back by 1 page"
            onClick={() => redirect(-1)}
          >
            Go back
          </Button>
        </>
      );
    } else {
      actionBarSingle = (
        <>
          <Button
            variant="warning"
            className="ms-1"
            size="sm"
            aria-label="Go back by 1 page"
            onClick={() => redirect(-1)}
          >
            Go back
          </Button>
        </>
      );
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
              <tr>
                <td>{idx + 1}</td>
                <td>{truncateChars(ownerDeconstructed.username)}</td>
                <td>{truncateChars(title)}</td>
                <td>{truncateChars(description)}</td>
                <td>{completedStatus}</td>
                <td>
                  <i className="fa-regular fa-comment ml-3"></i>
                  {`(${messages.length})`}
                </td>
                <td>{truncateChars(updated_at, true)}</td>
                <td>{actionBar}</td>
              </tr>
            </>
          )}
        </>
      ) : (
        <>
          <Container fluid>
            <h1 className={styles.WordBreakAll}>{title} page</h1>
          </Container>
          <Container fluid className="text-start">
            <span className="ms-2">Creator: </span>
            <span>{ownerDeconstructed.username}</span>
          </Container>
          <Container fluid className="text-start">
            <span className="ms-2">Status: </span>
            <span> {completedStatusWorded}</span>
          </Container>
          <Container fluid className="text-end mt-2">
            {actionBarSingle}
          </Container>
          <Accordion defaultActiveKey={0} flush className="mt-2">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Description :</Accordion.Header>
              <Accordion.Body>
                {description ? description : "No description"}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey={2} flush className="mt-2">
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                Comments: {`(${messages.length})`}
              </Accordion.Header>
              <Accordion.Body>Test body</Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Container fluid className="text-end mt-2">
            <Button type="primary" size="sm" className="ms-2">
              Add comment
            </Button>
          </Container>
        </>
      )}
    </>
  );
};

export default Task;
