const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  ipfsHash: { type: String, required: true },
  uploadedBy: { type: String, required: true }, // wallet address
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Certificate", certificateSchema);
