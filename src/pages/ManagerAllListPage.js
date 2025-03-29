import React from 'react'

import ManagerNav from '../component/ManagerNav'
import SetTarget from '../component/SetTarget'
import PerformanceEmployeeList from '../component/PerformanceEmployeeList'

const ManagerAllListPage = () => {
  return (
    <div>
    
    <SetTarget/>
    <PerformanceEmployeeList/>
      <ManagerNav/>
    </div>
  )
}

export default ManagerAllListPage
