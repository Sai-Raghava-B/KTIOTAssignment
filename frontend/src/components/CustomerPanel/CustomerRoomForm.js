
import React, { useState, useEffect } from 'react';

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [room_name, setRoomName] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRooms();
    fetchDevices();
  }, []);

  const fetchRooms = () => {
    fetch('http://localhost:5000/api/customer/rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  };

  const fetchDevices = () => {
    fetch('http://localhost:5000/api/admin/devices')
      .then(response => response.json())
      .then(data => setDevices(data))
      .catch(error => console.error('Error fetching devices:', error));
  };

  const handleCreateRoom = () => {
    if (!room_name.trim() || !selectedDevice) {
      setError('Please enter a room name and select a device.');
      return;
    }

    fetch('http://localhost:5000/api/customer/createrooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ room_name, device_id: selectedDevice ,user_id:"65cc5fdbc6aa93522f525110"}),
    })
    .then(response => {
      if (response.ok) {
        setError('');
        setRoomName('');
        setSelectedDevice('');
        fetchRooms();
      } else {
        throw new Error('Failed to create room.');
      }
    })
    .catch(error => console.error('Error creating room:', error));
  };

  return (
    <div>
      <h2>Room Management</h2>
      <div>
        <h3>Create Room</h3>
        <div>
          <input type="text" value={room_name} onChange={e => setRoomName(e.target.value)} placeholder="Room Name" />
          <select value={selectedDevice} onChange={e => setSelectedDevice(e.target.value)}>
            <option value="">Select Device</option>
            {devices.map(device => (
              <option key={device._id} value={device._id}>{device._id}</option>
            ))}
          </select>
          <button onClick={handleCreateRoom}>Create Room</button>
          {error && <p>{error}</p>}
        </div>
      </div>
      <div>
        <h3>Rooms</h3>
        <ul>
          {rooms.map(room => (
            <li key={room._id}>
              <strong>{room.room_name}</strong> - Device: {room.device_id}{room.device_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RoomManagement;
