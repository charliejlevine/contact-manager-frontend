import * as functions from 'firebase-functions';
import * as express from 'express';

const app = express();

app.get('/api/helloworld', (req, res) => {
    res.json({
        message: 'hello world'
    });
});

exports.app = functions.https.onRequest(app);
