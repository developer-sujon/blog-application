import { useEffect, useReducer } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import ApiRequest from "../../APIRequest/ApiRequest";
import "./singlePost.css";
import Loading from "../../assets/images/loding.svg";
import Failure from "../../assets/images/failure.png";
import Empty from "../../assets/images/empty.png";
import { useState } from "react";

const initialState = {
  isFetching: true,
  isError: false,
  data: [],
};

function daysSinceGivenDate(date) {
  const dateInSeconds = Math.floor(
    (new Date().valueOf() - date.valueOf()) / 1000,
  );
  const oneDayInSeconds = 86400;

  return (dateInSeconds / oneDayInSeconds) | 0; // casted to int
}

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

const SinglePost = () => {
  const [post, dispatch] = useReducer(reducer, initialState);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const fetchingPost = () => {
    dispatch({ type: "START_FETCHING" });
    ApiRequest.getRequest(`/post/selectPost/${postId}`)
      .then((data) => {
        dispatch({ type: "SUCCESS_FETCHING", data: data.data["data"] });
        setTitle(data.data["data"][0].title);
        setBody(data.data["data"][0].body);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "FAILURE_FETCHING" });
        setTitle("");
        setBody("");
      });
  };

  useEffect(() => {
    fetchingPost();
  }, []);

  const updatePost = (postId) => {
    console.log(postId);
  };

  const deletePost = (postId) => {
    console.log(postId);
    ApiRequest.deleteRequest(`/post/deletePost/${postId}`)
      .then((result) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (post.isFetching === true) {
    return (
      <div className="fixed">
        <img src={Loading} alt="Loading" className="m-auto" />;
      </div>
    );
  } else if (post.isError === true) {
    return (
      <div className="fixed">
        <img src={Failure} alt="Failure" className="m-auto" />;
      </div>
    );
  } else if (post.data.length <= 0) {
    return (
      <div className="fixed">
        <img src={Empty} alt="Empty" className="m-auto" />;
      </div>
    );
  } else {
    return (
      <div className="singlePost">
        <div className="singlePostWrapper">
          <img
            className="singlePostImg"
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <h1 className="singlePostTitle">
            {isEdit ? (
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              title
            )}

            <div className="singlePostEdit">
              <button onClick={() => setIsEdit(!isEdit)}>
                <FaEdit />
              </button>
              <button onClick={() => deletePost(post.data[0]._id)}>
                <FaTrashAlt />
              </button>
            </div>
          </h1>
          <div className="singlePostInfo">
            <span>
              Author:
              <b className="singlePostAuthor">
                <Link className="link" to={`/posts?user=${post.data[0].user}`}>
                  {post.data[0].user}
                </Link>
              </b>
            </span>
            <span>1 day ago {post.data[0].createdAt} </span>
          </div>

          {isEdit ? (
            <>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="4"
                cols="100"
              />
              <br />
              <br />
              <button onClick={() => updatePost(post.data[0]._id)}>
                Update Post
              </button>
            </>
          ) : (
            <p className="singlePostDesc">{body}</p>
          )}
        </div>
      </div>
    );
  }
};

export default SinglePost;
