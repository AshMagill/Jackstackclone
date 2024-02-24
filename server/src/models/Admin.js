const mongoose = require("mongoose");

// TODO - work out what is required
const AdminSchema = new mongoose.Schema({
  admin_name: {
    type: String,
    maxlength: 255,
  },
  admin_email: {
    type: String,
    maxlength: 255,
    required: true,
    unique: true,
  },
  admin_password: {
    type: String,
    maxlength: 255,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
