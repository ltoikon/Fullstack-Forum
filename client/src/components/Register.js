import { useState } from 'react'
import { useNavigate } from 'react-router-dom'; // how to navigate?

//Render Register page and handle input

function Register() {
    const [registerData, setRegisterData] = useState({
        username: '',
        password: '',
    })
    const redirect = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        fetch("http://localhost:3001/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData),
            mode: 'cors' 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            redirect("/login")
        })

        //error handling missing
    }

  
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setRegisterData((prevRegisterData) => ({
          ...prevRegisterData,
          [name]: value,
        }));
      };

    return (<div class='login-container'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleFormChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>)
}

export default Register