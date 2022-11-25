const mongoose = require('mongoose');

const { Schema } = mongoose;

const VehicleSchema = new Schema({
  vehicleNo: { type: String, required: true, trim: true },
  driver: { type: String, trim: true },
  vehicleType: { type: String, trim: true },
  vehicleColor: { type: String, trim: true },
  driverContact: { type: String, trim: true },
  capacity: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {type: String, trim: true, default: ''},
  updatedBy: {type: String, trim: true, default: ''}
});

VehicleSchema.index({ vehicleNo: 1 }, { unique: true })

module.exports = mongoose.model(collConfig.vehicle.name, VehicleSchema, collConfig.vehicle.name);
