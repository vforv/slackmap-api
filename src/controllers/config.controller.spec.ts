import * as chai from 'chai';
import { app } from "../app/app";
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

describe('ConfigController', () => {
    let agent;
    before(()=>{
        agent = chai.request.agent(app.listen());
    })

    describe(`GET /api/v2/config`, () => {
        it('should return app config', async () => {
            expect(true).to.be.true
            let res = await agent.get('/api/v2/config')

            expect(res).to.have.status(200);
            expect(res).to.have.property('body');
            expect(res.body).to.have.all.keys(['domain', 'facebook_app_id', 'facebook_scope']);
        });
        
    });

    describe(`POST /api/v2/config`, () => {
        it('should have validation error', async () => {

            await agent
                .post('/api/v2/config')
                .then(res=>{
                    expect(res).to.not.exist
                },res=>{
                    expect(res).to.have.status(400);
                    expect(res.response.body).to.have.property('name').and.to.equal('ValidateError');
                    expect(res.response.body).to.have.property('fields');
                    expect(res.response.body).to.have.any.keys('fields', 'message', 'name');
                })
                
        });
    });

    after(()=>{
        agent.app.close()
    })
});
    
    