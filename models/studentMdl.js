const mongoose = require('mongoose');

const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: { type: String, required: true, trim: true },
  nickName: { type: String,  trim: true, default: '' },
  dob: { type: String, required: true, trim: true,  default: ''},
  fatherName: { type: String, required: true, trim: true,  default: '' },
  motherName: { type: String, required: true, trim: true,  default: '' },
  gender: { type: String, trim: true, default: '' },
  address: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: '' },
  district: { type: String, trim: true, default: '' },
  state: { type: String, trim: true, default: '' },
  postalCode: { type: String, trim: true, default: '' },
  profileImage: { type: String, trim: true, default: '' },
  country: { type: String, default: 'India' },
  email:  { type: String,default: '' },
  mobile: { type: String, required: true,  default: ''},
  altMobile: { type: String,default: '' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  prevSchool :{type:mongoose.Schema.Types.Mixed, default:{
    "name": "",
    "reasonForLeaving": "",
    "completedClass": "",
    "passingYear": "",
    "address": "",
    "city": "",
    "district": "",
    "state": "",
    "postalCode": "",
    "country": "India",
    "contactNo": ""
  }},
  registrationDate: {type: Date, default: Date.now},
  classes:{type:mongoose.Schema.Types.Mixed, default:[]},
  currentClass:{type: mongoose.Schema.Types.Mixed, default:{ 
  "_id": "",
  "name": "",
  "classTeacher": "",
  "viceClassTeacher": "",
  "maxStudent": 0,
  "minStudent": 0}}
});

// StudentSchema.index({ name: 1, dob: 1 }, { unique: true })

module.exports = mongoose.model(collConfig.student.name, StudentSchema, collConfig.student.name);
