const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let server;
let token;

beforeAll(() => {
  //get application to manually bound to a port so we can close connections manually
  server = app.listen(4000, (err) => {
    if (err) return err;
  })
})

beforeEach(async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'testuser'
  }

  await User.deleteMany({})
  await api.post('/api/users').send(newUser)
  const loginDetails = await api.post('/api/login').send(newUser)
  token = loginDetails.body.token

  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blog)
  }
})

describe('when there are blogs initially saved', () => {
  test("blogs are returned as json", async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific title can be obtained within returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain("React patterns")
  })
})

describe('addition of new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Why What When How',
      author: 'Samuel Chan',
      url: 'https://whywhatwhenhow.com',
      likes: 10,
    }
  
    await api
      .post('/api/blogs')
<<<<<<< HEAD
=======
      .set('Authorization', `bearer ${token}`)
>>>>>>> e4135ef (added authorization to tests, new tests to test token authorization, deleted list helper and list tests)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('Why What When How')
  })

  test('blog without title will not be added', async () => {
    const newBlog = {
      author: 'Samuel Chan',
      url: 'https://whywhatwhenhow.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  })

  test('blog without author will not be added', async () => {
    const newBlog = {
      title: 'Why What When How',
      url: 'https://whywhatwhenhow.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  })

  test('blog without url will not be added', async () => {
    const newBlog = {
      title: 'Why What When How',
      author: 'Samuel Chan',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  })

  test('blog without likes will still be added', async () => {
    const newBlog = {
      title: 'Why What When How',
      author: 'Samuel Chan',
      url: 'https://whywhatwhenhow.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('Why What When How')
  })

  test('blog without token will fail and return 401 error', async () => {
    const newBlog = {
      title: 'Why What When How',
      author: 'Samuel Chan',
      url: 'https://whywhatwhenhow.com',
      likes: 10,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog with wrong token will fail and return 401 error', async () => {
    const newBlog = {
      title: 'Why What When How',
      author: 'Samuel Chan',
      url: 'https://whywhatwhenhow.com',
      likes: 10,
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer wrongtoken13413`)
      .send(newBlog)
      .expect(401)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('viewing specific blog', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with code 400 if invalid id', async () => {
    const invalidId = '3hfbnf4iuf2348948942fh248'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('fails with code 404 if non exisitng id', async () => {
    const nonExistingIdBlog = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${nonExistingIdBlog}`)
      .expect(404)
  })
})

describe('updating a blog', () => {
  test('succeeds when request is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
        likes: 18,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length)
  })

  test('succeeds when multiple values changed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
        title: "TypeScript patterns",
        url: "https://typescriptpatterns.com/",
        likes: 20,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)
    const urls = blogsAtEnd.map(b => b.url)
    expect(titles).toContain('TypeScript patterns')
    expect(urls).toContain('https://typescriptpatterns.com/')
  })

  test('fails with code 400 if invalid id', async () => {
    const invalidId = '3hfbnf4iuf2348948942fh248'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('fails with code 404 if non exisitng id', async () => {
    const nonExistingIdBlog = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${nonExistingIdBlog}`)
      .expect(404)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with code 401 if token is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with code 401 if token is not correct', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ofwrongtoken134134`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  server.close();
  mongoose.connection.close()
})