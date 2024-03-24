import "./settings.css";
import Sidebar from "../../SideBar/Sidebar";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Settings() {
  const [account, setaccount] = useState({ email: "", password: "" });
  const [profile_picture, setprofile_picture] = useState(null);

//   const {id} = useParams();

  const onchangevalue = (e) => {
    setaccount({ ...account, [e.target.name]: e.target.value });
  };

  const onsubmitaccount = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_picture", profile_picture);
    formData.append("id", account.id);
    formData.append("email", account.email);
    formData.append("password", account.password);
    const res = await fetch(`http://127.0.0.1:8000/accounts/register/`, {
      method: "PATCH",
      body: formData,
    });
    const json = await res.json();
    console.log(json);
    setaccount();
  };

  return (
    <div className="settings">
      <div className="settingwrap">
        <div className="settingstitle">
          <div className="settingsupdatetitle">Update Your Account</div>
          <div className="settingsdeletetitle">Delete Account</div>
        </div>
        <form className="settingsform" onSubmit={onsubmitaccount}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              name="profile_picture"
              onChange={(e) => setprofile_picture(e.target.files[0])}
            />
            <label htmlFor="fileinput">
              <i className="settingsppicon far fa-user-circle"></i>
            </label>
            <input type="file" id="fileinput" style={{ display: "none" }} />
          </div>
          <label>Email</label>
          <input type="email" placeholder="email" email  />
          <label>Password</label>
          <input type="password" placeholder="password" name="password" onChange={onchangevalue} />
          <button className="settingsubmit">Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
