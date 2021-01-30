const express = require('express');
const router = express.Router();
const ruleValidationCheckup = require('../controller/rule-validation');
const validateFlutterRule = require('../controller/validateFlutterRule');

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
        const validatedData = await ruleValidationCheckup.validate(data);

        // checking if a validation error exist or not
        if(validatedData.error === null || validatedData.error === undefined) {

            const validData = validatedData.value;

            const ruleValidationResult = validateFlutterRule()

            return res.status(200).send({
                message: `field ${validData.rule.field} successfully validated.`,
                status: "success",
                data: {
                    validation: {
                        error: "false",
                        field: validData.rule.field,
                        field_value: validData.data.missions,
                        condition: validData.rule.condition,
                        condition_value: validData.rule.condition_value
                    }
                }
            })
        } else {
            const error = result.error.details[0].message;
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
