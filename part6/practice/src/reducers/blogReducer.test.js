import blogReducer from "./blogReducer"
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns new state with action NEW_BLOG', () => {
    const state = []
    const action = {
      type: 'NEW_BLOG',
      data: {
        title: 'test blog title',
        author: 'test author',
        url: 'www.testing.com',
        id: 1
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('returns new state with action LIKE_BLOG', () => {
    const state = [
      {
        title: 'the app state is in redux store',
        author: 'testuser',
        url: 'www.testurl.com',
        likes: 0,
        id: 1
      },
      {
        title: 'state changes are made with actions',
        author: 'testuser',
        url: 'www.testurl.com',
        likes: 1,
        id: 2
      }
    ]

    const action = {
      type: 'LIKE_BLOG',
      data: {
        id: 2
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      title: 'state changes are made with actions',
      author: 'testuser',
      url: 'www.testurl.com',
      likes: 2,
      id: 2
    })
  })
})