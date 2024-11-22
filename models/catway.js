const mongoose = require('mongoose');

// schema pour Catway
const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  catwayState: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('catways', catwaySchema)