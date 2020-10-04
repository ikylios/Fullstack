const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(4)
})

afterAll(() => {
    mongoose.connection.close()
})
