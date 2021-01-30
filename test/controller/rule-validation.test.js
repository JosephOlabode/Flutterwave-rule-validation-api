const ruleValidation = require('../../controller/rule-validation');

describe('Validate Rule base On Condition', () => {
    let fieldValue;
    let condition;
    let conditionValue;

    it('should return a verification object with valid property equal true and message equal Properly validated', () => {
        fieldValue = 45;
        condition = 'gte';
        conditionValue = 30;

        const result = ruleValidation.validateFlutterRule(condition, conditionValue, fieldValue);
        expect(result).toMatchObject({
            valid: true,
            message: 'Properly validated'
        })
    });

    it('should return a verification object with valid property equal false and message equal Properly validated', () => {
        fieldValue = 30;
        condition = 'gte';
        conditionValue = 45;

        const result = ruleValidation.validateFlutterRule(condition, conditionValue, fieldValue);
        expect(result).toMatchObject({
            valid: false,
            message: 'Properly validated'
        })
    });

    it('should return a verification object with valid property equal false and message equal Unknown condition', () => {
        fieldValue = 30;
        condition = 'gteee';
        conditionValue = 45;

        const result = ruleValidation.validateFlutterRule(condition, conditionValue, fieldValue);
        expect(result).toMatchObject({
            valid: false,
            message: 'Unknown Condition'
        })
    })
})