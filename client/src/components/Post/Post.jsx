import { Link } from "react-router-dom";
import "./post.css";

const Post = ({
  _id,
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
    <div className="post">
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
          <Link to={`/post/${_id}`} className="link">
            {title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">{body}</p>
    </div>
  );
};

export default Post;
