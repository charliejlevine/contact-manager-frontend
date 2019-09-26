const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/api/helloworld', (req, res) => {
    res.json({
        message: 'hello world'
    });
});

exports.app = functions.https.onRequest(app);