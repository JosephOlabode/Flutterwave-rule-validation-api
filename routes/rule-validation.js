const express = require('express');
const router = express.Router();

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

router.post('/validate-rule', (req, res, next) => {
    const data = req.body;
    //check if the rule field is present
    if(data.rule == null) {

    }
    return res.status(200).send({
        message: "It is working oo thank God",
    })
})

module.exports = router;