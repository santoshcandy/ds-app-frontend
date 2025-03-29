import React from 'react'
import Header from '../component/Header'
import ManagerNav from '../component/ManagerNav'
 
import ClientListPage from '../component/ClientListPage'
import "../style/EmployeeClientDetails.css"; // Ensure the CSS file is linked
import Navbar from '../component/HeaderH';

const RequestedPage = () => {
  return (
     <>
     <Navbar/>
     <ClientListPage/>   
     <ManagerNav/>
     </>
  )
}

export default RequestedPage
