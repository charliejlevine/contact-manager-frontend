import * as functions from 'firebase-functions';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as uniqueValidator from 'mongoose-unique-validator';

dotenv.config();

const app = express();

// MongoDB connection.
const URI = "mongodb+srv://admin:password321@maincluster-bmnhf.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
    console.log(err);
});

// BodyParser Setup:
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
}, {
	versionKey: false
}).plugin(uniqueValidator);

const ContactSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	firstname: String,
	lastname: String,
	phone: String,
	email: String,
	address: String,
	notes: String
}, {
	versionKey: false
}).plugin(uniqueValidator);

// Controller
const User = mongoose.model('User', UserSchema);
const Contact = mongoose.model('Contact', ContactSchema);

export const deleteContact = (req: any, res: any) => {
	const contactId = req.body.contactId;

	if (typeof contactId === 'undefined') {
		res.json({message: "Contact ID needed to delete contact."});
	} else {
		Contact.findByIdAndDelete(contactId, function (err, contact) {
			if (err) {
				res.json({message: "Error trying to delete contact."});
			} else {
				res.json({message: "Sucessfully deleted contact."});
			}
		});
	}
}

export const getAllContacts = (req: any, res: any) => {
	const userId = req.body.id;

	if (typeof userId === 'undefined') {
		res.json({message: "ID needed to get contacts."});
	} else {
		Contact.find({userId: userId}).then((contacts) => {
			res.json({messsage: "Getting all contacts successfully.", contacts: contacts});
		}).catch(err => {
			console.log(err);
		});
	}
}

export const addNewContact = (req: any, res: any) => {
	const userId = req.body.id;

	if (typeof userId === 'undefined') {
		res.json({message: "ID needed to add contact."});
	} else {
		const info = [req.body.firstname, req.body.lastname, req.body.phone, 
			req.body.email, req.body.address, req.body.notes];
		
		for (let i = 0; i < info.length; i++) {
			if (typeof info[i] === 'undefined')
				info[i] = "";
		}

		const newContact = new Contact({
			_id: new mongoose.Types.ObjectId,
			userId: userId,
			firstname: info[0],
			lastname: info[1],
			phone: info[2],
			email: info[3],
			address: info[4],
			notes: info[5]
		});

		newContact.save((err, user) => {
			if (err) {
				res.json({message: "Unknown error"});
			} else {
				res.send(user);
			}
		}).catch(err => {
			console.log(err);
		});
	}
}

export const loginUser = (req: any, res: any) => {
	const username = req.body.username;
	const password = req.body.password;

	if (typeof username === 'undefined') {
		res.json({message: "Username required to login.", id: ""});
	} else if (typeof password === 'undefined') {
		res.json({message: "Password required to login.", id: ""});
	} else {
		User.findOne({'username' : username}, function (err, user: any) {
			if (err) {
				res.json({message: "Username does not exist", id: ""});
			} else {
				if (user.password == password) {
					res.json({message: "Logged in", id: user._id});
				} else {
					res.json({message: "Incorrect password", id: ""});
				}
			}
		});
	}
}

// Routes 
// app.route('/api/user').put(addNewUser).post(loginUser);
// app.route('/api/contact').put(addNewContact).post(getAllContacts).delete(deleteContact);

app.put('/api/user', (req, res) => {


    let newUser = new User({
		_id: new mongoose.Types.ObjectId,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
    });
    // res.json({message: "test"});

	newUser.save().then(user => {
        res.json({
            message: "User successfully created.",
            id: user._id
        });
    }).catch(err => {
		res.json(err);
	});
});

app.get('/api/helloworld', (req, res) => {
    res.json({
        message: 'hello world'
    });
});

exports.app = functions.https.onRequest(app);
