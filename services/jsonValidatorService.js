
  //var Validator = require('jsonschema').Validator;
  var Ajv  = require('ajv');
  var ajv = new Ajv ({allErrors: true,format: 'full'});
  module.exports = {
    /**
     * @param req
     * @param res
     * @param defineSchema
     * @param inputJSON
     * @param callback
     */
    jvs: function (req, res, defineSchema, inputJSON, callback) {
      try{
        var valid = ajv.validate(defineSchema, inputJSON);
        if (!valid) console.log(ajv.errors);
        //console.log(ajv.errorsText());
        if (!valid && ajv.errors) {
          var errList = {};
          errList.status = 400;
          var errorList = [];
          if(ajv.errors.length){
            ajv.errors.forEach(function(element) {
              errorList.push(element.dataPath.substring(1) + ' ' + element.message);
            });
          }

          return res.json({
            sc : 400,
            sm: errorList.join(', ')
          });
        }
        else {
          return callback(null, inputJSON);
        }
      }
      catch(err)
      {
        return callback(err, null);
      }

    }
  };
