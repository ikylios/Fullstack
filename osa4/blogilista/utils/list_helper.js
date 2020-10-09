const { sum, forEach, sumBy } = require('lodash')
const lod = require('lodash')

const listWithZeroBlogs = []
const listWithOneBlog = [{_id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considere_Harmful.html', likes: 5, __v: 0 }]
const initBlogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
    { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, 
    { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, 
    { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, 
    { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, 
    { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]


const dummy = (blogs) => {
   return 1 
  }

  const totalLikes = (blogs) => {
    const r = (sum, item) => { return sum + item.likes } 
    return blogs.reduce(r, 0) 
  }

  const favoriteBlog = (blogs) => {
    let fav = null 
    if (blogs.length > 0) {
        let mostLikes = 0
        for (let i = 0; i < blogs.length; i++) {
            const blog = blogs[i];
            if (blog.likes > mostLikes) {
                mostLikes = blog.likes
                fav = blog
            } 
        }
    }
    return fav
  }

  const mostBlogs = (blogs) => {
    const authors = lod.countBy(blogs, 'author')
    const mostPopular = lod.max(Object.keys(authors), function (o) { return obj[o] })
    const result = { author: mostPopular, blogs: authors[mostPopular]}
    return result
  }

  const mostLikes = (blogs) => {
    const authors = []
    let maxName = { 'author':blogs[0].author }
    for (let i = 0; i < blogs.length; i++) {
      const authorName = blogs[i].author
      let likes = blogs[i].likes
      if (authors[authorName]) {
        likes += authors[authorName]
      }
      authors[authorName] = likes
      if (likes > authors[maxName.author]) {
        maxName = { 'author':authorName, 'likes':likes }
      }
    }
    
    return maxName 
  }

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    listWithZeroBlogs,
    listWithOneBlog,
    initBlogs
  }