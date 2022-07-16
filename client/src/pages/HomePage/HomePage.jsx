import React from "react";

import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="row">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
};

export default HomePage;
