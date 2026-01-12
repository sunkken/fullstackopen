const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

describe('when there are initially two users saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    
    const pwHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'Superuser',
      passwordHash: pwHash
    })
    await user.save()

    const pwHash2 = await bcrypt.hash('sekret2', 10)
    const user2 = new User({
      username: 'user2',
      name: 'Test User',
      passwordHash: pwHash2
    })
    await user2.save()
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
})

after(async () => {
  await mongoose.connection.close()
})
