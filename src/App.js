 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
import HomePage from './pages/HomePage';
import ClientSide from './pages/ClientSide';

import React from "react";
import {HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import EmployeeSide from './pages/EmployeeSide';
import ClientDetails from './component/ClientDetails';
import AddClient from './pages/AddClient';
import RegisterPage from './pages/RegisterPage';
import ManagerPage from './pages/ManagerPage';
import RequestedPage from './pages/RequestedPage';
import HomesPage from './pages/HomesPage';
import EmployeeClients from './component/EmployeeClients ';
// import AsiignedClientPage from './pages/AsiignedClientPage';
import EmployeeClientDetails from './component/EmployeeClientDetails';
import ManageEmployee from './pages/ManageEmployee';
import EmployeeC from './pages/EmployeeC';
import ManagerClientList from './pages/ManagerClientList';
import ManagerAllListPage from './pages/ManagerAllListPage';
// import EmployeeClientPage from './pages/EmployeeClientPage';
 

 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/any" element={<HomePage />} />
        <Route path="/apply" element={<ClientSide />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/client/view" element={<EmployeeSide/>} />
        <Route path="/client/:id" element={<ClientDetails/>} />
        <Route path="/add-client" element={<AddClient/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/manager-home" element={<ManagerPage/>} />
        
        <Route path="/clients/:status" element={< RequestedPage/>} />
        <Route path="/home" element={<HomesPage/>} />
        <Route path="/employee" element={< EmployeeC/>} />
        <Route path="/employee/:id" element={<ManageEmployee/>} /> 
        <Route path="/employee/client/:id" element={< ManagerClientList/>} /> 
        <Route path="/manager/view/all" element={< ManagerAllListPage/>} /> 

 

      </Routes>
    </Router>
  );
}

export default App;

