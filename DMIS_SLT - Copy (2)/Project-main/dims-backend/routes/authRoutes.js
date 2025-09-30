const express = require('express');
const crypto = require('crypto');
const cbor = require('cbor');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // your fixed User model

const router = express.Router();

// In-memory challenge store (replace with Redis in production)
const challenges = new Map();

// Helpers
const generateRandomBytes = (len = 32) => crypto.randomBytes(len);
const base64url = (buffer) => buffer.toString('base64url');
const fromBase64url = (str) => Buffer.from(str, 'base64url');

// ---------------- Registration Begin ----------------
router.post('/register-begin', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });

    let user = await User.findOne({ email: username });
    if (!user) {
      // Create new user with username and email
      user = new User({
        username,
        email: username,
        bio: { email: username, credentials: [] }
      });
      await user.save();
    }

    const challenge = generateRandomBytes();
    const userId = generateRandomBytes(16);

    challenges.set(username, challenge);

    const options = {
      challenge: base64url(challenge),
      rp: { name: "Your App", id: "localhost" },
      user: { id: base64url(userId), name: username, displayName: username },
      pubKeyCredParams: [
        { alg: -7, type: "public-key" },
        { alg: -257, type: "public-key" }
      ],
      authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
      timeout: 60000,
      attestation: "direct"
    };

    res.json(options);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ---------------- Registration Complete ----------------
router.post('/register-complete', async (req, res) => {
  try {
    const { username, response } = req.body;
    const challenge = challenges.get(username);
    if (!challenge) return res.status(400).json({ error: 'Challenge not found' });

    challenges.delete(username);

    const user = await User.findOne({ email: username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.bio) user.bio = { email: username, credentials: [] };

    // Save credential safely
    user.bio.credentials.push({
      credentialId: response.credentialId || response.id,
      publicKey: response.publicKey || {},
      counter: 0,
      createdAt: new Date()
    });

    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ---------------- Authentication Complete ----------------
router.post('/authenticate-complete', async (req, res) => {
  try {
    const { username, response } = req.body;

    const user = await User.findOne({ email: username });
    if (!user || !user.bio || !user.bio.credentials.length) {
      return res.status(404).json({ error: 'No credentials found' });
    }

    const credential = user.bio.credentials.find(
      (cred) => cred.credentialId === response.credentialId
    );
    if (!credential) return res.status(404).json({ error: 'Credential not found' });

    // Increment counter
    credential.counter += 1;
    user.bio.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.json({ success: true, token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
