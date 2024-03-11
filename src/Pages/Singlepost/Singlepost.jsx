import React, { useEffect, useState } from "react";
import "./singlepost.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Singlepost() {
  const [blog, setBlog] = useState([]);
  const { uuid } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/blogs/api/publishblogs/${uuid  }`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((resp) => {
        if (localStorage.getItem("token"))
        {
          setBlog(resp);
          console.log(resp);
        }
        else {
          navigate('/login')
        }

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="singlepost">
      {blog.map((row) => {
        return (
          <div className="singlepostwrap" key={row.uuid}>
          <img src={`http://127.0.0.1:8000/${row.image}`} alt="" className="singlepostimg" />
          <h1 className="singleposttitle">
            {row.title}
          </h1>
          <div className="singlepostedit">
            <i className="editi far fa-edit"></i>
            <i className="editi far fa-trash-alt"></i>
          </div>
          <div className="singlepostinfo">
            <span className="singlepostauthor">
              Author : <b>HRX</b>
            </span>
            <span className="singlepostauthor"> 1 Hour Ago</span>
          </div>
          <p className="singlepostdesc">
            {row.descriptions}
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam maxime delectus, cum molestias accusamus eligendi perspiciatis consequuntur ipsum quam ab dicta non, sit mollitia accusantium natus nobis eveniet, ducimus quisquam?
            <br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut aspernatur unde velit, fugit rerum maxime voluptas natus sapiente deleniti cum doloremque corporis sint, assumenda fuga officia quasi officiis. Voluptates?
          </p>
        </div>
        )
      })}
    </div>
  );
}
