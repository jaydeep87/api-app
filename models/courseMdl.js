const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  courseURL: { type: String, trim: true, default: '' },
  coursePeriod: { type: String, trim: true, default: '' },
  isActive: { type: Boolean, default: true },
  isPublish: { type: Boolean, default: true },
});

module.exports = mongoose.model(collConfig.course.name, CourseSchema, collConfig.course.name);
