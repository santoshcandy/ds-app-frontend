import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
import HomePage from './pages/HomePage';
import ClientSide from './pages/ClientSide';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import EmployeeSide from './pages/EmployeeSide';
import ClientDetails from './component/ClientDetails';
import AddClient from './pages/AddClient';
import RegisterPage from './pages/RegisterPage';
import ManagerPage from './pages/ManagerPage';
import RequestedPage from './pages/RequestedPage';

 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apply" element={<ClientSide />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/client/view" element={<EmployeeSide/>} />
        <Route path="/client/:id" element={<ClientDetails/>} />
        <Route path="/add-client" element={<AddClient/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/manager-home" element={<ManagerPage/>} />
        
        <Route path="/clients/:status" element={< RequestedPage/>} />
 

      </Routes>
    </Router>
  );
}

export default App;

