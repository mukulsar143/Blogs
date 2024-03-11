import React, { useEffect, useState } from "react";
import "./post.css";
import { Link, useNavigate } from "react-router-dom";

export default function Post() {
  const [blog, setblog] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    try {
      fetch("http://127.0.0.1:8000/blogs/api/", {
        method : "GET",
        headers :{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((resp) => {
          if (resp.success) {
            setblog(resp.data)            
          } else {
            navigate("/login")
          }
        });
    } catch (error) {
      alert("error");
      console.log(error);
    }
  }, [])



  return (
    <>
    {blog.map((row)=>{
      return (
        <div className="post" key={row.uuid}>
        <img src={`http://127.0.0.1:8000${row.image}`} alt="" className="postimage" />
        <div className="postinfo">
          <div className="postcat">
            <span className="postspan">Music</span>
            <span className="postspan">Life</span>
          </div>
          <Link className="link" to={`/singlepage/${row.uuid}`}>
            <span className="posttitle">{row.title}.</span>
          </Link>
          <hr />
          <span className="postdate">1 hour</span>
        </div>
        <p className="postdesc">
          {row.descriptions}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sed
          corrupti ipsum! Eveniet molestias odio asperiores cumque laudantium
          corrupti facere, aut eos quasi laboriosam similique quaerat fugit amet
          aliquid consequuntur.
        </p>
      </div>
      );
    })}
    
    </>
  );
}
