import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li
            className={`nav-item ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          {localStorage.getItem("authToken") ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline-success mx-2 my-sm-0"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-outline-success mx-2 my-sm-0"
              >
                SignUp
              </Link>
            </>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
