import React, { useEffect, useState } from "react"
import Post from "./Post"
import { useNavigate } from 'react-router-dom';

//Renders frontpage where each post is shown on a list
function PostList() {
    const [posts, setPosts] = useState([]);
    const redirect = useNavigate()
    
     useEffect(() => {
        fetch("http://localhost:3001/posts")
            .then(response => response.json())
            .then(data => {
                setPosts(data)

            })
    }, [])

//reacts like button when a post is clicked    
function postClick(postId){
    redirect("/posts/"+postId)
}


//With map() function, each post is send to Post component one by one. 
    return (
    <div className="post-list">
    {posts.map((data) => (
        <Post key={data.id} post={data} onClick={() => postClick(data._id)} />
      ))}
    </div>)
}

export default PostList