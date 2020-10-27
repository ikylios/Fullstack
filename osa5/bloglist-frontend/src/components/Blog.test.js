import React  from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
//import { prettyDom } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

const userId = {
  username: 'username'
}

const emptyFunc = () => {
  return null
}

const blog = {
  title: 'testblog',
  author: 'tester',
  likes: 0,
  url: 'testurl',
  userId: userId,
}

const BlogThing =
    <Blog blog={blog} username={'username'} addLike={emptyFunc} deleteBlog={emptyFunc}/>


test('renders title and author and no url, likes', () => {
  const component = render(
    BlogThing
  )

  expect(component.container).toHaveTextContent('testblog')
  expect(component.container).toHaveTextContent('tester')
  expect(component.queryByText('testurl')).toBeNull()

})

test('renders url, likes when view button pushed', () => {
  const component = render(
    BlogThing
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('testurl')
  expect(component.container).toHaveTextContent('likes:0')

})

test('like button is pushed exactly twice', () => {
  const mockHandler = jest.fn()

  const BlogThingButton =
    <Blog blog={blog} username={'username'} addLike={mockHandler} deleteBlog={emptyFunc}/>

  const component = render(
    BlogThingButton
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  const likeButton = component.getByText('like!')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls.length).toBe(2)

})

test('blogform calls return when blog created', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleNewBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'mikke mekkilson' }
  })
  fireEvent.change(title, {
    target: { value: 'watch out for errors' }
  })
  fireEvent.change(url, {
    target: { value: 'errors.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('mikke mekkilson' )
  expect(createBlog.mock.calls[0][0].title).toBe('watch out for errors')
  expect(createBlog.mock.calls[0][0].url).toBe('errors.com')
})

