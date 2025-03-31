import React from 'react'
import BottomNav from '../component/BottomNav'
import AttendanceForm from '../component/AttendanceForm'
import PerformanceDashboard from '../component/PerformanceDashboard '
import Logout from '../component/Logout'

const EmployeeProfilePage = () => {
  return (
    <div>
     <AttendanceForm/>
     <PerformanceDashboard/>
      <Logout/>
      <BottomNav/>
    </div>
  )
}

export default EmployeeProfilePage
