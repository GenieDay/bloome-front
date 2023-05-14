import React from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/Login/LoginPage";

export default function MainRoute(props) {
  return (
    <Routes>
      {/* MainPage */}
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}