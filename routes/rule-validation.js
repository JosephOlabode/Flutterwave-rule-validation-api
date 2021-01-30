const express = require('express');
const router = express.Router();
const ruleValidationController= require('../controller/rule-validation');

router.get('/', (req, res, next) => {
    return res.status(200).send({
        message: "My Rule-Validation API",
        status: "success",
        data: {
            name: "Olabode Joseph Oluwaseun",
            github: "@JosephOlabode",
            email: "josepholabode14@gmail.com",
            mobile: "08133394656",
            twitter: "@JosephOlabode14"
        }
    })
});

router.post('/validate-rule', async (req, res, next) => {
    const data = req.body;
    try {
        const validatedData = await ruleValidationController.ruleValidation.validate(data);

        // checking if a validation error exist or not
        if(validatedData.error === null || validatedData.error === undefined) {

            const validData = validatedData.value;

            const condition = validData.rule.condition;
            const conditionValue = validData.rule.condition_value;
            const field = validData.rule.field;
            const fieldValue = eval('validData.data'+ '.' + field); // using the eval function to enable passing of dynamic field variable name

            const ruleValidationResult = ruleValidationController.validateFlutterRule(condition, conditionValue, fieldValue);

            if(ruleValidationResult.valid && ruleValidationResult.message === 'Properly validated') {
                return res.status(200).send({
                    message: `field ${field} successfully validated.`,
                    status: "success",
                    data: {
                        validation: {
                            error: "false",
                            field: field,
                            field_value: fieldValue,
                            condition: condition,
                            condition_value: conditionValue
                        }
                    }
                })
            } else if(ruleValidationResult.valid === false && ruleValidationResult.message === 'Properly validated') {
                return res.status(200).send({
                    message: `field ${field} failed validation.`,
                    status: "error",
                    data: {
                        validation: {
                            error: "true",
                            field: field,
                            field_value: fieldValue,
                            condition: condition,
                            condition_value: conditionValue
                        }
                    }
                })
            } else {
                return res.status(200).send({
                    message: `${ruleValidationResult.message}.`,
                    status: "error",
                    data: null
                })
            }

        } else {
            const error = validatedData.error.details[0].message;
            const errorMessage = error.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
            return res.status(400).send({
                message:  errorMessage + '.',
                status: "error",
                data: null
            })
        }

    } catch (err) {
        // this log any 500 internal server error into the Error log file for later
        // consideration by the admin, code located in the middleware folder
        next(err)
    }
})

module.exports = router;
