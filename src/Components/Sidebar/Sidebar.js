import "./Sidebar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(
        "https://blogapp-b-end.herokuapp.com/api/categories"
      );
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          className="sidebarImg"
          src="https://i.ytimg.com/vi/Ea7g-SrluGI/maxresdefault.jpg"
          alt=""
        />
        <p>
          lorem ipsLabore velit adipisicing consectetur amet amet dolore
          cupidatat nostrud incididunt consectetur eu voluptate pariatur cillum.
          Esse dolor sint nostrud do. Sint do elit duis est. Duis commodo
          commodo tempor irure exercitation do velit proident in. Reprehenderit
          amet ad id incididunt cillum. Consequat tempor amet duis dolore.
        </p>
      </div>
      <br />
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <br />
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i class="sidebarIcon fa fa-linkedin" aria-hidden="true"></i>
          <i class="sidebarIcon fa fa-instagram" aria-hidden="true"></i>
          <i class="sidebarIcon fa fa-twitter" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
