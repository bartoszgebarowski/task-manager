import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Task from "./Task";
function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });
  const currentUser = useCurrentUser();
  useEffect(() => {
    const handleMount = async () => {
      api
        .get(`/tasks/${id}`)
        .then((response) => {
          const { data } = response;
          setTask({ results: data });
        })
        .catch((err) => console.log(err));
    };
    handleMount();
  }, [id]);
  return <>{currentUser ? <Task {...task.results} isTaskPage /> : <></>}</>;
}

export default TaskPage;
