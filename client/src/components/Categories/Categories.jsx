//internal import
import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="sidebarItem">
      <span className="sidebarTitle">Category</span>
      <ul>
        <li className="sidebarListItem">
          <Link className="link" to="/posts?cat=Life">
            Test Category
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Categories;
