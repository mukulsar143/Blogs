import "./write.css";
import logo from "../../Pics/blog3.jpg";
import { useState } from "react";

export default function Write() {
  const [blogs, setBlogs] = useState({ title: "", descriptions: "" });
  const [image, setImage] = useState(null);

  const onChangeBlog = (e) => {
    setBlogs({ ...blogs, [e.target.name]: e.target.value });
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", blogs.title);
    formData.append("descriptions", blogs.descriptions);

    try {
      const res = await fetch("http://127.0.0.1:8000/blogs/api/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await res.json();
      console.log(json);
      // Update state if necessary
    } catch (error) {
      console.error("Error submitting blog:", error);
      // Handle error
    }
  };

  return (
    <div className="write">
      <img src={logo} alt="" className="writeimg" />
      <form className="writeform" onSubmit={submitBlog}>
        <div className="formgroup">
          <label htmlFor="fileInput">
            <i className="plusicon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            name="title"
            value={blogs.title}
            onChange={onChangeBlog}
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
          />
        </div>
        <div className="formgroup">
          <textarea
            name="descriptions"
            value={blogs.descriptions}
            onChange={onChangeBlog}
            placeholder="Tell Story...."
            type="text"
            className="writeInput writeText"
          ></textarea>
        </div>
        <button className="writeSubmit">Publish</button>
      </form>
    </div>
  );
}
