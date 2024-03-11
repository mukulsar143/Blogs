import './contact.css'
import Sidebar from '../../SideBar/Sidebar'
import { useState } from "react";



export default function Contact() {

  const [email, setemail] = useState({name : '', email : '', subject : '', message : ''})


  const onchangeemail =(e)=> {
    setemail({...email, [e.target.name] : e.target.value})
  }

  const onemailsubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://127.0.0.1:8000/blogs/api/email/", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(email)
    })
    const json = await res.json()
    console.log(json)
    setemail(json)
  }

  return (
    <div className='settings'>
        <div className="settingwrap">
            <div className="settingstitle">
                <div className="settingsupdatetitle">Contact Us</div>
            </div>
            <form className="settingsform" onSubmit={onemailsubmit}>
                <label>Name</label>
                <input type="name" placeholder='name' name = "name" value={email.name} onChange = {onchangeemail} />
                <label>Subject</label>
                <input type="name" placeholder='Subject' name = "subject" value={email.subject} onChange = {onchangeemail} />
                <label>Email</label>
                <input type="email" placeholder='email' name='email'value={email.email} onChange={onchangeemail} />
                <label>Text Message</label>
                <div className="formgroup">
                <textarea placeholder="Text here...." type = "text" name='message' value={email.message} onChange={onchangeemail} className='textinput'>

                </textarea>
                </div>
                <button className="settingsubmit">Send</button>
            </form>
        </div>
        <Sidebar />
    </div>
  )
}
