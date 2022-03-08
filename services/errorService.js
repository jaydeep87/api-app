function createError(statusCode, statusMessage) {
  const errObj = new Error(statusMessage);
  errObj.status = statusCode;
  return errObj;
}
module.exports.createError = createError;
