

import React, { useState } from 'react';

function AdminCreateDevice ()  {
  
  const [light, setLight] = useState(0);
  const [fan, setFan] = useState(0);
  const [mis, setMis] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  state: { light, fan, mis } }),
      });
      if (!response.ok) {
        throw new Error('Failed to create device');
      }
      setLight(0);
      setFan(0);
      setMis(0);
      setError('');
      alert('Device created successfully');
    } catch (error) {
      console.error('Error creating device:', error);
      setError('Failed to create device');
    }
  };

  return (
    <div>
      <h2>Create New IoT Device</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="light">Light State (0 or 1):</label>
          <input
            type="number"
            id="light"
            value={light}
            onChange={(e) => setLight(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="fan">Fan State (0 or 1):</label>
          <input
            type="number"
            id="fan"
            value={fan}
            onChange={(e) => setFan(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="mis">Miscellaneous State (0 or 1):</label>
          <input
            type="number"
            id="mis"
            value={mis}
            onChange={(e) => setMis(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Create Device</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminCreateDevice;
