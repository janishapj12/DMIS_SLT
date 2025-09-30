const AuditLog = require("../models/Aditlog");

const auditLogger = async (userId, action, details, req) => {
  try {
    await AuditLog.create({
      userId,
      action,
      details,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });
  } catch (err) {
    console.error("Audit log error:", err.message);
  }
};

module.exports = auditLogger;
