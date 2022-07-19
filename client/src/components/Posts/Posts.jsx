import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ApiRequest from "../../APIRequest/ApiRequest";
import { setPost } from "../../redux/features/postsSlice";
import store from "../../redux/store/store";

const Posts = () => {
  const { search } = useLocation();

  const posts = useSelector((state) => state.posts.value);

  useEffect(() => {
    ApiRequest.getRequest("/post/selectAllPost" + search).then((response) => {
      store.dispatch(setPost(response.data));
    });
  }, [search]);

  if (posts.length < 0) {
    return "no post here";
  } else {
    return (
      <div className="posts col-md-8 px-5">
        <div className="row">
          {posts.map(
            ({
              _id,
              slug,
              title,
              body,
              photo,
              categories,
              tags,
              user,
              createdAt,
              img,
            }) => {
              return (
                <div className="post col-md-6">
                  <img className="postImg" src={photo} alt="" />
                  <div className="postInfo">
                    <div className="postCats">
                      {categories &&
                        categories.map((cat) => {
                          return (
                            <span className="postCat">
                              <Link className="link" to="/posts?cat=Music">
                                Music
                              </Link>
                            </span>
                          );
                        })}
                    </div>
                    <span className="postTitle">
                      <Link to={`/post/${slug}`} className="link">
                        {title}
                      </Link>
                    </span>
                    <hr />
                    <span className="postDate">
                      {new Date(createdAt).toDateString()}
                    </span>
                  </div>
                  <p className="postDesc">{body}</p>
                </div>
              );
            },
          )}
        </div>
      </div>
    );
  }
};

export default Posts;
