const joi = require('joi');
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
const conditionArray = ['eq', 'neq', 'gt', 'gte', 'contains'];

const ruleSchema = joi.object().keys({
    field: joi.object().required(),
    condition: joi.array().items(joi.string()).required(),
    condition_value: joi.number().required()
});

const dataSchema = joi.object().keys({
    name: joi.string().required(),
    crew: joi.string().required(),
    age: joi.number().required(),
    position: joi.string().required(),
    missions: joi.string().required()
});


const rule_validation = joi.object().keys({
    rule: ruleSchema,
    data: dataSchema,
});



module.exports = rule_validation;
