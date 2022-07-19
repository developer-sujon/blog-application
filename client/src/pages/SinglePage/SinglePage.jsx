import { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SinglePost from "../../components/SinglePost/SinglePost";
import "./single.css";

const SinglePage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
};

export default SinglePage;
