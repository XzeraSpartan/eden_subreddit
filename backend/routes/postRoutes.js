const express = require('express');
const { createPost, upvotePost, addComment, getPostComments, getPostDetails } = require('../controllers/postController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/', authenticateToken, createPost);
router.post('/:postId/upvote', authenticateToken, upvotePost);
router.post('/:postId/comments', authenticateToken, addComment);
router.get('/:postId/comments', getPostComments);
router.get('/:postId', getPostDetails);

module.exports = router;
