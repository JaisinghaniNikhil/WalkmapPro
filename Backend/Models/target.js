const mongoose = require('mongoose');

const TargetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  stepTarget: { type: Number, required: true },
  calorieTarget: { type: Number, required: true },
}, { timestamps: true });


module.exports = mongoose.model('Target', TargetSchema);
