import './App.css';
import LogIn from "./components/Login/LogIn";
import Main from "./components/Main/Main.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="/home" element={<Main/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
