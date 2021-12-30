const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)
const Blog = require('../models/blog')
let server;

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 17,
  },
  {
    title: "React other patterns",
    author: "Michael Chan",
    url: "https://patternreacts.com/",
    likes: 2,
  },
]

beforeAll(() => {
  //get application to manually bound to a port so we can close connections manually
  server = app.listen(4000, (err) => {
    if (err) return err;
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

afterAll(() => {
  server.close();
  mongoose.connection.close()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Why What When How',
    author: 'Samuel Chan',
    url: 'https://whywhatwhenhow.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('Why What When How')
})

describe('missing content', () => {

  test('blog without title will not be added', async () => {
    const newBlog = {
      author: 'Samuel Chan',
      url: 'https://whywhatwhenhow.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length);
  })

  test('blog without author will not be added', async () => {
    const newBlog = {
      title: 'Why What When How',
      url: 'https://whywhatwhenhow.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length);
  })

  test('blog without url will not be added', async () => {
    const newBlog = {
      title: 'Why What When How',
      author: 'Samuel Chan',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length);
  })

  test('blog without likes will still be added', async () => {
    const newBlog = {
      title: 'Why What When How',
      author: 'Samuel Chan',
      url: 'https://whywhatwhenhow.com'
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('Why What When How')
  })
})