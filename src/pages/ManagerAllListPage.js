import React from 'react'
import Navbar from '../component/HeaderH'
import ManagerNav from '../component/ManagerNav'
import SetTarget from '../component/SetTarget'
import PerformanceEmployeeList from '../component/PerformanceEmployeeList'

const ManagerAllListPage = () => {
  return (
    <div>
      <Navbar/>
    <SetTarget/>
    <PerformanceEmployeeList/>
      <ManagerNav/>
    </div>
  )
}

export default ManagerAllListPage
