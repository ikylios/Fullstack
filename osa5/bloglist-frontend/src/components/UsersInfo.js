import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Row = ({ name, blogCount }) => {
    return (
        <tr>
        <th> {name} </th>
        <th> {blogCount} </th>
        </tr>
    )
}

const editList = (blogs) => {
    let countedUsers = {}

    for (let i = 0; i < blogs.length; i++) {
        let blogOwner = blogs[i].userId.name
        if (countedUsers[blogOwner]) {
            let blogCount = countedUsers[blogOwner]
            countedUsers[blogOwner] = blogCount +1
        } else {
            countedUsers = { ...countedUsers, [blogOwner]: 1 }
        }
    }

    return countedUsers
}

const UsersInfo = () => {
    const [blogs, setBlogs] = useState([])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(function(a, b) {
        return b.likes - a.likes
      })))
  }, [])
//    console.log('original blogs', blogs)
    const editedBlogs = editList(blogs)


    return (
        <div>
            <h2>users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th> <h3>blogs created</h3> </th>
                    </tr>
                        {Object.entries(editedBlogs).map(obj => 
                            <Row key={obj[0]} name={obj[0]} blogCount={obj[1]} /> 
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default UsersInfo