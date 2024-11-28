const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
    const { name, password } = req.body;

    try {
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Signup successful', userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error });
    }
};

const login = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Signin successful', token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error during signin', error });
    }
};

module.exports = { signup, login };
