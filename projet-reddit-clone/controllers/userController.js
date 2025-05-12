// controllers/UserController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async (req, res) => {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    try {
      const userId = await User.create(username, email, passwordHash, 'user');
      const token = jwt.sign({ id: userId }, 'secretkey', { expiresIn: '1h' });
      res.status(201).json({ message: 'User created', token });
    } catch (err) {
      res.status(500).json({ message: 'Error creating user', error: err });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  },

  getUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.getById(userId);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user', error: err });
    }
  }
};
