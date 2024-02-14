

import Device from '../models/Device.mjs'; 



// Route to toggle the state of the light of a specific device
export async function toggleLightState(req, res) {
  try {
    const { state } = req.body;
    const deviceId = req.params.deviceId;
    // Find the device by ID and update the light state
    const updatedDevice = await Device.findByIdAndUpdate(deviceId, { 'state.light': state }, { new: true });
    res.json(updatedDevice);
  } catch (error) {
    console.error('Error toggling light state:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Route to toggle the state of the fan of a specific device
export async function toggleFanState(req, res) {
  try {
    const { state } = req.body;
    const deviceId = req.params.deviceId;
    // Find the device by ID and update the fan state
    const updatedDevice = await Device.findByIdAndUpdate(deviceId, { 'state.fan': state }, { new: true });
    res.json(updatedDevice);
  } catch (error) {
    console.error('Error toggling fan state:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Route to toggle the state of the miscellaneous load of a specific device
export async function toggleMiscLoadState(req, res) {
  try {
    const { state } = req.body;
    const deviceId = req.params.deviceId;
    // Find the device by ID and update the miscellaneous load state
    const updatedDevice = await Device.findByIdAndUpdate(deviceId, { 'state.mis': state }, { new: true });
    res.json(updatedDevice);
  } catch (error) {
    console.error('Error toggling miscellaneous load state:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


