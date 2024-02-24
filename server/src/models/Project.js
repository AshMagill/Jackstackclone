const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 255,
  },
  description: {
    type: String,
    maxlength: 255,
  },
  website_url: {
    type: String,
    maxlength: 255,
  },
  imageData: {
    type: Buffer,
  },
  imageType: {
    type: String,
  },
  clientId: {
    type: String,
  },
  siteIsLive: {
    type: Boolean,
    default: false,
  },
  showcase: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
