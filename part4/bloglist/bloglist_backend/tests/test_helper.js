const blogs = require('./blogs_for_test.json')

const listWithOneBlog = blogs.listWithOneBlog
const listWithManyBlogs = blogs.listWithManyBlogs
const emptyList = []

module.exports = {
  listWithOneBlog,
  listWithManyBlogs,
  emptyList,
}