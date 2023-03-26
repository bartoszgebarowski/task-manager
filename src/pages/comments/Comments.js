import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Tasks.module.css";
import { truncateChars } from "../../utils/utils";
const Comments = (props) => {
  const token = localStorage.getItem("token");
  const currentUser = useCurrentUser();
  const { comment, messages, owner_id, owner, updated_at } = props;

  let actionBar;
  if (currentUser && token) {
    if (currentUser.id === owner_id) {
      actionBar = (
        <>
          <span className="me-2">
            <i
              className={`fa-solid fa-pencil pointer ${styles.Taskaction}`}
            ></i>
          </span>
          <span className="me-2">
            <i className={`fa-solid fa-trash pointer ${styles.Taskaction}`}></i>
          </span>
        </>
      );
    } else {
      actionBar = <></>;
    }
  }
  console.log(messages);
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
