import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import DataDisplay from "./pages/DataDisplay";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="data" element={<DataDisplay />} />
    </Routes>
  );
}

export default App;
