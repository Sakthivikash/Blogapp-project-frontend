import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SinglePost.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const PF = "https://blogapp-b-end.herokuapp.com/images/";
  const { user, dispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        "https://blogapp-b-end.herokuapp.com/api/posts/" + id
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://blogapp-b-end.herokuapp.com/api/posts/${post._id}`,
        {
          data: { username: user.name },
        },
        { headers: { userId: user._id } }
      );
      window.location.replace("/");
    } catch (err) {
      console.log(err);
      if (err.request.status === 403) {
        dispatch({ type: "LOGOUT" });
        window.location.replace("/login");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(
        `https://blogapp-b-end.herokuapp.com/api/posts/${post._id}`,
        {
          username: user.name,
          title,
          desc,
        },
        { headers: { userId: user._id } }
      );
      setLoading(false);
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
      if (err.request.status === 403) {
        dispatch({ type: "LOGOUT" });
        window.location.replace("/login");
      }
    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={PF + post.photo} alt="post-image" />
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.name && (
              <div className="singlePostEdit">
                <i
                  className="fa fa-pencil"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i className="fa fa-trash-o" onClick={handleDelete}></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <b>
              <Link to={`/?user=${post.username}`} className="link">
                {post.username}
              </Link>
            </b>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            {loading ? "Updating..." : "Update"}
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
