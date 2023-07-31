import Post from "./Post"
import Comment from "./Comment"
import SendComment from "./SendComment"
import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

/*  Renders a thread which have the chosen post and all post's comments
    also calls SendComment, so user can write comment easily on Thread view */
function Thread() {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState();

    /*  fetching the post second time (first time is in the postlist)
        not efficient   */
    useEffect(() => {
        fetch("http://localhost:3001/posts")
            .then(response => response.json())
            .then(data => {
                setPost(data.find((post) => post._id === postId))
            })
    }, [postId]) //postId inside array stops constant fetching

     useEffect(() => {
        fetch("http://localhost:3001/posts/"+postId)
            .then(response => response.json())
            .then(data => {
                setComments(data)
            })
    }, [postId])

    //results refreshing comments so new added comment will show
    const addComment = (comment) => {
        setComments([...comments, comment]);
    };

    //With map() function, each comment is send to Comment component one by one. 
    return (
        <div className="post-list">
        {/* conditional rendering needed so it doesn't try display post
            before it is fetched    */}
        { post && <Post key={post.id} post={post} /> } 
        
        {comments.map((data) => (
            <Comment key={data.id} comment={data} />
          ))}
        {<SendComment postId={postId} onComment={addComment}/>}
        </div>)
}

export default Thread