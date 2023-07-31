import React from 'react'

//Renders individual comment
function Comment({comment}) {
        const commentDate = new Date(comment.createdAt)
        //formatting date
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false, // Use 24-hour format
          };
        const formattedDate = commentDate.toLocaleDateString('en-FI', options);
        return(
            <div className="comment">
                <p> {comment.content} </p>
                <p className="comment-date" > {formattedDate} {comment.author.username}</p>
            </div>
            
        )
    }


export default Comment