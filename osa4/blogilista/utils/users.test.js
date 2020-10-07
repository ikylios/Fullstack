const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

const listWithManyUsers = [{ "username": "kayts1", "name": "ukko 1", "password": "salis1" }, { "username": "kayts3", "name": "ukko 3", "password": "salis3" }, { "username": "kayts4", "name": "ukko 4", "password": "salis4" }, { "username": "kayts5", "name": "ukko 5", "password": "salis5" }]


beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = listWithManyUsers 
    .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

// 4.16
describe('username and password basic requirements', () => {
    
    test.only('username exists', async () => {
        const newUser = { "name": "ukko 6", "password": "salis6" }
        await api
            .post(newUser)
            .expect(400)
        
        //const response = api.get('/api/users')
        
        //expect(response.body).toHaveLength(listWithManyUsers.length)
    })

    test('username has length of 3', () => {
        const result = listHelper.totalLikes(listWithZeroBlogs)
        expect(result).toBe(0) 
    })

    test('username is unique', () => {
        const result = listHelper.totalLikes(listWithZeroBlogs)
        expect(result).toBe(0) 
    })

})


afterAll(() => {
    mongoose.connection.close()
})