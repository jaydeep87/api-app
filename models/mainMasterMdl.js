const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: { type: String, required: true, lowercase: true, trim: true },
  masterType:{type: String, required: true, lowercase: true},
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {type: String, trim: true, default: ''},
  updatedBy: {type: String, trim: true, default: ''}
});

RoleSchema.index({ name: 1, masterType:1 }, { unique: true })

module.exports = mongoose.model(collConfig.role.name, RoleSchema, collConfig.role.name);
