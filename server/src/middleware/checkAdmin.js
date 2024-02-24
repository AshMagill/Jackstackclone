const Admin = require("../models/Admin");

const checkAdmin = async (req, res, next) => {
  try {
    // Get user from database
    const admin = await Admin.findById(req.user);

    // Check if user exists and is admin
    if (!admin) {
      return res.status(403).json({ msg: "Authorization denied" });
    }

    // Continue to next middleware
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json({ msg: "Authorization denied" });
  }
};

module.exports = checkAdmin;
