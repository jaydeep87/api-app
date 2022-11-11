const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassSchema = new Schema({
  name: { type: String, required: true, trim: true },
  classTeacher: { type: mongoose.Schema.Types.Mixed, default: {}},
  voiceClassTeacher: { type: mongoose.Schema.Types.Mixed, default: {} },
  minStudent: { type: Number, default: 0 },
  maxStudent: { type: Number, default: 0},
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {type: String, trim: true, default: ''},
  updatedBy: {type: String, trim: true, default: ''}
});

ClassSchema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model(collConfig.class.name, ClassSchema, collConfig.class.name);
