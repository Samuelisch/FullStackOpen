import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Blog from '../components/Blog'

const fakeUser = [
  {
    username: 'root',
    name: 'Superuser',
    blogs: [],
    id: '123123'
  }
]

describe('renders content on load', () => {
  test('renders content with text of title and author', () => {
    const blog = {
      title: 'Component loads',
      author: 'superuser',
      url: 'www.testing.com',
      user: fakeUser
    }

    const component = render(
      <Blog blog={blog} />
    )

    const element = component.getByText('Component loads by superuser')
    const urlElement = component.queryByText('www.testing.com')
    expect(element).toBeDefined()
    expect(urlElement).toBeNull()
  })

  test('has button rendered with content', () => {
    const blog = {
      title: 'Button check',
      author: 'superuser',
      url: 'www.testing.com',
      user: fakeUser
    }

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    expect(button).toBeDefined()
  })
})

describe('button click', () => {
  test('clicking button calls event handler once', () => {
    const blog = {
      title: 'Button click',
      author: 'superuser',
      url: 'www.test.com',
      user: fakeUser,
    }

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const element = component.getByText('Button click by superuser')
    const urlElement = component.getByText('www.test.com')
    expect(element).toBeDefined()
    expect(urlElement).toBeDefined()
  })
})