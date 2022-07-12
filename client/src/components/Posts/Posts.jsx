import { useEffect, useReducer } from "react";
import ApiRequest from "../../APIRequest/ApiRequest";
import Post from "../Post/Post";
import Loading from "../../assets/images/loding.svg";
import Failure from "../../assets/images/failure.png";
import Empty from "../../assets/images/empty.png";
import "./posts.css";
import { useLocation } from "react-router-dom";

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

const Posts = () => {
  const [posts, dispatch] = useReducer(reducer, initialState);
  const { search } = useLocation();

  const fetchingPost = () => {
    dispatch({ type: "START_FETCHING" });
    ApiRequest.getRequest(`/post/selectAllPost${search}`)
      .then((data) => {
        dispatch({ type: "SUCCESS_FETCHING", data: data.data["data"] });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "FAILURE_FETCHING" });
      });
  };

  useEffect(() => {
    fetchingPost();
  }, [search]);

  if (posts.isFetching === true) {
    return (
      <div className="fixed">
        <img src={Loading} alt="Loading" className="m-auto" />;
      </div>
    );
  } else if (posts.isError === true) {
    return (
      <div className="fixed">
        <img src={Failure} alt="Failure" className="m-auto" />;
      </div>
    );
  } else if (posts.data.length <= 0) {
    return (
      <div className="fixed">
        <img src={Empty} alt="Empty" className="m-auto" />;
      </div>
    );
  } else {
    return (
      <div className="posts">
        {posts.data && posts.data.map((p) => <Post {...p} key={p._id} />)}
      </div>
    );
  }
};

export default Posts;
