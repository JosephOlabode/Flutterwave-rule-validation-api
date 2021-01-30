const Joi = require('joi');
/*{
  "rule": {
    "field": "missions",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}*/

// breaking down the input object into smaller chunks for
// easy validation before combining them together as a whole


// validating the rule object
const ruleSchema = Joi.object().keys({
    field: Joi.alternatives().try(Joi.string()).required(),
    condition: Joi.string().valid('eq', 'neq', 'gt', 'gte', 'contains').required(),
    condition_value: Joi.alternatives().try(Joi.number(), Joi.string()).required()
}).required();


// validating the data object
const dataSchema = Joi.alternatives().try(
    Joi.object({
        name: Joi.string().required(),
        crew: Joi.string().required(),
        age: Joi.number().required(),
        position: Joi.string().required(),
        missions: Joi.alternatives().try(Joi.number(), Joi.object()).required()
    }),

    Joi.array().items(
        /*Joi.object({
            name: Joi.string().required(),
            crew: Joi.string().required(),
            age: Joi.number().required(),
            position: Joi.string().required(),
            missions: Joi.alternatives().try(Joi.number(), Joi.object()).required()
        })*/
    ),

    Joi.string()
).required();


// combining the validations into one single validation rule
const ruleValidation = Joi.object().keys({
    rule: ruleSchema,
    data: dataSchema,
});


function validateFlutterRule(condition, conditionValue, fieldValue) {
    let verification = {
        valid: false,
        message: ''
    }

    // setting up proper return message
    const checked = "Properly validated";
    const notChecked = "The rule was not validated due to unknown condition"

    switch (condition) {
        case 'eq':
            verification.valid = fieldValue === conditionValue;
            verification.message = checked;
            break;
        case 'neq':
            verification.valid = fieldValue !== conditionValue;
            verification.message = checked;
            break;
        case 'gt':
            verification.valid = fieldValue > conditionValue;
            verification.message = checked;
            break;
        case 'gte':
            verification.valid = fieldValue >= conditionValue;
            verification.message = checked;
            break;
        case 'contains':
            verification.valid = fieldValue % conditionValue === 0;
            verification.message = checked;
            break;
        default:
            verification.message = notChecked;
            break;
    }
    return verification;
}

module.exports = {
    ruleValidation,
    validateFlutterRule
};
