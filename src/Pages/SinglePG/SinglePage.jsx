import React from 'react'
import './singlepg.css'
import Sidebar from '../../SideBar/Sidebar'
import Singlepost from '../Singlepost/Singlepost'

export default function SinglePage() {
  return (
    <div className='single'>
        <Singlepost />
        <Sidebar />
    </div>
  )
}
