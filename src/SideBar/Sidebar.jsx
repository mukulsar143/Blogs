import "./sidebar.css";
import logo from '../Pics/hrr.jpg'
import { Divider } from "@mui/material";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sideBarItem">
        <Divider><sapn className="sidebartitle">ABOUT ME</sapn></Divider>
        <img src={logo} alt="HrPics" />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
          repellendus numquam dignissimos sequi laudantium sunt magni, dolore
          architecto in eligendi ad amet! Nisi quam sequi hic accusantium.
          Facere, fugit? Eius.<br/>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
          repellendus numquam dignissimos sequi laudantium sunt magni, dolore
          architecto in eligendi ad amet! Nisi quam sequi hic accusantium.
          Facere, fugit? Eius.
        </p>
      </div>
      <div className="sideBarItem">
        <span className="sidebartitle">CATEGORIES</span>
        <ul className="sidebarlist">
          <li className="sidebarlistItem">Coding</li>
          <li className="sidebarlistItem">Musics</li>
          <li className="sidebarlistItem">Style</li>
          <li className="sidebarlistItem">Sports</li>
          <li className="sidebarlistItem">Style</li>
          <li className="sidebarlistItem">Books</li>
        </ul>
      </div>
      <div className="sideBarItem">
        <span className="sidebartitle">FOLLOW US</span>
        <div className="sidebarsocial">
        <i className="socialItem fa-brands fa-linkedin"></i>
        <i className="socialItem fab fa-whatsapp-square"></i>
       <i className="socialItem fab fa-instagram-square"></i>
        </div>
      </div>

    </div>
  );
}
