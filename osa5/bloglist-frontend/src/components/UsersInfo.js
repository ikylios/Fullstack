import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import blogService from '../services/blogs'

let user = null

const User = ({ name }) => {
    const [userBlogs, setUserBlogs] = useState([])

   
    
//    blogService.getAll().then(blog => console.log(blog))
    useEffect(() => {    
        blogService.getAll().then(blogs => {
        setUserBlogs(blogs.filter(blog => blog.userId.name === name))
//        console.log('userrrr', blogs.find(blog => blog.userId.name === name).userId)
//            blog.userId.name === name
//        } blog.userId. name))
//        user = blogs.find(blog => blog.userId.name === name).userId
        console.log('user', user)


/*
        console.log('blogs', blogs)
        console.log('blogsfilter', blogs.filter(blog => blog.userId.name === name))
        const filteredBlogs = blogs.filter(blog => blog.userId.name === name)
        setUserBlogs(filteredBlogs)
*/        
        }) 
    }, [])

    console.log('userBlogs', userBlogs)


/*

//    useEffect(() => {
       blogService.getAll().then(blogs => {
//            console.log(blogs)
            setUserBlogs(blogs.filter(blog => blog.userId.name === name)
/*
                console.log('blog.name', blog.userId.name)
                    console.log('name', name)
                    blog.userId.name === name

                })
            )
            console.log('user', user)
       })
    }, [])
})
*/
    console.log(userBlogs)
    
    console.log('user', user)
    
    return(
        <div>
            hi
            <h2>{name}</h2>
            <h3>added blogs</h3>
            {userBlogs.map(blog => <li key={blog.title}> {blog.title} </li>)}
        </div>
    )

}

const setName = (name) => {
    user = name
}

const Row = ({ name, blogCount, id }) => {
//            <User name={name}/>
    return (
        <tr>
        <th>
          <Link to={`/users/${id}`} onClick={() => setName(name)}>{name}</Link>
          <Route path={`/users/${id}`}>
              {name}
          </Route>
        </th>
        <th> {blogCount} </th>
        </tr>
    )
}

const editList = (blogs) => {
    let countedUsers = []

    for (let i = 0; i < blogs.length; i++) {
        let blogOwner = blogs[i].userId.name
        if (countedUsers.some(obj => obj.name === blogOwner)) {
//            console.log('found an existing user')
            countedUsers
                .filter(obj => obj.name === blogOwner)
                .map(obj => obj.blogCount = obj.blogCount+1)
//            console.log(countedUsers)
        } else {
            let newUser = { name: blogOwner, blogCount: 1, id: blogs[i].userId.id }
            countedUsers.push(newUser)
        }
    }

    return countedUsers
}

const AllUsers = () => {
    const [blogs, setBlogs] = useState([])
  
    useEffect(() => {
       blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

//    console.log('original blogs', blogs)
    const editedBlogs = editList(blogs)
//    console.log('editedBlogs', editedBlogs)
/*
    {Object.entries(editedBlogs).map(obj => 
        <Row key={obj[0]} name={obj[0]} blogCount={obj[1]} id={obj[2]}/> 
    )}
*/

    console.log('user', user)

    if (!user) {
        return (
            <div>
                <h2>users</h2>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th> <h3>blogs created</h3> </th>
                        </tr>
                        {editedBlogs.map(obj => 
                            <Row key={obj.name} name={obj.name} blogCount={obj.blogCount} id={obj.id} />   
                        )}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return(
            <User name={user.name} />
        )
    }
}


const UsersInfo = () => {
/*
<Route path="/">
            {user === null ?
              LoginForm() :
              blogList()
            }
          </Route>
          */

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/">
                        {user === null ? 
                            AllUsers() : 
                            User(user)
                        }
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default UsersInfo