import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Settings.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "https://blogapp-b-end.herokuapp.com/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      name: username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(
          "https://blogapp-b-end.herokuapp.com/api/upload",
          data
        );
      } catch (err) {}
    }
    try {
      const res = await axios.put(
        "https://blogapp-b-end.herokuapp.com/api/users/" + user._id,
        updatedUser,
        { headers: { userId: user._id } }
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      toast.success("Profile has been updated", { theme: "colored" });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(err);
      if (err.request.status === 403) {
        dispatch({ type: "LOGOUT" });
        window.location.replace("/login");
      }
    }
  };

  async function handleDeleteAccount() {
    const res = await axios
      .delete("https://blogapp-b-end.herokuapp.com/api/users", {
        headers: { userId: user._id },
      })
      .catch((err) => {
        console.log(err);
        if (err.request.status === 403) {
          dispatch({ type: "LOGOUT" });
          window.location.replace("/login");
        }
      });
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");
    console.log(res.data);
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={handleDeleteAccount}>
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.name}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
