const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listWithManyBlogs, emptyList } = require('./test_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  test('of empty list is zero', () => {
      const blogs = []

      const result = listHelper.totalLikes(blogs)
      assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
      const result = listHelper.totalLikes(listWithManyBlogs)
      assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => { 
  test('of empty list is null', () => {
      const result = listHelper.favoriteBlog([])
      assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog equals that blog', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('of a bigger list is the blog with most likes', () => {
      const result = listHelper.favoriteBlog(listWithManyBlogs)
      assert.deepStrictEqual(result, listWithManyBlogs[2])
  })

})

describe('most blogs', () => {
  test('of empty list is null', () => {
      const result = listHelper.mostBlogs(emptyList)
      assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog equals that author with count 1', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      assert.deepStrictEqual(result, {
        author: 'Edsger W. Dijkstra',
        blogs: 1,
      })
  })

  test('of a bigger list is the author with most blogs', () => {
      const result = listHelper.mostBlogs(listWithManyBlogs)
      assert.deepStrictEqual(result, {
        author: 'Robert C. Martin',
        blogs: 3,
      })
  })
})