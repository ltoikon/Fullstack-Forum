import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 

//Render Login page and handle input

function Login({ setJwt, jwt, setUser }) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const redirect = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData),
            mode: 'cors' //does this actually work/matter?
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.token) {
                localStorage.setItem("token", data.token)
                console.log('Login successful');
                redirect("/")
            }
        })

        //error handling missing
    }

    //
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevLoginData) => ({
          ...prevLoginData,
          [name]: value,
        }));
      };

    return (<div className='login-container' >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>)
}

export default Login