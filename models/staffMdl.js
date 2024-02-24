const mongoose = require('mongoose');

const { Schema } = mongoose;

const StaffSchema = new Schema({
  name: { type: String, required: true, trim: true },
  nickName: { type: String,  trim: true, default: '' },
  profession: { type: String,  trim: true, default: '' },
  uid: { type: String,  required:true, trim: true, unique:true },
  dob: { type: String, required: true, trim: true,  default: ''},
  gender: { type: String, trim: true, default: '' },
  address: { type: String, trim: true, default: '' },
  fatherName: { type: String, required: true, trim: true,  default: '' },
  motherName: { type: String, trim: true,  default: '' },
  city: { type: String, trim: true, default: '' },
  district: { type: String, trim: true, default: '' },
  state: { type: String, trim: true, default: '' },
  postalCode: { type: String, trim: true, default: '' },
  country: { type: String, default: 'India' },
  mobile: { type: String, required: true,  default: ''},
  altMobile: { type: String,default: '' },
  profileImage: { type: String, trim: true, default: '' },
  email:  { type: String,default: '' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  educationExperience :{type:mongoose.Schema.Types.Mixed, default:{
    "education": "",
    "passingYear": "",
    "totalExperience": "",
    "relevantExperience": ""
  }},
  doj: { type: String, required: true, trim: true,  default: ''}
});

StaffSchema.index({ email: 1, mobile: 1 }, { unique: true })

module.exports = mongoose.model(collConfig.staff.name, StaffSchema, collConfig.staff.name);