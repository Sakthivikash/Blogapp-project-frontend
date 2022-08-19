import "./Header.css";

function Header() {
  return (
    <div>
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm">React & Node</span>
          <span className="headerTitleLg">Blog</span>
        </div>
      </div>
      <img
        className="headerImg"
        src="https://images-na.ssl-images-amazon.com/images/I/A1bktGRAovL.png"
        alt=""
      />
    </div>
  );
}

export default Header;
