const mongoose = require('mongoose');

const TreeImageSchema = new mongoose.Schema({
  tuid: { type: String, required: true },
  images: [
    {
      url: String,
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('TreeImage', TreeImageSchema);
