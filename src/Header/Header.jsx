import React from 'react'
import logo from '../Pics/Blog2.jpg'
import './header.css'


export default function Header() {
  return (
    <div className='header'>
        <div className="headertitle">
        
            <span className="headertitlesa">RJ & DRF</span>
            <span className="headertitleg">Blogs</span>
        </div>
        <div className="HeaderImage">
            <img src={logo} className='headImg' alt="" />
        </div>
    </div>
  )
}