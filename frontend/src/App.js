// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import CustomerDeviceList from './components/CustomerPanel/CustomerDeviceList';
import DeviceControl from './components/CustomerPanel/DeviceControls.js';
import DeviceList from './components/CustomerPanel/DeviceList.js';
import RoomManagement from './components/CustomerPanel/CustomerRoomForm';
import AdminCustomer from './components/AdminPanel/AdminCustomerList';
import CustomerLogin from './components/CustomerPanel/CustomerLogin.js';
import AdminCreateDevice from './components/AdminPanel/AdminDeviceList';
import AssignDevice from './components/AdminPanel/AdminDeviceForm';
import AdminStateOfDevices from './components/AdminPanel/AdminStateOfDevices.js';

function App() {
  return (
    <Router basename=''>
      <Routes>
        
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/registercustomer" element={<AdminCustomer/>} />
        <Route path="/admin/assigndevice" element={<AssignDevice/>} />
        <Route path="/admin/createdevice" element={<AdminCreateDevice/>} />
        <Route path="/admin/stateofdevices" element={<AdminStateOfDevices/>} />

         
        
        <Route path="/customer/allocatedlist" element={<CustomerDeviceList/>} />
        <Route path="/customer/devicecontrol/:deviceid" element={<DeviceControl/>} />
        <Route path="/customer/devicelist" element={<DeviceList/>} />
        <Route path="/customer/newroom" element={<RoomManagement/>} />
        <Route path="/customer/login" element={<CustomerLogin/>} />
      </Routes>
      
    </Router>
  );
}

export default App;
