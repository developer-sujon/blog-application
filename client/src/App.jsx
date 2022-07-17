//external lib imports
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullScreenLoader from "./components/MasterLayout/FullScreenLoader";
import Topbar from "./components/Topbar/Topbar";
import SessionHelper from "./helper/SessionHelper";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import SinglePage from "./pages/SinglePage/SinglePage";
import WritePage from "./pages/WritePage/WritePage";

//enternel lib imports
const App = () => {
  const accessToken = SessionHelper.getToken();

  if (accessToken) {
    return (
      <>
        <BrowserRouter>
          <Topbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<HomePage />} />
            <Route path="/post/:postId" element={<SinglePage />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Topbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/post/:postId" element={<SinglePage />} />
            <Route path="/write" element={<LoginPage />} />
            <Route path="/settings" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </>
    );
  }
};

export default App;
