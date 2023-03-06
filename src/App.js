import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import "./api/axiosDefaults.js";
import SignInForm from "./pages/auth/SignInForm";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Home page</h1>}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route path="/signin" element={<SignInForm />}></Route>
        <Route path="*" element={<h1>Page not found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
