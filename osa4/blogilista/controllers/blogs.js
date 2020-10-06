const blogsRouter = require('express').Router()
const { response, request } = require('express')
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const app = require('../app')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title || null , 
    author: request.body.author,
    url: request.body.url || null ,
    likes: request.body.likes || 0
  })

  if (!blog.url && !blog.title) {
    response.status(400).send()
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  blogToDelete.remove()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = new Blog({
    title: request.body.title, 
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  })
  
  await Blog.findByIdAndUpdate(request.params.id, blog)
  response.status(200)
})

module.exports = blogsRouter