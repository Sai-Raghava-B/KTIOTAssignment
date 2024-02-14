

import  jwt from 'jsonwebtoken';
import  Customer  from '../models/Customer.mjs';

export async function loginCustomer(req, res) {
  try {
    const {  email, password } = req.body;
    // console.log(email)
    const customer = await Customer.findOne({  email  });
    // console.log(customer)
    // console.log(customer.email)
    // console.log(customer.password)
    if (!customer) {
      return res.status(401).json({ message: 'Invalid username or email or password' });
    }
    const isPasswordValid = (password === customer.password);
    // console.log(password)
    // console.log(customer.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or email or password' });
    }
    const token = jwt.sign({ userId: customer._id }, 'secretkey'); 
    res.json({ token });
    // console.log(token)
  } catch (error) {
    console.error('Error logging in customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

