import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Tasks.module.css";
import { truncateChars } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
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
  console.log(messages);
  const removeComment = async () => {
    api
      .delete(`/tasks/${task_id}/comments/${id}`)
      .then(() => {
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
        setTask((prevTask) => ({
          ...prevTask,
          results: filterMessages(prevTask),
        }));
      })
      .catch((err) =>
        err.response.status === 404
          ? redirect("/tasks")
          : err.response.status === 401
          ? redirect("/")
          : {}
      );
  };

  let actionBar;
  if (currentUser) {
    if (currentUser.id === owner_id) {
      actionBar = (
        <>
          <span className="me-2">
            <i
              className={`fa-solid fa-pencil pointer ${styles.Taskaction}`}
            ></i>
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
