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

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }