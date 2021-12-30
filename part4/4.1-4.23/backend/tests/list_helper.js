const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach(blog => sum += blog.likes);
  return sum;
}

const favouriteBlog = (blogs) => {
  const highest = blogs.reduce((a, b) => a.likes < b.likes ? b : a)
  return {
    title: highest.title,
    author: highest.author,
    likes: highest.likes
  }
}

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, 'author');
  const authors = Object.keys(grouped);
  let highest = authors[0], highestNum = grouped[authors[0]].length;
  authors.forEach(author => {
    if (grouped[author].length > highestNum) {
      highest = author;
      highestNum = grouped[author].length;
    }
  })
  return {
    author: highest,
    blogs: highestNum
  }
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author');
  const authors = Object.keys(grouped);
  let highest = authors[0], highestNum = totalLikes(grouped[authors[0]])
  authors.forEach(author => {
    const authorLikes = totalLikes(grouped[author])
    if (authorLikes > highestNum) {
      highest = author;
      highestNum = authorLikes;
    }
  })
  return {
    author: highest,
    likes: highestNum
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}