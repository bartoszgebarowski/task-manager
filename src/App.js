import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Home page</h1>}></Route>
        <Route path="/signup" element={<h1>Sign up</h1>}></Route>
        <Route path="/signin" element={<h1>Sign in</h1>}></Route>
        <Route path="*" element={<h1>Page not found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
