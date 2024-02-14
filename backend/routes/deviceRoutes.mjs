import  Router  from 'express';
import { toggleFanState, toggleLightState, toggleMiscLoadState } from '../controllers/deviceController.mjs';
const router = Router();

router.put('/:deviceId/light', toggleLightState);
router.put('/:deviceId/fan', toggleFanState);
router.put('/:deviceId/misc-load', toggleMiscLoadState);

export default router;