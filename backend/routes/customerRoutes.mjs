

import  Router  from 'express';
const router = Router();
import { login, getAllocatedDevices, createRoom, assignDeviceToRoom, showRoom } from '../controllers/customerController.mjs';

router.post('/login', login);
router.get('/devices/:userId', getAllocatedDevices);
router.post('/createrooms', createRoom);
router.get('/rooms', showRoom);
router.put('/rooms/:roomId/devices/:deviceId', assignDeviceToRoom);
router.get('devices/:userId', getAllocatedDevices);


export default router;
