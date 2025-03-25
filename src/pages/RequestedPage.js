import React from 'react'
import Header from '../component/Header'
import ManagerNav from '../component/ManagerNav'
 
import ClientListPage from '../component/ClientListPage'

const RequestedPage = () => {
  return (
     <>
     <Header/>
     <ClientListPage/>   
     <ManagerNav/>
     </>
  )
}

export default RequestedPage
