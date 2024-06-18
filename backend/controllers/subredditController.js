const Subreddit = require('../models/subredditModel');
const Post = require('../models/postModel');
const Subscription = require('../models/subscriptionModel');

exports.createSubreddit = async (req, res) => {
    const { name, description } = req.body;
    const { id: creator_id } = req.user;

    const { data, error } = await Subreddit.create(name, description, creator_id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ subreddit: data[0] });
};

exports.getSubreddit = async (req, res) => {
    const { subredditId } = req.params;

    const { data, error } = await Subreddit.findById(subredditId);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ subreddit: data });
};

exports.subscribeSubreddit = async (req, res) => {
    const { subredditId } = req.params;
    const { id: user_id } = req.user;

    const { data, error } = await Subscription.create(user_id, subredditId);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ subscription: data });
};

exports.getSubredditPosts = async (req, res) => {
    const { subredditId } = req.params;

    const { data, error } = await Post.findBySubreddit(subredditId);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ posts: data });
};
