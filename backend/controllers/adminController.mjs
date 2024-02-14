
import Device from '../models/Device.mjs';
import Customer from '../models/Customer.mjs';

// Register a new customer
export async function registerCustomer(req, res) {
  try {
    const { username, password , email } = req.body;
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'email already exists' });
    }
    const newCustomer = new Customer({ username, password, email });
    await newCustomer.save();
    res.status(201).json({ message: 'Customer registered successfully' });
  } catch (error) {
    console.error('Error registering customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new IoT device
export async function createDevice(req, res) {
  try {
    const { state } = req.body;
    const device_id = generateDeviceId();
    const newDevice = new Device({ device_id, state });
    await newDevice.save();
    res.status(201).json({ message: 'Device created successfully', device: newDevice });
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

function generateDeviceId() {
  return Math.random().toString(36).substr(2, 9); // Example of generating a random ID
}
// Assign an unallocated device to a customer
export async function assignDevice(req, res) {
  const { deviceId } = req.params;
  const { customer } = req.body;
  // console.log(req.params)
  // console.log(deviceId)

  try {
    // Find the device by ID
    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    // Check if the device is already assigned
    if (device.alloted_to_user) {
      return res.status(400).json({ message: 'Device is already assigned to a user' });
    }

    // Find the customer by ID
    const user = await Customer.findById(customer);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assign the device to the customer
    device.alloted_to_user = customer;
    await device.save();

    res.status(200).json({ message: 'Device assigned successfully' });
  } catch (error) {
    console.error('Error assigning device:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get the state of all devices
export async function getAllDevices(req, res) {
  try {
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUnAllocattedDevices(req, res) {
  try {
    // Find devices that are not allocated to any user
    const unallocatedDevices = await Device.find({ alloted_to_user: null });
    res.json(unallocatedDevices);
  } catch (error) {
    console.error('Error fetching unallocated devices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export async function getAllCustomers(req, res) {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getStateOfDevices(req, res){
  try {
    // Query the database to retrieve the state of all devices
    const devices = await Device.find();
    const deviceStates = devices.map(device => ({
      deviceId: device._id,
      state: device.state
    }));
    res.json(deviceStates);
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

