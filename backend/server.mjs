

import express from 'express';
import { connect } from 'mongoose';
import  json  from 'body-parser';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.mjs';
import customerRoutes from './routes/customerRoutes.mjs';
import deviceRoutes from './routes/deviceRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';

const app = express();


app.use(cors());
app.use(json());
app.use(express.json());

connect('mongodb+srv://bsairaghava:ZZ88lo5kbkrUtsPB@cluster0.hdv0eb0.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/devicetoggle', deviceRoutes);
app.use('/api/login', authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
