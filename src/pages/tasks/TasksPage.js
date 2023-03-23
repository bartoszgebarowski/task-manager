import React from "react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import Task from "./Task";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function TasksPage() {
  const [tasks, setTasks] = useState({ results: [] });
  const redirect = useNavigate();
  const currentUser = useCurrentUser();
  useEffect(() => {
    const handleMount = async () => {
      api
        .get("/tasks/")
        .then((response) => {
          const { data } = response;
          setTasks({ results: data });
        })
        .catch((err) =>
          err.response.status === 401
            ? redirect("/signin")
            : err.response.status === 404
            ? redirect("/tasks")
            : {}
        );
    };

    handleMount();
  }, [currentUser, redirect]);
  return (
    <>
      {tasks.results.length === 0 ? (
        <>
          <h1 className="mb-2">Tasks page</h1>
          <Task isTasksPage noTasks />
        </>
      ) : currentUser ? (
        <Container fluid>
          <h1 className="mb-2">Tasks page</h1>
          <Row>
            <Col className="text-center">Author</Col>
            <Col className="text-center">Title</Col>
            <Col className="text-center">Description</Col>
            <Col className="text-center">Status</Col>
            <Col className="text-center">Comments</Col>
            <Col className="text-center">Updated</Col>
            <Col className="text-center">Actions</Col>
          </Row>
          {tasks.results.map((task) => {
            return (
              <Task key={task.id} {...task} isTasksPage setTasks={setTasks} />
            );
          })}
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

export default TasksPage;
