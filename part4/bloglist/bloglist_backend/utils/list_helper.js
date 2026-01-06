const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, blog) =>
    !fav || blog.likes > fav.likes
      ? blog
      : fav
  , null)
}

const mostBlogs = (blogs = []) => {
  if (!blogs.length) return null

  const grouped = _.groupBy(blogs, 'author')
  const ranked = _.map(grouped, (items, author) => ({ author, blogs: items.length }))
  return _.maxBy(ranked, 'blogs')
}

const mostLikes = (blogs = []) => {
  if (!blogs.length) return null

  const grouped = _.groupBy(blogs, 'author')
  const ranked = _.map(grouped, (items, author) => ({ author, likes: _.sumBy(items, 'likes') }))
  return _.maxBy(ranked, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}