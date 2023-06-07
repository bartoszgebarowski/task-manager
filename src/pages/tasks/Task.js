import React from "react";
import api from "../../api/api";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { truncateChars } from "../../utils/utils";
import styles from "../../styles/Tasks.module.css";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Comments from "../comments/Comments";
import { deleteTaskToast } from "../../utils/toasts";

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

  /* Remove task handler. Set correct state, 
  depending where it is called (single or all tasks page) */
  const removeTask = async () => {
    api
      .delete(`/tasks/${id}`)
      .then(() => {
        if (isTasksPage) {
          setTasks((prevTasks) => ({
            ...prevTasks,
            results: prevTasks.results.filter((element) => element.id !== id),
          }));
          deleteTaskToast();
        } else {
          setTask({ results: [] });
          redirect("/tasks/");
          deleteTaskToast();
        }
      })
      // Catch errors and redirect user based on error status
      .catch((err) =>
        err.response.status === 404
          ? redirect("/tasks")
          : err.response.status === 401
          ? redirect("/")
          : {}
      );
  };

  // Display correct icon, depending on task completed status in all tasks page
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

  // Display correct status element, based on task completed status, in single task page
  if (currentUser) {
    if (completed) {
      completedStatusWorded = <span>Completed</span>;
    } else {
      completedStatusWorded = <span>Not completed</span>;
    }
  }

  // Action bar setup, depending on task ownership status in all tasks page
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
              state={{ isSinglePageAccessed: false }}
              aria-label={`Link to edit Task page with ${title} title, created by ${ownerDeconstructed.username}`}
            >
              <i className={`fa-solid fa-pencil ${styles.Taskaction}`}></i>
            </Link>
          </span>
          <span className="me-2">
            <i
              className={`fa-solid fa-trash ${styles.Taskaction}`}
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

  // Action bar setup in single task page, depending on task ownership status in single task page
  if (currentUser) {
    if (owner_id === currentUser.id) {
      actionBarSingle = (
        <>
          <Link to={`../edittask/${id}`} state={{ isSinglePageAccessed: true }}>
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
            aria-label="Go back to Tasks page"
            onClick={() => redirect("/tasks")}
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
            aria-label="Go back to Tasks page"
            onClick={() => redirect("/tasks")}
          >
            Go back
          </Button>
        </>
      );
    }
  }

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
          <Accordion flush className="mt-2">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Description :</Accordion.Header>
              <Accordion.Body>
                {description ? description : "No description"}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion flush className="mt-2">
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Comments: {`(${messages.length})`}
              </Accordion.Header>
              <Accordion.Body>
                {messages.length !== 0 ? (
                  <>
                    {messages.map((message) => {
                      return (
                        <Comments
                          key={message.id}
                          {...message}
                          messages={messages}
                          setTask={setTask}
                        />
                      );
                    })}
                  </>
                ) : (
                  <Container fluid>No comments available</Container>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Container fluid className="text-end mt-2">
            <Link
              to={`../${id}/addcomment`}
              aria-label={`Link to Add comment form with ${title} title, created by ${ownerDeconstructed.username}`}
            >
              <Button type="primary" size="sm" className="ms-2">
                Add comment
              </Button>
            </Link>
          </Container>
        </>
      )}
    </>
  );
};

export default Task;
