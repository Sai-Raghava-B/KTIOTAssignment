
import React, { useState, useEffect } from 'react';

function CustomerDeviceList() {
  const [devices, setDevices] = useState([]);
  const userId = "65cc5fdbc6aa93522f525110"; 

  useEffect(() => {
    
    fetch(`http://localhost:5000/api/customer/devices/${userId}`)
      .then(response => response.json())
      .then(data => setDevices(data))
      .catch(error => console.error('Error fetching devices:', error));
  }, [userId]); 

  return (
    <div>
      <h2>Allocated Smart Devices</h2>
      <ul>
        {devices.map(device => (
          <li key={device._id}>{device._id}</li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerDeviceList;
