import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useState } from "react";

export default function Register() {
  const [account, setaccount] = useState({ email: "", password: "" });
  const [profile_picture, setprofile_picture] = useState(null);

  const navigate = useNavigate();

  const onchangevalue = (e) => {
    setaccount({ ...account, [e.target.name]: e.target.value });
  };

  const onsubmitaccount = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_picture", profile_picture);
    formData.append("email", account.email);
    formData.append("password", account.password);
    const res = await fetch("http://127.0.0.1:8000/accounts/register/", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    console.log(json);
    if (json.success) {
      navigate("/login");
    } else {
      alert("something went wrong..");
    }
  };

  return (
    <div className="register">
      <span className="registertitle">Register</span>
      <form className="registerform" onSubmit={onsubmitaccount}>
        <label htmlFor="fileInput">
          <i className="plusicon fas fa-plus"></i>
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          name="profile_picture"
          onChange={(e) => setprofile_picture(e.target.files[0])}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={account.email}
          onChange={onchangevalue}
          className="registerInput"
          placeholder="Enter Email..."
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={account.password}
          onChange={onchangevalue}
          className="registerInput"
          placeholder="Enter Password..."
        />
        <button className="userbutton">Register</button>
      </form>
      <button className="userloginbutton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
}
