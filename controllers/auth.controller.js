import { ENV } from "../config/env.js"

import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

// jwt generator function
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    ENV.JWT_SECRET,
    { expiresIn: '' }
  );
};

// user registeration controller
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.create({ username, password });

    res.status(201).json({
      id: user._id,
      username: user.username,
      token: generateToken(user),
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// user login controller
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.json({
      id: user._id,
      username: user.username,
      token: generateToken(user),
    });
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
