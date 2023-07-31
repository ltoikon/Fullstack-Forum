import React, { useState, useEffect } from "react"

//Render form (textarea and button) for writing a comment

function SendComment({postId, onComment}) {
    //const { postId } = useParams();
    const [comment, setComment] = useState('')
    const token = localStorage.getItem('token');
    const [user, setUser] = useState('')

    //fetching user information by decoding and parsing the jwt token
    useEffect(() => {
        if (token) {
          const decodedToken = token.split('.')[1];
          const decodedUser = JSON.parse(atob(decodedToken));
          setUser(decodedUser);
        }
      }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newComment = {
            content: comment,
            author: user.id,
            post: postId
        }

        console.log('New comment:', newComment);

        fetch("http://localhost:3001/posts/"+postId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newComment),
            mode: 'cors' //does this actually work/matter?
        })
        .then(response => response.json())
        .then(data => {
            onComment(data)           
        })

        setComment('');
    }

    const handleChange = (event) => {
        setComment(event.target.value)
    }

    return (
        <div className="flex">
          <form onSubmit={handleSubmit} >
            <div>
              <label>Write your comment: </label>
              <textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={handleChange}
                rows="5"
                cols="60"
                placeholder="Please remain polite and try to be helpful!"
                required
              />
            </div>
            <button type="submit">Send comment!</button>
          </form> 
        </div>
    )
}

export default SendComment