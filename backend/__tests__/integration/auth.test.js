
const request = require('supertest')
const app = require('../../src/app')
const factory = require('../factory')

const truncate = require('../utils/truncate')

describe('Authenticate user methods', () => {

    beforeEach( async () => {
        await truncate()
    })

    it('should auth with valid credentials', async () => {

        const user = await factory.create('User', {
            password_req: 'teste123'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: 'teste123'
            })
        
        console.log(response)
        
        expect(response.status).toBe(200)
    })

    it('should auth with invalid credentials', async () => {

        const user = await factory.create('User')

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })
        
        expect(response.status).toBe(401)
    })

    it('should receive jwt token', async () => {

        const user = await factory.create('User', {
            password_req: 'teste123'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: 'teste123'
            })
        
        expect(response.body).toHaveProperty('token')
    })

    it('should access private routes when have token', async () => {

        const user = await factory.create('User', {
            password_req: 'teste123'
        })

        const response = await request(app)
            .get('/documents')
            .set('Authorization', `Bearer ${user.generateTokenUser()}`)
        
        expect(response.status).toBe(200)
    })

    it('should block route private when dont have token', async () => {

        const user = await factory.create('User', {
            password_req: 'teste123'
        })

        const response = await request(app)
            .get('/documents')

        expect(response.status).toBe(401)
    })

    it('should block route private when have invalid token', async () => {

        const user = await factory.create('User', {
            password_req: 'teste123'
        })

        const response = await request(app)
            .get('/documents')
            .set('Authorization', 'Bearer 123456')
        
        expect(response.status).toBe(401)
    })
})