import Navbar from "./Components/Navbar/Navbar";
import Home from "./Screens/Home/Home";
import Login from "./Screens/Login/Login";
import Settings from "./Screens/Settings/Settings";
import Signup from "./Screens/Signup/Signup";
import Single from "./Screens/Single/Single";
import Write from "./Screens/Write/Write";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="*" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/signup" element={user ? <Home /> : <Signup />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/post/:id" element={<Single />} />
      </Routes>
      <ToastContainer toastClassName="dark-toast" />
    </Router>
  );
}

export default App;
