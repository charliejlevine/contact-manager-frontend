import * as functions from 'firebase-functions';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as uniqueValidator from 'mongoose-unique-validator';

const app = express();

function escapeRegex(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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
	name: String,
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

app.post('/api/contact/:query', (req, res) => {
    if (req.params.query) {
        if (!req.body.userId) {
            res.status(500).json({message: "User needed to search"});
        }

        const userId = req.body.userId;
        const regex = new RegExp(escapeRegex(req.params.query), 'gi');
        Contact.find({"name": regex, "userId": userId}, function (err, contacts) {
            if (err) {
                res.json({message: "Unknown error trying to search"});
            } else {
                res.json({message: "Successfully searched for query", contacts: contacts});
            }
        });
    } else {
        res.status(500).json({message: "Query needed to search contact"});
    }
});

// Edit contact.
app.patch('/api/contact', (req, res) => {
    const contactId = req.body.contactId;

    if (!contactId) {
		res.status(500).json({message: "Contact ID needed to edit contact.", contact: ""});
	} else {
        Contact.findById(contactId, function (err, contact) {
            if (err) {
                res.status(500).json({message: "Could not find contact.", contact: ""})
            } else {
                const info = {
                    name: (contact as any).name,
                    phone: (contact as any).phone,
                    email: (contact as any).email,
                    address: (contact as any).address,
                    notes: (contact as any).notes
                }
                
                if (req.body.name) {
                    info.name = req.body.name;
                }

                if (req.body.phone) {
                    info.phone = req.body.phone;
                }

                if (req.body.email) {
                    info.email = req.body.email;
                }

                if (req.body.address) {
                    info.address = req.body.address;
                }

                if (req.body.notes) {
                    info.notes = req.body.notes;
                }

                Contact.findByIdAndUpdate(contactId, info, function(error, newContact) {
                    if (err) {
                        res.status(500).json({message: "ERROR: Couldn't update contact.", contact: ""});
                    } else {
                        res.json({message: "Successfully updated contact", contact: newContact});
                    }
                });
            }
        });
    }
});

// Delete contact.
app.delete('/api/contact', (req, res) => {
    const contactId = req.body.contactId;

	if (!contactId) {
		res.status(500).json({message: "Contact ID needed to delete contact."});
	} else {
		Contact.findByIdAndDelete(contactId, function (err, contact) {
			if (err) {
				res.status(500).json({message: "Error trying to delete contact."});
			} else {
				res.json({message: "Sucessfully deleted contact."});
			}
		});
	}
});

// Get All Contacts.
app.post('/api/contact', (req, res) => {
    const userId = req.body.userId;

	if (!userId) {
		res.status(500).json({message: "ID needed to get contacts.", contacts: ""});
	} else {
		Contact.find({userId: userId}).then((contacts) => {
			res.json({messsage: "Getting all contacts successfully.", contacts: contacts});
		}).catch(err => {
			res.status(500).json({message: "Error trying to get all the contacts.", contacts: ""});
		});
	}
});

// Add New Contact.
app.put('/api/contact', (req, res) => {
    const userId = req.body.userId;

	if (!userId) {
		res.status(500).json({message: "ID needed to add contact.", contact: ""});
	} else {
		const info = [req.body.name, req.body.phone, 
			req.body.email, req.body.address, req.body.notes];
		
		for (let i = 0; i < info.length; i++) {
			if (!info[i])
				info[i] = "";
		}

		const newContact = new Contact({
			_id: new mongoose.Types.ObjectId,
			userId: userId,
			name: info[0],
			phone: info[1],
			email: info[2],
			address: info[3],
			notes: info[4]
		});

		newContact.save().catch(err => {
            if (err) {
				res.status(500).json({message: "Unknown error", contact: ""});
			}
        });
        
        res.json({message: "Successfully added user.", contact: newContact});
	}
});

// Login User.
app.post('/api/user', (req, res) => {
    const username = req.body.username;
	const password = req.body.password;

	if (!username) {
		res.status(500).send("Username required to login.");
	} else if (!password) {
		res.status(500).send("Password required to login.");
	} else {
		User.findOne({'username' : username}, function (err, user: any) {
			if (err) {
				res.status(500).send("Server error");
			} else if (!user) {
				res.status(500).send("Username does not exist");
			} else {
				if (user.password === password) {
					res.json({message: "Logged in", id: user._id});
				} else {
					res.status(500).send("Incorrect password");
				}
			}
		});
	}
});

// Register new user.
app.put('/api/user', (req, res) => {
    if (req.body.username) {
        User.findOne({'username' : req.body.username}, function (err, user: any) {
            if (user) {
                res.status(500).json({message: "Username already exists"});
            }
		});
    } else {
        res.status(500).json({message: "Username needed to create user."});
    }

    if (req.body.email) {
        User.findOne({'email' : req.body.email}, function (err, user: any) {
			if (user) {
                res.status(500).send({message: "Email already exists"});
            }
		});
    } else {
        res.status(500).json({message: "Email needed to create user."});
    }

    const newUser = new User({
		_id: new mongoose.Types.ObjectId,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
    });

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
