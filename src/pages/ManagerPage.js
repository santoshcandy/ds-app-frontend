import React from 'react'
import Header from '../component/Header'
import ManagerNav from '../component/ManagerNav'
import ClientNav from '../component/ClientNav'


const ManagerPage = () => {
  return (
    <div>
      <Header/>
      <ClientNav/>
      <ManagerNav/>

    </div>
  )
}

export default ManagerPage
