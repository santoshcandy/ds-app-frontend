import React from 'react'
import Navbar from '../component/HeaderH'
import ManagerNav from '../component/ManagerNav'
import ManagerEmployeeClientDetails from '../component/ManagerEmployeeClientDetails'

const ManagerClientList = () => {
  return (
    <div>
      <Navbar/>
    <ManagerEmployeeClientDetails/>
      <ManagerNav/>
    </div>
  )
}

export default ManagerClientList
