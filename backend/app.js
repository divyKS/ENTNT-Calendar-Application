require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
var cors = require('cors')
 
const app = express();

const userRouter = require('./routes/user')

connectDB();
const PORT = process.env.PORT || 3500;

app.use(cors())
app.use(express.json());

app.use('/api/user', userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
