import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

let component

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
  user: fakeUser
}

beforeEach(() => {
  component = render(
    <Blog blog={blog} />
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

describe('button click', () => {
  test('clicking button calls event handler once', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    const element = component.getByText('Test title by superuser')
    const urlElement = component.getByText('www.testing.com')
    expect(element).toBeDefined()
    expect(urlElement).toBeDefined()
  })
})