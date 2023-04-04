import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Task from "./Task";

function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const redirect = useNavigate();
  useEffect(() => {
    const handleMount = async () => {
      api
        .get(`/tasks/${id}`)
        // set Task data on successful request
        .then((response) => {
          const { data } = response;
          setTask({ results: data });
          setIsLoaded(true);
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
    handleMount();
  }, [id, redirect, currentUser]);
  return (
    <>
      {!isLoaded ? (
        <>Loading ...</>
      ) : (
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
      )}
    </>
  );
}

export default TaskPage;
