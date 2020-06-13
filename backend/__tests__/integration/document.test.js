
const request = require('supertest')
const app = require('../../src/app')
const factory = require('../factory')

const { Document } = require('../../src/app/models')

const truncate = require('../utils/truncate')

describe('Documents methods', () => {

    beforeEach( async () => {
        await truncate()
    })

    it('should return the list of documents by valid user', async () => {

        const user = await factory.create('User', {
            password_req: 'teste123'
        })

        const document = await Document.create({
            id_user: user.id,
            path: '/path/test.pdf',
            size: 1000
        })

        const response = await request(app)
            .get('/documents')
            .set('Authorization', `Bearer ${user.generateTokenUser()}`)

        expect(response.body).toHaveProperty('documents')
    })


    it('should create a document for a valid user', async () => {

        const user = await factory.create('User', {
            password_req: 'teste123'
        })

        const response = await request(app)
            .post('/documents/store')
            .set('Authorization', `Bearer ${user.generateTokenUser()}`)
            .send({
                path: '/path/test.pdf'
            })

        expect(response.status).toBe(200)
    })

    it('should create a document for a ivalid user', async () => {

        const response = await request(app)
            .post('/documents/store')
            .set('Authorization', `Bearer 123456`)
            .send({
                path: '/path/test.pdf'
            })

        expect(response.status).toBe(401)
    })
    
})