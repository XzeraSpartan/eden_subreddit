const Post = require('../models/postModel');
const Upvote = require('../models/upvoteModel');
const Comment = require('../models/commentModel');

exports.createPost = async (req, res) => {
    const { title, content, subredditId } = req.body;
    const { id: user_id } = req.user;

    const { data, error } = await Post.create(title, content, subredditId, user_id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ post: data });
};

exports.upvotePost = async (req, res) => {
    const { postId } = req.params;
    const { id: user_id } = req.user;

    const { data, error } = await Upvote.create(user_id, postId);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ upvote: data });
};

exports.addComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const { id: user_id } = req.user;

    const { data, error } = await Comment.create(content, postId, user_id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ comment: data });
};

exports.getPostComments = async (req, res) => {
    const { postId } = req.params;

    const { data, error } = await Comment.findByPost(postId);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ comments: data });
};

exports.getPostDetails = async (req, res) => {
    const { postId } = req.params;

    const { data: post, error: postError } = await Post.findById(postId);
    if (postError) return res.status(400).json({ error: postError.message });

    const { data: comments, error: commentsError } = await Comment.findByPost(postId);
    if (commentsError) return res.status(400).json({ error: commentsError.message });

    const { data: upvotes, error: upvotesError } = await Upvote.findByPost(postId);
    if (upvotesError) return res.status(400).json({ error: upvotesError.message });

    res.json({ post, comments, upvotes });
};
