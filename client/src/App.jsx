//external lib imports
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import SinglePage from "./pages/SinglePage/SinglePage";
import WritePage from "./pages/WritePage/WritePage";

//enternel lib imports

const App = () => {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post/:postId" element={<SinglePage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
