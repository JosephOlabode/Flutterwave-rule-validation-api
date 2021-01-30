const ruleValidation = require('../../routes/rule-validation');
const supertest = require('supertest');
let server;
let request;

describe('rule validation routes', () => {
    beforeEach(() => {
        server = require('../../server');
        request = supertest(server);
    });
    afterEach(async () => {
        await server.close();
    });

    describe('GET /', () => {
        it('should return my required profile', async () => {
            const res = await request.get('/');
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
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
    });

    describe('POST /validate-rule', () => {
        it('should return success with a message field missions successfully validated.', async () => {
            const data = {
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
            }
            const res = await request.post(`/validate-rule`).send(data);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe(`field ${data.rule.field} successfully validated.`);
            expect(res.body.data).toMatchObject({
                validation: {
                    error: "false",
                    field: data.rule.field,
                    field_value: data.data.missions,
                    condition: data.rule.condition,
                    condition_value: data.rule.condition_value
                }
            })
        });

        it('should return success with a message field missions.count successfully validated.', async () => {
            const data = {
                "rule": {
                    "field": "missions.count",
                    "condition": "gte",
                    "condition_value": 30
                },
                "data": {
                    "name": "James Holden",
                    "crew": "Rocinante",
                    "age": 34,
                    "position": "Captain",
                    "missions": {
                        "count": 45,
                        "successful": 44,
                        "failed": 1
                    }
                }
            }

            const res = await request.post(`/validate-rule`).send(data);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe(`field ${data.rule.field} successfully validated.`);
            expect(res.body.data).toMatchObject({
                validation: {
                    error: "false",
                    field: data.rule.field,
                    field_value: data.data.missions.count,
                    condition: data.rule.condition,
                    condition_value: data.rule.condition_value
                }
            })
        });

        it('should return success with a message field 0 failed validation.', async () => {
            const data = {
                "rule": {
                    "field": "0",
                    "condition": "eq",
                    "condition_value": "a"
                },
                "data": "damien-marley"
            }

            const res = await request.post(`/validate-rule`).send(data);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(`field ${data.rule.field} failed validation.`);
            expect(res.body.data).toMatchObject({
                validation: {
                    error: "true",
                    field: data.rule.field,
                    field_value: data.data[parseInt(data.rule.field)],
                    condition: data.rule.condition,
                    condition_value: data.rule.condition_value
                }
            })
        });
    })
})