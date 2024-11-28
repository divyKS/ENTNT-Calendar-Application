require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

const app = express();
connectDB();
const PORT = process.env.PORT || 3500;

app.use(express.json());


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
