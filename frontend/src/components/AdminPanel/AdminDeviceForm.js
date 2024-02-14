

import React, { useState, useEffect } from 'react';

const AssignDevice = () => {
  const [unallocatedDevices, setUnallocatedDevices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedDevice, setselectedDevice] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUnallocatedDevices();
    fetchCustomers();
  }, []);

  const fetchUnallocatedDevices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/unalldevices');
      if (!response.ok) {
        throw new Error('Failed to fetch unallocated devices');
      }
      const data = await response.json();
      setUnallocatedDevices(data);
    } catch (error) {
      console.error('Error fetching unallocated devices:', error);
      setError('Failed to fetch unallocated devices');
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to fetch customers');
    }
  };

  const handleAssignDevice = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/assigndevice/${selectedDevice}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customer: selectedCustomer, device_id : selectedDevice }),
      });
      if (!response.ok) {
        throw new Error('Failed to assign device');
      }
      
      fetchUnallocatedDevices();
    } catch (error) {
      console.error('Error assigning device:', error);
      setError('Failed to assign device');
    }
  };

  return (
    <div>
      <h2>Assign Device to Customer</h2>
      <div>
        <label htmlFor="device">Select Device:</label>
        <select id="device" value={selectedDevice} onChange={(e) => setselectedDevice(e.target.value)}>
          <option value="">Select Device</option>
          {unallocatedDevices.map((device) => (
            <option key={device._id} value={device._id}>{device._id}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="customer">Select Customer:</label>
        <select id="customer" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>{customer.username}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAssignDevice}>Assign Device</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AssignDevice;
