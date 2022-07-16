import { Link } from "react-router-dom";
import "./sidebar.css";
import Loading from "../../assets/images/loding.svg";
import Failure from "../../assets/images/failure.png";
import Empty from "../../assets/images/empty.png";
import { useEffect, useReducer } from "react";
import ApiRequest from "../../APIRequest/ApiRequest";

const initialState = {
  isFetching: true,
  isError: false,
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START_FETCHING":
      return {
        isFetching: true,
        isError: false,
        data: [],
      };
    case "SUCCESS_FETCHING":
      return {
        isFetching: false,
        isError: false,
        data: action.data,
      };
    case "FAILURE_FETCHING":
      return {
        isFetching: false,
        isError: true,
        data: [],
      };
    default:
      return state;
  }
};

const Sidebar = () => {
  const [category, dispatch] = useReducer(reducer, initialState);

  const fetchingCategory = () => {
    dispatch({ type: "START_FETCHING" });
    ApiRequest.getRequest(`/category/selectAllCategory`)
      .then((response) => {
        dispatch({ type: "SUCCESS_FETCHING", data: response.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "FAILURE_FETCHING" });
      });
  };

  useEffect(() => {
    fetchingCategory();
  }, []);

  if (category.isFetching === true) {
    return <img src={Loading} alt="Loading" className="m-auto" />;
  } else if (category.isError === true) {
    return <img src={Failure} alt="Failure" className="m-auto" />;
  } else if (category.data.length <= 0) {
    return (
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">Category Not Found</li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img
            src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
            alt=""
          />
          <p>
            Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
            amet ex esse.Sunt eu ut nostrud id quis proident.
          </p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {category.data &&
              category.data.map((cat) => {
                return (
                  <li className="sidebarListItem" key={cat._id}>
                    <Link className="link" to={`/posts?cat=${cat.name}`}>
                      {cat.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">Tags</span>
          <ul>
            {category.data &&
              category.data.map((cat) => {
                return (
                  <li className="sidebarListItem" key={cat._id}>
                    <Link className="link" to="/posts?cat=Life">
                      {cat.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
};

export default Sidebar;
