
import  Router  from 'express';
const router = Router();
import { loginCustomer } from '../controllers/authController.mjs';


router.post('/customer', loginCustomer);

export default router;
