import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

let component
const mockUpdate = jest.fn()

const fakeUser = [
  {
    username: 'root',
    name: 'Superuser',
    blogs: [],
    id: '123123'
  }
]

const blog = {
  title: 'Test title',
  author: 'superuser',
  url: 'www.testing.com',
  likes: 0,
  user: fakeUser
}

beforeEach(() => {
  component = render(
    <Blog blog={blog} updateBlog={mockUpdate} />
  )
})

describe('renders content on load', () => {
  test('renders content with text of title and author', () => {
    const element = component.getByText('Test title by superuser')
    const urlElement = component.queryByText('www.testing.com')
    expect(element).toBeDefined()
    expect(urlElement).toBeNull()
  })

  test('has button rendered with content', () => {
    const button = component.getByText('view')
    expect(button).toBeDefined()
  })
})

describe('button clicks', () => {
  test('clicking view button shows details', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const element = component.getByText('Test title by superuser')
    const urlElement = component.getByText('www.testing.com')
    const likeElement = component.getByText('Likes: 0')
    expect(element).toBeDefined()
    expect(urlElement).toBeDefined()
    expect(likeElement).toBeDefined()
  })

  test('clicking like button calls updateBlog once and update like value', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)

    const likeElement = component.getByText('Likes: 1')
    expect(likeElement).toBeDefined()
    expect(mockUpdate.mock.calls).toHaveLength(1)
  })
})