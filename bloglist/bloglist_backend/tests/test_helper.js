const User = require('../models/user')
const Blog = require('../models/blog')
const blogs = require('./test_blogs.json')

const listWithOneBlog = blogs.listWithOneBlog
const listWithManyBlogs = blogs.listWithManyBlogs

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'temp', url: 'http://tempurl.com', likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  listWithOneBlog,
  listWithManyBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}