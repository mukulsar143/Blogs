import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"; 
import logo from "../Pics/new.jpg";


export default function Navbar() {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };


  return (
    <div className="top">
      <div className="topLeft">
        <i className="topicon fab fa-linkedin"></i>
        <i className="topicon fab fa-whatsapp-square"></i>
        <i className="topicon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListitem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListitem">
            <Link className="link" to="/dashboard">
              DASHBOARD
            </Link>
          </li>
          <li className="topListitem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
        </ul>
      </div>

      <div className="topRight">
        {user ? (
          <>
                <img
                  src={logo}
                  alt="hrithik"
                  className="topimg"
                />
            <ul className="topList">
              <li className="topListitem">
                <button onClick={handleLogout}>
                  <Link className="link" to="/login">
                    LOGOUT
                  </Link>
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="topList">
              <li className="topListitem">
                <Link className="link" to="/login">
                  LOGIN
                </Link>
              </li>
              <li className="topListitem">
                <Link className="link" to="/register">
                  REGISTER
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
