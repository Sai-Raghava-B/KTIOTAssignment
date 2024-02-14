
import  verify  from 'jsonwebtoken';
import  findById  from '../models/Customer.mjs';

// Middleware to authenticate user
async function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = verify(token, 'secretkey');
    const user = await findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    console.log(userId)

    const userId = decoded.userId; 
    localStorage.setItem('userId', userId);
    console.log(userId)

    req.customerId = decoded.userId; 
    next(); 
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default authenticate;


