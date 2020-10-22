import React  from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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


test('renders title and author and no url, likes', () => {
  const component = render(
    <Blog blog={blog} username={'username'} addLike={emptyFunc} deleteBlog={emptyFunc}/>
  )

  expect(component.container).toHaveTextContent(
    'testblog'
  )

  expect(component.container).toHaveTextContent(
    'tester'
  )

  expect(component.queryByText('testurl')).toBeNull()

})