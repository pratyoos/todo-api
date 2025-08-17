import { ENV } from "../config/env.js"

import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

// jwt generator function
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    ENV.JWT_SECRET,
    { expiresIn: '16d' }
  );
};

// user registeration controller
export const registerUser = async (req, res) => {
  console.log("Register endpoint hit");
  console.log("Request Body:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Missing username or password");
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    const userExists = await User.findOne({ username });
    console.log("Checking if user exists:", !!userExists);

    if (userExists) {
      console.log("Username already taken");
      return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.create({ username, password });
    console.log("User created:", user);

    const token = generateToken(user);
    console.log("JWT Token:", token);

    res.status(201).json({
      id: user._id,
      username: user.username,
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
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
