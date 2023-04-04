import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Tasks.module.css";
import { truncateChars } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Link } from "react-router-dom";

const Comments = (props) => {
  const currentUser = useCurrentUser();
  const {
    comment,
    owner_id,
    owner,
    updated_at,
    id,
    task_id,
    setTask,
    messages,
  } = props;

  const redirect = useNavigate();

  // Handle removing comment
  const removeComment = async () => {
    api
      .delete(`/tasks/${task_id}/comments/${id}`)
      .then(() => {
        // Filter messages by id
        let filterMessages = (task) => {
          const filteredMessages = [];
          messages.forEach((message) => {
            if (message.id !== id) {
              filteredMessages.push(message);
            }
          });
          task.messages = filteredMessages;
          task.description = task.results.description;
          task.owner = task.results.owner;
          task.completed = task.results.completed;
          task.id = task.results.id;
          task.title = task.results.title;
          task.owner_id = task.results.owner_id;
          return task;
        };
        // set Task with filtered data
        setTask((prevTask) => ({
          ...prevTask,
          results: filterMessages(prevTask),
        }));
      })
      // Catch errors, and depending on a error status, redirect user
      .catch((err) =>
        err.response.status === 404
          ? redirect("/tasks")
          : err.response.status === 401
          ? redirect("/")
          : {}
      );
  };

  let actionBar;

  // Setup action bar, based on comment ownership
  if (currentUser) {
    if (currentUser.id === owner_id) {
      actionBar = (
        <>
          <span className="me-2">
            <Link
              to={`editcomment/${id}`}
              aria-label={`Go to edit comment ${id} form`}
            >
              <i
                className={`fa-solid fa-pencil pointer ${styles.Taskaction}`}
              ></i>
            </Link>
          </span>
          <span className="me-2">
            <i
              className={`fa-solid fa-trash pointer ${styles.Taskaction}`}
              onClick={removeComment}
            ></i>
          </span>
        </>
      );
    } else {
      actionBar = <></>;
    }
  }
  return (
    <>
      <div className={`text-start ${styles.BorderBottom}`}>
        <div>{owner.username}</div>
        <div>{truncateChars(updated_at, true)}</div>
        <div>{actionBar}</div>
        <div className={styles.WordBreakAll}>{comment}</div>
      </div>
    </>
  );
};

export default Comments;
