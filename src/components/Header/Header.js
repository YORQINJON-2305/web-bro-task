import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  return (
    <header className="site-header">
      <div className="my-container">
        <div className="header-inner">
          <Link className="header-link" to="/">
            WebBro
          </Link>
          <button
            className="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight">
            Cart
          </button>
        </div>
      </div>
    </header>
  );
};
