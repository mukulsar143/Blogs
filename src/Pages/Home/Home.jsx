import React from 'react'
import Posts from '../../Posts/Posts'
import Sidebar from '../../SideBar/Sidebar'
import Header from '../../Header/Header'
import './home.css'

export default function Home() {
  return (
    <>
    <Header/>
    <div className='home'>
        <Posts />
        <Sidebar/>
    </div>
    </>
  )
}
