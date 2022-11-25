const mongoose = require('mongoose');

const { Schema } = mongoose;

const MasterTypeSchema = new Schema({
  name: { type: String, required: true, lowercase:true, trim: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {type: String, trim: true, default: ''},
  updatedBy: {type: String, trim: true, default: ''}
});

MasterTypeSchema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model(collConfig.masterType.name, MasterTypeSchema, collConfig.masterType.name);
