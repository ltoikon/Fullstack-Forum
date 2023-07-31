import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//Render form (textareas and button) for writing a post

function SendPost() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const token = localStorage.getItem('token');
    const [user, setUser] = useState('')
    const redirect = useNavigate()

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

        const newPost = {
            title: title,
            content: description,
            author: user.id,
        }

        console.log('New post:', newPost);

        fetch("http://localhost:3001/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newPost),
            mode: 'cors' 
        })
        .then(response => response.json())
        .then(data => {
            console.log("send", data)
            redirect("/")
        })
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    return (
        <div className="container">
            <h2>New post</h2>
            
            <form onSubmit={handleSubmit} className="container">
        <div>
            <label>Title: </label>
            <textarea
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              placeholder=""
              required
            />
          </div>
          <div>
            <label>Description: </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder=""
              required
            />
          </div>
          <div>
          <button type="submit">Send!</button>
          </div>
        </form>
            
        </div>
    )
}

export default SendPost