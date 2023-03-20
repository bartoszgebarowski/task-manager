import React from "react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import Task from "./Task";
import { Link } from "react-router-dom";
function TasksPage() {
  const [tasks, setTasks] = useState({ results: [] });
  useEffect(() => {
    const handleMount = async () => {
      api
        .get("/tasks/")
        .then((response) => {
          const { data } = response;
          setTasks({ results: data });
        })
        .catch((err) => console.log(err));
    };
    handleMount();
  }, []);
  return (
    <div>
      {tasks.results.map((task) => {
        return (
          <Link key={task.id} to={`/tasks/${task.id}`}>
            <Task key={task.id} {...task} />
          </Link>
        );
      })}
    </div>
  );
}

export default TasksPage;
