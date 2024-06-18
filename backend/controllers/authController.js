const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await User.create(username, email, hashedPassword);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ user: data[0] });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const { data: user, error } = await User.findByEmail(email);
    if (error || !user) return res.status(400).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, username: user.username }, 'dElM2k9suRdHS16/Q53hi46SbDEZEcHU3Cg859OIR7+gMczUDkrDwD5smAYjfBPn15mxfyc/d2YVyvuK/iqUHg==');
    res.json({ token });
};
