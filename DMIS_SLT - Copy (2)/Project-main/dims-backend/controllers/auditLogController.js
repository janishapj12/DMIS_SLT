const AuditLog = require("../models/Aditlog");

// Get all audit logs (admin only)
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().populate("user", "username email role");
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new log
exports.createLog = async ({ action, type, userId, description, ipAddress, userAgent }) => {
  try {
    await AuditLog.create({
      action,
      type: type || "default",
      user: userId,
      description,
      ipAddress,
      userAgent,
    });
  } catch (err) {
    console.error("AuditLog save error:", err);
  }
};
