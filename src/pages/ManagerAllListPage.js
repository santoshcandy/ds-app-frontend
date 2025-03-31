import React from 'react'

import ManagerNav from '../component/ManagerNav'
import SetTarget from '../component/SetTarget'
import PerformanceEmployeeList from '../component/PerformanceEmployeeList'
import Logout from '../component/Logout'

const ManagerAllListPage = () => {
  return (
    <div>
    
    <SetTarget/>
    <PerformanceEmployeeList/>
    <Logout/>
      <ManagerNav/>
    </div>
  )
}

export default ManagerAllListPage
