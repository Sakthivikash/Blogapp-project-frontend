import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

function Navbar() {
  const [searchMode, setSearchMode] = useState(false);
  const [search, setSearch] = useState("");
  const { user, dispatch } = useContext(Context);
  const PF = "https://blogapp-b-end.herokuapp.com/images/";

  const handleLogout = async () => {
    const res = await axios
      .post("https://blogapp-b-end.herokuapp.com/api/auth/logout", {
        userId: user._id,
      })
      .catch((err) => console.log(err));
    console.log(res);
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");
  };
  return (
    <div className="nav">
      <div className="navLeft">
        <Link className="link" to="/">
          <h2 style={{ fontWeight: "400" }}>
            <b>B</b>log<b>A</b>pp
          </h2>
        </Link>
      </div>
      <div className="navCenter">
        <ul className="navList">
          {user && (
            <>
              <li className="navListItem">
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li className="navListItem">
                <Link className="link" to="/write">
                  Write
                </Link>
              </li>
              <li className="navListItem" onClick={handleLogout}>
                Logout
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navRight">
        <form className="searchBar">
          {searchMode == true ? (
            <input
              type="text"
              id="searchInp"
              placeholder="Search..."
              className="searchInp"
              style={{ display: search }}
              onChange={(e) => setSearch(e.target.value)}
            />
          ) : (
            ""
          )}
          {searchMode == true ? (
            <Link
              to={
                `/?title=${search}` || `/?cat=${search}` || `/?user=${search}`
              }
              className="link"
            >
              <label>
                <i
                  class="navSearchIcon fa fa-search"
                  onClick={() => setSearchMode(!searchMode)}
                ></i>
              </label>
            </Link>
          ) : (
            <label htmlFor="searchInp">
              <i
                class="navSearchIcon fa fa-search"
                onClick={() => setSearchMode(!searchMode)}
              ></i>
            </label>
          )}
        </form>
        {user ? (
          <Link
            to={"/settings"}
            className="link"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              className="navImg"
              src={PF + user.profilePic}
              alt={`${user.name}-profile-image`}
            />
            <h3 className="username">{user.name}</h3>
          </Link>
        ) : (
          <ul className="navList">
            <li className="navListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="navListItem">
              <Link className="link" to="/signup">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
