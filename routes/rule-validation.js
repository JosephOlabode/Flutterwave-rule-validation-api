const express = require('express');
const router = express.Router();
const ruleValidation = require('../controller/rule-validation');

router.get('/', (req, res, next) => {
    return res.status(200).send({
        message: "My Rule-Validation API",
        status: "success",
        data: {
            name: "Olabode Joseph Oluwaseun",
            github: "@JosephOlabode",
            email: "josepholabode14@gmail.com",
            mobile: "08133394656",
            twitter: "@amosb"
        }
    })
});

router.post('/validate-rule', async (req, res, next) => {
    const data = req.body;
    try {
        const result = await ruleValidation.validate(data);

        // checking if a validation error exist or not
        if(result.error === null || result.error === undefined) {
            return res.status(200).send({
                message: "field [name of field] successfully validated.",
                status: "success",
                data: result
            })
        } else {
            return res.status(400).send({
                message: result.error.details[0].message,
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