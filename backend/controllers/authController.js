const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("📢 Registering user:", username, email); // ✅ Debug

    // Check if user exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);
    console.log("✅ User created:", user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📢 Login attempt:", email);

    const user = await findUserByEmail(email);
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log("✅ Token generated:", token);

    // Store token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Include user data in response
    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });

  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Logout function
const logout = (req, res) => {
  res.clearCookie('token');
  console.log("✅ User logged out");
  res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };
