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
    field: Joi.object().max(2).required(),
    condition: Joi.string().valid('eq', 'neq', 'gt', 'gte', 'contains').required(),
    condition_value: Joi.number().required()
});


// validating the data object
const dataSchema = Joi.alternatives().try(
    Joi.object({
        name: Joi.string().required(),
        crew: Joi.string().required(),
        age: Joi.number().required(),
        position: Joi.string().required(),
        missions: Joi.string().required()
    }),

    Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            crew: Joi.string().required(),
            age: Joi.number().required(),
            position: Joi.string().required(),
            missions: Joi.string().required()
        })
    ),

    Joi.string()
);


// combining the validations into one single validation rule
const rule_validation = Joi.object().keys({
    rule: ruleSchema,
    data: dataSchema,
});


module.exports = rule_validation;
