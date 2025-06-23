// // index.js
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import authRoutes from './routes/auth.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');




dotenv.config();
require('dotenv').config();


const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // Allow frontend
app.use(express.json());
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));