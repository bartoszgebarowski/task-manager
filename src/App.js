import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import "./api/axiosDefaults.js";
import SignInForm from "./pages/auth/SignInForm";
import AddTask from "./pages/tasks/AddTask";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import TaskPage from "./pages/tasks/TaskPage";
import TasksPage from "./pages/tasks/TasksPage";
function App() {
  const currentUser = useCurrentUser();
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Home page</h1>}></Route>
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/" /> : <SignUpForm />}
        ></Route>
        <Route
          path="/signin"
          element={currentUser ? <Navigate to="/" /> : <SignInForm />}
        ></Route>
        <Route
          path="/addtask"
          element={currentUser ? <AddTask /> : <Navigate to="/" />}
        ></Route>
        <Route path="tasks">
          <Route
            path=":id"
            element={currentUser ? <TaskPage /> : <Navigate to="/" />}
          />
          <Route
            path=""
            element={currentUser ? <TasksPage /> : <Navigate to="/" />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
