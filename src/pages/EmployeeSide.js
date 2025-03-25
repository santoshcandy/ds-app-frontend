import React from 'react'
import Header from '../component/Header'
import ClientList from '../component/ClientList'
import BottomNav from '../component/BottomNav'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplyLoan from '../component/ApplyLoan';
const EmployeeSide = () => {
  return (
    <>
    
    <Header/>
    <ClientList/>
    <BottomNav/> 
    </>
  )
}

export default EmployeeSide
