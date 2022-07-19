import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ApiRequest from "../../APIRequest/ApiRequest";

import "./singlePost.css";
import { useRef } from "react";
import GetBase64 from "../../helper/GetBase64";
import FormValidation from "../../helper/FormValidation";
import ToastMessage from "../../helper/ToastMessage";
import SessionHelper from "../../helper/SessionHelper";
import store from "../../redux/store/store";
import { setProfile } from "../../redux/features/profileSlice";

const SinglePost = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { pathname } = useLocation();
  const query = pathname.split("/")[2];

  const profile = useSelector((state) => state.profile.value);
  const accessToken = SessionHelper.getToken();

  let imgRef,
    imgInputRef = useRef();

  const selectPost = () => {
    ApiRequest.getRequest("/post/selectPost/" + query).then((response) => {
      if (response) {
        setPost(response.data[0]);
      }
    });
  };

  const selectProfile = () => {
    accessToken &&
      ApiRequest.getRequest("/user/selectUser").then((response) => {
        if (response) {
          store.dispatch(setProfile(response.data[0]));
        }
      });
  };

  useEffect(() => {
    selectPost();
    selectProfile();
  }, []);

  const previewImg = () => {
    const imgFile = imgInputRef.files[0];
    GetBase64(imgFile).then((img) => {
      setPost({ ...post, photo: img });
    });
  };

  const updatePost = () => {
    const updatedPost = {
      title: post.title,
      body: post.body,
      photo: post.photo,
    };

    if (FormValidation.isEmpty(post.title)) {
      ToastMessage.errorMessage("Title is required");
    } else {
      ApiRequest.updateRequest(
        "/post/updatePost/" + post.slug,
        updatedPost,
      ).then((result) => {
        if (result) {
          ToastMessage.successMessage("Post Update Successfull");
          selectPost();
          setIsEdit(false);
        } else {
          setIsEdit(false);
        }
      });
    }
  };

  const deletePost = () => {
    if (window.confirm("Are you sure remove this")) {
      ApiRequest.deleteRequest("/post/deletePost/" + post.slug).then(
        (result) => {
          if (result) {
            ToastMessage.successMessage("Post Delete Successfull");
            navigate("/");
          }
        },
      );
    }
  };

  const authUser = profile.userName === post.user;

  return (
    <div className="container">
      <div className="singlePost">
        <div className="singlePostWrapper">
          {isEdit ? (
            <input
              type="file"
              onChange={previewImg}
              ref={(input) => (imgInputRef = input)}
            />
          ) : (
            <img
              className="singlePostImg"
              src={post.photo}
              alt={post.slug}
              ref={(img) => (imgRef = img)}
            />
          )}

          <h1 className="singlePostTitle">
            {isEdit ? (
              <input
                type="text"
                placeholder="title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            ) : (
              post.title
            )}

            <div className="singlePostEdit">
              <button onClick={() => setIsEdit(!isEdit)} disabled={!authUser}>
                <FaEdit />
              </button>
              <button
                onClick={() => deletePost(post.slug)}
                disabled={!authUser}
              >
                <FaTrashAlt />
              </button>
            </div>
          </h1>
          <div className="singlePostInfo">
            <span>
              Author:
              <b className="singlePostAuthor">
                <Link className="link" to={`/posts?user=${post.user}`}>
                  {post.user}
                </Link>
              </b>
            </span>
            <span>1 day ago {new Date(post.createdAt).toDateString()} </span>
          </div>

          {isEdit ? (
            <>
              <textarea
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                rows="4"
                cols="100"
              />
              <br />
              <br />
              <button onClick={updatePost}>Update Post</button>
            </>
          ) : (
            <p className="singlePostDesc">{post.body}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
