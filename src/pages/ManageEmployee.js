import React from 'react'
import Navbar from '../component/HeaderH'
import EmployeeClientDetails from '../component/EmployeeClientDetails'
import ManagerNav from '../component/ManagerNav'

const ManageEmployee = () => {
  return (
    <div>
      <Navbar/>
      <EmployeeClientDetails/>
      <ManagerNav/>
    </div>
  )
}

export default ManageEmployee
