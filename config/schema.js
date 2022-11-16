module.exports = {
  "user": {
    "signUp": {
      "type": "object",
      "properties": {
        "fName": {"type": "string", "minLength": 2, "maxLength": 30},
        "mName": {"type": "string", "minLength": 2, "maxLength": 30},
        "lName": {"type": "string", "minLength": 2, "maxLength": 30},
        "mobile": {"type": "string", "minLength": 10, "maxLength": 10},
        "email": {"type": "string", "minLength": 5, "maxLength": 35},
        "uid": {"type": "string", "minLength": 3, "maxLength": 5},
        "password": {"type": "string", "minLength": 5, "maxLength": 30},
        "confirmPassword": {"type": "string", "minLength": 5, "maxLength": 30}
      },
      "required": ["fName", "mobile", "password", "confirmPassword"]
    },
    "signIn": {
      "type": "object",
      "properties": {
        "emailOrMobile": {"type": "string", "description": "this is email or mobile", "minLength": 5, "maxLength": 35},
        "password": {"type": "string", "description": "this is password", "minLength": 3, "maxLength": 30}
      },
      "required": ["emailOrMobile", "password"]
    },
    "updatePersonalProfile": {
      "type": "object",
      "properties": {
        "fName": {"type": "string", "minLength": 2, "maxLength": 30},
        "mName": {"type": "string", "maxLength": 30},
        "lName": {"type": "string", "minLength": 2, "maxLength": 30},
        "fatherName": {"type": "string", "minLength": 2, "maxLength": 50},
        "mobile": {"type": "string", "minLength": 10, "maxLength": 10},
        "aadhaarNo": {"type": "string", "minLength": 12, "maxLength": 12},
        "directContact": {"type": "string", "minLength": 10, "maxLength": 10},
        "email": {"type": "string", "minLength": 5, "maxLength": 35},
        "birthDate": {"type": "string", "minLength": 10, "maxLength": 10},
        "marital": {"enum": ["married", "unmarried"]},
        "nationality": {"enum": ["indian", "nonIndian"]},
        "gender": {"enum": ["male", "female", "other"]}
      },
      "required": ["fName", "fatherName", "mobile", "gender"]
    },
    "updateContactProfile": {
      "type": "object",
      "properties": {
        "permanent": {
          "type": "object",
          "properties": {
            "address": {"type": "string", "minLength": 7, "maxLength": 300},
            "addressType": {"type": "string"},
            "fromDate": {"type": "string", "minLength": 10, "maxLength": 10},
            "toDate": {"type": "string", "minLength": 10, "maxLength": 10},
            "landlord": {"type": "string", "minLength": 2, "maxLength": 35},
            "policeStation": {"type": "string", "minLength": 2, "maxLength": 50},
            "mobile": {"type": "string", "minLength": 10, "maxLength": 10},
            "landline": {"type": "string", "maxLength": 12}
          },
          "required": ["address", "fromDate", "toDate", "landlord", "policeStation", "mobile"]
        },
        "current": {
          "properties": {
            "currentAddress": {"type": "string", "minLength": 7, "maxLength": 300},
            "addressType": {"type": "string"},
            "currentFromDate": {"type": "string", "minLength": 8, "maxLength": 10},
            "currentToDate": {"type": "string", "minLength": 8, "maxLength": 10},
            "currentLandlord": {"type": "string", "minLength": 2, "maxLength": 35},
            "currentPoliceStation": {"type": "string", "minLength": 2, "maxLength": 50},
            "currentMobile": {"type": "string", "minLength": 10, "maxLength": 10},
            "currentLandline": {"type": "string", "maxLength": 12}
          },
          "required": ["address", "fromDate", "toDate", "landlord", "policeStation", "mobile"]
        },
        "interMediate": {
          "properties": {
            "interMediateAddress": {"type": "string", "minLength": 7, "maxLength": 300},
            "addressType": {"type": "string"},
            "interMediateFromDate": {"type": "string", "minLength": 8, "maxLength": 10},
            "interMediateToDate": {"type": "string", "minLength": 8, "maxLength": 10},
            "interMediateLandlord": {"type": "string", "minLength": 2, "maxLength": 35},
            "interMediatePoliceStation": {"type": "string", "minLength": 2, "maxLength": 50},
            "interMediateMobile": {"type": "string", "minLength": 10, "maxLength": 10},
            "interMediateLandline": {"type": "string", "maxLength": 12}
          }
          //"required": ["interMediateAddress","interMediateFromDate", "interMediateToDate","interMediateLandlord","interMediatePoliceStation","interMediateMobile"]
        }
      },
      //"deepRequired": ["/permanent/permanentAddress","/permanent/permanentFromDate","/permanent/permanentToDate","/permanent/permanentLandlord","/permanent/permanentPoliceStation","/permanent/permanentAddress","/permanent/permanentMobile","/current/currentAddress","/current/currentFromDate","/current/currentToDate","/current/currentLandlord","/current/currentPoliceStation","/current/currentAddress","/current/currentMobile","/interMediate/interMediateAddress","/interMediate/interMediateFromDate","/interMediate/interMediateToDate","/interMediate/interMediateLandlord","/interMediate/interMediatePoliceStation","/interMediate/interMediateAddress","/interMediate/interMediateMobile"],
      "required": ["permanent", "current"]
    },
    "updateEducationDetails": {
      "type": "array",
      "items": [{
        "type": "object",
        "properties": {
          "course": {"type": "string", "minLength": 3, "maxLength": 150},
          "instituteOrCollege": {"type": "string", "minLength": 3, "maxLength": 150},
          "address": {"type": "string", "minLength": 7, "maxLength": 300},
          "universityName": {"type": "string", "minLength": 3, "maxLength": 100},
          "registrationNo": {"type": "string", "minLength": 3, "maxLength": 30},
          "passingMonthYear": {"type": "string", "minLength": 6, "maxLength": 30},
          "contactNo": {"type": "string", "maxLength": 30}
        },
        "required": ["instituteOrCollege", "address", "universityName", "registrationNo", "passingMonthYear", "contactNo"]
      }]
    },
    "updateEmploymentDetails": {
      "type": "object",
      "properties": {
        "employmentList": {"type": "array",
          "items": [{
            "type": "object",
            "properties": {
              "companyName":{"type": "string", "minLength": 3, "maxLength": 150},
              "companyAddressWithPin":{"type": "string", "minLength": 7, "maxLength": 300},
              "remuneration":{"type": "string", "minLength": 3, "maxLength": 9},
              "designation":{"type": "string", "minLength": 3, "maxLength": 100},
              "employeeId":{"type": "string", "minLength": 3, "maxLength": 50},
              "reasonForLeaving":{"type": "string", "minLength": 3, "maxLength": 150},
              "fromDate":{"type": "string", "minLength": 8, "maxLength": 10},
              "toDate":{"type": "string", "minLength": 8, "maxLength": 10},
              "hrName":{"type": "string", "minLength": 3, "maxLength": 150},
              "hrContact":{"type": "string", "maxLength": 30},
              "hrEmail":{"type": "string", "maxLength": 150},
              "supervisorName":{"type": "string", "maxLength": 50},
              "supervisorContact":{"type": "string", "maxLength": 30},
              "supervisorEmail":{"type": "string", "maxLength": 150}
            }
          }]
        },
        "canVerifyIn15Days": {"type": "string"},
        "dateForVerification": {"type": "string", "minLength": 8, "maxLength": 10},
        "isExperienced": {"type": "boolean"}
      },
      "required": ["employmentList", "canVerifyIn15Days", "dateForVerification", "isExperienced"]

    },
    "updateReferenceDetails": {
      "type": "array",
      "items": [{
        "type": "object",
        "properties": {
          "name": {"type": "string", "minLength": 3, "maxLength": 150},
          "contact": {"type": "string", "minLength": 10, "maxLength": 20},
          "email": {"type": "string", "minLength": 7, "maxLength": 100}
        },
        "required": ["name", "contact"]
      }]
    },
    "updateIdentityDetails": {
      "type": "array",
      "items": [{
        "type": "object",
        "properties": {
          "type": {"type": "string", "minLength": 3, "maxLength": 100},
          "number": {"type": "string", "minLength": 3, "maxLength": 30},
          "dateOfIssue": {"type": "string", "minLength": 8, "maxLength": 10},
          "dateOfExpiry": {"type": "string", "minLength": 8, "maxLength": 10},
          "placeOfIssue": {"type": "string", "minLength": 3, "maxLength": 100}
        },
        "required": ["type", "number","dateOfIssue","dateOfExpiry","placeOfIssue"]
      }]
    }
  },
  "student": {
    "addUpdate": {
      "type": "object",
      "properties": {
        "_id": {"type": "string"},
        "name": {"type": "string", "minLength": 2, "maxLength": 50},
        "nickName": {"type": "string", "minLength": 2, "maxLength": 50},
        "dob": {"type": "string", "minLength": 10, "maxLength": 10},
        "gender": {"type": "string"},
        "fatherName": {"type": "string", "minLength": 2, "maxLength": 50},
        "motherName": {"type": "string", "minLength": 2, "maxLength": 50},
        // "mName": {"type": "string", "minLength": 2, "maxLength": 30},
        // "lName": {"type": "string", "minLength": 2, "maxLength": 30},
        "mobile": {"type": "string", "minLength": 10, "maxLength": 10},
        "altMobile": {"type": "string", "minLength": 10, "maxLength": 10},
        "email": {"type": "string", "minLength": 5, "maxLength": 35},
        "address": {"type": "string", "minLength": 7, "maxLength": 50},
        "city": {"type": "string", "minLength": 2, "maxLength": 50},
        "district": {"type": "string", "minLength": 2, "maxLength": 50},
        "state": {"type": "string", "minLength": 2, "maxLength": 50},
        "postalCode": {"type": "string", "minLength": 6, "maxLength": 10},
        "profileImage": {"type": "string"},
        "country": {"type": "string", "minLength": 2, "maxLength": 50}
      },
      "required": ["name", "fatherName", "gender"]
    }
  },
  "teacher": {
    "addUpdate": {
      "type": "object",
      "properties": {
        "_id": {"type": "string"},
        "name": {"type": "string", "minLength": 3, "maxLength": 50},
        "nickName": {"type": "string", "minLength": 2, "maxLength": 50},
        "dob": {"type": "string", "minLength": 10, "maxLength": 10},
        "gender": {"type": "string"},
        "fatherName": {"type": "string", "minLength": 2, "maxLength": 50},
        "motherName": {"type": "string", "minLength": 2, "maxLength": 50},
        // "mName": {"type": "string", "minLength": 2, "maxLength": 30},
        // "lName": {"type": "string", "minLength": 2, "maxLength": 30},
        "mobile": {"type": "string", "minLength": 10, "maxLength": 10},
        "altMobile": {"type": "string", "minLength": 10, "maxLength": 10},
        "email": {"type": "string", "minLength": 5, "maxLength": 35},
        "address": {"type": "string", "minLength": 7, "maxLength": 50},
        "city": {"type": "string", "minLength": 2, "maxLength": 50},
        "district": {"type": "string", "minLength": 2, "maxLength": 50},
        "state": {"type": "string", "minLength": 2, "maxLength": 50},
        "postalCode": {"type": "string", "minLength": 6, "maxLength": 10},
        "profileImage": {"type": "string"},
        "country": {"type": "string", "minLength": 2, "maxLength": 50}
      },
      "required": ["name", "fatherName", "gender"]
    }
  },
  "attendance": {
    "addUpdate": {
      "type": "object",
      "properties": {
        "_id": {"type": "string"},
        "date": {"type": "string"},
        "class":{"type": "object"},
        "classTeacher":{"type": "object"},
        "presentsStudnet":{"type": "array",
        "items": [{
          "type": "object",
          "properties": {
            "_id": {"type": "string"},
            "name": {"type": "string"},
            "isPresent": {"type": "number"},
            "presentType": {"type": "number"}
          },
          "required": ["name", "isPresent"]
        }]},
      },
      "required": []
    }
  },
  "staff": {
    "addUpdate": {
      "type": "object",
      "properties": {
        "_id": {"type": "string"},
        "name": {"type": "string", "minLength": 3, "maxLength": 50},
        "nickName": {"type": "string", "minLength": 2, "maxLength": 50},
        "dob": {"type": "string", "minLength": 10, "maxLength": 10},
        "gender": {"type": "string"},
        "fatherName": {"type": "string", "minLength": 2, "maxLength": 50},
        "motherName": {"type": "string", "minLength": 2, "maxLength": 50},
        // "mName": {"type": "string", "minLength": 2, "maxLength": 30},
        // "lName": {"type": "string", "minLength": 2, "maxLength": 30},
        "mobile": {"type": "string", "minLength": 10, "maxLength": 10},
        "altMobile": {"type": "string", "minLength": 10, "maxLength": 10},
        "email": {"type": "string", "minLength": 5, "maxLength": 35},
        "address": {"type": "string", "minLength": 7, "maxLength": 50},
        "city": {"type": "string", "minLength": 2, "maxLength": 50},
        "district": {"type": "string", "minLength": 2, "maxLength": 50},
        "state": {"type": "string", "minLength": 2, "maxLength": 50},
        "postalCode": {"type": "string", "minLength": 6, "maxLength": 10},
        "profileImage": {"type": "string"},
        "country": {"type": "string", "minLength": 2, "maxLength": 50}
      },
      "required": ["name", "fatherName", "gender"]
    }
  },
  "class": {
    "addUpdate": {
      "type": "object",
      "properties": {
        "_id": {"type": "string"},
        "name": {"type": "string", "minLength": 2, "maxLength": 100},
        "classTeacher": { "type": "object"},
        "voiceClassTeacher": { "type": "object" },
        "minStudent": { "type": "number"},
        "maxStudent": { "type": "number"}
      },
      "required": ["name"]
    }
  },
  "master": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string", "minLength": 1, "maxLength": 10
      }
    },
    "required": ["name"]
  }
};
