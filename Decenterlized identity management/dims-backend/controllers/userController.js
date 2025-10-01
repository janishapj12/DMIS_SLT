const { registerOnChain, updateOnChain, getUserFromChain } = require("../services/blockchainService");
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { createLog } = require("./auditLogController");
const Web3 = require("web3");
const web3 = new Web3();
const { ethers } = require("ethers");
// Helper to get real client IP
const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ---------------- Register ----------------
exports.registerUser = async (req, res) => {
  const { username, email, full_name, password, walletAddress } = req.body;

  try {
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : "";

    const user = new User({ username, email, full_name, password: hashedPassword, walletAddress });
    await user.save();

    try {
      await registerOnChain(walletAddress, username, email, full_name, "user");
    } catch (chainErr) {
      console.error("Blockchain registration failed:", chainErr.message);
    }

    await createLog({
      action: "USER_REGISTER",
      type: "auth",
      userId: user._id,
      description: `${user.username} registered`,
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"] || "",
    });

    res.status(201).json({ success: true, message: "User created successfully", data: { user } });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};




// ---------------- Login ----------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    await createLog({
      action: "USER_LOGIN",
      type: "auth",
      userId: user._id,
      description: `${user.username} logged in`,
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"] || "",
    });

    res.status(200).json({ success: true, data: { token: generateToken(user), user } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get all users (admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    await createLog({
      action: "GET_USERS",
      type: "access",
      userId: req.user._id,
      description: `${req.user.username} fetched all users`,
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"] || "",
    });

    res.json({ success: true, data: { users } });

  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await createLog({
      action: "GET_USER",
      type: "access",
      userId: req.user._id,
      description: `${req.user.username} fetched user ${req.params.id}`,
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"] || "",
    });

    res.json({ success: true, data: { user } });

  } catch (err) {
    console.error("getUserById error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update user

exports.updateUser = async (req, res) => {
  try {
    const { username, full_name, email, role, walletAddress } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, full_name, email, role, walletAddress },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    try {
      await updateOnChain(walletAddress, username, email, full_name, role);
    } catch (chainErr) {
      console.error("Blockchain update failed:", chainErr.message);
    }

    await createLog({
      action: "USER_UPDATE",
      type: "profile",
      userId: user._id,
      description: `${user.username} updated profile`,
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"] || "",
    });

    res.status(200).json({ success: true, data: { user } });
  } catch (err) {
    console.error("UpdateUser error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};




// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await createLog({
      action: "USER_DELETE",
      type: "profile",
      userId: user._id,
      description: `${user.username} deleted`,
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"] || "",
    });

    res.status(200).json({ success: true, data: { message: 'User deleted successfully' } });

  } catch (err) {
    console.error("DeleteUser error:", err);
    res.status(500).json({ message: err.message });
  }
};


// ---------------- MetaMask Login ----------------
exports.metamaskLogin = async (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) return res.status(400).json({ success: false, message: "Wallet address required" });

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = new User({
        username: walletAddress,
        email: `${walletAddress}@metamask.com`,
        full_name: walletAddress,
        role: "user",
        walletAddress,
      });
      await user.save();

      try {
        await registerOnChain(walletAddress, user.username, user.email, user.full_name, "user");
      } catch (chainErr) {
        console.error("Blockchain registration failed:", chainErr.message);
      }
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      data: { token, user: { id: user._id, username: user.username, role: user.role, walletAddress } },
    });
  } catch (err) {
    console.error("MetaMask login error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getChainUser = async (req, res) => {
  try {
    const walletAddress = req.query.walletAddress;

    if (!walletAddress) {
      return res.status(400).json({ success: false, message: "Wallet address required" });
    }

    // Validate Ethereum address
    if (!ethers.utils.isAddress(walletAddress)) {
      return res.status(400).json({ success: false, message: "Invalid Ethereum address" });
    }

    const chainUser = await getUserFromChain(walletAddress);

    await createLog({
      action: "GET_CHAIN_USER",
      type: "access",
      userId: req.user?._id || null,
      description: `Fetched on-chain user data for ${walletAddress}`,
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"] || "",
    });

    res.status(200).json({ success: true, data: { chainUser } });
  } catch (err) {
    console.error("getChainUser error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};