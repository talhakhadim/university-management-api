import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import DashboardS from "./components/DashboardS";

import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardS />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
