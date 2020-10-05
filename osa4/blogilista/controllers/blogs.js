const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog({
    title: request.body.title || null , 
    author: request.body.author,
    url: request.body.url || null ,
    likes: request.body.likes || 0
  })

  const empty = new Blog({}) 

  if (!blog.url && !blog.title) {
    response.status(400).send()
  } else {
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
    }
})

module.exports = blogsRouter