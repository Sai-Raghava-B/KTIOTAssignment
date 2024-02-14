

import  Router  from 'express';
const router = Router();
import { registerCustomer, createDevice, getAllDevices, assignDevice, getAllCustomers, getStateOfDevices, getUnAllocattedDevices } from '../controllers/adminController.mjs';


router.post('/register', registerCustomer);
router.post('/devices', createDevice);
router.put('/assigndevice/:deviceId', assignDevice);
router.get('/devices', getAllDevices);
router.get('/unalldevices', getUnAllocattedDevices);
router.get('/customers', getAllCustomers);
router.get('/stateofdevices', getStateOfDevices);



export default router;
