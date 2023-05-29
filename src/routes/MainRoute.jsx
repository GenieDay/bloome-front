import React from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import GardenPage from "../pages/Garden/GardenPage";
import GardenTestPage from "../pages/Garden/GardenTestPage";

export default function MainRoute(props) {
  return (
    <Routes>
      {/* MainPage */}
      <Route path="/" element={<MainPage />} />
      {/* LoginPage */}
      <Route path="/login" element={<LoginPage />} />
      {/* RegisterPage */}
      <Route path="/register" element={<RegisterPage />} />
      {/* GardenPage */}
      <Route path="/garden/:userId" element={<GardenPage />}/>
      {/* GardenTest */}
      <Route path="/garden-test/:userId" element={<GardenTestPage />} />
    </Routes>
  )
}