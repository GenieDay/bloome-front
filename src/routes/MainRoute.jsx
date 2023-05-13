import React from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";


export default function MainRoute(props) {
  return (
    <Routes>
      {/* MainPage */}
      <Route path="/" element={<MainPage />} />
    </Routes>
  )
}