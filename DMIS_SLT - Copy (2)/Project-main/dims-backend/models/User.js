const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  credentialId: { type: String, required: true, unique: true },
  publicKey: { type: mongoose.Schema.Types.Mixed, required: true },
  counter: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastUsed: { type: Date, default: Date.now }
});

const bioSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true },
  credentials: [credentialSchema],
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  full_name: { type: String },
  password: { type: String },
  walletAddress: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  bio: bioSchema // <-- Embedded directly
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
