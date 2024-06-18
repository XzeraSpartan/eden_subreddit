const User = require('../models/userModel');
const Subscription = require('../models/subscriptionModel');
const Post = require('../models/postModel');
const Upvote = require('../models/upvoteModel');

exports.getUserProfile = async (req, res) => {
    const { userId } = req.params;

    const { data: user, error: userError } = await User.findById(userId);
    if (userError) return res.status(400).json({ error: userError.message });

    const { data: subscriptions, error: subsError } = await Subscription.findByUser(userId);
    if (subsError) return res.status(400).json({ error: subsError.message });

    const { data: posts, error: postsError } = await Post.findBySubreddit(userId);
    if (postsError) return res.status(400).json({ error: postsError.message });

    const { data: upvotes, error: upvotesError } = await Upvote.findByPost(userId);
    if (upvotesError) return res.status(400).json({ error: upvotesError.message });

    res.json({ user, subscriptions, posts, upvotes });
};
