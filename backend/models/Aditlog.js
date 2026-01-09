const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true, // e.g., "USER_REGISTER", "USER_LOGIN", "GET_USER"
  },
  type: {
    type: String,
    default: "default", // auth, access, profile, security
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
