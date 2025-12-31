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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}