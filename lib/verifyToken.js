const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const authKeys = require("./authKeys");

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token
module.exports = function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        jwt.verify(req.token, authKeys.jwtSecretKey , (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                next();
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}