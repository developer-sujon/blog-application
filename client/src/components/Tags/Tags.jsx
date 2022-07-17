//internal import
import React from "react";
import { Link } from "react-router-dom";

const Tags = () => {
  return (
    <div className="sidebarItem">
      <span className="sidebarTitle">Tags</span>
      <ul>
        <li className="sidebarListItem">
          <Link className="link" to="/posts?cat=Life">
            Test Tags
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Tags;
