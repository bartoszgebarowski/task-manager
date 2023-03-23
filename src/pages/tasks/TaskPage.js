import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Task from "./Task";
function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const redirect = useNavigate();
  useEffect(() => {
    const handleMount = async () => {
      api
        .get(`/tasks/${id}`)
        .then((response) => {
          const { data } = response;
          setTask({ results: data });
        })
        .catch((err) =>
          err.response.status === 404
            ? redirect("/tasks")
            : err.response.status === 401
            ? redirect("/")
            : {}
        );
    };
    handleMount();
  }, [id, redirect, currentUser]);
  return (
    <>
      {task.length !== 0 ? (
        <>
          {currentUser ? (
            <Task {...task.results} setTask={setTask} />
          ) : (
            <>
              <Task {...task.results} noTasks />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default TaskPage;
