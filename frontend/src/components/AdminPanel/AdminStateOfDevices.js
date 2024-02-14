import React, { useState, useEffect } from 'react';

function AdminStateOfDevices() {
  const [deviceStates, setDeviceStates] = useState([]);

  useEffect(() => {
    // Fetch device states from the backend when the component mounts
    fetch('http://localhost:5000/api/admin/stateofdevices')
      .then(response => response.json())
      .then(data => setDeviceStates(data))
      .catch(error => console.error('Error fetching device states:', error));
  }, []);

  const getDeviceState = (device) => {
        // Check the state of the light and fan
        const lightState = device.state.light === 1 ? 'on' : 'off';
        const fanState = device.state.fan === 1 ? 'on' : 'off';
        const misState = device.state.mis === 1? 'on' : 'off';
        
        // Return the device state message
        return `Light is ${lightState}, Fan is ${fanState} ,  Mis is ${misState}`;
      };

  return (
    <div>
      <h2>Device States</h2>
      <ul>
        {deviceStates.map(device => {
          return <li key={device.deviceId}>
            Device ID: {device.deviceId}, State: {getDeviceState(device)}
          </li>
        })}
      </ul>
    </div>
  );
}

export default AdminStateOfDevices;