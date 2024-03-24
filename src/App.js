import React from "react";
import Navbar from "./NavBar/Navbar";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Settings from "./Pages/Settings/Settings";
import Write from "./Pages/Write/Write";
import Home from "./Pages/Home/Home";
import SinglePage from "./Pages/SinglePG/SinglePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact/Contact";
import Dashboard from "./Pages/DashBoard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/settings" element={<Settings />}></Route>
        <Route exact path="/write" element={ <Write />}></Route>
        <Route exact path="/contact" element={ <Contact />}></Route>
        <Route exact path="/dashboard" element={ <Dashboard />}></Route>
        <Route
          exact
          path="/singlepage/:uuid"
          element={<SinglePage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}