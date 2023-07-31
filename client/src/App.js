import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

import Login from "./components/Login"
import Register from "./components/Register"
import PostList from "./components/PostList"
import Thread from "./components/Thread"
import SendPost from "./components/SendPost"
import './App.css';

function App() {
  return (
    <div className="App">

        <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/posts">New post</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/:postId" element={<Thread />} />
        <Route path="/posts" element={<SendPost />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
