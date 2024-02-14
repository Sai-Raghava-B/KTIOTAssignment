// controllers/customerController.js

import Customer from '../models/Customer.mjs';
import Room from '../models/Room.mjs';
import Device from '../models/Device.mjs';

// controllers/customerController.js



export async function login(req, res) {
  try {
    const { username, password } = req.body;
    // Assuming you have authentication logic here
    // For simplicity, let's just send a success response
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllocatedDevices(req, res) {
  try {
    const userId = req.params.userId;
    const devices = await Device.find({ alloted_to_user: userId }); 
    res.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export async function showRoom(req, res) {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function createRoom(req, res) {
  try {
    
    const { user_id, room_name, device_id } = req.body;
    const room_id = generateRoomId();
    
    
    const newRoom = new Room({ room_id, user_id, room_name, device_id }); 
    await newRoom.save();
    res.status(201).json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
function generateRoomId() {
  return Math.random().toString(36)// Example of generating a random ID
}

export async function assignDeviceToRoom(req, res) {
  try {
    const { roomId, deviceId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    room.devices.push(deviceId);
    await room.save();
    res.status(200).json({ message: "Device assigned to room successfully", room });
  } catch (error) {
    console.error("Error assigning device to room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
// Add other controller methods as needed
