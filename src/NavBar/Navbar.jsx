import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"; // Correct the CSS import path

export default function Navbar() {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();
  const [image, setImage] = useState([]);

  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/accounts/register/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setImage(data.profile_picture);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong");
      }
    };
    fetchData();
  }, []);

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
            <Link className="link" to="/write">
              WRITE
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
              <Link className="link" to="/settings">
                <img
                  src={`http://127.0.0.1:8000/${image}`}
                  alt="hrithik"
                  className="topimg"
                />
              </Link>
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
