const express = require('express');
const { createSubreddit, getSubreddit, subscribeSubreddit, getSubredditPosts } = require('../controllers/subredditController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/', authenticateToken, createSubreddit);
router.get('/:subredditId', getSubreddit);
router.post('/:subredditId/subscribe', authenticateToken, subscribeSubreddit);
router.get('/:subredditId/posts', getSubredditPosts);

module.exports = router;
