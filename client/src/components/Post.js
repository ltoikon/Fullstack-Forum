import React from 'react'

//Renders individual post
function Post({post, onClick}) {
    const postDate = new Date(post.createdAt)
    //formatting date
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      };
    const formattedDate = postDate.toLocaleDateString('en-FI', options);
    //entire post works as button 
    return(
        <div className="post" onClick={onClick}>
            <h2>{post.title}</h2>
            <p className="post-content"> {post.content} </p>
            <p className="post-date" > {formattedDate} {post.author}</p>
        </div>
        
    )
}

export default Post