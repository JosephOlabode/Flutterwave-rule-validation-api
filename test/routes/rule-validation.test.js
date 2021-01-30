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

    })
})