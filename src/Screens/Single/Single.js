import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Single.css";
import SinglePost from "./SinglePost";

function Single() {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}

export default Single;
