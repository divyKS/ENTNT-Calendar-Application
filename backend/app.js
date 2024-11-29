require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
var cors = require('cors')
 
const app = express();

const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')

connectDB();
const PORT = process.env.PORT || 3500;

app.use(cors())
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
