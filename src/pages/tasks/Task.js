import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
    isTaskPage,
  } = props;
  const currentUser = useCurrentUser();
  let menu;

  if (owner_id === currentUser.id && isTaskPage === true) {
    menu = <>Normal menu</>;
  } else {
    menu = <>Dropdown menu</>;
  }
  return (
    <>
      {currentUser ? (
        <div className="bg-light">
          {title} + {updated_at} + {owner_id} Completed{" "}
          {completed ? <>yes</> : <>no</>}
          {id}
          {isTaskPage ? <div className="bg-primary">{description}</div> : <></>}
          {menu}
        </div>
      ) : (
        {}
      )}
    </>
  );
};

export default Task;
