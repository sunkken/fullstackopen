const Blog = require('../models/blog')
const blogs = require('./blogs_for_list_helper_test.json')

const listWithOneBlog = blogs.listWithOneBlog
const listWithManyBlogs = blogs.listWithManyBlogs

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'temp', url: 'http://tempurl.com', likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
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
}