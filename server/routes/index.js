/* Posts and comments */
/*  Routes will use try catch format instead of using callback function 
    This is because later versions of mongoose (7.0 ->) has deprecated callback functions*/

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const validateToken = require('../auth/validate')

//Get all posts (no authentication needed)
router.get('/posts', async (req, res) => {
    try {
        let posts = await Post.find()//.populate('author', 'username')
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ 
            message: 'Internal error while retrieving posts.', 
            error: err.message });
    }
})

//Send new post (need authentication)
router.post('/posts', validateToken, async (req, res) => {
    try {
        let author = req.user._id;
        let { title, content } = req.body;
        let post = await Post.create({ title, content, author })
        res.status(200).json(post);
        //redirect?
    } catch (err) {
        res.status(500).json({ 
            message: 'Internal error while saving the post.', 
            error: err.message });
    }
})

//Get comments on a post (no authentication needed)
router.get('/posts/:post', async (req, res) => {
    try {
        //finding all comments by using postId
        let comments = await Comment.find({ post: req.params.post })//.populate('author', 'username')
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ 
            message: 'Internal error while retrieving comments.', 
            error: err.message });
    }
})

//Send a comment on the post (need authentication)
router.post('/posts/:postId', validateToken, async (req, res) => {
    try {
        let author = req.user._id;
        let { content } = req.body;
        let { postId } = req.params;
        let comment = await Comment.create({ content, author, post: postId })
        res.status(200).json(comment);
        
    } catch (err) {
        res.status(500).json({ 
            message: 'Internal error while saving the comment.', 
            error: err.message });
    }
})




module.exports = router;