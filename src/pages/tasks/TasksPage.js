import React from "react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import Task from "./Task";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import styles from "../../styles/Tasks.module.css";

function TasksPage() {
  const [tasks, setTasks] = useState({ results: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const redirect = useNavigate();
  const currentUser = useCurrentUser();
  useEffect(() => {
    const handleMount = async () => {
      api
        .get("/tasks/")
        // Set Tasks data on successful request
        .then((response) => {
          const { data } = response;
          setTasks({ results: data });
          setIsLoaded(true);
        })
        // Catch errors and redirect user to sign in page on error status 401
        .catch((err) =>
          err.response.status === 401 ? redirect("/signin") : {}
        );
    };

    handleMount();
  }, [currentUser, redirect]);
  return (
    <>
      {!isLoaded ? (
        <>Loading ...</>
      ) : (
        <>
          {tasks.results.length === 0 ? (
            <>
              <h1 className="mb-2">Tasks page</h1>
              <Task isTasksPage noTasks />
            </>
          ) : currentUser ? (
            <Container fluid>
              <h1 className="mb-2">Tasks page</h1>
              <Table responsive size="sm" className="mt-2">
                <thead>
                  <tr className="test">
                    <th>#</th>
                    <th>Username</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Comments</th>
                    <th className={styles.Minwidth}>Updated</th>
                    <th className={styles.Minwidth}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.results.map((task, idx) => {
                    return (
                      <Task
                        key={task.id}
                        {...task}
                        isTasksPage
                        setTasks={setTasks}
                        idx={idx}
                      />
                    );
                  })}
                </tbody>
              </Table>
            </Container>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default TasksPage;
