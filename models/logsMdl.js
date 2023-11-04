const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
    reqPayload: { type: mongoose.Schema.Types.Mixed, default: {} },
    err: { type: mongoose.Schema.Types.Mixed, default: {} },
    apiPath: { type: String },
    user: { type: String },
    logType: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model(collConfig.logs.name, LogSchema, collConfig.logs.name);