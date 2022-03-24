const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// créer un modèle
const Students = mongoose.model("Students", studentSchema);

// exporter le modèle
module.exports = Students;
