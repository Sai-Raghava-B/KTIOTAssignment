
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DeviceList() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/devices');
      const data = await response.json();
      setDevices(data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  return (
    <div>
      <h2>All Devices</h2>
      <ul>
        {devices.map(device => (
          <li key={device._id}>
            
            <Link to={`/customer/devicecontrol/${device._id}`}>{device.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeviceList;
