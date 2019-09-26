import functions from 'firebase-functions';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/routes/userRoutes';

dotenv.config();

const app = express();

// MongoDB connection.
mongoose.Promise = global.Promise;
const URI = process.env.MONGO_URI;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

// BodyParser Setup:
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

routes(app);

app.get('/api/helloworld', (req, res) => {
    res.json({
        message: 'hello world'
    });
});

exports.app = functions.https.onRequest(app);