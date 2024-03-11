import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";

export default function Login() {

  const [users, setusers] = useState({email : '', password : ''})
  const navigate = useNavigate()

  const onchageuser = (e) => {
    setusers({...users, [e.target.name] : e.target.value})
  }

  const loginuser = async(e) => {
    e.preventDefault()
    const res = await fetch("http://127.0.0.1:8000/accounts/login/", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(users)
    })
    const json = await res.json()
    console.log(json)
    if (json.token) {
      localStorage.setItem("token", json.token.access)    
      navigate('/')  
    } else {
      alert("something went wrong")      
    }
  }

  return (
    <div className="login">
      <span className="logintitle">Login</span>
      <form className="loginform" onSubmit={loginuser}>
        <label>Email</label>
        <input type="text" className = 'loginInput' name="email" onChange={onchageuser} value={users.email} placeholder="Enter email..." />
        <label>Password</label>
        <input type="password"className = 'loginInput'name="password" onChange={onchageuser} value={users.password}  placeholder="Enter Password..." />
        <button className="loginbutton">Login</button>
      </form>
      <button className="registerbutton"><Link className="link" to='/register'>Register</Link></button>
    </div>
  );
}
