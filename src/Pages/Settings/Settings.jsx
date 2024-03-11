import './settings.css'
import Sidebar from '../../SideBar/Sidebar'
import logo from '../../Pics/hrr.jpg'



export default function Settings() {
  return (
    <div className='settings'>
        <div className="settingwrap">
            <div className="settingstitle">
                <div className="settingsupdatetitle">Update Your Account</div>
                <div className="settingsdeletetitle">Delete Account</div>
            </div>
            <form className="settingsform">
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img src={logo} alt="" />
                    <label htmlFor="fileinput">
                        <i className="settingsppicon far fa-user-circle"></i>
                    </label>
                    <input type="file" id='fileinput' style={{display : 'none'}} />
                </div>
                <label>Username</label>
                <input type="text" placeholder='username' />
                <label>Email</label>
                <input type="email" placeholder='email' />
                <label>Password</label>
                <input type="password" placeholder='password' />
                <button className="settingsubmit">Update</button>
            </form>
        </div>
        <Sidebar />
    </div>
  )
}
