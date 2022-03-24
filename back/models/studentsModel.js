const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: String,
});

// créer un modèle
const Students = mongoose.model("Students", studentSchema);

// exporter le modèle
module.exports = Students;
