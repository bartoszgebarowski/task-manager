import React from "react";
import api from "../../api/api";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { changeCursor } from "../../utils/utils";
import { Link } from "react-router-dom";
import { truncateChars } from "../../utils/utils";
import styles from "../../styles/Tasks.module.css";

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
            <Link to={`${id}`}>
              <i
                className={`fa-solid fa-magnifying-glass ${styles.Taskaction}`}
              ></i>
            </Link>
          </span>
          <span className="me-2">
            <i
              className={`fa-solid fa-pencil pointer ${styles.Taskaction}`}
            ></i>
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
            <Link to={`${id}`}>
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
          <Container>
            {ownerDeconstructed.username} {actionBarSingle}
          </Container>
        </>
      )}
    </>
  );
};

export default Task;
