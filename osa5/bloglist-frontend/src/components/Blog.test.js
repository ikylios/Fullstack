import React  from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
//import { prettyDom } from '@testing-library/dom'
import Blog from './Blog'

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

