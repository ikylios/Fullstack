const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = listHelper.initBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})



test('notes returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(listHelper.initBlogs.length)
})

test('adding valid blog works', async () => {
    const newBlog = {
        title: 'new',
        author: 'me',
        url: 'rlylongurl',
        likes: 3 
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

//    const contents = response.body.map(r => r.url)

    expect(response.body).toHaveLength(listHelper.initBlogs.length + 1)
})

// 4.9
test('id of blog is called id', async () => {
    const response = await api.get('/api/blogs')

    for (i = 0; i < response.body.length; i++) {
        expect(response.body[i].id).toBeDefined()
    }
})

afterAll(() => {
    mongoose.connection.close()
})
