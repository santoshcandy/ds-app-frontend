import React from 'react'
import Navbar from '../component/HeaderH'
 import EmployeeClients from '../component/EmployeeClients '
import ManagerNav from '../component/ManagerNav'

const EmployeeC = () => {
  return (
    <div>
      <Navbar/>
      <EmployeeClients/>
      <ManagerNav/>
    </div>
  )
}

export default EmployeeC
