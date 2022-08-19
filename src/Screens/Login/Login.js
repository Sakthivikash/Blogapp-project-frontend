import "./Login.css";
import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://blogapp-b-end.herokuapp.com/api/auth/login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast.success("Login successfull", { theme: "colored" });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <lable>Email</lable>
        <input type="email" placeholder="Enter email" ref={emailRef} />
        <lable>Password</lable>
        <input type="password" placeholder="Enter password" ref={passwordRef} />
        <button type="submit" className="loginButton" disabled={isFetching}>
          Login
        </button>
      </form>
      <span style={{ marginTop: "10px" }}>
        Don't have an account? Please{" "}
        <Link
          style={{ fontSize: "18px", color: "darkblue", cursor: "pointer" }}
          to={"/signup"}
        >
          Register
        </Link>
      </span>
    </div>
  );
}

export default Login;
