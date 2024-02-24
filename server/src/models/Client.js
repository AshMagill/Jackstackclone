const mongoose = require("mongoose");

// TODO - work out what is required
const ClientSchema = new mongoose.Schema({
  client_name: {
    type: String,
    maxlength: 255,
  },
  client_email: {
    type: String,
    maxlength: 255,
    required: true,
    unique: true,
  },
  client_password: {
    type: String,
    maxlength: 255,
  },
  client_phone: {
    type: String,
    maxlength: 255,
  },
  stripe_account_id: {
    type: String,
    maxlength: 255,
  },
  details_submitted: {
    type: Boolean,
    default: false,
  },
  charges_enabled: {
    type: Boolean,
    default: false,
  },
  payouts_enabled: {
    type: Boolean,
    default: false,
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
  client_country: {
    type: String,
    maxlength: 255,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
