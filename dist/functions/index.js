"use strict";

const { init } = require("./dist/index");
const functions = require("firebase-functions");
const express = require("express");

const app = express()

init(app, express.Router());

app.get('/api/helloworld', (req, res) => {
    res.json({
        message: 'hello world'
    });
});

exports.expressApp = functions.https.onRequest(app);