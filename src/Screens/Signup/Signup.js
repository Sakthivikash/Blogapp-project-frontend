import "./Signup.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios
        .post("https://blogapp-b-end.herokuapp.com/api/auth/register", {
          name: username,
          email,
          password,
        })
        .catch((err) => console.log(err));
      console.log(username, email, password);
      res.data && window.location.replace("/login");
      toast.success("Registered successfully", { theme: "colored" });
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="signup">
      <span className="signupTitle">Signup</span>
      <form className="signupForm" onSubmit={handleSubmit}>
        <lable className="inputLable">UserName</lable>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="inputLable">Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="inputLable">Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />{" "}
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong!
          </span>
        )}
        <button type="submit" className="signupButton">
          Signup
        </button>
      </form>

      <span style={{ marginTop: "10px" }}>
        Already have an account? Please{" "}
        <Link
          style={{ fontSize: "18px", color: "darkblue", cursor: "pointer" }}
          to={"/login"}
        >
          Login
        </Link>
      </span>
    </div>
  );
}

export default Signup;
