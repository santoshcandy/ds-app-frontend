import React from 'react'
import Header from '../component/Header'
import ManagerNav from '../component/ManagerNav'
import ClientNav from '../component/ClientNav'
import Navbar from '../component/HeaderH'


const ManagerPage = () => {
  return (
    <div>
      <Navbar/>
      <ClientNav/>
      <ManagerNav/>

    </div>
  )
}

export default ManagerPage
