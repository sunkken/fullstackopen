const assert = require('node:assert')
const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there are initially some blogs and users saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const pwHash = await bcrypt.hash('sekret', 10)
    const pwHash2 = await bcrypt.hash('sekret2', 10)
    const user = new User({ username: 'root', passwordHash: pwHash })
    const user2 = new User({ username: 'root2', passwordHash: pwHash2 })
    await user.save()
    await user2.save()

    await Blog.insertMany(helper.listWithManyBlogs)
  })

describe('retrieving users', () => {
    test('returns users as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('returns all users', async () => {
      const response = await api.get('/api/users')

      assert.strictEqual(response.body.length, 2)
    })

    test('returns users with id property', async () => {
      const res = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      for (const user of res.body) {
        assert.ok(user.id, 'expected user.id to be defined')
      }
    })

    test('returns users with unique id properties', async () => {
      const res = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const ids = res.body.map(u => u.id)
      const uniqueIds = new Set(ids)
      assert.strictEqual(uniqueIds.size, ids.length, 'expected all user ids to be unique')
    })
  })

  describe('creating a user', () => {
    test('succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'newuser',
        name: 'New User',
        password: 'password123',
      }
      
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('fails with status code 400 if username is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ab',
        name: 'Short Username',
        password: 'validpassword',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.error, 'username must be at least 3 characters long')

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status code 400 if password is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'validusername',
        name: 'Short Password',
        password: 'pw',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.error, 'password must be at least 3 characters long')

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status code 400 if username already exists', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'sekret',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.error, 'username must be unique')

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })

  describe('retrieving blogs', () => {
    test('returns blogs as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('returns all blogs', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.listWithManyBlogs.length)
    })

    test('returns blogs with id property', async () => {
      const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      for (const blog of res.body) {
        assert.ok(blog.id, 'expected blog.id to be defined')
      }
    })

    test('returns blogs with unique id properties', async () => {
      const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const ids = res.body.map(b => b.id)
      const uniqueIds = new Set(ids)
      assert.strictEqual(uniqueIds.size, ids.length, 'expected all blog ids to be unique')
    })
  })

  describe('adding a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'New Blog Post',
        author: 'Test Author',
        url: 'http://example.com/new-blog-post',
        likes: 0,
        userId: (await helper.usersInDb())[0].id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.listWithManyBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert.ok(titles.includes('New Blog Post'))
    })

    test('defaults to 0 likes if likes property is missing', async () => {
      const newBlog = {
        title: 'Blog Without Likes',
        author: 'Test Author',
        url: 'http://example.com/blog-without-likes',
        userId: (await helper.usersInDb())[0].id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const addedBlog = blogsAtEnd.find(b => b.title === 'Blog Without Likes')
      assert.strictEqual(addedBlog.likes, 0)
    })

    test('returns 400 Bad Request if title is missing', async () => {
      const newBlog = {
        author: 'Test Author',
        url: 'http://example.com/blog-without-title',
        likes: 5,
        userId: (await helper.usersInDb())[0].id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
      
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.listWithManyBlogs.length)
    })

    test('returns 400 Bad Request if url is missing', async () => {
      const newBlog = {
        title: 'Blog Without URL',
        author: 'Test Author',
        likes: 5,
        userId: (await helper.usersInDb())[0].id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
      
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.listWithManyBlogs.length)
    })
  })

  describe('deleting a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const ids = blogsAtEnd.map(b => b.id)
      assert.ok(!ids.includes(blogToDelete.id))

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })

    test('succeeds with status code 204 even if blog does not exist', async () => {
      const nonExistingId = await helper.nonExistingId()

      await api
        .delete(`/api/blogs/${nonExistingId}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.listWithManyBlogs.length)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedData = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'http://example.com/updated-url',
        likes: 10
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.title, updatedData.title)
      assert.strictEqual(response.body.author, updatedData.author)
      assert.strictEqual(response.body.url, updatedData.url)
      assert.strictEqual(response.body.likes, updatedData.likes)
    })

    test('fails with status code 404 if blog does not exist', async () => {
      const nonExistingId = await helper.nonExistingId()

      const updatedData = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'http://example.com/updated-url',
        likes: 10
      }

      await api
        .put(`/api/blogs/${nonExistingId}`)
        .send(updatedData)
        .expect(404)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
