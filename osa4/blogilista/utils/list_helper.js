const dummy = (blogs) => {
   return 1 
  }

  const totalLikes = (blogs) => {
    const r = (sum, item) => { return sum + item.likes } 
    return blogs.reduce(r, 0) 
  }
  
  module.exports = {
    dummy,
    totalLikes
  }