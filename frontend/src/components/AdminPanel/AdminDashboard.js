

import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [Devices, setDevices] = useState([]);
  const [Customers, setCustomers] = useState([]);

  console.log('AdminDashboard component rendered');

  useEffect(() => {
    console.log('useEffect hook executed');
    // Fetch devices from an API
    fetch('http://localhost:5000/api/admin/devices')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch devices');
        }
        return response.json();
      })
      .then(data => {
        console.log('Devices:', data);
        setDevices(data);
      })
      .catch(error => {console.error('Error fetching devices:', error)});
  
    // Fetch customers from an API
    fetch('http://localhost:5000/api/admin/customers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        return response.json();
      })
      .then(data => {
        console.log('Customers:', data);
        setCustomers(data);
      })
      .catch(error => console.error('Error fetching customers:', error));
  }, []);
  
  
 

 
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Devices:</h3>
      <ul>
        {Devices.map(Device => {
          return <li key={Device._id}>{Device.name}</li>
        })}
      </ul>
      <h3>Customers:</h3>
      <ul>
        {Customers.map(Customer => {
          return <li key={Customer._id}>{Customer.username}</li>
        })}
      </ul>
    </div>
  );
}

export default AdminDashboard;

