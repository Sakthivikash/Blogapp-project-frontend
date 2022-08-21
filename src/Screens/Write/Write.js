import "./Write.css";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user, dispatch } = useContext(Context);

  //Image upload states
  const [image, setImage] = useState(null);
  const [upladingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "m61hjyvt");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dbhtjsfnh/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture");
    const url = await uploadImage(image);
    console.log(url);
    const newPost = {
      username: user.name,
      title,
      desc,
      photo: url,
    };
    try {
      const res = await axios.post(
        "https://blogapp-b-end.herokuapp.com/api/posts",
        newPost,
        {
          headers: { userId: user._id },
        }
      );
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
      if (err.request.status === 403) {
        dispatch({ type: "LOGOUT" });
        window.location.replace("/login");
      }
    }
  };
  return (
    <div className="write">
      {image && (
        <img className="writeImg" src={imagePreview} alt="post-image" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            // accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={validateImg}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          {" "}
          {upladingImg ? (
            "Loading..."
          ) : (
            <i className="fa fa-paper-plane">PUBLISH</i>
          )}
        </button>
      </form>
    </div>
  );
}

export default Write;
