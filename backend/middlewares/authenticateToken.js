
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // No token

    jwt.verify(token, 'dElM2k9suRdHS16/Q53hi46SbDEZEcHU3Cg859OIR7+gMczUDkrDwD5smAYjfBPn15mxfyc/d2YVyvuK/iqUHg==', (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
