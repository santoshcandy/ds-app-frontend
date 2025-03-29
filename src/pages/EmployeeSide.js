import React from 'react'
import Header from '../component/Header'
import ClientList from '../component/ClientList'
import BottomNav from '../component/BottomNav'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplyLoan from '../component/ApplyLoan';
import Navbar from '../component/HeaderH';
const EmployeeSide = () => {
  return (
    <>
    
    <Navbar/>
    <ClientList/>
    <BottomNav/> 
    </>
  )
}

export default EmployeeSide
