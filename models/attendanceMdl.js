const mongoose = require('mongoose');

const { Schema } = mongoose;

const AttendanceSchema = new Schema({
  date: { type: Date, default: Date.now },
  class: { type: mongoose.Schema.Types.Mixed, default: {}},
  classTeacher: { type: mongoose.Schema.Types.Mixed, default: {}},
  presentsStudent: { type: mongoose.Schema.Types.Mixed, default: [{}] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {type: String, trim: true, default: ''},
  updatedBy: {type: String, trim: true, default: ''}
});

AttendanceSchema.index({ "date": 1, "class.name":1 }, { unique: true })

module.exports = mongoose.model(collConfig.attendance.name, AttendanceSchema, collConfig.attendance.name);
