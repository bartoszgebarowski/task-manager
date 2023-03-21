import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import "./api/axiosDefaults.js";
import SignInForm from "./pages/auth/SignInForm";
import AddTask from "./pages/tasks/AddTask";
import TaskPage from "./pages/tasks/TaskPage";
import TasksPage from "./pages/tasks/TasksPage";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Home page</h1>}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route path="/signin" element={<SignInForm />}></Route>
        <Route path="/addtask" element={<AddTask />}></Route>
        <Route path="tasks">
          <Route path=":id" element={<TaskPage />} />
          <Route path="" element={<TasksPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
