 
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
import EmployeeAddClientPage from './pages/EmployeeAddClientPage';
import Navbar from './component/HeaderH';
import ManagerClientDetails from './pages/ManagerClientDetails';
import EmployeeProfilePage from './pages/EmployeeProfilePage';
import EmployeeHome from './pages/EmployeeHome';
import EmployeeClientListPage from './pages/EmployeeClientListPage';
import EmployeeClient from './component/EmployeeClient';
import Nav from './component/Nav';
import ProtectedRoute from './ProtectedRoute';
// import EmployeeClientPage from './pages/EmployeeClientPage';
 

 

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* <Route path="" element={<HomePage />} /> */}
        <Route path="/apply" element={<ClientSide />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="*" element={<HomesPage/>} />

    <Route element={<ProtectedRoute/>}>

        <Route path="/client/view" element={<EmployeeSide/>} />
        <Route path="/employee/home" element={<EmployeeHome/>} />
        <Route path="/client/:id" element={<ClientDetails/>} />
        <Route path="/add-client" element={<AddClient/>} />
        <Route path="/employee/profile" element={<EmployeeProfilePage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/employee/clients/:status" element={< EmployeeClientListPage/>} />
        <Route path="/employee/client/:id" element={<EmployeeClient/>} />



        <Route path="/manager-home" element={<ManagerPage/>} />
        
        <Route path="/clients/:status" element={< RequestedPage/>} />
        <Route path="/employee" element={< EmployeeC/>} />
        <Route path="/employee/:id" element={<ManageEmployee/>} /> 
        <Route path="/employee/client/:id" element={< ManagerClientList/>} /> 
        <Route path="/manager/view/all" element={< ManagerAllListPage/>} /> 
        <Route path="/add-client-e" element={<EmployeeAddClientPage/>} />

        <Route path="/manager/client/:id" element={<ManagerClientDetails/>} />
    </Route>

      </Routes>
      <Nav/>
    </Router>
  );
}

export default App;

