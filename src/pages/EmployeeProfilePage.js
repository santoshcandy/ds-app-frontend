import React from 'react'
import BottomNav from '../component/BottomNav'
import AttendanceForm from '../component/AttendanceForm'
import PerformanceDashboard from '../component/PerformanceDashboard '

const EmployeeProfilePage = () => {
  return (
    <div>
     <AttendanceForm/>
     <PerformanceDashboard/>

      <BottomNav/>
    </div>
  )
}

export default EmployeeProfilePage
